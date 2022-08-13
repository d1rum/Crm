<template>
  <Layout>

    <div>
      <div class="row">
        <div class="col-xl-5">
          <div class="card card-statistics h-100 mb-0 apexchart-tool-force-top">
            <div class="card-header d-flex justify-content-between">
              <div class="card-heading">

                <h4 class="card-title .customCardTitle">Stock Transfer</h4>
              </div>
              <!--                        <a class="btn btn-sm btn-info"><font color="#ffffff">Add Customer</font></a>-->
            </div>
            <div class="table-responsive m-t-20" style="font-size: 12px;">
              <table id="datatable-buttons" class="table">
                <thead>
                <tr>
                  <th>Name</th>
                  <th>Sku No</th>
                  <th>Color</th>
                  <th>Size</th>
                  <th>Qty</th>
                  <th>Unit</th>
                  <th>Action</th>
                </tr>
                </thead>
                <tbody class="text-muted">
                <tr v-for="(stockTransferCart) in stockTransferCarts" :key="stockTransferCart.id">
                  <td>{{ stockTransferCart.product_name }}</td>
                  <td>{{ stockTransferCart.variant_sku_no }}</td>
                  <td>{{ stockTransferCart.color_name }} {{ stockTransferCart.color_code }}</td>
                  <td>{{ stockTransferCart.size_name }}</td>
                  <td>
                    <button @click.prevent="increment(stockTransferCart.id)" class="btn btn-sm btn-success">+</button>
                    <input type="text" readonly="" style="width:30px;" :value="stockTransferCart.product_quantity">
                    <button class="btn btn-sm btn-danger" v-if="stockTransferCart.product_quantity === '1'" disabled="">-</button>
                    <button @click.prevent="decrement(stockTransferCart.id)" class="btn btn-sm btn-danger" v-else="">-</button>
                  </td>
                  <td>{{ stockTransferCart.unit_name }}</td>
                  <td><a @click="removeItem(stockTransferCart.id)" style="color:white;" class="btn btn-sm btn-danger">X</a></td>
                </tr>
                </tbody>
              </table>
            </div>
            <div class="card-body">
              <ul class="list-group">
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Product: <strong>{{ stockTransferCartCount }}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Total Quantity: <strong>{{ stockTransferCartQty }}</strong>
                </li>
                <li class="list-group-item d-flex justify-content-between align-items-center">
                  Km: <strong>{{ getKm }}</strong>
                </li>
              </ul>
              <!--                        <input type="text" v-mask="'##/##/####'" v-model="qty">-->
              <br><br>
              <GmapMap v-show="show" ref="mmm" :center="{lat:37.78620990752335, lng:29.0607316958271}" :zoom="12" style="width: auto; height: 400px">
                <gmap-marker
                    :key="index"
                    v-for="(m,index) in markers"
                    :position="m.position"
                />
              </GmapMap>
              <br>
              <form @submit.prevent="stockTransferInsert">
                <div class="form-group">
                  <label for="inputFromWarehouse">From Warehouse</label>
                  <select id="inputFromWarehouse" @change="fromWarehouseChange($event)" class="form-control" v-model="form.from_warehouse_id">
                    <option :key="fromWarehouse.id" :value="fromWarehouse.id" v-for="fromWarehouse in fromWarehouses">{{ fromWarehouse.warehouse_name }}</option>
                  </select>
                </div>
                <br>
                <div class="form-group">
                  <label for="inputToWarehouse">To Warehouse</label>
                  <select id="inputToWarehouse" class="form-control" @change="toWarehouseChange($event)" v-model="form.to_warehouse_id">
                    <option :key="toWarehouse.id" :value="toWarehouse.id" v-for="toWarehouse in toWarehouses">{{ toWarehouse.warehouse_name }}</option>
                  </select>
                </div>
                <br>
                <div class="form-group">
                  <label for="inputSupplier">Supplier</label>
                  <select id="inputSupplier" class="form-control" v-model="form.supplier_id">
                    <option :key="supplier.id" :value="supplier.id" v-for="supplier in suppliers">{{ supplier.supplier_name }} {{ supplier.supplier_surname }}</option>
                  </select>
                </div>
                <br>
                <div class="form-group">
                  <label>Start Stock Transfer Date</label>
                  <div class="form-group mb-0">
                    <input type="date" class="form-control" v-model="form.start_transfer_date">
                  </div>
                </div>
                <br>
                <div class="form-group">
                  <label>End Stock Transfer Date</label>
                  <div class="form-group mb-0">
                    <input type="date" class="form-control" v-model="form.finish_transfer_date">
                  </div>
                </div>
                <br>
                <div class="form-group">
                  <label>Notes</label>
                  <div class="form-group mb-0">
                    <ckeditor :editor="editor" v-model="form.notes" class="form-control"></ckeditor>
                  </div>
                </div>

                <br>
