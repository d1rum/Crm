<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form class="row g-3" @submit.prevent="websiteSettingsUpdate" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="siteTitle">Title</label>
                  <input type="text" v-model="form.title" class="form-control" id="siteTitle">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteEmail">Email</label>
                  <input type="email" v-model="form.email" class="form-control" id="siteEmail">
                </div>
                <div class="form-group col-md-3">
                  <label for="sitePhone">Phone</label>
                  <input type="text" v-model="form.phone" class="form-control" id="sitePhone">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteFax">Fax</label>
                  <input type="text" v-model="form.fax" class="form-control" id="siteFax">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="siteFacebook">Facebook</label>
                  <input type="text" v-model="form.facebook" class="form-control" id="siteFacebook">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteTwitter">Twitter</label>
                  <input type="text" v-model="form.twitter" class="form-control" id="siteTwitter">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteYoutube">Youtube</label>
                  <input type="text" v-model="form.youtube" class="form-control" id="siteYoutube">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteInstagram">Instagram</label>
                  <input type="text" v-model="form.instagram" class="form-control" id="siteInstagram">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="siteLinkedin">Linkedin</label>
                  <input type="text" v-model="form.linkedin" class="form-control" id="siteLinkedin">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteCountry">Country</label>
                  <input type="text" v-model="form.country" class="form-control" id="siteCountry">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteCity">City</label>
                  <input type="text" v-model="form.city" class="form-control" id="siteCity">
                </div>
                <div class="form-group col-md-3">
                  <label for="siteZipCode">Zip Code</label>
                  <input type="text" v-model="form.zipcode" class="form-control" id="siteZipCode">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="siteDescription">Description</label>
                  <ckeditor :editor="editor" v-model="form.description" class="form-control" id="siteDescription"></ckeditor>
                </div>
                <div class="form-group col-md-6">
                  <label for="siteAddress">Address</label>
                  <ckeditor :editor="editor" v-model="form.address" class="form-control" id="siteAddress"></ckeditor>
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-6">
                  <label for="sitePrivacy">Privacy & Policy</label>
                  <ckeditor :editor="editor" v-model="form.privacy_policy" class="form-control" id="sitePrivacy"></ckeditor>
                </div>
                <div class="form-group col-md-6">
                  <label for="siteTerms">Terms & Conditions</label>
                  <ckeditor :editor="editor" v-model="form.terms_conditions" class="form-control" id="siteTerms"></ckeditor>
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="siteCopyRight">Copy Right</label>
                <input type="text" v-model="form.copyright" class="form-control" id="siteCopyRight">
              </div>
              <br>
              <div class="form-group">
                <label for="siteTax">Tax</label>
                <input type="number" min="0" v-model="form.tax" class="form-control" id="siteTax">
              </div>
              <br>
              <div class="form-row">
                <label>Site Logo</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.website_image" id="site_logo">
                </div>
              </div>
              <br>
              <div class="form-row">
                <label>Site Icon</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelectedIcon" class="form-control" id="inputGroupFile03">
                  <label class="input-group-text" for="inputGroupFile03">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.website_icon_image" id="site_icon">
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
  name:'admin-edit-site-setting',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    this.webSiteSettings()
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.webSiteSettings()
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
        privacy_policy: '',
        terms_conditions: '',
        website_image: '',
        website_icon_image: '',
        new_website_image: '',
        new_website_icon_image: '',
        tax: '',
      },
      errors:{},
      editor: ClassicEditor,
    }
  },

  methods:{
    webSiteSettings(){
      let id = 0;
      axios.get('http://192.168.43.131:8001/api/website-settings/'+id)
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
          this.form.new_website_image = event.target.result
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
          this.form.new_website_icon_image = e.target.result
        };
        readerIcon.readAsDataURL(fileIcon);
      }
    },
    websiteSettingsUpdate(){
      axios.post('http://192.168.43.131:8001/api/website-settings/',this.form)
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
#site_logo{
  width: 50px;
  height: 50px;
}
#site_icon{
  width: 50px;
  height: 50px;
}
</style>
