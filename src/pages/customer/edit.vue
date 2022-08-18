<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="customerUpdate">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="customer_name">Customer Name</label>
                  <input type="text" v-model="form.customer_name" class="form-control" id="customer_name">
                </div>
                <div class="form-group col-md-3">
                  <label for="customer_surname">Customer Surname</label>
                  <input type="text" v-model="form.customer_surname" class="form-control" id="customer_surname">
                </div>
                <div class="form-group col-md-3">
                  <label for="customer_phone">Customer Phone</label>
                  <input type="tel" v-model="form.customer_phone" class="form-control" id="customer_phone">
                </div>
                <div class="form-group col-md-3">
                  <label for="customer_email">Customer Email</label>
                  <input type="email" v-model="form.customer_email" class="form-control" id="customer_email">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="customer_country">Customer Country</label>
                  <input type="text" v-model="form.customer_country" class="form-control" id="customer_country">
                </div>
                <div class="form-group col-md-4">
                  <label for="customer_city">Customer City</label>
                  <input type="text" v-model="form.customer_city" class="form-control" id="customer_city">
                </div>
                <div class="form-group col-md-4">
                  <label for="customer_zipcode">Customer Zipcode</label>
                  <input type="text" v-model="form.customer_zipcode" class="form-control" id="customer_zipcode">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="customer_address">Customer Address</label>
                  <ckeditor :editor="editor" v-model="form.customer_address" class="form-control" id="customer_address"></ckeditor>
                </div>
                <div class="form-group col-md-4">
                  <label for="customer_shipping_address">Customer Shipping Address</label>
                  <ckeditor :editor="editor" v-model="form.customer_shipping_address" class="form-control" id="customer_shipping_address"></ckeditor>
                </div>
                <div class="form-group col-md-4">
                  <label for="customer_billing_address">Customer Billing Address</label>
                  <ckeditor :editor="editor" v-model="form.customer_billing_address" class="form-control" id="customer_billing_address"></ckeditor>
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
  name:'admin-edit-customer',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('http://172.16.2.186:8001/api/customer/'+id)
        .then(({data}) => (this.form = data))
        .catch()
  },

  data(){
    return {
      form:{
        customer_name: '',
        customer_surname: '',
        customer_phone: '',
        customer_email: '',
        customer_country: '',
        customer_city: '',
        customer_zipcode: '',
        customer_address: '',
        customer_shipping_address: '',
        customer_billing_address: '',
      },
      errors:{},
      customers:{},
      editor: ClassicEditor,
    }
  },

  methods:{
    customerUpdate(){
      let id = this.$route.params.id
      axios.patch('http://172.16.2.186:8001/api/customer/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-customer-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>

</style>
