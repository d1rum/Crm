<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="campaignInsert" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="campaignTitle">Campaign Title</label>
                  <input type="text" v-model="form.campaign_title" class="form-control" id="campaignTitle">
                </div>
                <div class="form-group col-md-3">
                  <label for="campaignCode">Campaign Code</label>
                  <input type="text" v-model="form.campaign_code" class="form-control" id="campaignCode">
                </div>
                <div class="form-group col-md-3">
                  <label for="campaignSeq">Campaign Seq Number</label>
                  <input type="number" min="1" v-model="form.campaign_seq" class="form-control" id="campaignSeq">
                </div>
                <div class="form-group col-md-3">
                  <label for="campaignStatus">Campaign Status</label>
                  <select id="campaignStatus" class="form-control" v-model="form.campaign_status">
                    <option :value="1">Active</option>
                    <option :value="0">Passive</option>
                  </select>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="campaignUrl">Campaign Url</label>
                <input type="text" v-model="form.campaign_url" class="form-control" id="campaignUrl">
              </div>
              <br>
              <div class="form-group">
                <label for="campaignDescription">Campaign Description</label>
                <ckeditor :editor="editor" v-model="form.campaign_description" class="form-control" id="campaignDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Campaign Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.campaign_image" id="campaign_image">
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
  name:'admin-create-campaign',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://192.168.11.114:8001/api/campaign/')
        .then(({data}) => (this.campaigns = data))
  },

  data(){
    return {
      form:{
        campaign_code: null,
        campaign_title: null,
        campaign_url: null,
        campaign_seq: null,
        campaign_status: null,
        campaign_description: null,
        campaign_image: null,
      },
      errors:{},
      campaigns:{},
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
          this.form.campaign_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    campaignInsert(){
      axios.post('http://192.168.11.114:8001/api/campaign',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-campaign-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#campaign_image{
  width: 50px;
  height: 50px;
}
</style>
