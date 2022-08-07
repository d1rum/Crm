<template>
  <Layout>
    <div>
      <!-- begin row -->
      <div class="row">
        <div class="col-md-12 m-b-30">
          <!-- begin page title -->
          <div class="d-block d-sm-flex flex-nowrap align-items-center">
            <div class="page-title mb-2 mb-sm-0">
              <h1>Slider List</h1>
            </div>
            <div class="ml-auto d-flex align-items-center">
              <!--                        <nav>-->
              <!--                            <ol class="breadcrumb p-0 m-b-0">-->
              <!--                                <li class="breadcrumb-item">-->
              <!--                                    <router-link to="/home"><i class="ti ti-home"></i></router-link>-->
              <!--                                </li>-->
              <!--                                <li class="breadcrumb-item">-->
              <!--                                    List Admin-->
              <!--                                </li>-->
              <!--                                <li class="breadcrumb-item active text-primary" aria-current="page">Admins</li>-->
              <!--                            </ol>-->
              <!--                        </nav>-->
              <div class="ms-auto">
                <div class="btn-group">
                  <router-link to="/admin/create-slider"><button type="button" class="btn btn-primary">New Slider</button></router-link>
                </div>
              </div>
            </div>
          </div>
          <!-- end page title -->
        </div>
      </div>
      <!-- end row -->
      <!-- begin row -->
      <div class="row">
        <div class="col-lg-12">
          <div class="card card-statistics">
            <div class="card-body">
              <div class="datatable-wrapper table-responsive">
                <table id="nestable2" class="display compact table table-striped table-bordered">
                  <thead>
                  <tr>
                    <th>Slider Image</th>
                    <th>Slider Title</th>
                    <th>Slider Status</th>
                    <th>Slider Description</th>
                    <th>Actions</th>
                  </tr>
                  </thead>
                  <tbody id="sortableSlider">
                  <tr v-for="slider in sliders" :key="slider.id" v-bind:id="'item-'+slider.id">
                    <td><img :src="slider.slider_image" id="slider_photo" alt=""></td>
                    <td class="sortableSlider">{{ slider.slider_title }}</td>
                    <td v-if="slider.slider_status == '1'"><span class="badge badge-success">Active</span></td>
                    <td v-else-if="slider.slider_status == '0'"><span class="badge badge-danger">Passive</span></td>
                    <td>{{ slider.slider_description.substring(0,30) }}</td>
                    <td>
                      <router-link :to="{ name: 'edit-slider',params:{id:slider.id}}" class="btn btn-sm btn-dark">Edit</router-link>
                      <a @click="deleteSlider(slider.id)" style="color: white;" class="btn btn-sm btn-danger">Delete</a>
                    </td>
                  </tr>
                  </tbody>

                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- end row -->
    </div>

  </Layout>



</template>

<script>
import Layout from "../../router/layouts/main.vue";
import axios from "axios";

export default {
  components : {
    // eslint-disable-next-line vue/no-unused-components
    Layout
  },
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: '/admin/login'})
    }
    this.allSlider();
    // eslint-disable-next-line no-undef
    Reload.$on('AfterStatus',() => {
      this.allSlider()
    })
  },
  data(){
    return{
      sliders:[],
      searchTerm:''
    }
  },
  computed:{
    filtersearch(){
      return this.sliders.filter(slider => {
        return slider.slider_title.match(this.searchTerm)

      })
    }
  },
  methods:{
    allSlider(){
      axios.get('http://127.0.0.1:8001/api/slider')
          .then(({data}) => (this.sliders = data))
          .catch()
    },
    // deleteSlider(id){
    //   // eslint-disable-next-line no-undef
    //   Swal.fire({
    //     title: 'Are you sure?',
    //     text: "You won't be able to revert this!",
    //     icon: 'warning',
    //     showCancelButton: true,
    //     confirmButtonColor: '#3085d6',
    //     cancelButtonColor: '#d33',
    //     confirmButtonText: 'Yes, delete it!'
    //   }).then((result) => {
    //     if (result.value) {
    //       axios.delete('/api/slider/'+id)
    //           .then(() => {
    //             this.sliders = this.sliders.filter(slider => {
    //               return slider.id !== id
    //             })
    //           })
    //           .catch(() => {
    //             this.$router.push({name: 'slider'})
    //           })
    //       // eslint-disable-next-line no-undef
    //       Swal.fire(
    //           'Deleted!',
    //           'Your file has been deleted.',
    //           'success'
    //       )
    //     }
    //   })
    //
    // },
  },


}
</script>

<style scoped>
#slider_photo{
  height: 40px;
  width: 40px;
}
</style>
