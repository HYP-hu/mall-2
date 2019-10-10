<template>
  <div id="detail">
    <detail-nav-bar></detail-nav-bar>
  </div>
</template>

<script>
  import DetailNavBar from "./childComps/DetailNavBar";
  import {getDeatil} from "network/detail";

  export default {
    name: "Detail",
    props:{
      id: {
        type: String
      }
    },
    components: {
      DetailNavBar
    },
    created() {
      // 1. 保存传入的id
      // this.id = this.$route.params.id
      // 2.根据id请求详情数据
      getDeatil(this.id).then(res=>{
        console.log(res);
      })
    }
  }
</script>

<style scoped>

</style>
