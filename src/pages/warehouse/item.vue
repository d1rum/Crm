<template>
  <Layout>
    <div>
      <div class="row">
        <div class="col-xl-4">
          <div class="card card-statistics h-100 mb-0 apexchart-tool-force-top">
            <div class="card-header d-flex justify-content-between">
              <div class="card-heading">

                <h4 class="card-title .customCardTitle">Warehouse Item</h4>
              </div>
              <!--                        <a class="btn btn-sm btn-info"><font color="#ffffff">Add Customer</font></a>-->
            </div>
            <div class="card-body">
              <div class="form-group">
                <label for="inputFromWarehouse">Warehouse</label>
                <select id="inputFromWarehouse" @change="selectWarehouse($event)" class="form-control">
                  <option value="">Select Warehouse</option>
                  <option :key="warehouse.id" :value="warehouse.id" v-for="warehouse in warehouses">{{ warehouse.warehouse_name }}</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-8">
          <div class="card">
            <div class="card-header d-flex justify-content-between">
              <div class="card-heading">

                <h4 class="card-title .customCardTitle">Warehouse Products</h4>
              </div>
              <!--                        <a class="btn btn-sm btn-info"><font color="#ffffff">Add Customer</font></a>-->
            </div>
            <div class="card-body">
              <b-tabs justified pills class="navtab-bg" content-class="p-3">
                <b-tab active>
                  <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-home"></i>
                  </span>
                    <span class="d-none d-sm-inline-block">Product</span>
                  </template>
                  <div>
                    <div class="card-body">
                      <input type="text" v-model="searchTerm" class="form-control" style="width:660px; margin-bottom:10px;" placeholder="Search Product">
                      <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="warehouseItem in filtersearch" :key="warehouseItem.id">
                          <button class="btn btn-sm" @click.prevent="deleteWarehouseItem(warehouseItem.id)">
                            <div class="card" style="width:135px; margin-bottom:5px;">
                              <img :src="'/'+warehouseItem.product_image" id="product_photo" :alt="warehouseItem.product_name" class="card-img-top">
                              <div class="card-body">
                                <h5 class="card-title">{{ warehouseItem.product_name }}</h5>
                                <h5 class="card-title">Code: {{ warehouseItem.product_code }}</h5>
                                <h5 class="card-title">Unit: {{ warehouseItem.unit_name }} {{ warehouseItem.unit_symbol }}</h5>
                                <span v-if="warehouseItem.product_quantity > '0'" class="badge badge-success">Available: {{ warehouseItem.product_quantity }}</span>
                                <span v-else="" class="badge badge-danger">Stock Out</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-tab>

                <b-tab>
                  <template v-slot:title>
                  <span class="d-inline-block d-sm-none">
                    <i class="fas fa-cog"></i>
                  </span>
                    <span class="d-none d-sm-inline-block">Warehouse Product Variant</span>
                  </template>
                  <div>
                    <div class="card-body">
                      <input type="text" v-model="searchVariantTerm" class="form-control" style="width:660px; margin-bottom:10px;" placeholder="Search Product Variant Sku No">
                      <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6" v-for="warehouseItemVariant in filtervariantsearch" :key="warehouseItemVariant.id">
                          <button class="btn btn-sm" @click.prevent="deleteWarehouseItemVariant(warehouseItemVariant.id)">
                            <div class="card" style="width:135px; margin-bottom:5px;">
                              <img :src="'/'+warehouseItemVariant.variant_image" id="variant_photo" :alt="warehouseItemVariant.product_name" class="card-img-top">
                              <div class="card-body">
                                <h5 class="card-title">{{ warehouseItemVariant.product_name }}</h5>
                                <h5 class="card-title">Code: {{ warehouseItemVariant.product_code }}</h5>
                                <h5 class="card-title">Sku: {{ warehouseItemVariant.sku_no }}</h5>
                                <h5 class="card-title">Unit: {{ warehouseItemVariant.unit_name }} {{ warehouseItemVariant.unit_symbol }}</h5>
                                <span v-if="warehouseItemVariant.variant_quantity > '0'" class="badge badge-success">Available: {{ warehouseItemVariant.variant_quantity }}</span>
                                <span v-else="" class="badge badge-danger">Stock Out</span>
                              </div>
                            </div>
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </b-tab>
              </b-tabs>
            </div>
            <!-- end card-body -->
          </div>
        </div>
      </div>
    </div>
  </Layout>
</template>

<script>
import axios from "axios";
import Layout from "../../router/layouts/main.vue";
import PageHeader from "@/components/page-header";
export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    Layout,PageHeader
  },
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
    this.subWarehouses();
    // eslint-disable-next-line no-undef
    Reload.$on('AfterAdd',() => {
    })
  },
  data(){
    return{
      searchTerm:'',
      searchVariantTerm:'',
      warehouses:{},
      warehouseItems:[],
      warehouseItemVariants:[],
      show: false,
    }
  },
  computed:{
    filtersearch(){
      return this.warehouseItems.filter(warehouseItem => {
        return warehouseItem.product_name.match(this.searchTerm)

      })
    },
    filtervariantsearch(){
      return this.warehouseItemVariants.filter(warehouseItemVariant => {
        return warehouseItemVariant.sku_no.match(this.searchVariantTerm)

      })
    },
  },
  methods:{
    subWarehouses(){
      axios.get('sub-warehouse/list')
          .then(({data}) => (this.warehouses = data))
          .catch()
    },
    selectWarehouse(event){
      let id = event.target.value;
      if (id != "") {
        this.show = true;
        this.selectedWarehouseItem(id);
        this.selectedWarehouseItemVariant(id);
      } else {
        this.show = false;
        Notification.selectFromWarehouse()
      }
    },
    selectedWarehouseItem(id){
      if (id != "") {
        this.show = true;
        axios.get('select-warehouse-item/'+id)
            .then(({data}) => (this.warehouseItems = data))
            .catch()
      } else {
        this.show = false;
        Notification.selectFromWarehouse()
      }

    },
    selectedWarehouseItemVariant(id){
      if (id != "") {
        this.show = true;
        axios.get('select-warehouse-item-variant/'+id)
            .then(({data}) => (this.warehouseItemVariants = data))
            .catch()
      } else {
        this.show = false;
        Notification.selectFromWarehouse()
      }

    },
    deleteWarehouseItem(id){
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
          axios.get('warehouse-item/delete/'+id)
              .then(() => {
                this.warehouseItems = this.warehouseItems.filter(warehouseItem => {
                  return warehouseItem.id !== id
                })
              })
              .catch(() => {
                this.$router.push({name: 'admin-item-warehouse'})
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
    deleteWarehouseItemVariant(id){
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
          axios.get('warehouse-item-variant/delete/'+id)
              .then(() => {
                this.warehouseItemVariants = this.warehouseItemVariants.filter(warehouseItemVariant => {
                  return warehouseItemVariant.id !== id
                })
              })
              .catch(() => {
                this.$router.push({name: 'admin-item-warehouse'})
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
  height: 100px;
  width: 135px;
}
#product_photo_two{
  height: 100px;
  width: 135px;
}
#variant_photo{
  height: 100px;
  width: 135px;
}
#variant_photo_two{
  height: 100px;
  width: 135px;
}
</style>
