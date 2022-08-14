<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="edit-modal" v-model="displayModal" title="Edit Payment Method" hide title-class="font-18">
            <div class="form-group">
              <label>Payment Method</label>
              <b-form-input id="edit-pay-method" v-model="editForm.payment_method" placeholder="Edit Payment Method"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Payment Tax</label>
              <b-form-input id="edit-pay-tax" v-model="editForm.payment_tax" placeholder="Edit Payment Tax"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Payment Status</label>
              <b-form-select id="edit-pay-status" class="form-control" :options="paymentStatus" value-field="id" text-field="text" v-model="editForm.payment_status" >Category</b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Payment Seq</label>
              <b-form-input id="edit-pay-seq" v-model="editForm.payment_seq" placeholder="Edit Payment Seq"></b-form-input>
            </div>
            <br>
            <template #modal-footer>
              <button v-b-modal.modal-close_visit data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="editPaymentMethod(id)" >Save</button>
            </template>
          </b-modal>
        </div>

        <div class="text-center">
          <b-modal id="modal-standard"  v-model="editModalDisplay" title="Add Payment Method" hide title-class="font-18">
            <div class="form-group">
              <label>Payment Method</label>
              <b-form-input id="add-pay-method" v-model="form.payment_method" placeholder="Add Payment Method"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Payment Tax</label>
              <b-form-input id="add-pay-tax" v-model="form.payment_tax" placeholder="Add Payment Tax"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Payment Status</label>
              <b-form-select id="add-pay-status" class="form-control" :options="paymentStatus" value-field="id" text-field="text" v-model="form.payment_status" ></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Payment Seq</label>
              <b-form-input id="add-pay-seq" v-model="form.payment_seq" placeholder="Add Payment Seq"></b-form-input>
            </div>
            <br>
            <template  #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <b-button  for="edit-modal" class="btn btn-success btn-sm m-1" @click="addPaymentMethod" >Save</b-button>
            </template>
          </b-modal>
        </div>
      </div>
      <div class="container-fluid">
        <div class="row">


          <div class="col-md-12">

            <div class="card">

              <div class="card-body">
                <div style="margin-left: 575px" class="col-sm-4">
                  <div class="float-end d-none d-md-block">
                    <b-button style="float: right"  v-b-modal.modal-standard variant="primary">New Payment Method</b-button>
                  </div>
                </div>
                <b-row>

                  <b-col xl="6">

                    <b-input-group class="datatable-btn">
                      <b-form-input v-model="filter" placeholder="Type to Search"></b-form-input>
                      <b-input-group-append>
                        <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
                      </b-input-group-append>

                    </b-input-group>

                  </b-col>

                  <b-col xl="6">
                    <b-form-group  label-cols="2" label="Per page" class="mb-4 datatable-select">
                      <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
                    </b-form-group>

                  </b-col>
                </b-row>

                <div class="table-responsive datatable-vue">
                  <b-table
                      show-empty
                      stacked="md"
                      :items="items"
                      :fields="tablefields"
                      :filter="filter"
                      :current-page="currentPage"
                      :per-page="perPage"
                      @filtered="onFiltered"

                  >
                    <template v-slot:cell(payment_status)="{item}">
                      <div v-if="item.payment_status === 1">
                        <b-badge class="btn btn-success">Active</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-danger">Passive</b-badge>
                      </div>
                    </template>
                    <template v-slot:cell(actions)="{item}">
                      <b-button  v-b-modal.edit-modal @click="editPaymentModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deletePaymentMethod(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
                    </template>

                  </b-table>
                </div>

                <b-col md="6" class="my-1 p-0">
                  <b-pagination
                      v-model="currentPage"
                      :total-rows="rows"
                      :per-page="perPage"
                      class="my-0"
                  ></b-pagination>
                </b-col>


              </div>

            </div>
          </div>

        </div>
      </div>
    </div>
  </Layout>

</template>

<script>
import Layout from "../../router/layouts/main.vue";
import PageHeader from "@/components/page-header";

export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    Layout,PageHeader
  },
  created(){
    this.getPaymentMethodList();
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      editModalDisplay:false,
      tablefields: [
        { key: 'payment_method', label: 'Payment Method', sortable: true, },
        { key: 'payment_seq', label: 'Payment Seq', sortable: true, },
        { key: 'payment_status', label: 'Payment Status', sortable: true, },
        { key: 'payment_tax', label: 'Payment Tax', sortable: true, },
        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
      editForm:{
        payment_method:null,
        payment_tax:null,
        payment_status:null,
        payment_seq:null
      },
      displayModal:false,
      form:{
        payment_method:null,
        payment_tax:null,
        payment_status:null,
        payment_seq:null
      },
      id:null,
      title: "Form Elements",
      item: [
        {
          text: "Veltrix",
          href: "/"
        },
        {
          text: "Forms",
          href: "/"
        },
        {
          text: "Form Elements",
          active: true
        },


      ],
      paymentStatus:[
        {
          id:1,
          text:'Active'
        },
        {
          id:0,
          text:'Passive'
        },
      ],
      categories:[],
      buttons: [
        {
          text: "New Category",
          href: "/",
          active: true
        },



      ],
      searchTerm:'',
      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    }
  },
  mounted(){
    this.totalRows = this.items.length;

  },
  computed:{
    sortOptions() {
      // Create an options list from our fields
      return this.tablefields
          .filter(f => f.sortable)
          .map(f => {
            return { text: f.label, value: f.key };
          });
    },
    rows(){
      return this.items.length;
    },

  },
  methods:{
    editPaymentModal(item){
      this.hideStatus = false
      this.id = item.id;
      this.editForm.payment_method = item.payment_method;
      this.editForm.payment_tax = item.payment_tax;
      this.editForm.payment_status = item.payment_status;
      this.editForm.payment_seq = item.payment_seq;

    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    closeModal(){
      this.displayModal = false;
      this.editModalDisplay =false;
    },
    clearModal(){
      this.form.payment_status = null;
      this.form.payment_method = null;
      this.form.payment_tax = null;
      this.form.payment_seq = null;
    },
    addPaymentMethod(){
      this.$http.post('http://172.16.1.66:8001/api/payment-method',this.form)
          .then((data) => {this.categories = data;
            this.editModalDisplay = false;
            this.getPaymentMethodList();
            this.clearModal();
          })
          .catch()

    },
    getPaymentMethodList(){
      this.$http.get('http://172.16.1.66:8001/api/payment-method')
          .then((res) => {
            this.items = res.data;
            // eslint-disable-next-line no-console
            console.log(this.items)
          })
          .catch()
    },
    editPaymentMethod(id){
      // eslint-disable-next-line no-console
      this.$http.patch('http://172.16.1.66:8001/api/payment-method/'+id,this.editForm)
          .then((res) => {
            this.items = res.data;
            this.getPaymentMethodList();
            this.displayModal = false;
          })
          .catch()

    },
    deletePaymentMethod(id){
      // eslint-disable-next-line no-undef
      Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.value) {
          this.$http.delete('http://172.16.1.66:8001/api/payment-method/'+id)
              .then(() => {
                this.getPaymentMethodList();
                this.categories = this.categories.filter(role => {
                  return role.id != id
                })
              })
              .catch(() => {
              })
          // eslint-disable-next-line no-undef
          Swal.fire(
              'Deleted!',
              'Your data has been deleted.',
              'success'
          )
        }
      })

    }
  },
  // created(){
  //     this.allEmployee();
  // }

}
</script>

<style scoped>

</style>