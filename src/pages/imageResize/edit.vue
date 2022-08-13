<template>
  <Layout>
    <div>

      <div class="col-xl-12">
        <div class="card card-statistics">
          <div class="card-body">
            <form class="row g-3" @submit.prevent="imageResizeUpdate">
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="sliderImageWidth">Slider Image Width</label>
                  <input type="number" min="1" v-model="form.slider_image_width" class="form-control" id="sliderImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="sliderImageHeight">Slider Image Height</label>
                  <input type="number" min="1" v-model="form.slider_image_height" class="form-control" id="sliderImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="blogImageWidth">Blog Image Width</label>
                  <input type="number" min="1" v-model="form.blog_image_width" class="form-control" id="blogImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="blogImageHeight">Blog Image Height</label>
                  <input type="number" min="1" v-model="form.blog_image_height" class="form-control" id="blogImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="productImageWidth">Product Image Width</label>
                  <input type="number" min="1" v-model="form.product_image_width" class="form-control" id="productImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="productImageHeight">Product Image Height</label>
                  <input type="number" min="1" v-model="form.product_image_height" class="form-control" id="productImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="aboutUsImageWidth">About Us Image Width</label>
                  <input type="number" min="1" v-model="form.about_us_image_width" class="form-control" id="aboutUsImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="aboutUsImageHeight">About Us Image Height</label>
                  <input type="number" min="1" v-model="form.about_us_image_height" class="form-control" id="aboutUsImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="serviceImageWidth">Service Image Width</label>
                  <input type="number" min="1" v-model="form.service_image_width" class="form-control" id="serviceImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="serviceImageHeight">Service Image Height</label>
                  <input type="number" min="1" v-model="form.service_image_height" class="form-control" id="serviceImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamImageWidth">Team Image Width</label>
                  <input type="number" min="1" v-model="form.team_image_width" class="form-control" id="teamImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="teamImageHeight">Team Image Height</label>
                  <input type="number" min="1" v-model="form.team_image_height" class="form-control" id="teamImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="projectImageWidth">Project Image Width</label>
                  <input type="number" min="1" v-model="form.project_image_width" class="form-control" id="projectImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="projectImageHeight">Project Image Height</label>
                  <input type="number" min="1" v-model="form.project_image_height" class="form-control" id="projectImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="referanceImageWidth">Referance Image Width</label>
                  <input type="number" min="1" v-model="form.referance_image_width" class="form-control" id="referanceImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="referanceImageHeight">Referance Image Height</label>
                  <input type="number" min="1" v-model="form.referance_image_height" class="form-control" id="referanceImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="adminImageWidth">Admin Image Width</label>
                  <input type="number" min="1" v-model="form.admin_image_width" class="form-control" id="adminImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="adminImageHeight">Admin Image Height</label>
                  <input type="number" min="1" v-model="form.admin_image_height" class="form-control" id="adminImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="noteImageWidth">Note Image Width</label>
                  <input type="number" min="1" v-model="form.note_image_width" class="form-control" id="noteImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="noteImageHeight">Note Image Height</label>
                  <input type="number" min="1" v-model="form.note_image_height" class="form-control" id="noteImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="webSiteImageWidth">Web Site Settings Image Width</label>
                  <input type="number" min="1" v-model="form.website_settings_image_width" class="form-control" id="webSiteImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="webSiteImageHeight">Web Site Settings Image Height</label>
                  <input type="number" min="1" v-model="form.website_settings_image_height" class="form-control" id="webSiteImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="panelImageWidth">Panel Settings Image Width</label>
                  <input type="number" min="1" v-model="form.panel_settings_image_width" class="form-control" id="panelImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="panelImageHeight">Panel Settings Image Height</label>
                  <input type="number" min="1" v-model="form.panel_settings_image_height" class="form-control" id="panelImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="orderTrackingImageWidth">Order Tracking Status Image Width</label>
                  <input type="number" min="1" v-model="form.order_tracking_status_image_width" class="form-control" id="orderTrackingImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="orderTrackingImageHeight">Order Tracking Status Image Height</label>
                  <input type="number" min="1" v-model="form.order_tracking_status_image_height" class="form-control" id="orderTrackingImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="employeeImageWidth">Employee Image Width</label>
                  <input type="number" min="1" v-model="form.employee_image_width" class="form-control" id="employeeImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="employeeImageHeight">Employee Image Height</label>
                  <input type="number" min="1" v-model="form.employee_image_height" class="form-control" id="employeeImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="campaignImageWidth">Campaign Image Width</label>
                  <input type="number" min="1" v-model="form.campaign_image_width" class="form-control" id="campaignImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="campaignImageHeight">Campaign Image Height</label>
                  <input type="number" min="1" v-model="form.campaign_image_height" class="form-control" id="campaignImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="shippingCompanyImageWidth">Shipping Company Image Width</label>
                  <input type="number" min="1" v-model="form.shipping_company_image_width" class="form-control" id="shippingCompanyImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="shippingCompanyImageHeight">Shipping Company Image Height</label>
                  <input type="number" min="1" v-model="form.shipping_company_image_height" class="form-control" id="shippingCompanyImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="variantImageWidth">Variant Image Width</label>
                  <input type="number" min="1" v-model="form.variant_image_width" class="form-control" id="variantImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="variantImageHeight">Variant Image Height</label>
                  <input type="number" min="1" v-model="form.variant_image_height" class="form-control" id="variantImageHeight">
                </div>
                <div class="form-group col-md-3">
                  <label for="commentImageWidth">Comment Image Width</label>
                  <input type="number" min="1" v-model="form.comment_image_width" class="form-control" id="commentImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="commentImageHeight">Comment Image Height</label>
                  <input type="number" min="1" v-model="form.comment_image_height" class="form-control" id="commentImageHeight">
                </div>
              </div>
              <br>
              <div class="form-row">
                <div class="form-group col-md-3">
                  <label for="collectionImageWidth">Collection Image Width</label>
                  <input type="number" min="1" v-model="form.collection_image_width" class="form-control" id="collectionImageWidth">
                </div>
                <div class="form-group col-md-3">
                  <label for="collectionImageHeight">Collection Image Height</label>
                  <input type="number" min="1" v-model="form.collection_image_height" class="form-control" id="collectionImageHeight">
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

