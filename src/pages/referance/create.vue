<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="referanceInsert" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="referanceTitle">Referance Title</label>
                  <input type="text" v-model="form.referance_title" class="form-control" id="referanceTitle">
                </div>
                <div class="form-group col-md-4">
                  <label for="referanceSeq">Referance Seq Number</label>
                  <input type="number" min="1" v-model="form.referance_seq" class="form-control" id="referanceSeq">
                </div>
                <div class="form-group col-md-4">
                  <label for="referanceStatus">Referance Status</label>
                  <select id="referanceStatus" class="form-control" v-model="form.referance_status">
                    <option :value="1">Active</option>
                    <option :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="referanceDescription">Referance Description</label>
                <ckeditor :editor="editor" v-model="form.service_description" class="form-control" id="referanceDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Referance Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.referance_image" id="referance_image">
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
  name:'admin-create-referance',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('referance/')
        .then(({data}) => (this.referances = data))

  },

  data(){
    return {
      form:{
        referance_title: null,
        referance_seq: null,
        referance_status: null,
        referance_description: null,
        referance_image: null,
      },
      errors:{},
      referances:{},
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
          this.form.referance_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    referanceInsert(){
      axios.post('referance',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-referance-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#referance_image{
  width: 50px;
  height: 50px;
}
</style>
