<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{seller.score}}</h1>
          <h2 class="title">综合评分</h2>
          <h3 class="rank">高于周边商家{{seller.rankRate}}%</h3>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{seller.serviceScore}}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star :size="36" :score="seller.foodScore"></star>
            <span class="score">{{seller.foodScore}}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="delivery">{{seller.deliveryTime}}分钟</span>
          </div>
        </div>
      </div>
      <split></split>
      <rating-select :select-type="selectType"
                     :only-content="onlyContent"
                     :desc="desc"
                     :ratings="ratings"
                     @select="select"
                     @toggle="toggle">
      </rating-select>
      <div class="ratings-wrapper">
        <ul>
          <li class="rating-list" v-for="rating in ratings" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="28" height="28">
            </div>
            <div class="content">
              <h2 class="name">{{rating.username}}</h2>
              <div class="star-wrapper">
                <star :size="24" :score="rating.score"></star>
                <span class="time" v-show="rating.deliveryTime">{{rating.deliveryTime}}分钟送达</span>
              </div>
              <h1 class="text">{{rating.text}}</h1>
              <div class="recommend" v-show="rating.recommend && rating.recommend.length > 0">
                <i class="fa fa-thumbs-up" aria-hidden="true"></i>
                <span class="item" v-for="item in rating.recommend">{{item}}</span>
              </div>
            </div>
            <div class="rate-time">{{rating.rateTime  |formatTime}}</div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import BScroll from 'better-scroll'
  import star from '../star/star'
  import split from '../split/split'
  import ratingSelect from '../ratingSelect/ratingSelect'
  import {formatDate} from '../../common/js/date.js' 

  const POSITIVE = 0
  const NEGATIVE = 1
  const ALL = 2

  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star, split, ratingSelect
    },
    data () {
      return {
        ratings: [],
        showFlag: false,
        selectType: ALL,
        onlyContent: true,
        desc: {
          all: '全部',
          positive: '满意',
          negative: '不满意'
        }
      }   
    },
    filters: {
        formatTime (datetime) {
            let date = new Date(datetime)
            return formatDate(date, 'yyyy-MM-dd hh:mm')
        }
    },
    created () {
      this.$http.get('../../../static/data/data.json').then((response) => {
        this.ratings = response.body.ratings
        this.$nextTick(() => {
          this.scroll = new BScroll(this.$refs.ratings, {
            click: true 
          })
        })
      })
    },
    methods: {
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
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import "../../common/scss/mixin";
.ratings{
  position: absolute;
  left: 0;
  top: 178px;
  bottom: 0;
  overflow: hidden;
  .overview{
    display: flex;
    padding: 18px 0;
    .overview-left{
      flex: 0 0 137px;
      width: 137px;
      padding: 6px 0;
      text-align: center;
      border-right: 1px solid rgba(7,17,27,0.1);
      @media only screen and (max-width: 320px) {
        flex: 0 0 120px;
        width: 120px;
      }
      .score{
        line-height: 28px;
        font-size: 24px;
        color: rgb(255, 153, 0);
      }
      .title{
        margin: 6px 0 8px 0;
        line-height: 12px;
        font-size: 12px;
        color: rgb(7,17,27);
      }
      .rank{
        line-height: 10px;
        font-size: 10px;
        color: rgb(147,153,159);
      }
    }
    .overview-right{
      flex: 1;
      padding: 6px 0 6px 24px;
      @media only screen and (max-width: 320px) {
        padding-left: 6px;
      }
      .score-wrapper{
        margin-bottom: 8px;
        font-size: 0;
        .title{
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .star{
          display: inline-block;
          margin: 0 12px;

        }
        .score{
          display: inline-block;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(255, 153, 0);
        }
      }
      .delivery-wrapper{
        font-size: 0;
        .title{
          display: inline-block;
          margin-right: 12px;
          vertical-align: top;
          line-height: 18px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .delivery{
          display: inline-block;
          vertical-align: top;
          font-size: 12px;
          line-height: 18px;
          color: rgb(147,153,159);
        }
      }
    }
  }
  .ratings-wrapper{
    padding: 0 18px;
    .rating-list{ 
      position: relative;
      display: flex;
      padding: 18px 0;
      .avatar{
        flex: 0 0 28px;
        img{
          border-radius: 50%;
        }
      }
      .content{
        flex: 1;
        margin-left: 12px;
        .name{
          line-height: 12px;
          font-size: 10px;
          color: rgb(7,17,27);
        }
        .star-wrapper{
          margin: 4px 0 6px 0;
          font-size: 0;
          .star{
            display: inline-block;
            
          }
          .time{
            display: inline-block;
            margin-left: 6px;
            line-height: 12px;
            font-size: 10px;
            color: rgb(147,153,159);
          }
        }
        .text{
          line-height: 18px;
          font-size: 12px;
          color: rgb(7,17,27);
        }
        .recommend{
          margin-top: 8px;
          font-size: 0;
          .fa{
            margin-right: 8px;
            margin-bottom: 8px;
            line-height: 16px;
            font-size: 12px;
            &.fa-thumbs-up{
              color: rgb(0,160,220);
            }
          }
          .item{
            display: inline-block;
            margin-bottom: 8px;
            padding: 6px;
            &:not(::last-of-type){
              margin-right: 8px;
            }
            line-height: 16px;
            border-width: 1px;
            border-color: rgba(7,17,27,0.1);
            border-radius: 2px;
            background-color: rgb(255,255,255);
            font-size: 9px;
            color: rgb(147,153,159);
          }
        }
      }
      .rate-time{
        position: absolute;
        top: 18px;
        right: 18px;
        line-height: 12px;
        font-size: 10px;
        color: rgb(147,153,159);
      }
    }
  }
}
</style>
