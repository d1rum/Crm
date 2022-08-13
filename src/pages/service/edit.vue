<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="serviceUpdate" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="serviceTitle">Service Title</label>
                  <input type="text" v-model="form.service_title" class="form-control" id="serviceTitle">
                </div>
                <div class="form-group col-md-4">
                  <label for="serviceSeq">Service Seq Number</label>
                  <input type="number" min="1" v-model="form.service_seq" class="form-control" id="serviceSeq">
                </div>
                <div class="form-group col-md-4">
                  <label for="serviceStatus">Service Status</label>
                  <select id="serviceStatus" class="form-control" v-model="form.service_status">
                    <option :value="1">Active</option>
                    <option :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="serviceDescription">Service Description</label>
                <ckeditor :editor="editor" v-model="form.service_description" class="form-control" id="serviceDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Service Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.service_image" id="service_image">
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
  name:'admin-edit-service',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('http://192.168.11.114:8001/api/service/'+id)
        .then(({data}) => (this.form = data))
        .catch()

  },

  data(){
    return {
      form:{
        service_title: '',
        service_seq: '',
        service_status: '',
        service_description: '',
        service_image: '',
        new_service_image: '',
      },
      errors:{},
      services:{},
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
          this.form.new_service_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    serviceUpdate(){
      let id = this.$route.params.id
      axios.patch('http://192.168.11.114:8001/api/service/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-service-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#service_image{
  width: 50px;
  height: 50px;
}
</style>
