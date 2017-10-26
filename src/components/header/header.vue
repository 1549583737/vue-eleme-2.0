<template>
  <div class="header">
    <div class="content-wrapper">
      <div class="avator">
        <img width="64" height="64" :src="seller.avatar" alt="logo">
      </div>
      <div class="content">
        <div class="title">
          <span class="brand"></span>
          <span class="name">{{seller.name}}</span>
        </div>
        <div class="description">
          {{seller.description}}/{{seller.deliveryTime}}分钟送达
        </div>
        <div class="support" v-if="seller.supports">
          <span class="icon" :class="classMap[seller.supports[0].type]"></span>
          <span class="text">{{seller.supports[0].description}}</span>
        </div>
      </div>
      <div v-if="seller.supports" class="support-content" @click="detailShow = true">
        <span class="count">
          {{seller.supports.length}}个<i class="fa fa-angle-right" aria-hidden="true"></i>
        </span>
      </div>
    </div>
    <div class="bulletin-wrapper" @click="detailShow = true">
      <span class="bulletin-content"></span><span class="bulletin-text">{{seller.bulletin}}</span>
      <i class="fa fa-angle-right" aria-hidden="true"></i>
    </div>
    <div class="background">
      <img :src="seller.avatar" width="100%" height="100%">
    </div>
    <transition name="fade">
      <div class="detail" v-show="detailShow">
      <div class="detail-wrapper clearfix">
        <div class="detail-main">
          <h1 class="name">{{seller.name}}</h1>
          <div class="star-wrapper">
            <star :size="48" :score="seller.score"></star>              
          </div>
          <div class="title">
            <div class="line"></div>
            <div class="text">优惠信息</div>
            <div class="line"></div>
          </div>
          <ul class="supports">
            <li class="support-item" v-for="support in seller.supports">
              <span class="icon" :class="classMap[support.type]"></span>
              <span class="text">{{support.description}}</span>
            </li>
          </ul>
          <div class="title">
            <div class="line"></div>
            <div class="text">商家公告</div>
            <div class="line"></div>
          </div>
          <p class="bulletin">{{seller.bulletin}}</p>
        </div>
      </div>
      <div class="detail-close" @click="detailShow = false">
        <i class="fa fa-times" aria-hidden="true"></i>
      </div>
    </div>
    </transition>
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
    data () {
      return {
        detailShow: false
      }
    },
    components: {
      star
    },
    created () {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee']
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
@import '../../common/scss/mixin';
.header{
  position: relative;
  color: #fff;
  background-color: rgba(7, 17, 27, .5);
  overflow: hidden;
  .content-wrapper{
    position: relative;
    display: flex;
    flex-direction: row;
    padding: 24px 12px 18px 24px;
    .avator{
      @include border-radius(4px);
    }
    .content{
      margin-left: 16px;
      padding: 0 0 8px 2px;
      .title{
        font-size: 0;
        .brand{
          display: inline-block;  
          width: 30px;
          height: 18px;
          @include bg-img('brand');
          background-size: 30px 18px;
          background-repeat: no-repeat;
          background-position: center center;
          vertical-align: top;
        }
        .name{
          display: inline-block;
          margin-left: 6px;
          line-height: 18px;
          font-size: 16px;
          font-weight: bold;
        }
      }
      .description{
        margin: 8px 0 10px 0;
        line-height: 12px;
        font-size: 12px;
      }
      .support{
        font-size: 0;
        .icon{
          display: inline-block;
          vertical-align: top;
          width: 12px;
          height: 12px;
          margin-right: 4px;
          background-size: 12px 12px;
          background-repeat: no-repeat;
          &.decrease{
            @include bg-img('decrease_1');
          }
          &.discount{
            @include bg-img('discount_1');
          }
          &.special{
            @include bg-img('special_1');
          }
          &.invoice{
            @include bg-img('invoice_1');
          }
          &.guarantee{
            @include bg-img('guarantee_1');
          }
        }
        .text{
          line-height: 12px;
          font-size: 12px;
        }
      }
    }
    .support-content{
      position: absolute;
      right: 12px;
      bottom: 14px;
      .count{
        display: inline-block;
        padding: 7px 8px;
        line-height: 12px;
        font-size: 10px;
        color: #fff;
        background-color: rgba(0,0,0,.2);
        border-radius: 14px;
        .fa{
          display: inline-block;
          margin-left: 2px;
          font: normal normal normal 10px/1 FontAwesome;
        }
      }
    }
  }
  .bulletin-wrapper{
    position: relative;
    height: 28px;
    line-height: 28px;
    padding: 0 12px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    .bulletin-content{
      display: inline-block;
      width: 22px;
      height: 12px;
      margin-top: 8px;
      vertical-align: top;
      background-size: 22px 12px;
      background-repeat: no-repeat;
      @include bg-img('bulletin');
    }
    .bulletin-text{
      margin: 0 4px;
      vertical-align: top;
      font-size: 10px;
      color: #fff;
    }
    .fa{
      position: absolute;
      top: 8px;
      right: 12px;
      font-size: 10px;
    }
  }
  .background{
    position: absolute;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    z-index: -1;
    filter: blur(10px);
  }
  .detail{
    position: fixed;
    top: 0; 
    left: 0;
    width: 100%;
    height: 100%;
    overflow: auto;
    z-index: 1049;
    transition: all 0.5s;
    background-color: rgba(7,17,27,.8);
    background-drop: blur(10px);
    .detail-wrapper{
      min-height: 100%;
      .detail-main{
        margin-top: 64px;
        padding-bottom: 64px;
        .name{
          line-height: 16px;
          font-size: 16px;
          font-weight: 700;
          text-align: center;
        }
        .star-wrapper{
          text-align: center;
          margin: 16px 0 28px 0;
        }
        .title{
          display: flex;
          width: 80%;
          margin: 28px auto 24px auto;
          .line{
            flex: 1;
            position: relative;
            top: -6px;
            border-bottom: 1px solid rgba(255,255,255,0.2);
          }
          .text{
            padding: 0 12px;
            font-size: 14px;
            font-weight: 700;
          }
        }
        .supports{
          width: 80%;
          margin: 0 auto;
          .support-item{
            padding: 0 12px;
            margin-bottom: 12px;
            font-size: 0;
            .icon{
              display: inline-block;
              margin-right: 6px;
              width: 16px;
              height: 16px;
              background-size: 16px 16px;
              background-repeat: no-repeat;
              vertical-align: top;
              &.decrease{
                @include bg-img('decrease_2');
              }
              &.discount{
                @include bg-img('discount_2');
              }
              &.special{
                @include bg-img('special_2');
              }
              &.invoice{
                @include bg-img('invoice_2');
              }
              &.guarantee{
                @include bg-img('guarantee_2');
              }
            }
            .text{
              display: inline-block;
              line-height: 16px;
              font-size: 12px;
            }
            &:last-child{
              margin-bottom: 0;
            }
          }
        }
        .bulletin{
          width: 80%;
          margin: 0 auto;
          padding: 0 12px;
          line-height: 24px;
          font-size: 12px;
        }
      }
    }
    .detail-close{
      position: relative;
      width: 32px;
      height: 32px;
      margin: -64px auto 0 auto;
      font-size: 32px;
      clear: both;
      .fa{
        color: #fff;
      }
    }
  }
}
.fade-enter-active, .fade-leave-active{
  background-color: rgba(7,17,27,.8);
  opacity: 1;
}
.fade-enter, .fade-leave-to{
  background-color: rgba(7,17,27,.8);
  opacity: 0;
}
</style>