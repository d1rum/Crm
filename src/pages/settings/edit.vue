<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form class="row g-3" @submit.prevent="panelSettingsUpdate" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="settingsTitle">Title</label>
                  <input type="text" v-model="form.title" class="form-control" id="settingsTitle">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsEmail">Email</label>
                  <input type="email" v-model="form.email" class="form-control" id="settingsEmail">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsPhone">Phone</label>
                  <input type="text" v-model="form.phone" class="form-control" id="settingsPhone">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsFax">Fax</label>
                  <input type="text" v-model="form.fax" class="form-control" id="settingsFax">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="settingsFacebook">Facebook</label>
                  <input type="text" v-model="form.facebook" class="form-control" id="settingsFacebook">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsTwitter">Twitter</label>
                  <input type="text" v-model="form.twitter" class="form-control" id="settingsTwitter">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsYoutube">Youtube</label>
                  <input type="text" v-model="form.youtube" class="form-control" id="settingsYoutube">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsInstagram">Instagram</label>
                  <input type="text" v-model="form.instagram" class="form-control" id="settingsInstagram">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="settingsLinkedin">Linkedin</label>
                  <input type="text" v-model="form.linkedin" class="form-control" id="settingsLinkedin">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsCountry">Country</label>
                  <input type="text" v-model="form.country" class="form-control" id="settingsCountry">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsCity">City</label>
                  <input type="text" v-model="form.city" class="form-control" id="settingsCity">
                </div>
                <div class="form-group col-md-3">
                  <label for="settingsZipCode">Zip Code</label>
                  <input type="text" v-model="form.zipcode" class="form-control" id="settingsZipCode">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="settingsDescription">Description</label>
                  <ckeditor :editor="editor" v-model="form.description" class="form-control" id="settingsDescription"></ckeditor>
                </div>
                <div class="form-group col-md-6">
                  <label for="settingsAddress">Address</label>
                  <ckeditor :editor="editor" v-model="form.address" class="form-control" id="settingsAddress"></ckeditor>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="settingsCopyRight">Copy Right</label>
                <input type="text" v-model="form.copyright" class="form-control" id="settingsCopyRight">
              </div>
              <div class="form-group">
                <label for="settingsTax">Tax</label>
                <input type="number" min="0" v-model="form.tax" class="form-control" id="settingsTax">
              </div>
              <br>
              <div class="form-row">
                <label>Settings Logo</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.panel_image" id="settings_logo">
                </div>
              </div>
              <br>
              <div class="form-row">
                <label>Settings Icon</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelectedIcon" class="form-control" id="inputGroupFile03">
                  <label class="input-group-text" for="inputGroupFile03">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.panel_icon_image" id="settings_icon">
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
  name:'admin-edit-setting',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    this.panelSettings()
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.panelSettings()
    })
  },

  data(){
    return {
      form:{
        title: '',
        email: '',
        phone: '',
        fax: '',
        description: '',
        address: '',
        country: '',
        city: '',
        zipcode: '',
        copyright: '',
        facebook: '',
        twitter: '',
        youtube: '',
        instagram: '',
        linkedin: '',
        panel_image: '',
        panel_icon_image: '',
        new_panel_image: '',
        new_panel_icon_image: '',
        tax: '',
      },
      errors:{},
      editor: ClassicEditor,
    }
  },

  methods:{
    panelSettings(){
      let id = 0;
      axios.get('http://172.16.2.186:8001/api/panel-settings/'+id)
          .then(({data}) => (this.form = data))
          .catch()
    },
    onFileSelected(event){
      let file = event.target.files[0];
      if(file.size > 20971520) {
        Notification.image_validation()
      } else {
        let reader = new FileReader();
        reader.onload = event => {
          this.form.new_panel_image = event.target.result
        };
        reader.readAsDataURL(file);
      }
    },
    onFileSelectedIcon(e){
      let fileIcon = e.target.files[0];
      if(fileIcon.size > 20971520) {
        Notification.image_validation()
      } else {
        let readerIcon = new FileReader();
        readerIcon.onload = e => {
          this.form.new_panel_icon_image = e.target.result
        };
        readerIcon.readAsDataURL(fileIcon);
      }
    },
    panelSettingsUpdate(){
      axios.post('http://172.16.2.186:8001/api/panel-settings/',this.form)
          .then(() => {
            this.$router.push({ name: 'admin'})
            // eslint-disable-next-line no-undef
            Reload.$emit('AfterStatus');
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#settings_logo{
  width: 50px;
  height: 50px;
}
#settings_icon{
  width: 50px;
  height: 50px;
}
</style>
