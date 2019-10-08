<template>
  <div class="tab-control">
    <div v-for="(item, index) of titles"
         :class="{active: currentIndex === index}"
         class="tab-control-item"
         @click="tabClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
  export default {
    name: "TabControl",
    props: {
      titles: {
        default(){
          return []
        }
      }
    },
    data(){
      return {
        currentIndex: 0
      }
    },
    methods: {
      tabClick(index){
        this.currentIndex = index
        this.$emit('tabClick', index)
      },

    }
  }
</script>

<style scoped>
  .tab-control{
    display: flex;
    width: 100%;
    text-align: center;
    font-size: 14px;
    background-color: #fff;
  }

  .tab-control-item{
    flex: 1;
    height: 40px;
    line-height: 40px;
  }
  .tab-control span{
    padding: 5px;
  }

  .active span{
    color: var(--color-high-text);
    border-bottom: 3px solid var(--color-tint);
  }
</style>
