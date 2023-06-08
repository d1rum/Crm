<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="teamUpdate" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="teamName">Team Name</label>
                  <input type="text" v-model="form.team_name" class="form-control" id="teamName">
                </div>
                <div class="form-group col-md-4">
                  <label for="teamSurname">Team Surname</label>
                  <input type="text" min="1" v-model="form.team_surname" class="form-control" id="teamSurname">
                </div>
                <div class="form-group col-md-4">
                  <label for="teamSeq">Team Seq Number</label>
                  <input type="number" min="1" v-model="form.team_seq" class="form-control" id="teamSeq">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="teamPhone">Team Phone</label>
                  <input type="text" v-model="form.team_phone" class="form-control" id="teamPhone">
                </div>
                <div class="form-group col-md-4">
                  <label for="teamFax">Team Fax</label>
                  <input type="text" min="1" v-model="form.team_fax" class="form-control" id="teamFax">
                </div>
                <div class="form-group col-md-4">
                  <label for="teamEmail">Team Email</label>
                  <input type="email" min="1" v-model="form.team_email" class="form-control" id="teamEmail">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="teamPosition">Team Position</label>
                  <input type="text" v-model="form.team_position" class="form-control" id="teamPosition">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamExperience">Team Experience</label>
                  <input type="text" min="1" v-model="form.team_experience" class="form-control" id="teamExperience">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamPracticeArea">Team Practice Area</label>
                  <input type="text" min="1" v-model="form.team_practice_area" class="form-control" id="teamPracticeArea">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamJob">Team Job</label>
                  <input type="text" min="1" v-model="form.team_job" class="form-control" id="teamJob">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="teamFacebook">Team Facebook</label>
                  <input type="text" v-model="form.team_facebook" class="form-control" id="teamFacebook">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamTwitter">Team Twitter</label>
                  <input type="text" min="1" v-model="form.team_twitter" class="form-control" id="teamTwitter">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamLinkedin">Team Linkedin</label>
                  <input type="text" min="1" v-model="form.team_linkedin" class="form-control" id="teamLinkedin">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamInstagram">Team Instagram</label>
                  <input type="text" min="1" v-model="form.team_instagram" class="form-control" id="teamInstagram">
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="teamLocation">Team Location</label>
                <ckeditor :editor="editor" v-model="form.team_location" class="form-control" id="teamLocation"></ckeditor>
              </div>
              <br>
              <div class="form-group">
                <label for="teamDescription">Team Description</label>
                <ckeditor :editor="editor" v-model="form.team_description" class="form-control" id="teamDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Team Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.team_image" id="team_photo">
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
  name:'admin-create-team',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    let id = this.$route.params.id
    axios.get('team/'+id)
        .then(({data}) => (this.form = data))
        .catch()
  },

  data(){
    return {
      form:{
        team_name: '',
        team_surname: '',
        team_seq: '',
        team_phone: '',
        team_fax: '',
        team_email: '',
        team_position: '',
        team_experience: '',
        team_practice_area: '',
        team_job: '',
        team_location: '',
        team_facebook: '',
        team_twitter: '',
        team_linkedin: '',
        team_instagram: '',
        team_description: '',
        team_image: '',
        new_team_image: '',
      },
      errors:{},
      teams:{},
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
          this.form.new_team_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    teamUpdate(){
      let id = this.$route.params.id
      axios.patch('team/'+id,this.form)
          .then(() => {
            this.$router.push({ name: 'admin-team-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#team_photo{
  height: 50px;
  width: 50px;
}
</style>
