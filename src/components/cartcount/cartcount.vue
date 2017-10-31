<template>
    <div class="cartcount">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCount($event)">
                <i class="inner fa fa-minus-circle" aria-hidden="true"></i>                  
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click="addCart($event)"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
  </div>
</template>

<script>
export default {
  props: {
      food: {
          type: Object
      }
  },
  methods: {
      addCart (event) {
          if (!event._constructed) {
              return
          }
          if (!this.food.count) {
              this.$set(this.food, 'count', 1)
          } else {
              this.food.count++
          }
          this.$emit('add', event.target)
      },
      decreaseCount (event) {
          if (!event._constructed) {
              return
          }
          if (this.food.count) {
              this.food.count--
          }
      }
  }
}
</script>

<style lang="scss" rel="stylesheet/scss" scoped>
.cartcount{
    font-size: 0;
    .cart-add{
        display: inline-block;
        padding: 6px;
        font-size: 24px;
        line-height: 24px;
        color: #00A0DC;
    }
    .cart-decrease{
        display: inline-block;
        padding: 6px;
        opacity: 1;
        transform: translate3d(0,0,0);
        .inner{
            display: inline-block;
            line-height: 24px;
            font-size: 24px;
            color: rgb(0, 160, 220);
            transition: all 0.4s linear;
            transform: rotate(0);
        }
        &.move-enter-active, &.move-leave-active{
            opacity: 1;
            transform: translate3d(0,0,0);
        }
        &.move-enter, &.move-leave-active{
            opacity: 0;
            transform: translate3d(24px, 0, 0);
            .inner{
                transform: rotate(180deg);
            }
        }
    
    }
    .cart-count{
        display: inline-block;
        padding-top: 6px;
        width: 12px;
        line-height: 24px;
        font-size: 10px;
        color: rgb(147, 153, 159);
        vertical-align: top;
        text-align: center;
    }
}
</style>


