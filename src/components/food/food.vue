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
                    <ratingSelect @select="select" @toggle="toggle"
                                  :select-type="selectType" 
                                  :only-content="onlyContent" 
                                  :desc="desc" 
                                  :ratings="foodList.ratings">
                    </ratingSelect>
                    <div class="rating-wrapper">
                        <ul v-show="foodList.ratings.length && foodList.ratings">
                            <li v-show="needShow(rating.rateType, rating.text)"
                                v-for="rating in foodList.ratings" class="rating-item border-1px">
                                <div class="user">
                                    <span class="name">{{rating.username}}</span>
                                    <img class="avatar" :src="rating.avatar" width="12" height="12">
                                </div>
                                <div class="time">{{rating.rateTime |formatTime}}</div>
                                <p class="text">
                                    <i class="fa" :class="{'fa-thumbs-down': rating.rateType === 1, 'fa-thumbs-up': rating.rateType === 0}" aria-hidden="true"></i>
                                    {{rating.text}}
                                </p>
                            </li>
                        </ul>
                        <div class="no-ratings" v-show="!foodList.ratings.length || !foodList.ratings">
                            暂无评价
                        </div>
                    </div>
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
import {formatDate} from '../../common/js/date.js' 

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
            onlyContent: true,
            desc: {
                all: '全部',
                positive: '推荐',
                negative: '吐槽'
            }
        }   
    },
    components: {
        cartcount, split, ratingSelect
    },
    filters: {
        formatTime (datetime) {
            let date = new Date(datetime)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    methods: {
        show () {
            this.selectType = ALL
            this.onlyContent = true
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
        },
        needShow (type, text) {
            if (this.onlyContent && !text) {
                return false
            }
            if (this.selectType === ALL) {
                return true
            } else {
                return type === this.selectType
            }
        },
        select (type) {
            this.selectType = type
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        },
        toggle (msg) {
            this.onlyContent = msg
            this.$nextTick(() => {
                this.scroll.refresh()
            })
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin";
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
        .rating-wrapper{
            .rating-item{
                position: relative;
                padding: 16px 18px;
                @include border-1px(rgba(7,17,27,0.1));
                .user{
                    position: absolute;
                    top: 18px;
                    right: 18px;
                    font-size: 0;
                    .name{
                        display: inline-block;
                        margin-right: 6px;
                        line-height: 12px;
                        font-size: 10px;
                        color: rgb(147,153,159);
                        vertical-align: top;
                    }
                    .avatar{
                        border-radius: 50%;
                        vertical-align: top;
                    }
                }
                .time{
                    line-height: 12px;
                    font-size: 10px;
                    color: rgb(147,153,159);
                }
                .text{
                    line-height: 16px;
                    font-size: 12px;
                    color: rgb(7,17,27);
                    .fa{
                        margin-right: 4px;
                        line-height: 24px;
                        font-size: 12px;
                        &.fa-thumbs-down{
                            color: rgb(147,153,159);                           
                        }
                        &.fa-thumbs-up{
                            color: rgb(0,160,220);
                        }
                    }
                }
            }
            .no-ratings{
                font-size: 12px;
                color: rgb(147,153,159);
            }
        }
    }
}
</style>


