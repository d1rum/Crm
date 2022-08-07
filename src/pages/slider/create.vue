<template>
<Layout>
  <div>
    <!--breadcrumb-->
    <div class="page-breadcrumb d-none d-md-flex align-items-center mb-3">
      <div class="breadcrumb-title pe-3"><router-link to="/slider">Slider</router-link></div>
      <div class="ps-3">
        <nav aria-label="breadcrumb">
          <ol class="breadcrumb mb-0 p-0">
            <li class="breadcrumb-item"><router-link to="/home"><i class='bx bx-home-alt'></i></router-link>
            </li>
            <li class="breadcrumb-item active" aria-current="page">New Slider</li>
          </ol>
        </nav>
      </div>
    </div>
    <!--end breadcrumb-->
    <div class="col-xl-12">
      <div class="card card-statistics">
        <div class="card-body">
          <form @submit.prevent="sliderInsert" enctype="multipart/form-data">
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="inputEmail4">Slider Title</label>
                <input type="text" v-model="form.slider_title" class="form-control" id="inputEmail4" placeholder="Slider Title">
              </div>
              <div class="form-group col-md-4">
                <label for="inputEmail43">Slider Seq Number</label>
                <input type="number" min="1" v-model="form.slider_seq" class="form-control" id="inputEmail43">
              </div>
              <div class="form-group col-md-4">
                <label for="inputState">Slider Status</label>
                <select id="inputState" class="form-control" v-model="form.slider_status">
                  <option :value="1">Active</option>
                  <option :value="0">Passive</option>
                </select>
              </div>
            </div>
            <div class="form-group">
              <label for="inputAddress">Slider Description</label>
              <textarea id="inputAddress" class="form-control" v-model="form.slider_description" rows="3"></textarea>
            </div>
            <div class="form-row">
              <label>Slider Image</label>
              <div class="custom-file">
                <input type="file" @change="onFileSelected" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">Choose file</label>
              </div>
              <br><br>
              <div class="form-group col-md-2">
                <img :src="form.slider_image" style="height: 50px; width: 50px;">
              </div>
            </div>
            <button type="submit" class="btn btn-primary">Save</button>
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

export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    Layout,
  },
  name:'admin-slider-create',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
    axios.get('/api/slider/')
        .then(({data}) => (this.sliders = data))
  },

  data(){
    return {
      form:{
        slider_title: null,
        slider_status: null,
        slider_description: null,
        slider_image: null,
        slider_seq: null,
      },
      errors:{},
      sliders:{},
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
          this.form.slider_image = event.target.result
          // eslint-disable-next-line no-console
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    sliderInsert(){
      axios.post('/api/slider',this.form)
          .then(() => {
            this.$router.push({ name: 'slider'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>

</style>
