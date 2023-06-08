<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="variantUpdate" enctype="multipart/form-data">
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
  name:'admin-edit-variant',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('variant/'+id)
        .then(({data}) => (this.form = data))
        .catch()
    axios.get('product/')
        .then(({data}) => (this.products = data))
    axios.get('size/')
        .then(({data}) => (this.sizes = data))
    axios.get('color/')
        .then(({data}) => (this.colors = data))

  },

  data(){
    return {
      form:{
        sku_no: '',
        variant_quantity: '',
        product_id: '',
        size_id: '',
        color_id: '',
        variant_image: '',
        new_variant_image: '',
      },
      errors:{},
      sizes:{},
      colors:{},
      products:{},
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
          this.form.new_variant_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    variantUpdate(){
      let id = this.$route.params.id
      axios.patch('variant/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-variant-list'})
            Notification.success()
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
