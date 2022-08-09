<template>
<Layout>
  <div>

    <div class="col-xl-12">
      <div class="card card-statistics">
        <div class="card-body">
          <form @submit.prevent="sliderInsert" enctype="multipart/form-data">
            <div class="form-row">
              <div class="form-group col-md-4">
                <label for="sliderTitle">Slider Title</label>
                <input type="text" v-model="form.slider_title" class="form-control" id="sliderTitle">
              </div>
              <div class="form-group col-md-4">
                <label for="sliderSeq">Slider Seq Number</label>
                <input type="number" min="1" v-model="form.slider_seq" class="form-control" id="sliderSeq">
              </div>
              <div class="form-group col-md-4">
                <label for="sliderStatus">Slider Status</label>
                <select id="sliderStatus" class="form-control" v-model="form.slider_status">
                  <option :value="1">Active</option>
                  <option :value="0">Passive</option>
                </select>
              </div>
            </div>
            <br>
            <div class="form-group">
              <label for="sliderDescription">Slider Description</label>
              <ckeditor :editor="editor" v-model="form.slider_description" class="form-control" id="sliderDescription"></ckeditor>
            </div>
            <br>
            <div class="form-row">
              <label>Slider Image</label>
              <div class="col-md-8 input-group">
                <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                <label class="input-group-text" for="inputGroupFile02">Upload</label>
              </div>
              <br><br>
              <div class="form-group col-md-2">
                <img :src="form.slider_image" style="height: 50px; width: 50px;">
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
  name:'admin-create-slider',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://192.168.1.233:8001/api/slider/')
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
          this.form.slider_image = event.target.result
          // eslint-disable-next-line no-console
          console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    sliderInsert(){
      axios.post('http://192.168.1.233:8001/api/slider',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-slider-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>

</style>
