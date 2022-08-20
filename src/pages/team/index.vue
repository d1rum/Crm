<template>
  <Layout>
    <div>
      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-body">
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
                      <router-link :to="{ name: 'admin-edit-team',params:{id:item.id}}" class="btn btn-sm btn-dark">Edit</router-link>
                      <a @click="deleteTeam(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
                    </template>

                    <template v-slot:cell(teamImage)="{item}">
<<<<<<< Updated upstream
                      <img :src="'http://192.168.1.233:8001/'+item.team_image" id="team_photo">
=======
                      <img :src="'http://192.168.43.131:8001/'+item.team_image" id="team_photo">
>>>>>>> Stashed changes
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
      <!-- Container-fluid Ends-->
    </div>
  </Layout>

</template>

<script>
import Layout from "../../router/layouts/main.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Layout, },
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    this.allTeam();
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.allTeam()
    })
  },
  data(){
    return{
      teams:[],
      searchTerm:'',
      tablefields: [
        { key: 'teamImage', label: 'Image', sortable: true, },
        { key: 'team_name', label: 'Name', sortable: true, },
        { key: 'team_surname', label: 'Surname', sortable: true, },
        { key: 'team_job', label: 'Job', sortable: true, },
        { key: 'team_email', label: 'Email', sortable: true, },
        { key: 'team_phone', label: 'Phone', sortable: true, },
        { key: 'actions', label: 'Actions', sortable: true, },



      ],
      items: [

      ],

      filter: null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
    }
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
    filtersearch(){
      return this.teams.filter(team => {
        return team.team_job.match(this.searchTerm)

      })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;

    this.allTeam();
  },
  methods:{
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    allTeam(){
<<<<<<< Updated upstream
      axios.get('http://192.168.1.233:8001/api/team')
=======
      axios.get('http://192.168.43.131:8001/api/team')
>>>>>>> Stashed changes
          .then(({data}) => (this.items = data))
          .catch()
    },
    deleteTeam(id){
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
<<<<<<< Updated upstream
          axios.delete('http://192.168.1.233:8001/api/team/'+id)
=======
          axios.delete('http://192.168.43.131:8001/api/team/'+id)
>>>>>>> Stashed changes
              .then(() => {
                this.items = this.items.filter(item => {
                  return item.id !== id
                })
              })
              .catch(() => {
                this.$router.push({name: 'admin-team-list'})
              })
          // eslint-disable-next-line no-undef
          Swal.fire(
              'Deleted!',
              'Your file has been deleted.',
              'success'
          )
        }
      })

    },
  },


}
</script>

<style scoped>
#team_photo{
  height: 40px;
  width: 40px;
}
</style>
