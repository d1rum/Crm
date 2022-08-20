<template>
  <Layout>


    <div>
      <!--breadcrumb-->
      <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
        <div class="breadcrumb-title pe-3"><router-link to="/stock-transfer-list">List Stock Transfer</router-link></div>
        <div class="ps-3">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb mb-0 p-0">
              <li class="breadcrumb-item"><router-link to="/home"><i class='bx bx-home-alt'></i></router-link>
              </li>
              <li class="breadcrumb-item active" aria-current="page">Show Stock Transfer</li>
            </ol>
          </nav>
        </div>
      </div>
      <!--end breadcrumb-->
      <div class="row">
        <div class="col-xl-4">
          <div class="card card-statistics text-center py-5">
            <div class="card-body pricing-content">
              <div class="pricing-content-card">
                <h5>From Warehouse Detail</h5>
                <!--                            <h3 class="text-primary pt-3">From Warehouse Detail</h3>-->
                <ul class="py-2">
                  <li><strong style="color: black;">Warehouse Nane: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_name }}</li>
                  <li><strong style="color: black;">Warehouse Phone: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_phone }}</li>
                  <li><strong style="color: black;">Warehouse Email: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_email }}</li>
                  <li><strong style="color: black;">Warehouse Country: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_country }}</li>
                  <li><strong style="color: black;">Warehouse City: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_city }}</li>
                  <li><strong style="color: black;">Warehouse Post Code: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_postcode }}</li>
                  <li><strong style="color: black;">Warehouse Address: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_address }}</li>
                  <li v-if="StockTransfer.stockTransfer.fromWarehouse_type == '1'">
                    <strong style="color: black;">Warehouse Type: </strong>Main Warehouse
                  </li>
                  <li v-else="">
                    <strong style="color: black;">Warehouse Type: </strong>Sub Warehouse
                  </li>
                  <li v-if="StockTransfer.stockTransfer.fromWarehouse_status == '1'">
                    <span class="badge badge-success">Active</span>
                  </li>
                  <li v-else="">
                    <span class="badge badge-danger">Passive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4">
          <div class="card card-statistics text-center py-5">
            <div class="card-body pricing-content">
              <div class="pricing-content-card">
                <h5>To Warehouse Detail</h5>
                <!--                            <h2 class="text-primary pt-3">To Warehouse Detail</h2>-->
                <ul class="py-2">
                  <li><strong style="color: black;">Warehouse Nane: </strong>{{ StockTransfer.stockTransfer.toWarehouse_name }}</li>
                  <li><strong style="color: black;">Warehouse Phone: </strong>{{ StockTransfer.stockTransfer.toWarehouse_phone }}</li>
                  <li><strong style="color: black;">Warehouse Email: </strong>{{ StockTransfer.stockTransfer.toWarehouse_email }}</li>
                  <li><strong style="color: black;">Warehouse Country: </strong>{{ StockTransfer.stockTransfer.toWarehouse_country }}</li>
                  <li><strong style="color: black;">Warehouse City: </strong>{{ StockTransfer.stockTransfer.toWarehouse_city }}</li>
                  <li><strong style="color: black;">Warehouse Post Code: </strong>{{ StockTransfer.stockTransfer.toWarehouse_postcode }}</li>
                  <li><strong style="color: black;">Warehouse Address: </strong>{{ StockTransfer.stockTransfer.toWarehouse_address }}</li>
                  <li v-if="StockTransfer.stockTransfer.toWarehouse_type == '1'">
                    <strong style="color: black;">Warehouse Type: </strong>Main Warehouse
                  </li>
                  <li v-else="">
                    <strong style="color: black;">Warehouse Type: </strong>Sub Warehouse
                  </li>
                  <li v-if="StockTransfer.stockTransfer.toWarehouse_status == '1'">
                    <span class="badge badge-success">Active</span>
                  </li>
                  <li v-else="">
                    <span class="badge badge-danger">Passive</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div class="col-xl-4">
          <div class="card card-statistics text-center py-5">
            <div class="card-body pricing-content">
              <div class="pricing-content-card">
                <h5>Supplier Detail</h5>
                <ul class="py-2">
                  <li><strong style="color: black;">Supplier Name: </strong>{{ StockTransfer.stockTransfer.supplier_name }}</li>
                  <li><strong style="color: black;">Supplier Surname: </strong>{{ StockTransfer.stockTransfer.supplier_surname }}</li>
                  <li><strong style="color: black;">Supplier Phone: </strong>{{ StockTransfer.stockTransfer.supplier_phone }}</li>
                  <li><strong style="color: black;">Supplier Email: </strong>{{ StockTransfer.stockTransfer.supplier_email }}</li>
                  <li><strong style="color: black;">Supplier Country: </strong>{{ StockTransfer.stockTransfer.supplier_country }}</li>
                  <li><strong style="color: black;">Supplier City: </strong>{{ StockTransfer.stockTransfer.supplier_city }}</li>
                  <li><strong style="color: black;">Supplier Post Code: </strong>{{ StockTransfer.stockTransfer.supplier_zipcode }}</li>
                  <li><strong style="color: black;">Supplier Address: </strong>{{ StockTransfer.stockTransfer.supplier_address }}</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-xl-12">
        <div class="card card-statistics text-center py-5">
          <div class="card-body pricing-content">
            <div class="pricing-content-card">
              <h5>Stock Transfer Detail</h5>
              <ul class="py-2">
                <li><strong style="color: black;">Start Transfer Date: </strong>{{ StockTransfer.stockTransfer.start_transfer_date }}</li>
                <li><strong style="color: black;">Finish Transfer Date: </strong>{{ StockTransfer.stockTransfer.finish_transfer_date }}</li>
                <li><strong style="color: black;">Total Product: </strong>{{ StockTransfer.stockTransfer.total_product }}</li>
                <li><strong style="color: black;">Total Quantity: </strong>{{ StockTransfer.stockTransfer.total_quantity }}</li>
                <li><strong style="color: black;">Notes: </strong>{{ StockTransfer.stockTransfer.notes }}</li>
                <li><strong style="color: black;">Duration: </strong>{{ StockTransfer.stockTransfer.duration }}</li>
                <li><strong style="color: black;">Distance: </strong>{{ StockTransfer.stockTransfer.distance }}</li>
                <li><strong style="color: black;">Price: </strong>{{ StockTransfer.stockTransfer.price }}</li>
                <li><strong style="color: black;">Extra Price: </strong>{{ StockTransfer.stockTransfer.extra_price }}</li>
                <li><strong style="color: black;">Total: </strong>{{ StockTransfer.stockTransfer.total }}</li>


              </ul>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-statistics">
            <div class="card-body">
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
                              <b-form-input v-model="productFilter" placeholder="Type to Search"></b-form-input>
                              <b-input-group-append>
                                <b-button :disabled="!productFilter" @click="productFilter = ''">Clear</b-button>
                              </b-input-group-append>

                            </b-input-group>

                          </b-col>

                          <b-col xl="6">
                            <b-form-group  label-cols="2" label="Per page" class="mb-4 datatable-select">
                              <b-form-select v-model="productperPage" :options="productpageOptions"></b-form-select>
                            </b-form-group>

                          </b-col>
                        </b-row>

                        <div class="table-responsive datatable-vue">
                          <b-table
                              show-empty
                              stacked="md"
                              :items="StockTransferProducts"
                              :fields="productTabelfields"
                              :filter="productFilter"
                              :current-page="productcurrentPage"
                              :per-page="productperPage"
                              @filtered="productonFiltered"

                          >
                            <template v-slot:cell(product_image)="{item}">
                              <img id="product_photo" :src="'http://192.168.43.131:8001'+'/'+item.product_image">
                            </template>
                          </b-table>
                        </div>

                        <b-col md="6" class="my-1 p-0">
                          <b-pagination
                              v-model="productcurrentPage"
                              :total-rows="productrows"
                              :per-page="productperPage"
                              class="my-0"
                          ></b-pagination>
                        </b-col>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-statistics">
            <div class="card-body">
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
                              :items="StockTransferVariants"
                              :fields="variantTablefields"
                              :filter="filter"
                              :current-page="currentPage"
                              :per-page="perPage"
                              @filtered="onFiltered"

                          >
                            <template v-slot:cell(variant_image)="{item}">
                              <img id="variant_photo" :src="'http://192.168.43.131:8001'+'/'+item.variant_image">
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
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
    let id = this.$route.params.id
    this.$http.get('http://192.168.43.131:8001/api/stockTransfer/show/'+id)
        .then(({data}) => (this.StockTransfer = data))
        .catch(console.log('error'))
    this.$http.get('http://192.168.43.131:8001/api/stockTransfer/show/product/'+id)
        .then(({data}) => (this.StockTransferProducts = data))
        .catch(console.log('error'))
    this.$http.get('http://192.168.43.131:8001/api/stockTransfer/show/product/variant/'+id)
        .then(({data}) => {this.StockTransferVariants = data
          console.log(data)})
        .catch(console.log('error'))

  },
  data(){
    return {
      StockTransfer: [],
      StockTransferProducts: [],
      StockTransferVariants: [],
      errors:{},
      variantTablefields: [
        { key: 'variant_image', label: 'Image', sortable: true, },
        { key: 'sku_no', label: 'SKU No', sortable: true, },
        { key: 'color_name', label: 'Color', sortable: true, },
        { key: 'color_code', label: 'Color Code', sortable: true, },
        { key: 'size_name', label: 'Size Name', sortable: true, },
        { key: 'product_code', label: 'Product Code', sortable: true, },
        { key: 'product_name', label: 'Product Name', sortable: true, },
        { key: 'product_quantity', label: 'Product Quantity', sortable: true, },
        { key: 'unit_name', label: 'Unit', sortable: true, },


      ],
      productTabelfields:[
        { key: 'product_image', label: 'Image', sortable: true, },
        { key: 'product_code', label: 'Product Code', sortable: true, },
        { key: 'product_name', label: 'Product Name', sortable: true, },
        { key: 'product_quantity', label: 'Product Quantity', sortable: true, },
        { key: 'unit_name', label: 'Unit', sortable: true, },
      ],
      items: [

      ],
      searchTerm:'',
      productsearchTerm:'',
      filter: null,
      productFilter:null,
      totalRows: 1,
      currentPage: 1,
      perPage: 10,
      pageOptions: [5, 10, 15],
      producttotalRows: 1,
      productcurrentPage: 1,
      productperPage: 10,
      productpageOptions: [5, 10, 15],
    }
  },
  methods:{
    onFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.totalRows = filteredItems.length;
      this.currentPage = 1;
    },
    productonFiltered(filteredItems) {
      // Trigger pagination to update the number of buttons/pages due to filtering
      this.producttotalRows = filteredItems.length;
      this.productcurrentPage = 1;
    },
  },
  mounted(){
    this.totalRows = this.StockTransferProducts.length;
    this.producttotalRows = this.StockTransferVariants.length;

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
      return this.StockTransferVariants.length;
    },
    productrows(){
      return this.StockTransferProducts.length;
    },

  },
}
</script>


<style scoped>
#product_photo{
  height: 40px;
  width: 40px;
}
#variant_photo{
  height: 40px;}

</style>