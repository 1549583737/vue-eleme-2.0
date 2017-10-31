<template>
    <div class="cartcount">
        <transition name="move">
            <div class="cart-decrease" v-show="food.count>0" @click="decreaseCount($event)">
                <span class="inner">
                    <i class="fa fa-minus-circle" aria-hidden="true"></i>                  
                </span>
            </div>
        </transition>
        <div class="cart-count" v-show="food.count>0">{{food.count}}</div>
        <div class="cart-add" @click="addCart($event)"><i class="fa fa-plus-circle" aria-hidden="true"></i></div>
  </div>
</template>

<script>
import {eventBus} from '../../../static/js/event-bus'
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
          eventBus.$emit('addcart', event.target)
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
    .cart-decrease, .cart-add{
        display: inline-block;
        padding: 6px;
        font-size: 24px;
        line-height: 24px;
        color: #00A0DC;
    }
    .cart-decrease{
        transition: all 0.4s linear;
        .inner{
            display: inline-block;
            transition: all 0.4s linear;
            transform: rotate(0);
        }
        // &.move-transition{
        //     opacity: 1;
        //     transform: translate3d(0,0,0);
        // }
        // &.move-enter, &.move-leave{
        //     opacity: 0;
        //     transform: translate3d(24px, 0, 0);
        //     .inner{
        //         opacity: 0;
        //         transform: rotate(180deg);
        //     }
        // }
        &.move-enter-active{
            opacity: 1;
            transform: translate3d(0,0,0);
        }
        &.move-enter, &.move-leave-active{
            opacity: 0;
            transform: translate3d(24px, 0, 0);
            .inner{
                opacity: 0;
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


