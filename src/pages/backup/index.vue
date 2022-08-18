<script src="../../../../../../Users/Huseyin Balin/Downloads/DirectionsRenderer.js"></script>
<template>
  <Layout>
    <div>

      <!-- Container-fluid starts-->
      <div class="container-fluid">
        <div class="row">
          <div class="col-md-12">
            <div class="card">
              <div class="card-header">
                  <h3 class="text-center" id="customHeader" data-text="Database Backup">Database Backup</h3>
              </div>
              <div class="card-body" id="customBackground">
                <div class="custom-container">
                    <div class="bar">
                      <div class="fill"></div>
                    </div>
                    <div class="counter">0%</div>
                    <button id="customLoad">Click to load</button>
                  </div>
                <div class="output">
                  <span class="fa fa-check"></span>
                  <div class="output-text">Database Backup Successful!</div>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      <!-- Container-fluid Ends-->
    </div>
  </Layout>

</template>

<script>
import Layout from "../../router/layouts/main.vue";
import axios from "axios";
import { FormWizard, TabContent } from "vue-form-wizard";



export default {
  // eslint-disable-next-line vue/no-unused-components
  components: { Layout,FormWizard,TabContent},
  created(){
    // eslint-disable-next-line no-undef
    if(!User.loggedIn()){
      this.$router.push({name: 'admin-login'})
    }
    // eslint-disable-next-line no-undef
    Reload.$on('AfterAdd',() => {
      this.show
    })

  },
  data(){
    return{
      form:{
        backups:[],
        show: false,
      },
      errors:{},
      tables:{},
      audio: "",
      audioFile: "",
    }
  },
  computed:{

  },
  mounted() {
    let container = document.querySelector(".custom-container");
    let output = document.querySelector(".output");
    let fill = document.querySelector(".fill");
    let click = document.querySelector("#customLoad");
    click.addEventListener('click',()=>{
      var a = 0;
      var run = setInterval(frames,50);
      function frames(){
        a = a+1;
        if (a === 101){
          clearInterval(run);
          axios.get('http://172.16.2.186:8001/api/backup')
              .then((res) => {
                if (res.data === true){
                  // eslint-disable-next-line no-undef
                  Reload.$emit('AfterAdd');
                  // this.show = true;
                }else{
                  // eslint-disable-next-line no-undef
                  Reload.$emit('AfterAdd');
                  // this.show = false;
                }
                container.style.display = "none";
                output.style.display = "block";
                this.audioFile = "/jarvis.m4a";
                this.audio = new Audio(this.audioFile);
                this.audio.play();

              })
              .catch()
        } else {
          var counter = document.querySelector(".counter");
          counter.textContent = a + "%";
          fill.style.width = a + "%";
        }
      }
    });
  },
  methods:{
    // backup(){
    //   axios.get('http://172.16.2.186:8001/api/backup')
    //       .then((res) => {
    //         if (res.data === true){
    //           // eslint-disable-next-line no-undef
    //           Reload.$emit('AfterAdd');
    //           this.show = true;
    //         }else{
    //           // eslint-disable-next-line no-undef
    //           Reload.$emit('AfterAdd');
    //           this.show = false;
    //         }
    //       })
    //
    //       .catch()
    // },
  },


}
</script>

<style scoped>
#customBackground{
  display: flex;
  min-height: 100vh;
  align-items: center;
  justify-content: center;
  background: #1b1919;
}
.custom-container{
  width: 70%;
  padding: 50px 0;
  background: #1b1919;
  box-shadow: 0 0 30px rgba(0,0,0,0.8);
  border-radius: 20px;
  text-align: center;
}
.bar{
  background: #b6b6b6;
  width: 90%;
  height: 50px;
  margin: 10px auto;
  border-radius: 50px;
  overflow: hidden;
}
.fill{
  height: 100%;
  width: 1%;
  background: linear-gradient(45deg,#00ccff,#d400d4);
}
.counter{
  font-size: 40px;
  font-family: monospace;
  font-weight: 800;
  color: #00ccff;
  padding: 5px 0;
}
#customLoad{
  text-transform: uppercase;
  font-size: 20px;
  font-weight: 800;
  font-family: monospace;
  color: #fff;
  background: #000;
  margin-top: 20px;
  padding: 5px 10px;
  cursor: pointer;
  outline: none;
  border: 2px solid #00ccff;
  border-radius: 50px;
}
.output{
  width: 50%;
  padding: 30px 0;
  background: #1b1919;
  border-radius: 5px;
  box-shadow: 0 0 30px rgba(0,0,0,0.8);
  text-align: center;
  display: none;
}
.output .fa-check{
  height: 150px;
  width: 150px;
  border: 5px solid #00ccff;
  line-height: 150px;
  border-radius: 50%;
  color: #00ccff;
  font-size: 85px;
  margin-bottom: 30px;
  animation: animate 1s ease;
}
@keyframes animate {
  0%{
    transform: translateY(60px) scale(0.7) rotate(0deg);
    opacity: 0.2;
  }
  50%{
    transform: scale(0.3) rotate(90deg) skewY(-40deg);
    width: 50px;
  }
  75%{
    transform: scale(1.4) rotate(180deg) skewY(20deg);
    width: 10px;
  }
  100%{
    transform: translateY(0px) scale(1) rotate(360deg);
    opacity: 1;
  }
}
.output-text{
  font-size: 40px;
  font-weight: 600;
  font-family: sans-serif;
  color: #00ccff;
  letter-spacing: 1px;
}
</style>
