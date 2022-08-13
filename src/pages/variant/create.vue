<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="variantInsert" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="variant_sku_no">Variant Sku No</label>
                  <input type="text" v-model="form.sku_no" class="form-control" id="variant_sku_no">
                </div>
                <div class="form-group col-md-6">
                  <label for="variant_quantity">Variant Quantity</label>
                  <input type="number" min="1" v-model="form.variant_quantity" class="form-control" id="variant_quantity">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="product">Product</label>
                  <select id="product" class="form-control" v-model="form.product_id">
                    <option :key="product.id" :value="product.id" v-for="product in products">{{ product.product_name }}</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="size">Size</label>
                  <select id="size" class="form-control" v-model="form.size_id">
                    <option :key="size.id" :value="size.id" v-for="size in sizes">{{ size.size_name }}</option>
                  </select>
                </div>
                <div class="form-group col-md-4">
                  <label for="color">Color</label>
                  <select id="color" class="form-control" v-model="form.color_id">
                    <option :key="color.id" :value="color.id" v-for="color in colors">{{ color.color_name }}</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-row">
                <label>Variant Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.variant_image" id="variant_image">
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

export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    ckeditor: CKEditor.component,
    Layout,
  },
  name:'admin-create-variant',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://192.168.11.114:8001/api/product/')
        .then(({data}) => (this.products = data))
    axios.get('http://192.168.11.114:8001/api/size/')
        .then(({data}) => (this.sizes = data))
    axios.get('http://192.168.11.114:8001/api/color/')
        .then(({data}) => (this.colors = data))
    axios.get('http://192.168.11.114:8001/api/variant/')
        .then(({data}) => (this.variants = data))

  },

  data(){
    return {
      form:{
        sku_no: null,
        variant_quantity: null,
        product_id: null,
        size_id: null,
        color_id: null,
        variant_image: null,
      },
      errors:{},
      sizes:{},
      colors:{},
      products:{},
      variants:{},
    }
  },

  methods:{
    onFileSelected(event){
      let file = event.target.files[0];
      if(file.size > 20971520) {
        Notification.image_validation()
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.variant_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    variantInsert(){
      axios.post('http://192.168.11.114:8001/api/variant',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-variant-list'})
            Notification.success()
            this.form.sku_no = "";
            this.form.variant_quantity = "";
            this.form.variant_image = "";
            this.form.product_id = "";
            this.form.size_id = "";
            this.form.color_id = "";
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#variant_image{
  width: 50px;
  height: 50px;
}
</style>
