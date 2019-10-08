<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :goods-item="item" class="goods-list" />
  </div>
</template>

<script>
  import GoodsListItem from "./GoodsListItem";


  export default {
    name: "GoodsList",
    components:{
      GoodsListItem
    },
    props: {
      goods:{
        type: Array,
        default(){
          return []
        }
      }
    }
  }
</script>

<style scoped>
  .goods{
    display: flex;
    padding: 5px;
    flex-wrap: wrap;
    justify-content: space-around;
  }
  .goods-list{
    width: 48%;
  }
</style>
