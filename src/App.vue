<template>
  <div id="app">
    <div class="header">
      <v-header :seller="seller"></v-header>
    </div>
    <div class="tab">
      <router-link to="/goods">商品</router-link>
      <router-link to="/ratings">评价</router-link>
      <router-link to="/seller">商家</router-link>
    </div>
    <router-view :seller="seller"></router-view>  
  </div>
</template>

<script type="text/ecmascript-6">
  import header from './components/header/header.vue'
  export default {
    data () {
      return {
        seller: {}
      }
    },
    created () {
      this.$http.get('../static/data/data.json').then((response) => {
        this.seller = response.body.seller
      })
    },
    components: {
      'v-header': header
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import './common/scss/mixin';
  .tab{
    display: flex;
    width: 100%;
    height: 40px;
    line-height: 40px;
    @include border-1px(rgba(7, 17, 27, .1));
    a{
      flex: 1;
      text-align: center;
      font-size: 14px;
      color: rgb(77,85,93);
      &.active{
        color: rgb(240, 20, 20);
      }
    }
  }
</style>
