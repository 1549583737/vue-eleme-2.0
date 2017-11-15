<template>
  <div class="seller">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  import split from '../split/split'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    data () {
      return {
        favorite: false
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
    methods: {
      toggleFavorite (event) {
        // if (!event._constructed) {
        //   return
        // }
        this.favorite = !this.favorite
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import "../../common/scss/mixin";
  .seller{
    position: absolute;
    left: 0;
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
        right: 18px;
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
  }
</style>