<!--                <div class="form-group">-->
<!--                  <label for="inputNotes">Notes</label>-->
<!--                  <textarea id="inputNotes" class="form-control" v-model="form.notes" rows="3"></textarea>-->
<!--                </div>-->
                <button type="submit" class="btn btn-primary">Save</button>
              </form>
            </div>
          </div>
        </div>

        <div class="col-xl-7">
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
                  <div v-show="show">
                    <div class="card-body">
                      <input type="text" v-model="searchTerm" class="form-control" style="width:660px; margin-bottom:10px;" placeholder="Search Product">
                      <div class="row">
                        <div class="col-lg-3 col-md-3 col-sm-6 col-6"  v-for="warehouseItem in filtersearch" :key="warehouseItem.id">
                          <button class="btn btn-sm" @click.prevent="AddToStockTransferCart(warehouseItem.id)">
                            <div class="card" style="width:135px; margin-bottom:5px;">
                              <img :src="'http://192.168.11.114:8001/'+warehouseItem.product_image" id="product_photo" :alt="warehouseItem.product_name" class="card-img-top">
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
                    <span class="d-none d-sm-inline-block">Product Variant</span>
                  </template>
                 <div v-show="show">
                   <div class="card-body">
                     <input type="text" v-model="searchVariantTerm" class="form-control" style="width:660px; margin-bottom:10px;" placeholder="Search Product Variant Sku No">
                     <div class="row">
                       <div class="col-lg-3 col-md-3 col-sm-6 col-6" style="width:135px;" v-for="warehouseItemVariant in filtervariantsearch" :key="warehouseItemVariant.id">
                         <button class="btn btn-sm" @click.prevent="AddToStockTransferCart(warehouseItemVariant.product_id,warehouseItemVariant.vid)">
                           <div class="card" style="width:135px; margin-bottom:5px;">
                             <img :src="'http://192.168.11.114:8001/'+warehouseItemVariant.variant_image" id="variant_photo" :alt="warehouseItemVariant.product_name" class="card-img-top">
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
import moment from "moment";
import Layout from "../../router/layouts/main.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

