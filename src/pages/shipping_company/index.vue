<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="edit-modal" v-model="displayModal" title="Edit Shipping Company" hide title-class="font-18">
            <div class="form-group">
              <label>Shipping Company Name</label>
              <b-form-input id="edit-ship-com" v-model="editForm.shipping_company_name" placeholder="Edit Shipping Company Name"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Image</label>
              <b-form-file
                  v-on:click.prevent
                  id="edit-image-ship"
                  @change="onFileSelectedEdit"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
            <div class="form-group col-md-2 mt-2" v-if="editForm.shipping_company_image != null">
              <img width="100px" height="100px"  :hidden="hideStatus" :src="'http://192.168.197.37:8001'+'/'+editForm.shipping_company_image" id="shipping_company_image">
            </div>
            <br>
            <div class="form-group col-md-2 mt-2" v-if="editForm.new_shipping_company_image != null">
              <img width="100px" height="100px"   :src="editForm.new_shipping_company_image " id="shipping_company_image1">
            </div>
            <br>
            <div class="form-group">
              <label>Shipping Company Status</label>
              <b-form-select id="edit-ship-status" class="form-control"  v-model="editForm.shipping_company_status" value-field="id" text-field="text" :options="shipStatus"></b-form-select>
            </div>
            <br>
            <template #modal-footer>
              <button v-b-modal.modal-close_visit data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="editShipComp(id)" >Save</button>
            </template>
          </b-modal>
        </div>

        <div class="text-center">
          <b-modal id="modal-standard"  v-model="editModalDisplay" title="Add Shipping Company" hide title-class="font-18">
            <div class="form-group">
              <label>Shipping Company Name</label>
              <b-form-input id="add-ship-name" v-model="form.shipping_company_name" placeholder="Add Shipping Company Name"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Image</label>
              <b-form-file
                  v-on:click.prevent
                  id="add-image-ship"
                  @change="onFileSelected"
                  placeholder="Choose a file or drop it here..."
                  drop-placeholder="Drop file here..."
              ></b-form-file>
            </div>
            <div class="form-group col-md-2 mt-2" v-if="form.shipping_company_image != null">
              <img width="100px" height="100px"   :src="form.shipping_company_image" id="add-shipping_company_image">
            </div>
            <br>
            <div class="form-group">
              <label>Shipping Company Status</label>
              <b-form-select id="edit-pay-status" class="form-control"  v-model="form.shipping_company_status" value-field="id" text-field="text" :options="shipStatus"></b-form-select>
            </div>
            <br>
            <template  #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <b-button  for="edit-modal" class="btn btn-success btn-sm m-1" @click="addShipCompany" >Save</b-button>
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
                    <b-button style="float: right"  v-b-modal.modal-standard variant="primary">New Shipping Company</b-button>
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
                    <template v-slot:cell(shipping_company_status)="{item}">
                      <div v-if="item.shipping_company_status === 1">
                        <b-badge class="btn btn-success">Active</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-danger">Passive</b-badge>
                      </div>
                    </template>
                    <template v-slot:cell(shipping_company_image)="{item}">
                      <img id="product_image" :src="'http://192.168.197.37:8001'+'/'+item.shipping_company_image">
                    </template>

                    <template v-slot:cell(actions)="{item}">
                      <b-button  v-b-modal.edit-modal @click="editShipModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deleteShipCom(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
    this.getShipComList();
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      editModalDisplay:false,
      tablefields: [
        { key: 'shipping_company_image', label: 'Image', sortable: true, },
        { key: 'shipping_company_name', label: 'Shipping Company Name', sortable: true, },
        { key: 'shipping_company_status', label: 'Status', sortable: true, },
        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
      shipStatus:[
        {
          id:1,
          text:'Active'
        },
        {
          id:0,
          text:'Passive'
        },
      ],
      editForm:{
        shipping_company_name:null,
        shipping_company_image:null,
        shipping_company_status:null,
        new_shipping_company_image:null

      },
      displayModal:false,
      form:{
        shipping_company_name:null,
        shipping_company_image:null,
        shipping_company_status:null,
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
      hideStatus:false,
      buttons: [
        {
          text: "New Category",
          href: "/",
          active: true
        },



      ],
      new_product_image:null,
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
        console.log(file)
      }
    },
    onFileSelectedEdit(event){
      let file = event.target.files[0];
      if(file.size > 20971520) {
        Notification.image_validation()
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.editForm.new_shipping_company_image = event.target.result
          // this.new_product_image = this.editForm.shipping_company_image
          this.hideStatus = true;
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
        // eslint-disable-next-line no-console
      }
    },
    clearModal(){
      this.form.shipping_company_status = null;
          this.form.shipping_company_name = null;
      this.form.shipping_company_image =  null ;
    },

    editShipModal(item){
      this.hideStatus = false
      this.shipping_company_image = null;
      this.id = item.id;
      this.editForm.shipping_company_name = item.shipping_company_name;
      this.editForm.shipping_company_status = item.shipping_company_status;
      this.editForm.shipping_company_image = item.shipping_company_image;

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
    addShipCompany(){
      this.$http.post('http://192.168.197.37:8001/api/shipping-company',this.form)
          .then((data) => {this.categories = data;
            this.editModalDisplay = false;
            this.getShipComList();
            this.clearModal()
            this.$toasted.global.success()
          })
          .catch()

    },
    getShipComList(){
      this.$http.get('http://192.168.197.37:8001/api/shipping-company')
          .then((res) => {
            this.items = res.data;
            // eslint-disable-next-line no-console
            console.log(this.items)
          })
          .catch()
    },
    editShipComp(id){
      // eslint-disable-next-line no-console
      this.$http.patch('http://192.168.197.37:8001/api/shipping-company/'+id,this.editForm)
          .then((res) => {
            this.items = res.data;
            this.getShipComList();
            this.displayModal = false;
            this.editForm.new_shipping_company_image = null;
          })
          .catch()

    },
    deleteShipCom(id){
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
          this.$http.delete('http://192.168.197.37:8001/api/shipping-company/'+id)
              .then(() => {
                this.getShipComList();
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