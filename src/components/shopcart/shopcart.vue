<template>
  <div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo" :class="{'highlight': totalCount >0}">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>                    
                </div>
                <div class="num" v-show="totalCount >0">{{totalCount}}</div>
            </div>
            <div class="price" :class="{'highlight': totalPrice > 0}">￥{{totalPrice}}元</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right" :class="[this.totalPrice < this.minPrice ? 'not-enough' : 'enough']">{{payDes}}</div>
    </div>
    <div class="ball-container">
        <transition name="drop">
            <div v-for="ball in balls" v-show="ball.show" class="ball">
                <div class="inner"></div>
            </div>
        </transition>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import {eventBus} from '../../../static/js/event-bus'
  export default {
      props: {
          selectFoods: {
              type: Array,
              default () {
                  return []
              }
          },
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
          }
      },
      computed: {
          totalPrice () {
              let total = 0
              this.selectFoods.forEach((food, index) => {
                  total += Number(food.price) * Number(food.count)
              })
              return total
          },
          totalCount () {
              let count = 0
              this.selectFoods.forEach((food, index) => {
                  count += food.count
              })
              return count
          },
          payDes () {
              if (this.totalPrice === 0) {
                  return `￥${this.minPrice}元起送`
              } else if (this.totalPrice < this.minPrice) {
                  let diff = this.minPrice - this.totalPrice
                  return `还差￥${diff}元起送`
              } else {
                  return '去结算'
              }
          }
      },
      data () {
          return {
              balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
              dropballs: []
          }
      },
      created () {
          eventBus.$on('addcart', (ele) => {
              console.log('ele' + ele)
          })
      },
      methods: {
          drop (el) {
            console.log('drop-el' + el)
            for (let i = 0; i < this.balls.lengths; i++) {
                let ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropballs.push(ball)
                    return
                }
            }
          }
      }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  .shopcart{
      position: fixed;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 48px;
      z-index: 1049;
      .content{
          display: flex;
          height: 100%;
          background-color: #141d27;
          .content-left{
              flex: 1;
              font-size: 0;
              .logo-wrapper{
                  display: inline-block;
                  position: relative;
                  top: -10px;
                  margin: 0 18px;
                  padding: 6px;
                  width: 56px;
                  height: 56px;
                  box-sizing: border-box;
                  vertical-align: top;
                  border-radius: 50%;
                  background-color: #141d27;
                  .logo{
                      width: 100%;
                      height: 100%;
                      text-align: center;
                      border-radius: 50%;
                      background-color: #2b343c;
                      .fa{
                          line-height: 44px;
                          font-size: 24px;
                          color: #80858a;
                      }
                    &.highlight{
                        background-color: rgb(0, 160, 220);
                        .fa{
                            color: #fff;
                        }
                    }
                  }
                  .num{
                      position: absolute;
                      top: 0;
                      right: 0;
                      width: 24px;
                      height: 16px;
                      line-height: 16px;
                      border-radius: 16px;
                      background-color: rgb(240, 20, 20);
                      box-shadow: 0px 4px 8px 0px rgba(0, 0, 0, 0.4);
                      text-align: center;
                      font-size: 9px;
                      font-weight: 700;
                      color: #fff;
                  }
              }
              .price{
                  display: inline-block;      
                  line-height: 24px;
                  vertical-align: top;
                  margin-top: 12px;
                  padding-right: 12px;
                  border-right: 1px solid rgba(255,255,255,0.1);
                  box-sizing: border-box;
                  font-size: 16px;
                  font-weight: 700;
                  color: rgba(255,255,255,0.4);
                  &.highlight{
                      color: #fff;
                  }
              }
              .desc{
                  display: inline-block;   
                  line-height: 24px;
                  vertical-align: top;
                  padding: 12px 12px 0 12px;
                  font-size: 10px;
                  color: rgba(255,255,255,0.4);               
              }
          }
          .content-right{
              flex: 0 0 105px;
              width: 105px;
              height: 48px;
              line-height: 48px;
              padding: 0 8px;
              font-size: 12px;
              font-weight: 700;
              color: rgba(255,255,255,0.4);
              text-align: center;
              &.not-enough{
                background-color: #2B333B;
              }
              &.enough{
                background-color: green;
                color: #fff;
              }
          }
      }
      .ball-container{
          .ball{
              position: fixed;
              left: 32px;
              bottom: 22px;
              z-index: 2000;
              .inner{
                  width: 16px;
                  height: 16px;
                  border-radius: 50%;
                  background-color: rgb(0, 160, 220);
                  transition: all 0.6s;
              }
          }
      }
  }
</style>
