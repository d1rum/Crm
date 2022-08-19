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
                      <div v-if="item.product_status === 1">
                        <b-badge class="btn btn-success">Active</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-danger">Passive</b-badge>
                      </div>
                    </template>
                    <template v-slot:cell(actions)="{item}">
                      <router-link :to="{ name: 'admin-edit-product',params:{id:item.id}}" class="btn btn-sm btn-dark">Edit</router-link>
                      <router-link :to="{ name: 'admin-priority-product',params:{id:item.id}}" class="btn btn-sm btn-primary">Priority</router-link>
                      <router-link :to="{ name: 'admin-variant-product',params:{id:item.id}}" class="btn btn-sm btn-success">Variant</router-link>
                      <a @click="deleteProduct(item.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
                    </template>

                    <template v-slot:cell(productImage)="{item}">
                      <img :src="'http://192.168.197.37:8001/'+item.product_image" id="product_photo">
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
    this.allProduct();
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.allProduct()
    })
  },
  data(){
    return{
      products:[],
      searchTerm:'',
      tablefields: [
        { key: 'productImage', label: 'Image', sortable: true, },
        { key: 'product_name', label: 'Name', sortable: true, },
        { key: 'product_code', label: 'Code', sortable: true, },
        { key: 'category.category_name', label: 'Category', sortable: true, },
        { key: 'subcategory.subcategory_name', label: 'Sub Category', sortable: true, },
        { key: 'product_quantity', label: 'Quantity', sortable: true, },
        { key: 'unit.unit_name', label: 'Unit', sortable: true, },
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
      return this.products.filter(product => {
        return product.product_name.match(this.searchTerm)

      })
    }
  },
  mounted() {
    // Set the initial number of items
    this.totalRows = this.items.length;

    this.allProduct();
  },
  methods:{
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    allProduct(){
      axios.get('http://192.168.197.37:8001/api/product')
          .then(({data}) => (this.items = data))
          .catch()
    },
    deleteProduct(id){
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
          axios.delete('http://192.168.197.37:8001/api/product/'+id)
              .then(() => {
                this.items = this.items.filter(item => {
                  return item.id !== id
                })
              })
              .catch(() => {
                this.$router.push({name: 'admin-product-list'})
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
#product_photo{
  height: 40px;
  width: 40px;
}
</style>
