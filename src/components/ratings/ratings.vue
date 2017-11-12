<template>
  <div class="ratings">
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
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  import star from '../star/star'
  export default {
    props: {
      seller: {
        type: Object
      }
    },
    components: {
      star
    },
    data () {
      return {
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
      padding: 0 24px;
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
}
</style>
