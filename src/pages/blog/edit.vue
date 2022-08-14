<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="blogUpdate" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="blogTitle">Blog Title</label>
                  <input type="text" v-model="form.blog_title" class="form-control" id="blogTitle">
                </div>
                <div class="form-group col-md-4">
                  <label for="blogSeq">Blog Seq Number</label>
                  <input type="number" min="1" v-model="form.blog_seq" class="form-control" id="blogSeq">
                </div>
                <div class="form-group col-md-4">
                  <label for="blogStatus">Blog Status</label>
                  <select id="blogStatus" class="form-control" v-model="form.blog_status">
                    <option :key="1" :value="1">Active</option>
                    <option :key="0" :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="blogDescription">Blog Description</label>
                <ckeditor :editor="editor" v-model="form.blog_description" class="form-control" id="blogDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Blog Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.blog_image" id="blog_image">
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
  name:'admin-edit-blog',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('http://172.16.1.66:8001/api/blog/'+id)
        .then(({data}) => (this.form = data))
        .catch()
  },

  data(){
    return {
      form:{
        blog_title: '',
        blog_seq: '',
        blog_status: '',
        blog_description: '',
        blog_image: '',
        new_blog_image: '',
      },
      errors:{},
      blogs:{},
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
          this.form.new_blog_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    blogUpdate(){
      let id = this.$route.params.id
      axios.patch('http://172.16.1.66:8001/api/blog/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-blog-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#blog_image{
  width: 50px;
  height: 50px;
}
</style>
