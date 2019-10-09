<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll'
  // ref如果绑定在组件中, 那么通过this.$refs.refname获取到的是一个组件对象
  // ref如果绑定在普通元素中,那么通过this.$refs.refname获取的是一个元素对象
  export default {
    name: "Scroll",
    props: {
      probeType: {
        type: Number,
        default: 0
      },
      pullUpLoad: {
        type: Boolean,
        default: false
      }
    },
    data(){
      return {
        scroll: null
      }
    },
    mounted() {
      // 1.在mounted创建BScroll对象
      this.scroll = new BScroll(this.$refs.wrapper, {
        probeType: this.probeType,
        click: true,
        pullUpLoad: this.pullUpLoad
      })
      // 2.监听滚动位置
      // 默认情况下BScroll是不可以实时监听滚动位置
      // probe 侦测
      // 0, 1都不是侦测实时的位置
      // 2: 在手指滚动的过程中侦测,手指离开后的惯性滚动中不侦测
      // 3: 只要是滚动, 都侦测
      // click: 可以监听better-scroll的按钮监听
      // 对于button无论是否设置click: false, button都可以点击
      // 对于div等其他元素click: true, 才可以监听点击
      // pullUpLoad 下拉加载更多
      if (this.probeType===2 || this.probeType===3){
        this.scroll.on('scroll', (position) => {
          this.$emit('scrollPos', position)
        })
      }
      // 3.监听滚动到底部
      if (this.pullUpLoad){
        this.scroll.on('pullingUp', ()=>{
          console.log('底部');
          this.$emit('pullingUp')
        })
      }
    },
    methods: {
      scrollTo(x, y, time=300){
        this.scroll && this.scroll.scrollTo(x, y, time)
      },
      refresh(){
        this.scroll && this.scroll.refresh()
      },
      finishPullUp(){
        // 下拉加载更多
        this.scroll && this.scroll.finishPullUp()
      },
      getScrolly(){
        return this.scroll?  this.scroll.y: 0
      }
    }
  }
</script>

<style scoped>

</style>
