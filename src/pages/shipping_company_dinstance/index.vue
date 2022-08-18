<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="edit-modal" v-model="displayModal" title="Edit Distance" hide title-class="font-18">
            <div class="form-group">
              <label>Shipping Company</label>
              <b-form-select id="edit-ship-name" class="form-control"  value-field="id" text-field="shipping_company_name" :options="shippingCompanies" v-model="editForm.shipping_company_id" ></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Distance</label>
              <b-form-input type="number" id="edit-start-deci" v-model="editForm.distance" placeholder="Edit Distance"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Distance Price</label>
              <b-form-input type="number" id="edit-finish-deci" v-model="editForm.distance_price" placeholder="Edit Distance Price"></b-form-input>
            </div>
            <br>
            <template #modal-footer>
              <button v-b-modal.modal-close_visit data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="editDistance(id)" >Save</button>
            </template>
          </b-modal>
        </div>
        <div class="text-center">
          <b-modal id="modal-standard"  v-model="editModalDisplay" title="Add Distance" hide title-class="font-18">
            <div class="form-group">
              <label>Shipping Company</label>
              <b-form-select id="add-ship-name" class="form-control"  v-model="form.shipping_company_id"  value-field="id" text-field="shipping_company_name" :options="shippingCompanies"></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Distance</label>
              <b-form-input type="number" id="add-start-deci" v-model="form.distance" placeholder="Add Distance"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Distance Price</label>
              <b-form-input type="number" id="add-finish-deci" v-model="form.distance_price" placeholder="Add Distance Price"></b-form-input>
            </div>
            <br>
            <template  #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <b-button  for="edit-modal" class="btn btn-success btn-sm m-1" @click="addDistance" >Save</b-button>
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
                    <b-button style="float: right"  v-b-modal.modal-standard variant="primary">Add Distance</b-button>
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
                    <template v-slot:cell(shipping_company_image)="{item}">
                      <img id="product_image" :src="'http://172.16.2.186:8001'+'/'+item.shipping_company_image">
                    </template>

                    <template v-slot:cell(actions)="{item}">
                      <b-button  v-b-modal.edit-modal @click="editDistanceModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deleteDistance(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
    this.getShippingCompaniesList()
    this.getDistanceList();
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      shippingCompanies:[],
      editModalDisplay:false,
      tablefields: [
        { key: 'shipping_company_image', label: 'Image', sortable: true, },
        { key: 'shipping_company_name', label: 'Shipping Company Name', sortable: true, },
        { key: 'distance', label: 'Distance', sortable: true, },
        { key: 'distance_price', label: 'Distance Price', sortable: true, },
        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
      editForm:{
        shipping_company_id:null,
        distance:null,
        distance_price:null
      },
      displayModal:false,
      form:{
        shipping_company_id:null,
        distance:null,
        distance_price:null
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
    clearAddDeciModal(){
      this.form.distance= null;
      this.form.distance_price= null;
      this.form.shipping_company_id = null;
    },
    getShippingCompaniesList(){
      this.$http.get('http://172.16.2.186:8001/api/shipping-company/')
          .then(({data}) => {this.shippingCompanies = data;
            // eslint-disable-next-line no-console
            console.log(data);}).catch()


    },
    onFileSelected(event){
      let file = event.target.files[0];
      if(file.size > 20971520) {
        Notification.image_validation()
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.shipping_company_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
        // eslint-disable-next-line no-console
      }
    },
    editDistanceModal(item){
      this.id = item.id;
      this.editForm.shipping_company_id = item.shipping_company_id;
      this.editForm.distance = item.distance;
      this.editForm.distance_price = item.distance_price;


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
    addDistance(){
      this.$http.post('http://172.16.2.186:8001/api/shipping-company-distance',this.form)
          .then((data) => {this.categories = data;
            this.editModalDisplay = false;
            this.getDistanceList();
            this.clearAddDeciModal();
          })
          .catch()

    },
    getDistanceList(){
      this.$http.get('http://172.16.2.186:8001/api/shipping-company-distance')
          .then((res) => {
            this.items = res.data;
            // eslint-disable-next-line no-console
            console.log(this.items)
            // eslint-disable-next-line no-console
          })
          .catch()
    },
    editDistance(id){
      // eslint-disable-next-line no-console
      this.$http.patch('http://172.16.2.186:8001/api/shipping-company-distance/'+id,this.editForm)
          .then((res) => {
            this.items = res.data;
            this.getDistanceList();
            this.displayModal = false;
          })
          .catch()

    },
    deleteDistance(id){
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
          this.$http.delete('http://172.16.2.186:8001/api/shipping-company-distance/'+id)
              .then(() => {
                this.getDistanceList();
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
#product_image{
  width: 50px;
  height: 50px;
}
</style>