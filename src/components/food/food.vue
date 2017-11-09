<template>
    <transition name="slide">
         <div class="food-wrapper" v-show="showFlag" ref="food">
             <div class="food-content">
                <div class="image-header">
                    <img :src="foodList.image">
                    <div class="back" @click="showFlag = false">
                        <i class="fa fa-chevron-left" aria-hidden="true"></i>
                    </div>
                </div>
                <div class="content">
                    <h1 class="title">{{foodList.name}}</h1>
                    <div class="detail">
                        <span class="sell-count">月售{{foodList.sellCount}}份</span>
                        <span class="rating">好评率{{foodList.rating}}%</span>
                    </div>
                    <div class="price">
                        <span class="new">￥{{foodList.price}}</span>
                        <span class="old" v-show="foodList.oldPrice">￥{{foodList.oldPrice}}</span>
                    </div>
                     <div class="cartcount-wrapper">
                        <cartcount :food="foodList"></cartcount>
                    </div>
                    <transition name="fade">
                        <div class="buy" @click.stop.prevent="addFirst($event)" 
                        v-show="!foodList.count || foodList.count === 0">加入购物车</div>
                    </transition>
                </div>
                <split v-show="foodList.info"></split>
                <div class="info" v-show="foodList.info">
                    <h1 class="title">商品信息</h1>
                    <p class="text">{{foodList.info}}</p>
                </div>
                <split></split>
                <div class="rating">
                    <h1 class="title">商品评价</h1>
                    <ratingSelect :select-type="selectType" :only-type="onlyType" :desc="desc" :ratings="foodList.ratings"></ratingSelect>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import BScroll from 'better-scroll'
import cartcount from '../cartcount/cartcount'
import split from '../split/split'
import ratingSelect from '../ratingSelect/ratingSelect'

const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2

export default {
    props: {
        foodList: {
            type: Object
        }
    },
    data () {
        return {
            showFlag: false,
            selectType: ALL,
            onlyType: true,
            desc: {
                all: '满意',
                positive: '推荐',
                negative: '吐槽'
            }
        }   
    },
    components: {
        cartcount, split, ratingSelect
    },
    methods: {
        show () {
            this.selectType = ALL
            this.onlyType = true
            this.showFlag = true
            this.$nextTick(() => {
                if (!this.scroll) {
                    this.scroll = new BScroll(this.$refs.food, {
                        click: true 
                    })
                } else {
                    // this.srcoll.refresh()
                }
            })
        },
        addFirst (event) {
            if (!event._constructed) {
                return
            }
            this.$emit('add', event.target)
            this.$set(this.foodList, 'count', 1)
        }
    }
}
</script>

<style lang="scss" scoped>
.slide-enter-active, .slide-leave-active{
    transition: all 0.2s linear;
    transform: translate3d(0,0,0);
}
.slide-enter, .slide-leave-to{
    transform: translate3d(100px, 0, 0);
}
.food-wrapper{
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 48px;
    z-index: 30;
    background-color: #fff;
    .image-header{
        position: relative;
        width: 100%;
        height: 0;
        padding-top: 100%;
        img{
            position: absolute;
            left: 0;
            top: 0;
            width: 100%;
            height: 100%;
        }
        .back{
            position: absolute;
            top: 10px;
            left: 0;
            .fa{
                display: block;
                padding: 10px;
                font-size: 22px;
                color: #fff;
            }
        }
    }
    .content{
        position: relative;
        padding: 18px;
        .title{
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7,17,27);
        }
        .detail{
            margin: 8px 0 18px 0;
            height: 10px;
            line-height: 10px;
            font-size: 0;
            .sell-count, .rating{
                display: inline-block;
                font-size: 10px;
                color: rgb(147,158,159);
            }
            .sell-count{
                margin-right: 12px;
            }
        }
        .price{
            font-size: 0;
            .new, .old{
                display: inline-block;
                line-height: 24px;
                font-weight: 700;
                font-size: 0;
            }
            .new{
                font-size: 14px;
                color: rgb(240,20,20)
            }
            .old{
                margin-left: 12px;
                text-decoration: line-through;
                font-size: 10px;
                color: rgb(147,153,159);
            }
        }
        .cartcount-wrapper{
            position: absolute;
            right: 12px;
            bottom: 12px;
        }
        .buy{
            position: absolute;
            right: 18px;
            bottom: 18px;
            z-index: 10;
            height: 24px;
            line-height: 24px;
            padding: 0 12px;
            box-sizing: border-box;
            border-radius: 12px;
            background-color: rgb(0,160,220);
            color: #fff;
            font-size: 10px;
            &.fade-enter-active, &.fade-leave-active{
                transition: all 0.2s linear;
                opacity: 1;
            }
            &.fade-enter, &.fade-leave-to{
                opacity:0;
            }
        }
    }
    .info{
        padding: 18px;
        .title{
            margin-bottom: 6px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7,17,27);
        }
        .text{
            padding: 0 8px;
            line-height: 24px;
            font-size: 12px;
            font-weight: 200;
            color: rgb(77,85,93);
        }
    }
    .rating{
        padding-top: 18px;
        .title{
            margin: 0 18px;
            line-height: 14px;
            font-size: 14px;
            font-weight: 700;
            color: rgb(7,17,27);
        }
    }
}
</style>


