

<template>
  <Layout>
    <PageHeader :items="item" :title="title"></PageHeader>
    <div>
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">

              <div class="card-body">
                <div style="margin-left: 575px" class="col-sm-4">
                  <div class="float-end d-none d-md-block">
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
                    <template v-slot:cell(supplier_name)="{item}">
                      {{item.supplier_name + ' '+ item.supplier_surname}}
                    </template>


                    <template v-slot:cell(status)="{item}">
                      <b-badge v-if="item.status === 0" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 1" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 2" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 3" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 4" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 5" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 6" class="btn btn-danger">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 7" class="btn btn-success">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 8" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 9" class="btn btn-danger">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 10" class="btn btn-danger">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 11" class="btn btn-danger">{{item.status_text[0].status_text}}</b-badge>
                      <b-badge v-if="item.status === 12" class="btn btn-primary">{{item.status_text[0].status_text}}</b-badge>
                    </template>

                    <template v-slot:cell(fromWarehouse_type)="{item}">
                      <div v-if="item.fromWarehouse_type === 1">
                        <b-badge class="btn btn-success">Main Warehouse</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-warning">Sub Warehouse</b-badge>
                      </div>

                    </template>
                    <template v-slot:cell(toWarehouse_type)="{item}">
                      <div v-if="item.toWarehouse_type === 1">
                        <b-badge class="btn btn-success">Main Warehouse</b-badge>
                      </div>
                      <div v-else>
                        <b-badge class="btn btn-warning">Sub Warehouse</b-badge>
                      </div>

                    </template>



                    <template v-slot:cell(actions)="{item}">
                      <a v-if="item.status === 0" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-secondary">Prepared</a>
                      <a v-if="item.status === 1" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-dark">Process</a>
                      <a v-if="item.status === 2" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-primary">Road</a>
                      <a v-if="item.status === 3" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-warning">Arrived</a>
                      <a v-if="item.status === 4" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-success">Delivered</a>
                      <a v-if="item.status === 5" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-danger">Return Request</a>
                      <a v-if="item.status === 6" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-danger">Return Prepared</a>
                      <a v-if="item.status === 7" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-danger">Return Process</a>
                      <a v-if="item.status === 8" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-danger">Return Road</a>
                      <a v-if="item.status === 9" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-danger">Return Arrived</a>
                      <a v-if="item.status === 10" @click="statusChange(item)" style="color: white;" class="btn btn-sm btn-danger">Return Delivered</a>
                      <a v-if="item.status === 0 || item.status === 1 || item.status === 2" @click="statusChange(item,'cancel')" style="color: white;" class="btn btn-sm btn-danger">Cancel</a>
                      <router-link :to="{ name: 'admin-stock-transfer-show',params:{id:item.id}}" class="btn btn-sm btn-dark">Show</router-link>
                      <router-link :to="{ name: 'admin-stock-transfer-invoice',params:{id:item.id}}" class="btn btn-sm btn-success">Invoice</router-link>

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
    this.getStockTransferList()
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.getStockTransferList()
    });


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
        { key: 'supplier_name', label: 'Supplier Name', sortable: true, },
        { key: 'fromWarehouse_name', label: 'From Ware House', sortable: true, },
        { key: 'fromWarehouse_type', label: 'From Ware House Type', sortable: true, },
        { key: 'toWarehouse_name', label: 'To Ware House', sortable: true, },
        { key: 'toWarehouse_type', label: 'To Ware House Type', sortable: true, },
        { key: 'status', label: 'status', sortable: true, },

        { key: 'actions', label: 'Actions', sortable: true, },
      ],
      items: [

      ],
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
    statusChange(item,data=null){
      this.$http.post('status/'+item.id+'/change/'+item.status,{item:data})
          .then(({data}) => {
            // eslint-disable-next-line no-undef
            Reload.$emit('AfterStatus');

            // eslint-disable-next-line no-console
            console.log(data);}).catch()
    },
    getStockTransferList(){
      this.$http.get('stockTransfer/')
          .then(({data}) => {this.items = data;
            // eslint-disable-next-line no-console
            console.log(data);}).catch()


    },
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
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
>>>>>>> Stashed changes
