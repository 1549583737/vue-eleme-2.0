<template>
  <div class="seller" ref="seller">
    <div class="seller-content">
      <div class="overview">
        <h1 class="title">{{seller.name}}</h1>
        <div class="desc border-1px">
          <star :size="36" :score="seller.score"></star>
          <span class="text">({{seller.ratingCount}})</span>
          <span class="text">月售{{seller.sellCount}}单</span>
        </div>
        <ul class="remark">
          <li class="block">
            <h2 class="title">起送价</h2>
            <div class="content">
              <span class="stress">{{seller.minPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">商家配送</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryPrice}}</span>元
            </div>
          </li>
          <li class="block">
            <h2 class="title">平均配送时间</h2>
            <div class="content">
              <span class="stress">{{seller.deliveryTime}}</span>分钟
            </div>
          </li>
        </ul>
        <div class="favorite" @click="toggleFavorite($event)">
          <i class="fa fa-heart" :class="{'active': favorite}" aria-hidden="true"></i>
          <span class="text">{{favoriteText}}</span>
        </div>
      </div>
      <split></split>
      <div class="bulletin">
        <h1 class="title">公告与活动</h1>
        <div class="content-wrapper border-1px">
          <p class="content">{{seller.bulletin}}</p>
        </div>
        <ul class="supports" v-if="seller.supports">
          <li class="support-item border-1px" v-for="support in seller.supports">
            <span class="icon" :class="classMap[support.type]"></span>
            <span class="text">{{support.description}}</span>
          </li>
        </ul>
      </div>
      <split></split>
      <div class="pics">
        <h1 class="title">商家实景</h1>
          <div class="pics-wrapper" ref="pics">
            <ul class="pic-list" ref="picList">
              <li class="pic-item" v-for="(pic, index) in seller.pics">
                <img :src="pic" width="120" height="90">
              </li>
            </ul>
          </div>
      </div>
      <split></split>
      <div class="info">
        <h1 class="title border-1px">商家信息</h1>
        <ul>
          <li class="info-list border-1px" v-for="(info, index) in seller.infos">{{info}}</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import {saveToLocal, loadFromLocal} from '../../common/js/store'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: (() => {
          return loadFromLocal(this.seller.id, 'favorite', false)
        })()
      }
    },
    components: {
      star, split
    },
    computed: {
      favoriteText () {
        return this.favorite ? '已收藏' : '收藏'
      }
    },
    watch: {
      'seller' () {
        this.$nextTick(() => {
          this._initScroll()
          this._initPics()
        })
      }
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    },
    mounted () {
      this.$nextTick(() => { // 确保刚进入页面时能滚动
        this._initScroll()
        this._initPics()
      })
    },
    methods: {
      toggleFavorite (event) {
        if (!event._constructed) {
          return
        }
        this.favorite = !this.favorite
        saveToLocal(this.seller.id, 'favorite', this.favorite)
      },
      // 商家页面上下滚动
      _initScroll () {
        if (!this.scroll) {
          this.scroll = new BScroll(this.$refs.seller, {
            click: true
          })
        } else {
          this.scroll.refresh()
        }
      },
      // 商家实景横向滚动
      _initPics () {
        if (this.seller.pics) {
          let picWidth = 120
          let picMargin = 6
          let width = this.seller.pics.length * (picWidth + picMargin) - picMargin
          this.$refs.picList.style.width = width + 'px'
          this.$nextTick(() => {
            if (!this.picScroll) {
                this.picsScroll = new BScroll(this.$refs.pics, {
                scrollX: true,
                eventPassthrough: 'vertical'
              })
            } else {
              this.scroll.refresh()
            }
          })
        }
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/mixin";
  .seller{
    position: absolute;
    left: 0;
    bottom: 0;
    top:178px;
    width: 100%;
    overflow: hidden;
    .overview{
      position: relative;
      padding: 18px;
      .title{
        line-height: 14px;
        font-size: 14px;
        font-weight: 700;
        color: rgb(7,17,27);
      }
      .desc{
        margin: 8px 0 18px 0;
        font-size: 0;
        @include border-1px(rgba(7,17,27,0.1));
        .star{
          display: inline-block;
          vertical-align: top;
        }
        .text{
          display: inline-block;
          vertical-align: top;
          margin-left: 8px;
          line-height: 18px;
          font-size: 10px;
          color: rgb(77, 85, 93);
        }
      }
      .remark{
        display: flex;
        .block{
          flex: 1;
          padding-top: 18px;
          .title{
            margin-bottom: 4px;
            line-height: 10px;
            font-size: 10px;
            color: rgb(147,153,159);
            text-align: center;
          }
          .content{
            color: rgb(7,17,27);
            font-size: 10px;
            text-align: center;
            .stress{
              line-height: 24px;
              font-size: 24px;
            }
          }
          &:not(:last-of-type){
            border-right: 1px solid rgba(7,17,27,0.1);
          }
        }
      }
      .favorite{
        position: absolute;
        top: 18px;
        right: 11px;
        width: 50px;
        .fa{
          display: block;
          line-height: 24px;
          font-size: 24px;
          text-align: center;
          color: #d4d6d9;
          &.active{
            color: rgb(240,20,20);
          }
        }
        .text{
          display: block;
          margin-top: 4px;
          line-height: 10px;
          font-size: 10px;
          color: rgb(77, 85, 93);
          text-align: center;
        }
      }
    }
    .bulletin{
      padding: 18px;
      padding-bottom: 0;
      .title{
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);

      }
      .content-wrapper{
        padding: 8px 12px 16px 8px;
        @include border-1px (rgba(7,17,27,0.1));
        .content{
          line-height: 24px;
          font-size: 12px;
          color: rgb(240,20,20);
        }
      }
      .supports{
        .support-item{
          padding: 16px 12px;
          font-size: 0;
          &:not(:last-of-type) {
            @include border-1px(rgba(7,17,27,0.1));
          }
          .icon{
            display: inline-block;
            vertical-align: top;
            width: 16px;
            height: 16px;
            margin-right: 6px;
            background-size: 12px 12px;
            background-repeat: no-repeat;
            &.decrease{
              @include bg-img('decrease_4');
            }
            &.discount{
              @include bg-img('discount_4');
            }
            &.special{
              @include bg-img('special_4');
            }
            &.invoice{
              @include bg-img('invoice_4');
            }
            &.guarantee{
              @include bg-img('guarantee_4');
            }
          }
          .text{
            display: inline-block;
            line-height: 16px;
            vertical-align: top;
            font-size: 12px;
            color: rgb(7,17,27);
          }
        }
      }
    }
    .pics{
      padding: 18px 0 18px 18px;
      .title{
        margin-bottom: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
      }
      .pics-wrapper{
        width: 100%;
        overflow: hidden;
        white-space: nowrap;
        .pic-list{
          font-size: 0;
          .pic-item{
            display: inline-block;
            &:not(:last-child){
              margin-right: 6px;
            }
          }
        }
      }
    }
    .info{
      padding: 18px;
      .title{
        padding: 12px;
        line-height: 14px;
        font-size: 14px;
        color: rgb(7,17,27);
        @include border-1px(rgba(7,17,27,.1));
      }
      .info-list{
        padding: 16px 12px;
        line-height: 16px;
        font-size: 12px;
        color: rgb(7,17,27);
        &:not(:last-child){
          @include border-1px(rgba(7,17,27,.1));
        }
      }
    }
  }
</style>