export default {
  components:{
    // eslint-disable-next-line vue/no-unused-components
    ckeditor: CKEditor.component,
    Layout,
  },
  name:'admin-create-project',
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    this.imageResize()
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.imageResize()
    })
  },

  data(){
    return {
      form:{
        slider_image_width: '',
        slider_image_height: '',
        blog_image_width: '',
        blog_image_height: '',
        product_image_width: '',
        product_image_height: '',
        about_us_image_width: '',
        about_us_image_height: '',
        service_image_width: '',
        service_image_height: '',
        team_image_width: '',
        team_image_height: '',
        project_image_width: '',
        project_image_height: '',
        referance_image_width: '',
        referance_image_height: '',
        admin_image_width: '',
        admin_image_height: '',
        note_image_width: '',
        note_image_height: '',
        website_settings_image_width: '',
        website_settings_image_height: '',
        panel_settings_image_width: '',
        panel_settings_image_height: '',
        order_tracking_status_image_width: '',
        order_tracking_status_image_height: '',
        employee_image_width: '',
        employee_image_height: '',
        campaign_image_width: '',
        campaign_image_height: '',
        shipping_company_image_width: '',
        shipping_company_image_height: '',
        variant_image_width: '',
        variant_image_height: '',
        comment_image_width: '',
        comment_image_height: '',
        collection_image_width: '',
        collection_image_height: '',
      },
      errors:{},
    }
  },

  methods:{
    imageResize(){
      let id = 0
      axios.get('http://192.168.11.114:8001/api/image-resize/'+id)
          .then(({data}) => (this.form = data))
          .catch()
    },
    imageResizeUpdate(){
      // let id = this.$route.params.id
      axios.post('http://192.168.11.114:8001/api/image-resize/',this.form)
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

</style>
