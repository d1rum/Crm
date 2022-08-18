<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="edit-modal" v-model="displayModal" title="Edit Color" hide title-class="font-18">
            <div class="form-group">
              <label>Color Name</label>
              <b-form-input id="edit-color-name" v-model="editForm.color_name" placeholder="Add Color Name"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Color Code</label>
              <b-form-input id="edit-color-code" v-model="editForm.color_code" placeholder="Add Color Code"></b-form-input>
            </div>
            <template #modal-footer>
              <button v-b-modal.modal-close_visit data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button v-b-modal.modal-close_visit class="btn btn-success btn-sm m-1" @click="editColor(id)" >Save</button>
            </template>
          </b-modal>
        </div>
        <div class="text-center">
          <b-modal id="modal-standard"  v-model="editModalDisplay" title="Add Color" hide title-class="font-18">
            <div class="form-group">
              <label>Color Name</label>
              <b-form-input id="add-color-name" v-model="form.color_name" placeholder="Add Color Name"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label>Color Code</label>
              <b-form-input id="add-color-code" v-model="form.color_code" placeholder="Add Color Code"></b-form-input>
            </div>
            <template  #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <b-button  for="edit-modal" class="btn btn-success btn-sm m-1" @click="addColor" >Save</b-button>
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
                    <b-button style="float: right"  v-b-modal.modal-standard variant="primary">New Color</b-button>
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

                    <template v-slot:cell(actions)="{item}">
                      <b-button  v-b-modal.edit-modal @click="editColorModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deleteColor(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
      <!-- end row -->
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
    this.getColorList();
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      editModalDisplay:false,
      tablefields: [
        { key: 'color_code', label: 'Color Code', sortable: true, },
        { key: 'color_name', label: 'Color Name', sortable: true, },
        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
      editForm:{
        color_name:null,
        color_code:null,
      },
      displayModal:false,
      form:{
        color_name:null,
        color_code:null,
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
      this.form.color_code = null;
      this.form.color_name = null;

    },
    editColorModal(item){
      this.id = item.id;
      this.editForm.color_code = item.color_code;
      this.editForm.color_name = item.color_name;

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
    addColor(){
      this.$http.post('http://172.16.2.186:8001/api/color',this.form)
          // eslint-disable-next-line no-console
          .then((data) => {console.log(data)
            this.editModalDisplay = false;
            this.getColorList();
            this.clearModalInput();
          })
          .catch()

    },
    getColorList(){
      this.$http.get('http://172.16.2.186:8001/api/color')
          .then((res) => {
            this.items = res.data;
            // eslint-disable-next-line no-console
            console.log(res);
          })
          .catch()
    },
    editColor(id){
      // eslint-disable-next-line no-console
      this.$http.patch('http://172.16.2.186:8001/api/color/'+id,this.editForm)
          .then((res) => {
            // eslint-disable-next-line no-console
            console.log(res);
            this.getColorList();
            this.displayModal = false;
          })
          .catch()

    },
    deleteColor(id){
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
          this.$http.delete('http://172.16.2.186:8001/api/color/'+id)
              .then(() => {
                this.getColorList();
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