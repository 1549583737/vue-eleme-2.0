<template>
  <div class="star" :class="starType">
    <span v-for="itemClass in itemClasses" :class="itemClass" class="star-item"></span>
  </div>
</template>

<script type="text/ecmascript-6">
  const LENGTH = 5
  const CLS_ON = 'on'
  const CLS_HALF = 'half'
  const CLS_OFF = 'off'
  export default {
    props: {
      size: {
        type: Number
      },
      score: {
        type: Number
      }
    },
    computed: {
      starType () {
        return 'star-' + this.size
      },
      itemClasses () {
        let result = []
        let score = Math.floor(this.score * 2) / 2
        let integer = Math.floor(score)
        let hasDemical = score % 1 !== 0
        for (let i = 0; i < integer; i++) {
          result.push(CLS_ON)
        }
        if (hasDemical) {
          result.push(CLS_HALF)
        }
        while (result.length < LENGTH) {
          result.push(CLS_OFF)
        }
        return result
      }
    }
  }

</script>

<style lang="scss" rel="stylesheet/scss" scoped>
  @import '../../common/scss/mixin';
  .star{
    font-size: 0;
    .star-item{
      display: inline-block;
      background-repeat: no-repeat;
      background-position: center center;
    }
    &.star-48 .star-item{
      width: 22px;
      height: 22px;
      margin-right: 20px;
      background-size: 22px 22px;
      &:last-child{
        margin-right: 0;
      }
      &.on{
         @include bg-img('star48_on');
      }
      &.half{
        @include bg-img('star48_half');
      }
      &.off{
        @include bg-img('star48_off');
      }
    }
    &.star-36 .star-item{
      width: 16px;
      height: 16px;
      margin-right: 6px;
      background-size: 16px 16px;
      &:last-child{
        margin-right: 0;
      }
      &.on{
         @include bg-img('star36_on');
      }
      &.half{
        @include bg-img('star36_half');
      }
      &.off{
        @include bg-img('star36_off');
      }
    }
    &.star-24 .star-item{
      width: 10px;
      height: 10px;
      margin-right: 3px;
      background-size: 10px 10px;
      &:last-child{
        margin-right: 0;
      }
      &.on{
         @include bg-img('star24_on');
      }
      &.half{
        @include bg-img('star24_half');
      }
      &.off{
        @include bg-img('star24_off');
      }
    }
  }
</style>
