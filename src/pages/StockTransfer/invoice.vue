<template>
  <Layout>
    <div class="row">
      <div class="col-12">
        <div class="card">
          <div class="card-body">
            <div class="row">
              <div class="col-12">
                <div class="invoice-title">
                  <h4 class="float-end font-size-16">
                    <strong>{{ StockTransfer.stockTransfer.code }}</strong>
                  </h4>
                  <h3 class="mt-0">
                    <img src="@/assets/images/logo-sm.png" alt="logo" height="24" />
                  </h3>
                </div>
                <hr />
                <div class="row">
                  <div class="col-4 text-center">
                    <address>
                      <strong>From:</strong>
                      <br /><strong>Warehouse: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_name }}
                      <br /><strong>Phone: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_phone }}
                      <br /><strong>Email: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_email }}
                      <br /><strong>Country: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_country }}
                      <br /><strong>City: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_city }}
                      <br /><strong>Post Code: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_postcode }}
                      <br /><strong>Address: </strong>{{ StockTransfer.stockTransfer.fromWarehouse_address }}
                    </address>
                  </div>
                  <div class="col-4 text-center">
                    <address>
                      <strong>Supplier:</strong>
                      <br /><strong>Name- Surname: </strong>{{ StockTransfer.stockTransfer.toWarehouse_name }} {{ StockTransfer.stockTransfer.supplier_surname }}
                        <br /><strong>Phone: </strong>{{ StockTransfer.stockTransfer.supplier_phone }}
                      <br /><strong>Email: </strong>{{ StockTransfer.stockTransfer.supplier_email }}
                      <br /><strong>Country: </strong>{{ StockTransfer.stockTransfer.supplier_country }}
                      <br /><strong>City: </strong>{{ StockTransfer.stockTransfer.supplier_city }}
                      <br /><strong>Post Code: </strong>{{ StockTransfer.stockTransfer.supplier_zipcode }}
                      <br /><strong>Address: </strong>{{ StockTransfer.stockTransfer.supplier_address }}
                    </address>
                  </div>
                  <div class="col-4 text-center">
                    <address>
                      <strong>To:</strong>
                      <br /><strong>Warehouse: </strong>{{ StockTransfer.stockTransfer.toWarehouse_name }}
                      <br /><strong>Phone: </strong>{{ StockTransfer.stockTransfer.toWarehouse_phone }}
                      <br /><strong>Email: </strong>{{ StockTransfer.stockTransfer.toWarehouse_email }}
                      <br /><strong>Country: </strong>{{ StockTransfer.stockTransfer.toWarehouse_country }}
                      <br /><strong>City: </strong>{{ StockTransfer.stockTransfer.toWarehouse_city }}
                      <br /><strong>Post Code: </strong>{{ StockTransfer.stockTransfer.toWarehouse_postcode }}
                      <br /><strong>Address: </strong>{{ StockTransfer.stockTransfer.toWarehouse_address }}
                    </address>
                  </div>
                </div>
                <div class="row">
                  <div class="col-4 mt-4 text-center">
                    <address>
                      <strong>Detail:</strong>
                      <br /><strong>Code: </strong> {{ StockTransfer.stockTransfer.code }}
                      <br /><strong>Start Date: </strong> {{ StockTransfer.stockTransfer.start_transfer_date }}
                      <br /><strong>End Date: </strong> {{ StockTransfer.stockTransfer.finish_transfer_date }}
                      <br /><strong>Total Product: </strong>{{ StockTransfer.stockTransfer.total_product }}
                      <br /><strong>Total Quantity: </strong>{{ StockTransfer.stockTransfer.total_quantity }}
                    </address>
                  </div>
                  <div class="col-4 mt-4 text-center">
                    <address>
                      <strong>Detail:</strong>
                      <br /><strong>Duration: </strong>{{ StockTransfer.stockTransfer.duration }}
                      <br /><strong>Distance: </strong>{{ StockTransfer.stockTransfer.distance }}
                      <br /><strong>Price: </strong>{{ StockTransfer.stockTransfer.price }}
                      <br /><strong>Extra Price: </strong>{{ StockTransfer.stockTransfer.extra_price }}
                      <br /><strong>Total: </strong>{{ StockTransfer.stockTransfer.total }}
                    </address>
                  </div>
                  <div class="col-4 mt-4 text-center">
                    <address>
                      <strong>Payment Method:</strong>
                      <br />Visa ending **** 4242
                      <br />jsmith@email.com
                    </address>
                  </div>
                </div>
                <div class="row">
                  <div class="col-12 mt-4 text-center">
                    <address>
                      <br /><strong>Stock Transfer Date: </strong> {{ StockTransfer.stockTransfer.created_at }}
                      <br /><strong>Notes: </strong>{{ StockTransfer.stockTransfer.notes }}
                    </address>
                  </div>
                </div>
                <br>
              </div>
            </div>

            <div class="row">
              <div class="col-12">
                <div>
                  <div class="p-2">
                    <h3 class="font-size-20 text-center">
                      <strong>Stock Transfer Summary</strong>
                    </h3>
                  </div>
                  <div class>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                        <tr>
                          <td class="text-center">
                            <strong>Code</strong>
                          </td>
                          <td class="text-center">
                            <strong>Name</strong>
                          </td>
                          <td class="text-center">
                            <strong>Quantity</strong>
                          </td>
                          <td class="text-center">
                            <strong>Unit</strong>
                          </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="stockTransferProduct in StockTransferProducts" :key="stockTransferProduct.id">
                          <td class="text-center">{{ stockTransferProduct.product_code }}</td>
                          <td class="text-center">{{ stockTransferProduct.product_name }}</td>
                          <td class="text-center">{{ stockTransferProduct.product_quantity }}</td>
                          <td class="text-center">{{ stockTransferProduct.unit_name }}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <br>
                    <div class="table-responsive">
                      <table class="table">
                        <thead>
                        <tr>
                          <td class="text-center">
                            <strong>Sku No</strong>
                          </td>
                          <td class="text-center">
                            <strong>Color</strong>
                          </td>
                          <td class="text-center">
                            <strong>Color Code</strong>
                          </td>
                          <td class="text-center">
                            <strong>Size</strong>
                          </td>
                          <td class="text-center">
                            <strong>Code</strong>
                          </td>
                          <td class="text-center">
                            <strong>Name</strong>
                          </td>
                          <td class="text-center">
                            <strong>Quantity</strong>
                          </td>
                          <td class="text-center">
                            <strong>Unit</strong>
                          </td>
                        </tr>
                        </thead>
                        <tbody>
                        <tr v-for="StockTransferVariant in StockTransferVariants" :key="StockTransferVariant.id">
                          <td class="text-center">{{ StockTransferVariant.sku_no }}</td>
                          <td class="text-center">{{ StockTransferVariant.color_name }}</td>
                          <td class="text-center">{{ StockTransferVariant.color_code }}</td>
                          <td class="text-center">{{ StockTransferVariant.size_name }}</td>
                          <td class="text-center">{{ StockTransferVariant.product_code }}</td>
                          <td class="text-center">{{ StockTransferVariant.product_name }}</td>
                          <td class="text-center">{{ StockTransferVariant.product_quantity }}</td>
                          <td class="text-center">{{ StockTransferVariant.unit_name }}</td>
                        </tr>
                        </tbody>
                      </table>
                    </div>
                    <div class="d-print-none">
                      <div class="float-end">
                        <a href="javascript:window.print()" class="btn btn-success">
                          <i class="fa fa-print"></i>
                        </a>
                        <a href="#" class="btn btn-primary ms-1">Send</a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <!-- end row -->
          </div>
          <!-- end card-body -->
        </div>
        <!-- end card -->
      </div>
      <!-- end col -->
    </div>
    <!-- end row -->
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
    this.$http.get('http://192.168.1.37:8001/api/stockTransfer/show/'+id)
        .then(({data}) => (this.StockTransfer = data))
        .catch()
    this.$http.get('http://192.168.1.37:8001/api/stockTransfer/show/product/'+id)
        .then(({data}) => (this.StockTransferProducts = data))
        .catch()
    this.$http.get('http://192.168.1.37:8001/api/stockTransfer/show/product/variant/'+id)
        .then(({data}) => {this.StockTransferVariants = data
          console.log(data)})
        .catch()

  },
  data(){
    return {
      StockTransfer: [],
      StockTransferProducts: {},
      StockTransferVariants: {},
      errors:{},
    }
  },
  methods:{
  }
}
</script>


<style scoped>
#product_photo{
  height: 40px;
  width: 40px;
}
#variant_photo{
  width: 40px;
  height: 40px;
}

</style>