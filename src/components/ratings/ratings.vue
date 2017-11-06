<template>
  <div>
    <!-- 用在单个元素上 -->
    <div class="single-content">
      <button @click="single = !single">button</button>
      <transition name="single">
        <div v-show="single" class="single">hello</div>
      </transition>
    </div>
    <!-- 滚动的小球 -->
    <div class="rotate-content">
      <button @click="rotateBall = !rotateBall">button</button>
      <transition name="rotate">
        <div class="ball" v-show="rotateBall">
          <div class="inner"></div>
        </div>
      </transition>
    </div>
    <!-- 1px 边框 -->
    <div class="container border-1px"></div>
    <!-- Range.getBoundingClientRect() https://developer.mozilla.org/zh-CN/docs/Web/API/Element/getBoundingClientRect -->
    <div class="bounding bounding-hook" style="width: 100px; height: 100px; margin-left: 15px; background-color: rgb(0,160,220)"></div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    components: {

    },
    data () {
      return {
        single: false,
        rotateBall: true
      }
    },
    created () {
      this.$nextTick(() => {
        let rect = document.getElementsByClassName('bounding-hook')[0].getBoundingClientRect()
        console.log(rect)
      })
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../common/scss/mixin";
div[class$="-content"]{
  margin: 15px;
  padding: 15px;
  border: 3px double #ddd;
}
.single{
  &.single-enter-active, &.single-leave-active{
    transition: opacity 3s;
  }
  &.single-enter, &.single-leave-to{
    opacity: 0;
  }
}


.ball{
  margin-top: 15px;
  transform: translate3d(0,0,0);
  .inner{
    display: inline-block;
    width: 16px;
    height: 16px;
    background-color: rgb(0,160,220);
    border-radius: 50%;
    transition: all 0.6s linear;
    transform: rotate(0);
  }
  &.rotate-enter-active, &.rotate-leave-active{
    transition: all 0.4s linear;
  }
  &.rotate-enter, &.rotate-leave-to{
    opacity: 0;
    transform: translate3d(24px, 0, 0);
    .inner{
        transform: rotate(180deg);
    }
  }
}

.container{
  width: 100px;
  height: 100px;
  margin: 20px auto;
  @include border-1px(red);
}
</style>
