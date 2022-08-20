<template>
<div></div>
</template>

<script>
export default {
<<<<<<< Updated upstream
  name: "edit"
=======
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
    axios.get('http://192.168.43.131:8001/api/category/')
        .then(({data}) => (this.categories = data))
    axios.get('http://192.168.43.131:8001/api/collection/')
        .then(({data}) => (this.collections = data))
    axios.get('http://192.168.43.131:8001/api/supplier/')
        .then(({data}) => (this.suppliers = data))
    axios.get('http://192.168.43.131:8001/api/unit/')
        .then(({data}) => (this.units = data))
    axios.get('http://192.168.43.131:8001/api/main-warehouse/')
        .then(({data}) => (this.mainWarehouse = data))
    let id = this.$route.params.id
    axios.get('http://192.168.43.131:8001/api/product/'+id)
        .then(({data}) => (this.form = data))
        .catch()

  },

  data(){
    return {
      form:{
        product_name: '',
        product_code: '',
        category_id: '',
        subcategory_id: '',
        collection_id: '',
        supplier_id: '',
        unit_id: '',
        warehouse_id: '',
        product_status: '',
        product_description: '',
        product_image: '',
        product_weight: '',
        product_length: '',
        product_width: '',
        product_height: '',
        product_capacity: '',
        product_quantity: '',
        product_selling_price: '',
        product_discount_price: '',
        new_product_image: '',
        product_tax: '',
      },
      subcategories:{},
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
          this.form.new_product_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    switchCategorySelect(event){
      let id = event.target.value;
      if (id != null) {
        axios.get('http://192.168.43.131:8001/api/select-to-category/'+id)
            .then(({data}) => (this.getSubCategories = data))
            .catch()
      } else {
        Notification.selectCategory()
      }

    },
    productUpdate(){
      let id = this.$route.params.id
      axios.patch('http://192.168.43.131:8001/api/product/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-product-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
>>>>>>> Stashed changes
}
</script>

<style scoped>

</style>