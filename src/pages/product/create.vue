<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="productInsert" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="productName">Product Name</label>
                  <input type="text" v-model="form.product_name" class="form-control" id="productName">
                </div>
                <div class="form-group col-md-3">
                  <label for="productCode">Product Code</label>
                  <input type="text" v-model="form.product_code" class="form-control" id="productCode">
                </div>
                <div class="form-group col-md-3">
                  <label for="productStatus">Product Status</label>
                  <select id="productStatus" class="form-control" v-model="form.product_status">
                    <option :key="1" :value="1">Active</option>
                    <option :key="0" :value="0">Passive</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="productUnit">Unit</label>
                  <select id="productUnit" class="form-control" v-model="form.unit_id">
                    <option :key="unit.id" :value="unit.id" v-for="unit in units">{{ unit.unit_name }}</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="productCategory">Category</label>
                  <select @change="switchCategorySelect($event)" id="productCategory" class="form-control" v-model="form.category_id">
                    <option :key="category.id" :value="category.id" v-for="category in categories">{{ category.category_name }}</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="productSubCategory">Sub Category</label>
                  <select id="productSubCategory" class="form-control" v-model="form.subcategory_id">
                    <option :key="subcategory.id" :value="subcategory.id" v-for="subcategory in getSubCategories">{{ subcategory.subcategory_name }}</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="productCollection">Collection</label>
                  <select id="productCollection" class="form-control" v-model="form.collection_id">
                    <option :key="collection.id" :value="collection.id" v-for="collection in collections">{{ collection.collection_title }}</option>
                  </select>
                </div>
                <div class="form-group col-md-3">
                  <label for="productSupplier">Supplier</label>
                  <select id="productSupplier" class="form-control" v-model="form.supplier_id">
                    <option :key="supplier.id" :value="supplier.id" v-for="supplier in suppliers">{{ supplier.supplier_name }} {{ supplier.supplier_surname }}</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="productWeight">Product Weight</label>
                  <input type="number" min="0" v-model="form.product_weight" class="form-control" id="productWeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="productLength">Product Length</label>
                  <input type="number" min="0" v-model="form.product_length" class="form-control" id="productLength">
                </div>
                <div class="form-group col-md-3">
                  <label for="productWidth">Product Width</label>
                  <input type="number" min="0" v-model="form.product_width" class="form-control" id="productWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="productHeight">Product Height</label>
                  <input type="number" min="0" v-model="form.product_height" class="form-control" id="productHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="productCapacity">Product Capacity</label>
                  <input type="number" min="0" v-model="form.product_capacity" class="form-control" id="productCapacity">
                </div>
                <div class="form-group col-md-3">
                  <label for="productQuantity">Product Quantity</label>
                  <input type="number" min="0" v-model="form.product_quantity" class="form-control" id="productQuantity">
                </div>
                <div class="form-group col-md-3">
                  <label for="productSellingPrice">Product Selling Price</label>
                  <input type="number" min="0" v-model="form.product_selling_price" class="form-control" id="productSellingPrice">
                </div>
                <div class="form-group col-md-3">
                  <label for="productDiscountPrice">Product Discount Price</label>
                  <input type="number" min="0" v-model="form.product_discount_price" class="form-control" id="productDiscountPrice">
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="productDescription">Product Description</label>
                <ckeditor :editor="editor" v-model="form.product_description" class="form-control" id="productDescription"></ckeditor>
              </div>
              <br>
              <div class="form-group">
                <label for="productMainWarehouse">Main Warehouse</label>
                <select id="productMainWarehouse" class="form-control" v-model="form.warehouse_id">
                  <option :key="mainWarehouse.id" :value="mainWarehouse.id">{{ mainWarehouse.warehouse_name }}</option>
                </select>
              </div>
              <br>
              <div class="form-group">
                <label for="productTax">Product Tax</label>
                <input type="number" min="0" v-model="form.product_tax" class="form-control" id="productTax">
              </div>
              <br>
              <div class="form-row">
                <label>Product Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.product_image" id="product_image">
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
  name:'admin-create-product',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://192.168.197.37:8001/api/category/')
        .then(({data}) => (this.categories = data))
    axios.get('http://192.168.197.37:8001/api/collection/')
        .then(({data}) => (this.collections = data))
    axios.get('http://192.168.197.37:8001/api/supplier/')
        .then(({data}) => (this.suppliers = data))
    axios.get('http://192.168.197.37:8001/api/unit/')
        .then(({data}) => (this.units = data))
    axios.get('http://192.168.197.37:8001/api/main-warehouse/')
        .then(({data}) => (this.mainWarehouse = data))
    axios.get('http://192.168.197.37:8001/api/product/')
        .then(({data}) => (this.products = data))

  },

  data(){
    return {
      form:{
        product_name: null,
        product_code: null,
        category_id: null,
        subcategory_id: null,
        collection_id: null,
        supplier_id: null,
        unit_id: null,
        warehouse_id: null,
        product_status: null,
        product_description: null,
        product_image: null,
        product_weight: null,
        product_length: null,
        product_width: null,
        product_height: null,
        product_capacity: null,
        product_quantity: null,
        product_selling_price: null,
        product_discount_price: null,
        product_tax: null,
      },
      errors:{},
      products:{},
      categories:{},
      collections:{},
      suppliers:{},
      mainWarehouse:{},
      units:{},
      getSubCategories:{},
      editor: ClassicEditor,
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
          this.form.product_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    switchCategorySelect(event){
      let id = event.target.value;
      if (id != null) {
        axios.get('http://192.168.197.37:8001/api/select-to-category/'+id)
            .then(({data}) => (this.getSubCategories = data))
            .catch()
      } else {
        Notification.selectCategory()
      }

    },
    productInsert(){
      axios.post('http://192.168.197.37:8001/api/product',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-product-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#product_image{
  width: 50px;
  height: 50px;
}
</style>
