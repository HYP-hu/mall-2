<template>
  <transition name="fade">
    <div class="toast" v-show="isShow">{{ message }}</div>
  </transition>
</template>

<script>
export default {
  name: "toast",
  data() {
    return {
      message: "",
      isShow: false
    };
  },
  methods: {
    show(message, duration = 2000) {
      setTimeout(() => {
        this.message = "";
        this.isShow = false;
      }, duration);
    }
  }
};
</script>

<style scoped>
.toast {
  position: fixed;
  left: 50%;
  top: 50%;
  background-color: rgba(0, 0, 0, 0.8);
  padding: 10px;
  border-radius: 5px;
  transform: translate(-50%, -50%);
  color: #fff;
  z-index: 99;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
