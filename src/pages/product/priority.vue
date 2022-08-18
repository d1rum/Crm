<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form class="row g-3" @submit.prevent="priorityProduct">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <div class="checkbox checbox-switch switch-success">
                    <label for="trend">Trend</label><br><br>
                    <switches v-model="form.trend" type-bold="false" id="trend" color="primary" class="ml-1 mb-0"></switches>
                  </div>
                </div>
                <div class="form-group col-md-3">
                  <div class="checkbox checbox-switch switch-success">
                    <label for="hotNew">Hot New</label><br><br>
                      <switches v-model="form.hot_new" type-bold="false" id="hotNew" color="primary" class="ml-1 mb-0"></switches>
                  </div>
                </div>
                <div class="form-group col-md-3">
                  <div class="checkbox checbox-switch switch-success">
                    <label for="bestSellers">Best Sellers</label><br><br>
                    <switches v-model="form.best_sellers" type-bold="false" id="bestSellers" color="primary" class="ml-1 mb-0"></switches>
                  </div>
                </div>
                <div class="form-group col-md-3">
                  <div class="checkbox checbox-switch switch-success">
                    <label for="featured">Featured</label><br><br>
                    <switches v-model="form.featured" type-bold="false" id="featured" color="primary" class="ml-1 mb-0"></switches>
                  </div>
                </div>
              </div>
              <div class="form-group col-md-12">
                <label for="priorityStatus">Status</label>
                <select id="priorityStatus" class="form-control" required v-model="form.status">
                  <option :value="1">Active</option>
                  <option :value="0">Passive</option>
                </select>
              </div>
              <!--                    <input type="hidden" v-model="form.product_id" :value="this.$route.params.id">-->
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
import Switches from "vue-switches";

export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    Switches,
    Layout,
  },
  name:'admin-create-product',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('http://172.16.2.186:8001/api/get-product-priority/'+id)
        .then(({data}) => (this.form = data))
        .catch()

  },

  data(){
    return {
      form:{
        trend: '',
        hot_new: '',
        best_sellers: '',
        featured: '',
        status: '',
      },
      errors:{},
    }
  },

  methods:{
    priorityProduct(){
      let id = this.$route.params.id
      axios.post('http://172.16.2.186:8001/api/product-priority/'+id,this.form)
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
</style>
