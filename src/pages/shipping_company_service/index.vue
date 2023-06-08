<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="edit-modal" v-model="displayModal" title="Edit Service" hide title-class="font-18">
            <div class="form-group">
              <label>Shipping Company</label>
              <b-form-select id="add-ship-name" class="form-control"  v-model="editForm.shipping_company_id"  value-field="id" text-field="shipping_company_name" :options="shippingCompanies"></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Title</label>
              <b-form-input  id="add-finish-deci" v-model="editForm.service_title" placeholder="Add Title"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Service Type</label>
              <b-form-select id="add-ship-name" class="form-control"  v-model="editForm.service_type"  value-field="id" text-field="text" :options="serviceType"></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Service Price</label>
              <b-form-input type="number" id="add-finish-deci" v-model="editForm.service_price" ></b-form-input>
            </div>
            <br>
            <template #modal-footer>
              <button v-b-modal.modal-close_visit data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="editService(id)" >Save</button>
            </template>
          </b-modal>
        </div>
        <div class="text-center">
          <b-modal id="modal-standard"  v-model="editModalDisplay" title="Add Service" hide title-class="font-18">
            <div class="form-group">
              <label>Shipping Company</label>
              <b-form-select id="add-ship-name" class="form-control"  v-model="form.shipping_company_id"  value-field="id" text-field="shipping_company_name" :options="shippingCompanies"></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Title</label>
              <b-form-input  id="add-finish-deci" v-model="form.service_title" placeholder="Add Title"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Service Type</label>
              <b-form-select id="add-ship-name" class="form-control"  v-model="form.service_type"  value-field="id" text-field="text" :options="serviceType"></b-form-select>
            </div>
            <br>
            <div class="form-group">
              <label>Post Type Price</label>
              <b-form-input type="number" id="add-finish-deci" v-model="form.service_price" placeholder="Add Distance Price"></b-form-input>
            </div>
            <br>
            <template  #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <b-button  for="edit-modal" class="btn btn-success btn-sm m-1" @click="addServiceType" >Save</b-button>
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
                    <b-button style="float: right"  v-b-modal.modal-standard variant="primary">Add Service</b-button>
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
                    <template v-slot:cell(service_type)="{item}">
                      <div v-if="item.service_type === 1">
                        <b-badge class="btn btn-success">Delivery Services</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-warning">Purchase Services</b-badge>
                      </div>
                    </template>
                    <template v-slot:cell(shipping_company_image)="{item}">
                      <img id="product_image" :src="''+'/'+item.shipping_company_image">
                    </template>

                    <template v-slot:cell(actions)="{item}">
                      <b-button  v-b-modal.edit-modal @click="editServiceModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deleteService(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
    this.getShipServiceList();
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      serviceType:[
        {
          id:'0',
          text:'Purchase Services'
        },
        {
          id:'1',
          text:'Delivery Services'
        }
      ],
      shippingCompanies:[],
      editModalDisplay:false,
      tablefields: [
        { key: 'shipping_company_image', label: 'Image', sortable: true, },
        { key: 'shipping_company_name', label: 'Shipping Company Name', sortable: true, },
        { key: 'service_title', label: 'Title', sortable: true, },
        { key: 'service_type', label: 'Service Type', sortable: true, },
        { key: 'service_price', label: 'Price', sortable: true, },
        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
      editForm:{
        shipping_company_id:null,
        service_type:null,
        service_title:null,
        service_price:null
      },
      displayModal:false,
      form:{
        shipping_company_id:null,
        service_type:null,
        service_title:null,
        service_price:null
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
      this.form.service_title= null;
      this.form.service_type= null;
      this.form.service_price= null;

      this.form.shipping_company_id = null;
    },
    getShippingCompaniesList(){
      this.$http.get('shipping-company/')
          .then(({data}) => {this.shippingCompanies = data;
            // eslint-disable-next-line no-console
            console.log(data);}).catch()


    },

    editServiceModal(item){
      // eslint-disable-next-line no-console
      console.log(item)
      this.id = item.id;
      this.editForm.service_type = item.service_type;
      this.editForm.service_title = item.service_title;
      this.editForm.shipping_company_id = item.shipping_company_id;
      this.editForm.service_price = item.service_price;


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
    addServiceType(){
      this.$http.post('shipping-company-service',this.form)
          .then((data) => {this.categories = data;
            this.editModalDisplay = false;
            this.getShipServiceList();
            this.clearAddDeciModal();
          })
          .catch()

    },
    getShipServiceList(){
      this.$http.get('shipping-company-service')
          .then((res) => {
            this.items = res.data;
            // eslint-disable-next-line no-console
            console.log(this.items)
            // eslint-disable-next-line no-console
          })
          .catch()
    },
    editService(id){
      // eslint-disable-next-line no-console
      this.$http.patch('shipping-company-service/'+id,this.editForm)
          .then((res) => {
            this.items = res.data;
            this.getShipServiceList();
            this.displayModal = false;
          })
          .catch()

    },
    deleteService(id){
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
          this.$http.delete('shipping-company-service/'+id)
              .then(() => {
                this.getShipServiceList();
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