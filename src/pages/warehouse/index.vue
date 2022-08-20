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
                    <template v-slot:cell(status)="{item}">
                      <div v-if="item.warehouse_status === 1">
                        <b-badge class="btn btn-success">Active</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-danger">Passive</b-badge>
                      </div>
                    </template>
                    <template v-slot:cell(actions)="{item}">
                      <router-link :to="{ name: 'admin-edit-warehouse',params:{id:item.id}}" class="btn btn-sm btn-dark">Edit</router-link>
                      <a @click="deleteWarehouse(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
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
    this.allWarehouse();
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.allWarehouse()
    })
  },
  data(){
    return{
      warehouses:[],
      searchTerm:'',
      tablefields: [
        { key: 'warehouse_name', label: 'Name', sortable: true, },
        { key: 'warehouse_type', label: 'Type', sortable: true, },
        { key: 'warehouse_phone', label: 'Phone', sortable: true, },
        { key: 'warehouse_email', label: 'Email', sortable: true, },
        { key: 'warehouse_country', label: 'Country', sortable: true, },
        { key: 'warehouse_city', label: 'City', sortable: true, },
        { key: 'status', label: 'Status', sortable: true, },
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
      return this.warehouses.filter(warehouse => {
        return warehouse.warehouse_name.match(this.searchTerm)

      })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;

    this.allWarehouse();
  },
  methods:{
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    allWarehouse(){
      axios.get('http://192.168.1.37:8001/api/warehouse')
          .then(({data}) => (this.items = data))
          .catch()
    },
    deleteWarehouse(id){
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
          axios.delete('http://192.168.1.37:8001/api/warehouse/'+id)
              .then(() => {
                this.items = this.items.filter(item => {
                  return item.id !== id
                })
              })
              .catch(() => {
                this.$router.push({name: 'admin-warehouse-list'})
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

</style>
