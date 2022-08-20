<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="col-sm-6 col-md-3 mt-4">
        <div class="text-center">
          <b-modal id="modal-standard" v-model="displayModal" title="Add Task" hide title-class="font-18">
            <div class="form-group">
              <label >Task Title</label>
              <b-form-input  v-model="form.task_title" id="add-task-title" placeholder="Task Title"></b-form-input>
            </div>
            <br>
            <div class="form-group">
              <label for="productDescription">Task Description</label>
              <ckeditor :editor="editor" v-model="form.task_description" class="form-control" id="productDescription"></ckeditor>
            </div>
            <br>
            <label >Status</label>
            <b-form-select id="category-select-add" class="form-control"  v-model="form.task_status" value-field="id" text-field="text" :options="taskStatus"></b-form-select>
            <br>
            <div class="form-group">
              <label >Priority</label>
              <b-form-select id="category-select-add" class="form-control"  v-model="form.task_priority" value-field="id" text-field="text" :options="taskPriority">Category</b-form-select>
            </div>
            <br>
            <template #modal-footer>
              <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
              <button  class="btn btn-success btn-sm m-1" @click="addTask" >Save</button>
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
                    <b-button style="float: right"   v-b-modal.modal-standard variant="primary">New Task</b-button>
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
                  <b-modal id="edit-modal" v-model="editDisplayModal"  title="Edit Task" hide title-class="font-18">
                    <div class="form-group">
                      <label >Task Title</label>
                      <b-form-input  v-model="editForm.task_title" id="add-task-title" placeholder="Task Title"></b-form-input>
                    </div>
                    <br>
                    <div class="form-group">
                      <label for="productDescription">Task Description</label>
                      <ckeditor :editor="editor" v-model="editForm.task_description" class="form-control" id=""></ckeditor>
                    </div>
                    <br>
                    <label >Status</label>
                    <b-form-select id="category-select-add" class="form-control"  v-model="editForm.task_status" value-field="id" text-field="text" :options="taskStatus"></b-form-select>
                    <br>
                    <div class="form-groups">
                      <label >Priority</label>
                      <b-form-select id="category-select-add" class="form-control"  v-model="editForm.task_priority" value-field="id" text-field="text" :options="taskPriority"></b-form-select>
                    </div>
                    <br>
                    <template  #modal-footer>
                      <button  data-dismiss="modal" @click="closeModal" class="btn btn-danger btn-sm m-1">Close</button>
                      <b-button  class="btn btn-success btn-sm m-1" @click="editTask(id)" >Save</b-button>
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
                    <template v-slot:cell(task_description)="{item}">
                      <div v-if="item.task_status === 1">
                      <del>{{item.task_description}}</del>
                      </div>
                      <div v-else>
                     {{item.task_description}}
                      </div>
                    </template>
                    <template v-slot:cell(task_priority)="{item}">
                      <div v-if="item.task_priority === '2'">
                        <b-badge class="btn btn-danger">High Priority</b-badge>
                      </div>
                      <div v-else-if="item.task_priority === '1'">
                        <b-badge class="btn btn-warning">Medium Priority</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-success">Low Priority</b-badge>
                      </div>
                    </template>
                    <template v-slot:cell(actions)="{item}">

                      <b-button v-if="item.task_status === 0"  @click="completedTask(item.id)" class="btn btn-sm btn-success">Completed</b-button>

                      <b-button v-b-modal.edit-modal  @click="editTaskModal(item)" class="btn btn-sm btn-dark">Edit</b-button>
                      <a  @click="deleteTask(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";





export default {
  components:{
    ckeditor: CKEditor.component,

    // eslint-disable-next-line vue/no-unused-components
    Layout,PageHeader
  },
  created(){
    this.getTaskList();


    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
  },
  data(){
    return{
      completedCheck:false,
      editDisplayModal:false,
      tablefields: [
        { key: 'task_title', label: 'Task Title', sortable: true, },
        { key: 'task_description', label: 'Task Description', sortable: true, },
        { key: 'task_priority', label: 'Priority', sortable: true, },

        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      editor: ClassicEditor,

      items: [

      ],
      editForm:{
        task_title:null,
        task_description:null,
        task_status:null,
        task_priority:null,
        user_id:null
      },
      displayModal:false,
      form:{
        task_title:null,
        task_description:null,
        task_status:null,
        task_priority:null,
        task_user_id:null
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
      taskPriority:[
        {
          id:'0',
          text:'Low Priority'
        } ,
        {
          id:'1',
          text:'Medium Priority'
        }, {
          id:'2',
          text:'High Priority'
        }
      ],
      taskStatus:[
        {
          id:'0',
          text:'Waiting'
        } ,
        {
          id:'1',
          text:'Completed'
        }
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
    completedTask(id){
      this.$http.get('http://192.168.43.131:8001/api/completed-user-task/'+id)
          .then(() => {
            this.getTaskList()
            // eslint-disable-next-line no-console
          })
      // eslint-disable-next-line no-console
      console.log(id);
      // eslint-disable-next-line no-console
  console.log(id);
    },
    clearModalInput(){
      this.form.task_description = null;
      this.form.task_title = null;
      this.form.task_priority = null;
      this.form.task_status = null;


    },
    getTaskList() {
      let id = localStorage.getItem('user_id')
      this.$http.get('http://192.168.43.131:8001/api/get-user-task/'+id)
          .then((res) => {this.items = res.data
              // eslint-disable-next-line no-console
              console.log(this.items)
            // eslint-disable-next-line no-console
          })
    },
    editTaskModal(item){
      this.id = item.id;
      this.editForm.task_title = item.task_title
      this.editForm.task_status = item.task_status;
      this.editForm.task_priority = item.task_priority;
      this.editForm.task_description = item.task_description;

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
    addTask(){
      // eslint-disable-next-line no-console
      this.form.task_user_id =localStorage.getItem('user_id');


      this.$http.post('http://192.168.43.131:8001/api/task',this.form)
          // eslint-disable-next-line no-console
          .then((res) => {console.log(res)
            this.displayModal = false;
            this.getTaskList();
            this.clearModalInput();

          })
          .catch()

    },

    editTask(id){
      this.editForm.user_id = localStorage.getItem('user_id');
      // eslint-disable-next-line no-console
      this.$http.patch('http://192.168.43.131:8001/api/task/'+id,this.editForm)
          .then((res) => {
            this.items = res.data;
            this.getTaskList();
            this.editDisplayModal = false;
          })
          .catch()

    },
    deleteTask(id){
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
          this.$http.delete('http://192.168.43.131:8001/api/task/'+id)
              .then(() => {
                this.getTaskList();
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