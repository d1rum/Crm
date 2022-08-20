<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="sliderUpdate" enctype="multipart/form-data">
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
  name:'admin-edit-slider',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    // eslint-disable-next-line no-console
    console.log(id);
<<<<<<< Updated upstream
    axios.get('http://192.168.1.233:8001/api/slider/'+id)
=======
    axios.get('http://192.168.43.131:8001/api/slider/'+id)
>>>>>>> Stashed changes
        .then(({data}) => (this.form = data))
        // eslint-disable-next-line no-console
        .catch()
  },

  data(){
    return {
      form:{
        slider_title: '',
        slider_status: '',
        slider_description: '',
        slider_seq: '',
        slider_image: '',
        new_slider_image: '',
      },
      errors:{},
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
          this.form.new_slider_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    sliderUpdate(){
      let id = this.$route.params.id
<<<<<<< Updated upstream
      axios.patch('http://192.168.1.233:8001/api/slider/'+id,this.form)
=======
      axios.patch('http://192.168.43.131:8001/api/slider/'+id,this.form)
>>>>>>> Stashed changes
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
