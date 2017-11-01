<template>
<div>
      <div class="shopcart">
    <div class="content" @click="toggleList">
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
        <div class="content-right" :class="[this.totalPrice < this.minPrice ? 'not-enough' : 'enough']" @click.stop.prevent="pay">{{payDes}}</div>
    </div>
    <div class="ball-container">
        <div v-for="ball in balls">
            <transition name="drop"
                @before-enter="beforeDrop"
                @enter="dropping"
                @after-enter="afterDrop">
                <div class="ball" v-show="ball.show">
                    <div class="inner inner-hook"></div>
                </div>
            </transition>
        </div>
    </div>
    <transition name="drop">
        <div class="shopcart-list" v-show="listShow">
            <div class="list-header">
                <h1 class="title">购物车</h1>
                <span class="empty" @click="empty">清空</span>
            </div>
            <div class="list-content" ref="content">
                <ul>
                    <li class="food border-1px" v-for="food in selectFoods">
                        <div class="name">{{food.name}}</div>
                        <div class="price">
                            <span>￥{{food.price*food.count}}</span>
                        </div>
                        <div class="cartcount-wrapper">
                            <cartcount :food="food"></cartcount>
                        </div>
                    </li>
                </ul>
             </div>
        </div>
    </transition>
  </div>
  <transition name="fade">
      <div class="list-mask" @click="hideList" v-show="listShow"></div>
  </transition>
</div>
</template>

<script type="text/ecmascript-6">
import cartcount from '../cartcount/cartcount'
import BScroll from 'better-scroll'
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
          },
          listShow () {
              if (!this.totalCount) {
                  this.fold = true
                  return false
              }
              let show = !this.fold
              if (show) {
                  this.$nextTick(() => {
                      if (!this.scroll) {
                        this.scroll = new BScroll(this.$refs.content, {click: true})                          
                      } else {
                          this.scroll.refresh()
                      }
                  })
              }
              return show
          }
      },
      data () {
          return {
              balls: [{show: false}, {show: false}, {show: false}, {show: false}, {show: false}],
              dropballs: [],
              fold: true
          }
      },
      components: {
          cartcount
      },
      methods: {
        drop (el) {
            for (let i = 0; i < this.balls.lengths; i++) {
                let ball = this.balls[i]
                if (!ball.show) {
                    ball.show = true
                    ball.el = el
                    this.dropballs.push(ball)
                    return
                }
            }
        },
        beforeDrop (el) {
            let count = this.balls.length
            while (count--) {
                let ball = this.balls[count]
                if (ball.show) {
                    let rect = ball.el.getBoundingClientRect()
                    let x = rect.left - 32
                    let y = -(window.innerHeight - rect.top - 22)
                    el.style.display = ''
                    el.style.webkitTransform = `translate3d(0, ${y}px, 0)`
                    el.style.transform = `translate3d(0, ${y}px, 0)`
                    let inner = el.getElementsByClassName('inner-hook')[0]
                    inner.style.webkitTransform = `translate3d(${x}px,0,0)`
                    inner.style.transform = `translate3d(${x}px,0,0)`
                }
            }
        },
        dropping (el, done) {
            let rf = el.offsetHeight
            this.$nextTick(() => {
                el.style.webkitTransform = 'translate3d(0,0,0)'
                el.style.transform = 'translate3d(0,0,0)'
                let inner = el.getElementsByClassName('inner-hook')[0]
                inner.style.webkitTransform = 'translate3d(0,0,0)'
                inner.style.transform = 'translate3d(0,0,0)'
                el.addEventListener('transitionend', done)
            })
        },
        afterDrop (el) {
            let ball = this.dropBalls.shift()
            if (ball) {
                ball.show = false
                el.style.display = 'none'
            }
        },
        toggleList () {
            if (!this.totalCount) {
                this.fold = true
                return false
            }
            this.fold = !this.fold
        },
        empty () {
            this.selectFoods.forEach((food) => {
                food.count = 0
            })
        },
        hideList () {
            this.fold = true
        },
        pay () {
            if (this.totalPrice < this.minPrice) {
                return
            }
            window.alert(`支付${this.totalPrice}元`)
        }
      }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
    @import '../../common/scss/mixin';
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
        z-index: 200;
        transition: all 0.4s cubic-bezier(0.49, -0.29, 0.75, 0.41);
        .inner{
            width: 16px;
            height: 16px;
            border-radius: 50%;
            background: rgb(0, 160, 220);
            transition: all 0.4s linear;
        }
        }
    }
    .shopcart-list{
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
        transform: translate3d(0, -100%, 0);
        &.drop-enter-active, &.drop-leave-active{
            transition: all 0.5s;
        }
        &.drop-enter, &.drop-leave-active{
            transform: translate3d(0,0,0);
        }
        .list-header{
            height: 40px;
            line-height: 40px;
            padding: 0 18px;
            background-color: #f3f5f7;
            border-bottom: 1px solid rgba(7,17,27,0.1);
            .title{
                float: left;
                font-size: 14px;
                font-weight: 200;
                color: rgb(7,17,27);
            }
            .empty{
                float: right;
                font-size: 12px;
                color: rgb(0,160,220);
            }
        }
        .list-content{
            max-height: 217px;
            padding: 0 18px;
            overflow-y: hidden;
            background-color: #fff;
            .food{
                position: relative;
                padding: 12px 0;
                box-sizing: border-box;
                @include border-1px(rgba(7,17,27,0.1));
                .name{
                    line-height: 24px;
                    font-size: 14px;
                    color: rgb(7,17,27);
                }
                .price{
                    position: absolute;
                    right: 90px;
                    bottom: 12px;
                    line-height: 24px;
                    font-size: 14px;
                    font-weight: 700;
                    color: rgb(240,20,20);
                }
                .cartcount-wrapper{
                    position: absolute;
                    right: 0;
                    bottom: 6px;
                }
            }
        }
    }
  }
   .list-mask{
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 40;
        backdrop-filter: blur(10px);
        opacity: 1;
        background: rgba(7, 17, 27, 0.6);
        &.fade-enter-active, &.fade-leave-active{
            transition: all 0.5s;
        }
        &.fade-enter, &.fade-leave-active{
            opacity: 0;
            background: rgba(7, 17, 27, 0);
        }
    }
</style>
