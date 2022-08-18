<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="projectInsert" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="projectTitle">Project Title</label>
                  <input type="text" v-model="form.project_title" class="form-control" id="projectTitle">
                </div>
                <div class="form-group col-md-4">
                  <label for="projectSeq">Project Seq Number</label>
                  <input type="number" min="1" v-model="form.project_seq" class="form-control" id="projectSeq">
                </div>
                <div class="form-group col-md-4">
                  <label for="projectStatus">Project Status</label>
                  <select id="projectStatus" class="form-control" v-model="form.project_status">
                    <option :value="1">Active</option>
                    <option :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="projectDescription">Project Description</label>
                <ckeditor :editor="editor" v-model="form.project_description" class="form-control" id="projectDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Project Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.project_image" id="project_image">
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
  name:'admin-create-project',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://172.16.2.186:8001/api/project/')
        .then(({data}) => (this.projects = data))
  },

  data(){
    return {
      form:{
        project_title: null,
        project_seq: null,
        project_status: null,
        project_description: null,
        project_image: null,
      },
      errors:{},
      projects:{},
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
          this.form.project_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    projectInsert(){
      axios.post('http://172.16.2.186:8001/api/project',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-project-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#project_image{
  width: 50px;
  height: 50px;
}
</style>
