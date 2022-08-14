<template>
  <Layout>
    <div>
      <!-- Container-fluid starts-->
<!--      <div class="container-fluid">-->
<!--        <div class="row">-->
<!--          <div class="col-md-12">-->
<!--            <div class="card">-->
<!--              <div class="card-header">-->
<!--                  <h3 class="text-center">Tables</h3>-->
<!--              </div>-->
<!--              <div class="card-body">-->
<!--                <form class="row g-3" @submit.prevent="backup">-->
<!--                  <div class="col-md-3" :key="table.id" v-for="table in tables">-->
<!--                    <div class="form-check col-md-3">-->
<!--                      <input-->
<!--                          class="form-check-input"-->
<!--                          type="checkbox"-->
<!--                          id="invalidCheck"-->
<!--                          v-model="form.backup[table.Tables_in_new_vue_building]"-->
<!--                      />-->
<!--                      <label class="form-check-label" for="invalidCheck">-->
<!--                        {{ table.Tables_in_new_vue_building }}-->
<!--                      </label>-->
<!--                    </div>-->
<!--                  </div>-->
<!--                  <div class="col-12">-->
<!--                    <button type="submit" class="btn btn-primary col-xl-12">Start</button>-->
<!--                  </div>-->
<!--                </form>-->
<!--              </div>-->

<!--            </div>-->
<!--          </div>-->

<!--        </div>-->
<!--      </div>-->
      <!-- Container-fluid Ends-->
    </div>
  </Layout>

</template>

<script>
import Layout from "../../router/layouts/main.vue";
import axios from "axios";

export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Layout, },
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://172.16.1.66:8001/api/backup/')
        .then(({data}) => (this.tables = data))

  },
  data(){
    return{
      form:{
        backup:[]
      },
      errors:{},
      tables:{},
    }
  },
  computed:{

  },
  mounted() {

  },
  methods:{

  },


}
</script>

<style scoped>

</style>
