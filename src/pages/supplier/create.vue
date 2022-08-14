<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="supplierInsert">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="supplierName">Supplier Name</label>
                  <input type="text" v-model="form.supplier_name" class="form-control" id="supplierName">
                </div>
                <div class="form-group col-md-3">
                  <label for="supplierSurname">Supplier Surname</label>
                  <input type="text" v-model="form.supplier_surname" class="form-control" id="supplierSurname">
                </div>
                <div class="form-group col-md-3">
                  <label for="supplierPhone">Supplier Phone</label>
                  <input type="tel" v-model="form.supplier_phone" data-mask="(999) 999-9999" class="form-control inputmask" id="supplierPhone">
                </div>
                <div class="form-group col-md-3">
                  <label for="supplierEmail">Supplier Email</label>
                  <input type="email" v-model="form.supplier_email" class="form-control" id="supplierEmail">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="supplierCountry">Supplier Country</label>
                  <input type="text" v-model="form.supplier_country" class="form-control" id="supplierCountry">
                </div>
                <div class="form-group col-md-4">
                  <label for="supplierCity">Supplier City</label>
                  <input type="text" v-model="form.supplier_city" class="form-control" id="supplierCity">
                </div>
                <div class="form-group col-md-4">
                  <label for="supplierZipCode">Supplier Zipcode</label>
                  <input type="text" v-model="form.supplier_zipcode" class="form-control" id="supplierZipCode">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-12">
                  <label for="supplierAddress">Supplier Address</label>
                  <ckeditor :editor="editor" v-model="form.supplier_address" class="form-control" id="supplierAddress"></ckeditor>
                </div>
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
  name:'admin-create-supplier',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://172.16.1.66:8001/api/supplier/')
        .then(({data}) => (this.suppliers = data))
  },

  data(){
    return {
      form:{
        supplier_name: null,
        supplier_surname: null,
        supplier_phone: null,
        supplier_email: null,
        supplier_country: null,
        supplier_city: null,
        supplier_zipcode: null,
        supplier_address: null,
      },
      errors:{},
      suppliers:{},
      editor: ClassicEditor,
    }
  },

  methods:{
    supplierInsert(){
      axios.post('http://172.16.1.66:8001/api/supplier',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-supplier-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>

</style>