var rad = function(x) {
  return x * Math.PI / 180;
};
export default {
  name:'admin-stock-transfer',
  components: { ckeditor: CKEditor.component, Layout },
  created(){
    // eslint-disable-next-line no-undef
    // if(!User.loggedIn()){
    //   this.$router.push({name: '/admin/login'})
    // }
    axios.get('/api/admin/category/')
        .then(({data}) => (this.categories = data))
    this.allProduct();
    this.fromWarehouse();
    this.allStockTransferCart();
    this.allSupplier();
    this.allOutOfStock();
    // eslint-disable-next-line no-undef
    Reload.$on('AfterAdd',() => {
      this.allProduct()
      this.allStockTransferCart()
    })
  },
  data(){
    return{
      form:{
        from_warehouse_id: '',
        to_warehouse_id: '',
        supplier_id: '',
        notes: '',
        start_transfer_date: moment().format("YYYY-MM-DD"),
        finish_transfer_date: moment().format("YYYY-MM-DD"),
      },
      products:[],
      searchTerm:'',
      searchVariantTerm:'',
      categories:'',
      fromWarehouses:{},
      toWarehouses:{},
      warehouseItems:[],
      warehouseItemVariants:[],
      suppliers:{},
      outOfStocks:{},
      getProducts:[],
      stockTransferCarts:[],
      markers:[],
      km: null,
      show: false,
      editor: ClassicEditor,
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
    stockTransferCartCount(){
      return this.stockTransferCarts.length;
    },
    stockTransferCartQty(){
      let sum = 0;
      for (let i =0; i < this.stockTransferCarts.length; i++) {
        sum += (parseFloat(this.stockTransferCarts[i].product_quantity));
      }
      return sum;
    },
    variantCount(){
      return this.warehouseItemVariants.length;
    },
    getKm(){
      return this.km;
    },
  },
  methods:{
    stockTransferInsert(){
      axios.post('http://192.168.11.114:8001/api/store/stock-transfer',this.form)
          .then(() => {
            this.$router.push({ name: 'stock-transfer-list'})
            Notification.success()
            this.form.from_warehouse_id = "";
            this.form.to_warehouse_id = "";
            this.form.supplier_id = "";
            this.form.notes = "";
            this.form.start_transfer_date = "";
            this.form.finish_transfer_date = "";
          })
          .catch(error => this.errors = error.response.data.errors)
    },
    allOutOfStock(){
      axios.get('http://192.168.11.114:8001/api/get-out-of-stock')
          .then(({data}) => (this.outOfStocks = data))
          .catch()
    },
    allStockTransferCart(){
      axios.get('http://192.168.11.114:8001/api/stocktransfer/cart/')
          .then(({data}) => (this.stockTransferCarts = data))
          .catch()
    },
    AddToStockTransferCart(id,variant_id = null){
      let warehouse_id = this.form.from_warehouse_id;
      axios.get('http://192.168.11.114:8001/api/add/stocktransfer/cart/'+id+'/'+variant_id+'/'+warehouse_id)
          .then(({data}) => {
            if (data === 'unsuccessful') {
              // eslint-disable-next-line no-undef
              Reload.$emit('AfterAdd');
              Notification.stocktransfercart_error()
            } else {
              // eslint-disable-next-line no-undef
              Reload.$emit('AfterAdd');
              Notification.stocktransfercart_success()
            }
          })
          .catch()
    },
    selectedWarehouseItemVariant(id){
      axios.get('http://192.168.11.114:8001/api/select-from-warehouse-item-variant/'+id)
          .then(({data}) => (this.warehouseItemVariants = data))
          .catch()
    },
    removeItem(id){
      axios.get('http://192.168.11.114:8001/api/remove/stocktransfer/cart/'+id)
          .then(() => {
            // eslint-disable-next-line no-undef
            Reload.$emit('AfterAdd');
            Notification.stocktransfercart_delete()
          })
          .catch()
    },
    increment(id){
      let warehouse_id = this.form.from_warehouse_id;
      axios.get('http://192.168.11.114:8001/api/increment/stocktransfer/cart/'+id+'/'+warehouse_id)
          .then(({data}) => {
            if (data === 'unsuccessful') {
              // eslint-disable-next-line no-undef
              Reload.$emit('AfterAdd');
              Notification.stocktransfercart_error()
            } else {
              // eslint-disable-next-line no-undef
              Reload.$emit('AfterAdd');
              Notification.success()
            }

          })
          .catch()
    },
    decrement(id){
      axios.get('http://192.168.11.114:8001/api/decrement/stocktransfer/cart/'+id)
          .then(() => {
            // eslint-disable-next-line no-undef
            Reload.$emit('AfterAdd');
            // Notification.success()
          })
          .catch()
    },
    allSupplier(){
      axios.get('http://192.168.11.114:8001/api/admin/supplier')
          .then(({data}) => (this.suppliers = data))
          .catch()
    },
    fromWarehouse(){
      axios.get('http://192.168.11.114:8001/api/warehouse')
          .then(({data}) => (this.fromWarehouses = data))
          .catch()
    },
    fromWarehouseChange(event){
      let id = event.target.value;
      if (id != null) {
        this.show = true;
        axios.get('http://192.168.11.114:8001/api/select-from-warehouse/'+id)
            .then(({data}) => (this.toWarehouses = data))
            .catch()
        axios.get('http://192.168.11.114:8001/api/from/warehouse/change/'+id)
            .then(data => {
              const marker = {
                lat:parseFloat(data.data[0].warehouse_latitude),
                lng:parseFloat(data.data[0].warehouse_longitude),
              };
              this.markers.push({position : marker});
              this.$refs.mmm.panTo(marker);

              if(this.markers.length >1 ){
                this.markers.splice(0);
                axios.get('http://192.168.11.114:8001/api/from/warehouse/change/'+id)
                    .then(data => {
                      const marker = {
                        lat: parseFloat(data.data[0].warehouse_latitude),
                        lng: parseFloat(data.data[0].warehouse_longitude),
                      };
                      this.markers.push({position: marker});
                      this.$refs.mmm.panTo(marker);

                    });
              }else{
                axios.get('http://192.168.11.114:8001/api/from/warehouse/change/'+id)
                    .then(data => {
                      const marker = {
                        lat: parseFloat(data.data[0].warehouse_latitude),
                        lng: parseFloat(data.data[0].warehouse_longitude),
                      };
                      this.markers.push({position: marker});
                      this.$refs.mmm.panTo(marker);

                    });
              }
            })
            .catch()
        this.selectedWarehouseItem(id);
        this.selectedWarehouseItemVariant(id);
      } else {
        this.show = false;
        Notification.selectFromWarehouse()
      }
    },
    toWarehouseChange(event){
      let id = event.target.value;
      if (id != null) {
        axios.get('http://192.168.11.114:8001/api/to/warehouse/change/'+id)
            .then(data => {
              const marker = {
                lat:parseFloat(data.data[0].warehouse_latitude),
                lng:parseFloat(data.data[0].warehouse_longitude),
              };
              this.markers.push({position : marker});
              this.$refs.mmm.panTo(marker);
              this.distanceCalculate()
              if(this.markers.length >2 ){
                this.markers.splice(1);
                axios.get('http://192.168.11.114:8001/api/to/warehouse/change/'+id)
                    .then(data => {
                      const marker = {
                        lat: parseFloat(data.data[0].warehouse_latitude),
                        lng: parseFloat(data.data[0].warehouse_longitude),
                      };
                      this.markers.push({position: marker});
                      this.$refs.mmm.panTo(marker);
                      this.distanceCalculate()
                    });
              }

            })
            .catch()
      } else {
        Notification.selectToWarehouse()
      }
    },
    selectedWarehouseItem(id){
      if (id != null) {
        axios.get('http://192.168.11.114:8001/api/select-from-warehouse-item/'+id)
            .then(({data}) => (this.warehouseItems = data))
            .catch()
      } else {
        Notification.selectFromWarehouse()
      }

    },
    allProduct(){
      axios.get('http://192.168.11.114:8001/api/product')
          .then(({data}) => (this.products = data))
          .catch()
    },
    subProduct(id){
      axios.get('http://192.168.11.114:8001/api/getting/product/'+id)
          .then(({data}) => (this.getProducts = data))
    },
    distanceCalculate(){
      let R = 6378137; // Earth’s mean radius in meter
      let dLat = rad(this.markers[1].position.lat - this.markers[0].position.lat);
      let dLong = rad(this.markers[1].position.lng - this.markers[0].position.lng);
      let a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
          Math.cos(rad(this.markers[0].position.lat)) * Math.cos(rad(this.markers[1].position.lat)) *
          Math.sin(dLong / 2) * Math.sin(dLong / 2);
      let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      let d = R * c;
      this.km = parseFloat(d.toPrecision(6) / 1000);
    },

  },


}
</script>

<style scoped>
#product_photo{
  height: 100px;
  width: 130px;
}
#variant_photo{
  height: 100px;
  width: 130px;
}
</style>
