<template>
  <div>
    <!-- <div class="transition">
      <transition name="move">
        <div class="decrease" v-show="count>0" @click="decrease">
          <i class="fa fa-minus-circle" aria-hidden="true"></i>
        </div>
      </transition>
      <div class="count" v-show="count>0">{{count}}</div>
      <div class="add" @click="add" ref="test">
        <i class="fa fa-plus-circle" aria-hidden="true"></i>
      </div>
    </div>  -->
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
    data () {
      return {
        count: 0
      }
    },
    methods: {
      add () {
        console.log(this.$refs.test)
        this.count++
      },
      decrease () {
        if (this.count === 0) {
          return
        }
        this.count--
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .transition{
    margin-top: 30px;
    font-size: 0;
    div{
      display: inline-block;
      padding: 6px;
      font-size: 24px;
      line-height: 24px;
      color: #00A0DC;
    }
    .decrease{
      transition: all 0.6s linear;
      .fa{
         display: inline-block;
            transition: all 0.4s linear;
            transform: rotate(0);
      }
      &.move-enter-active{
            opacity: 1;
            transform: translate3d(0,0,0);
        }
        &.move-enter, &.move-leave-active{
            opacity: 0;
            transform: translate3d(24px, 0, 0);
            .fa{
                opacity: 0;
                transform: rotate(180deg);
            }
        }
    }
  }
</style>
