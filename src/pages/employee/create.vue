<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form @submit.prevent="employeeInsert" enctype="multipart/form-data">
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="employeeCode">Employee Code</label>
                  <input type="text" v-model="form.employee_code" class="form-control" id="employeeCode">
                </div>
                <div class="form-group col-md-4">
                  <label for="employeeName">Employee Name</label>
                  <input type="text" v-model="form.employee_name" class="form-control" id="employeeName">
                </div>
                <div class="form-group col-md-4">
                  <label for="employeeSurname">Employee Surname</label>
                  <input type="text" v-model="form.employee_surname" class="form-control" id="employeeSurname">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="employeePhone">Employee Phone</label>
                  <input type="text" v-model="form.employee_phone" class="form-control" id="employeePhone">
                </div>
                <div class="form-group col-md-4">
                  <label for="employeeEmail">Employee Email</label>
                  <input type="email" v-model="form.employee_email" class="form-control" id="employeeEmail">
                </div>
                <div class="form-group col-md-4">
                  <label for="employeeJob">Employee Job</label>
                  <input type="text" v-model="form.employee_job" class="form-control" id="employeeJob">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-4">
                  <label for="employeePosition">Employee Position</label>
                  <input type="text" v-model="form.employee_position" class="form-control" id="employeePosition">
                </div>
                <div class="form-group col-md-4">
                  <label for="employeeExperience">Employee Experience</label>
                  <input type="text" v-model="form.employee_experience" class="form-control" id="employeeExperience">
                </div>
                <div class="form-group col-md-4">
                  <label for="employeePracticeArea">Employee Practice Area</label>
                  <input type="text" v-model="form.employee_practice_area" class="form-control" id="employeePracticeArea">
                </div>
              </div>
              <br>
              <div class="form-group">
                <label for="employeeLocation">Employee Location</label>
                <ckeditor :editor="editor" v-model="form.employee_location" class="form-control" id="employeeLocation"></ckeditor>
              </div>
              <br>
              <div class="form-group">
                <label for="employeeDescription">Employee Description</label>
                <ckeditor :editor="editor" v-model="form.employee_description" class="form-control" id="employeeDescription"></ckeditor>
              </div>
              <br>
              <div class="form-row">
                <label>Employee Image</label>
                <div class="col-md-8 input-group">
                  <input type="file" @change="onFileSelected" class="form-control" id="inputGroupFile02">
                  <label class="input-group-text" for="inputGroupFile02">Upload</label>
                </div>
                <br><br>
                <div class="form-group col-md-2">
                  <img :src="form.employee_image" id="employee_image">
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
  name:'admin-create-employee',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    axios.get('http://192.168.197.37:8001/api/employee/')
        .then(({data}) => (this.employees = data))
  },

  data(){
    return {
      form:{
        employee_code: null,
        employee_name: null,
        employee_surname: null,
        employee_phone: null,
        employee_email: null,
        employee_position: null,
        employee_experience: null,
        employee_practice_area: null,
        employee_job: null,
        employee_location: null,
        employee_description: null,
        employee_image: null,
      },
      errors:{},
      employees:{},
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
          this.form.employee_image = event.target.result
          // eslint-disable-next-line no-console
          // console.log(event.target.result);
        };
        reader.readAsDataURL(file);
      }
    },
    employeeInsert(){
      axios.post('http://192.168.197.37:8001/api/employee',this.form)
          .then(() => {
            this.$router.push({ name: 'admin-employee-list'})
            Notification.success()
          })
          .catch(error => this.errors = error.response.data.errors)
    }
  }
}
</script>
<style scoped>
#employee_image{
  width: 50px;
  height: 50px;
}
</style>
