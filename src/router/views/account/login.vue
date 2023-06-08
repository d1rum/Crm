<template>
  <div class="account-pages my-5 pt-5">
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-md-8 col-lg-6 col-xl-4">
          <div class="card overflow-hidden">
            <div class="bg-primary">
              <div class="text-primary text-center p-4">
                <h5 class="text-white font-size-20">Welcome Back !</h5>
                <p class="text-white-50">Sign in to continue to Veltrix.</p>
                <a href="/" class="logo logo-admin">
                  <img
                    src="@/assets/images/logo-sm.png"
                    height="24"
                    alt="logo"
                  />
                </a>
              </div>
            </div>
            <div class="card-body p-4">
              <div class="p-3">
                <b-form
                  class="form-horizontal mt-4" @submit.prevent="login">
                  <b-form-group
                    id="input-group-1"
                    label="Email"
                    label-for="input-1"
                    class="mb-3"
                    label-class="form-label"
                  >
                    <b-form-input
                      id="input-1"
                      v-model="form.email"
                      type="email"
                      placeholder="Enter email"
                    ></b-form-input>

                  </b-form-group>

                  <b-form-group
                    id="input-group-2"
                    label="Password"
                    label-for="input-2"
                    class="mb-3"
                    label-class="form-label"
                  >
                    <b-form-input
                      id="input-2"
                      v-model="form.password"
                      type="password"
                      placeholder="Enter password"
                    ></b-form-input>
                    <div
                      class="invalid-feedback"
                    >
                      Password is required.
                    </div>
                  </b-form-group>

                  <div class="form-group row">
                    <div class="col-sm-6">
                      <div class="form-check">
                        <input
                          type="checkbox"
                          class="form-check-input"
                          id="customControlInline"
                        />
                        <label
                          class="form-check-label"
                          for="customControlInline"
                          >Remember me</label
                        >
                      </div>
                    </div>
                    <div class="col-sm-6 text-end">
                      <b-button type="submit" variant="primary" class="w-md"
                        >Log In</b-button
                      >
                    </div>
                  </div>

                  <div class="mt-2 mb-0 row">
                    <div class="col-12 mt-4">
                      <router-link to="/forgot-password">
                        <i class="mdi mdi-lock"></i> Forgot your password?
                      </router-link>
                    </div>
                  </div>
                </b-form>
              </div>
            </div>
            <!-- end card-body -->
          </div>
          <!-- end card -->
          <div class="mt-5 text-center">
            <p>
              Don't have an account ?
              <router-link to="/register" class="fw-medium text-primary"
                >Signup now</router-link
              >
            </p>
            <p class="mb-0">
              ©
              {{ new Date().getFullYear() }} Veltrix. Crafted with
              <i class="mdi mdi-heart text-danger"></i> by Themesbrand
            </p>
          </div>
        </div>
        <!-- end col -->
      </div>
      <!-- end row -->
    </div>
  </div>
</template>


<script>
import User from "../../../helpers/authservice/User";
import axios from "axios";
// import axios from 'axios'

export default {
  created(){

    // if(User.loggedIn()){
    //   this.$router.push({name: 'home'})
    // }
  },

  data(){
    return {
      form:{
        email: null,
        password: null
      },
      errors:{}
    }
  },
  methods:{
    login(){
      axios.post('auth/admin/login',this.form)
          .then(res => {
            // eslint-disable-next-line no-console
            User.responseAfterLogin(res)
            this.$router.push({ name: 'admin' })
            // window.location.href = '/';
          })
          .catch(error => this.errors = error.response.data,
          )
    }
  }
}
</script>
<style lang="scss" module></style>
