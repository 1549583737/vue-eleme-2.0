<template>
  <div class="shopcart">
    <div class="content">
        <div class="content-left">
            <div class="logo-wrapper">
                <div class="logo">
                    <i class="fa fa-shopping-cart" aria-hidden="true"></i>                    
                </div>
            </div>
            <div class="price">0yuan</div>
            <div class="desc">另需配送费￥{{deliveryPrice}}</div>
        </div>
        <div class="content-right">￥{{minPrice}}起送</div>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  export default {
      props: {
          deliveryPrice: {
              type: Number,
              default: 0
          },
          minPrice: {
              type: Number,
              default: 0
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
              background-color: #2B333B;
              text-align: center;
          }
      }
  }
</style>
