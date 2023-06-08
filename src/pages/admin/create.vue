<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form class="row g-3" @submit.prevent="adminInsert" enctype="multipart/form-data">
              <div class="col-md-6">
                <label for="adminName" class="form-label">Name</label>
                <input type="text" required v-model="form.name" class="form-control" id="adminName">
              </div>
              <div class="col-md-6">
                <label for="adminSurname" class="form-label">Surname</label>
                <input type="text" required v-model="form.surname" class="form-control" id="adminSurname">
              </div>
              <div class="col-md-4">
                <label for="adminEmail" class="form-label">Email</label>
                <input type="email" required v-model="form.email" class="form-control" id="adminEmail">
              </div>
              <div class="col-md-4">
                <label for="adminPhone" class="form-label">Phone</label>
                <input type="text" required v-model="form.phone" class="form-control" id="adminPhone">
              </div>
              <div class="col-md-4">
                <label for="adminPassword" class="form-label">Password</label>
                <input type="password" required v-model="form.password" class="form-control" id="adminPassword">
              </div>
              <div class="col-md-3">
                <label for="adminCountry" class="form-label">Country</label>
                <input type="text" required v-model="form.country" class="form-control" id="adminCountry">
              </div>
              <div class="col-md-3">
                <label for="adminCity" class="form-label">City</label>
                <input type="text" required v-model="form.city" class="form-control" id="adminCity">
              </div>
              <div class="col-md-2">
                <label for="adminDistrict" class="form-label">District</label>
                <input type="text" required v-model="form.district" class="form-control" id="adminDistrict">
              </div>
              <div class="col-md-2">
                <label for="adminGender" class="form-label">Gender</label>
                <select id="adminGender" required class="form-select" v-model="form.gender">
                  <option selected="">Choose...</option>
                  <option :key="0" :value="0">Mr</option>
                  <option :key="1" :value="1">Mrs</option>
                </select>
              </div>
              <div class="col-md-2">
                <label for="adminRole" class="form-label">Role</label>
                <select id="adminRole" required class="form-select" v-model="form.role">
                  <option selected="">Choose...</option>
                  <option :key="role.id" :value="role.id" v-for="role in roles">{{ role.role }}</option>
                </select>
              </div>
              <div class="col-12">
                <label for="adminAddress" class="form-label">Address</label>
                <ckeditor :editor="editor" required v-model="form.address" class="form-control" id="adminAddress"></ckeditor>
              </div>
              <label>Admin Image</label>
              <div class="col-md-8 input-group">
                <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                <label class="input-group-text" for="inputGroupFile02">Upload</label>
              </div>
              <div class="col-md-4">
                <img :src="form.photo" id="admin_image">
              </div>
              <div class="col-12">
                <button type="submit" class="btn btn-primary col-xl-12">Save</button>
              </div>
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
  name:'admin-create',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('admin/role/')
        .then(({data}) => (this.roles = data))
  },

  data(){
    return {
      form:{
        name: null,
        surname: null,
        phone: null,
        email: null,
        password: null,
        country: null,
        city: null,
        district: null,
        gender: null,
        role: null,
        address: null,
        photo: null,
      },
      errors:{},
      roles:{},
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
          this.form.photo = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    adminInsert(){
      axios.post('admin',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#admin_image{
  width: 50px;
  height: 50px;
}
</style>
