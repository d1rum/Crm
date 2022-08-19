<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="modal-standard" v-model="displayModal" title="Add Sub Category" hide title-class="font-18">
            <div class="form-group">
              <label >Select Category</label>
              <b-form-select id="category-select-add" class="form-control"  v-model="form.category_id" value-field="id" text-field="category_name" :options="categories">Category</b-form-select>
            </div >
            <br>
             <div  class="form-group">
              <label >Sub Category Name</label>
              <b-form-input  v-model="form.subcategory_name" id="add-category" placeholder="Add Sub Category"></b-form-input>
            </div>
            <br>
            <template #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button  class="btn btn-success btn-sm m-1" @click="addSubCategory" >Save</button>
            </template>
          </b-modal>
        </div>

        <div class="text-center">

        </div>
      </div>
      <div class="container-fluid">
        <div class="row">


          <div class="col-md-12">

            <div class="card">

              <div class="card-body">
                <div style="margin-left: 575px" class="col-sm-4">
                  <div class="float-end d-none d-md-block">
                    <b-button style="float: right" @click="getCategoryList"  v-b-modal.modal-standard variant="primary">New Sub Category</b-button>
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
                            <b-modal id="edit-modal" v-model="editDisplayModal"  title="Edit Sub Category" hide title-class="font-18">
                              <div class="from-group">
                                <label >Select Category</label>
                                <b-form-select id="edit-cat-name" class="form-control"  v-model="editForm.category_id" value-field="id" text-field="category_name" :options="categories">Category</b-form-select>
                              </div>
                              <br>
                              <div class="from-group">
                                <label >Sub Category Name</label>
                                <b-form-input id="edi-sub-name" v-model="editForm.subcategory_name" placeholder="Edit Sub Category"></b-form-input>
                              </div>
                              <br>
                              <template  #modal-footer>
                                <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
                                <b-button  class="btn btn-success btn-sm m-1" @click="editCategory(id)" >Save</b-button>
                              </template>
                            </b-modal>
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

                    <template v-slot:cell(actions)="{item}">
                      <b-button v-b-modal.edit-modal  @click="editSubCategoryModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deleteSubCategory(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
    this.getSubCategoryList();
    this.getCategoryList();


    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      editDisplayModal:false,
      tablefields: [
        { key: 'category.category_name', label: 'Category Name', sortable: true, },
        { key: 'subcategory_name', label: 'Sub Category Name', sortable: true, },

        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
      editForm:{
        category_id:null,
        subcategory_name:null
      },
      displayModal:false,
      form:{
        category_id:null,
        subcategory_name:null
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
    clearModalInput(){
      this.form.category_id = null;
      this.form.subcategory_name = null;
    },
    getCategoryList() {
      this.$http.get('http://192.168.197.37:8001/api/category/')
          .then((res) => {this.categories = res.data
            // eslint-disable-next-line no-console
          })
    },
    editSubCategoryModal(item){
      this.id = item.id;
      this.editForm.category_id = item.category.id
      this.editForm.subcategory_name = item.subcategory_name;

    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },

    closeModal(){
      this.displayModal = false;
      this.editDisplayModal = false;
    },
    addSubCategory(){
      // eslint-disable-next-line no-console

      this.$http.post('http://192.168.197.37:8001/api/subcategory',this.form)
          // eslint-disable-next-line no-console
          .then((res) => {console.log(res)
            this.displayModal = false;
            this.getSubCategoryList();
            this.clearModalInput();

          })
          .catch()

    },
    getSubCategoryList(){

      this.$http.get('http://192.168.197.37:8001/api/subcategory')
          .then((res) => {
            this.items = res.data;

          })
          .catch()
    },
    editCategory(id){
      // eslint-disable-next-line no-console
      this.$http.patch('http://192.168.197.37:8001/api/subcategory/'+id,this.editForm)
          .then((res) => {
            this.items = res.data;
            this.getSubCategoryList();
            this.editDisplayModal = false;
          })
          .catch()

    },
    deleteSubCategory(id){
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
          this.$http.delete('http://192.168.197.37:8001/api/subcategory/'+id)
              .then(() => {
                this.getSubCategoryList();
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