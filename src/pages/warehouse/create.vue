<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="warehouseInsert">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="warehouseName">Warehouse Name</label>
                  <input type="text" v-model="form.warehouse_name" class="form-control" id="warehouseName">
                </div>
                <div class="form-group col-md-3">
                  <label for="warehousePhone">Warehouse Phone</label>
                  <input type="text" v-model="form.warehouse_phone" class="form-control" id="warehousePhone">
                </div>
                <div class="form-group col-md-3">
                  <label for="warehouseEmail">Warehouse Email</label>
                  <input type="email" v-model="form.warehouse_email" class="form-control" id="warehouseEmail">
                </div>
                <div class="form-group col-md-3">
                  <label for="warehouseCountry">Warehouse Country</label>
                  <input type="text" v-model="form.warehouse_country" class="form-control" id="warehouseCountry">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="warehouseCity">Warehouse City</label>
                  <input type="text" v-model="form.warehouse_city" class="form-control" id="warehouseCity">
                </div>
                <div class="form-group col-md-3">
                  <label for="warehousePostCode">Warehouse Post Code</label>
                  <input type="text" v-model="form.warehouse_postcode" class="form-control" id="warehousePostCode">
                </div>
                <div class="form-group col-md-3">
                  <label for="warehouseType">Warehouse Type</label>
                  <select id="warehouseType" class="form-control" v-model="form.warehouse_type">
                    <option v-if="controlMainWarehouse.warehouse_type === '1'" disabled="">Main Warehouse</option>
                    <option v-else="" :value="1">Main Warehouse</option>
                    <option :value="0">Sub Warehouse</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="warehouseStatus">Warehouse Status</label>
                  <select id="warehouseStatus" class="form-control" v-model="form.warehouse_status">
                    <option :value="1">Active</option>
                    <option :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="warehouseLatitude">Warehouse Latitude</label>
                  <input type="text" v-model="form.warehouse_latitude" class="form-control" id="warehouseLatitude">
                </div>
                <div class="form-group col-md-6">
                  <label for="warehouseLongitude">Warehouse Longitude</label>
                  <input type="text" v-model="form.warehouse_longitude" class="form-control" id="warehouseLongitude">
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="warehouseAddress">Warehouse Address</label>
                <ckeditor :editor="editor" v-model="form.warehouse_address" class="form-control" id="warehouseAddress"></ckeditor>
              </div>
              <br>
              <button type="submit" class="btn btn-primary col-xl-12">Save</button>
            </form>
          </div>
        </div>
      </div>
    </div>

  </Layout>
</template>

<script>

import axios from "axios";
import Layout from "../../router/layouts/main.vue";
import CKEditor from "@ckeditor/ckeditor5-vue";
import ClassicEditor from "@ckeditor/ckeditor5-build-classic";

export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    ckeditor: CKEditor.component,
    Layout,
  },
  name:'admin-create-warehouse',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://192.168.43.131:8001/api/warehouse/')
        .then(({data}) => (this.warehouses = data))
    axios.get('http://192.168.43.131:8001/api/control-main-warehouse/')
        .then(({data}) => (this.controlMainWarehouse = data))

  },

  data(){
    return {
      form:{
        warehouse_name: null,
        warehouse_phone: null,
        warehouse_email: null,
        warehouse_country: null,
        warehouse_city: null,
        warehouse_postcode: null,
        warehouse_type: null,
        warehouse_status: null,
        warehouse_address: null,
        warehouse_latitude: null,
        warehouse_longitude: null,
      },
      errors:{},
      warehouses:{},
      controlMainWarehouse:[],
      editor: ClassicEditor,
    }
  },

  methods:{
    warehouseInsert(){
      axios.post('http://192.168.43.131:8001/api/warehouse',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-warehouse-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>

</style>
