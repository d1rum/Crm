<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="collectionUpdate" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="collectionTitle">Collection Title</label>
                  <input type="text" v-model="form.collection_title" class="form-control" id="collectionTitle">
                </div>
                <div class="form-group col-md-6">
                  <label for="collectionCode">Collection Code</label>
                  <input type="text" v-model="form.collection_code" class="form-control" id="collectionCode">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="collectionSeq">Collection Seq Number</label>
                  <input type="number" min="1" v-model="form.collection_seq" class="form-control" id="collectionSeq">
                </div>
                <div class="form-group col-md-6">
                  <label for="collectionStatus">Collection Status</label>
                  <select id="collectionStatus" class="form-control" v-model="form.collection_status">
                    <option :value="1">Active</option>
                    <option :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="collectionDescription">Collection Description</label>
                <ckeditor :editor="editor" v-model="form.collection_description" class="form-control" id="collectionDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Collection Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.collection_image" id="collection_image">
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
  name:'admin-edit-collection',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('http://172.16.2.186:8001/api/collection/'+id)
        .then(({data}) => (this.form = data))
        .catch()
  },

  data(){
    return {
      form:{
        collection_code: '',
        collection_title: '',
        collection_seq: '',
        collection_status: '',
        collection_description: '',
        collection_image: '',
        new_blog_image: '',
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
          this.form.new_collection_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    collectionUpdate(){
      let id = this.$route.params.id
      axios.patch('http://172.16.2.186:8001/api/collection/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-collection-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    },
  }
}
</script>
<style scoped>
#collection_image{
  width: 50px;
  height: 50px;
}
</style>
