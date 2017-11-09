<<template>
    <div class="ratingSelect">
        <div class="ratingType border-1px">
            <span class="block positive" :class="{'active': selectType === 2}">{{desc.all}}<span class="count">47</span></span>
            <span class="block positive" :class="{'active': selectType === 0}">{{desc.positive}}<span class="count">40</span></span>
            <span class="block negative" :class="{'active': selectType === 1}">{{desc.negative}}<span class="count">7</span></span>
        </div>
        <div class="switch">
            <i class="fa fa-check-circle-o" aria-hidden="true"></i>
            <span class="text">只看有评价的内容</span>
        </div>
    </div>
</template>

<script>
const POSITIVE = 0
const NEGATIVE = 1
const ALL = 2
export default {
    props: {
        ratings: {
            type: Array,
            default () {
                return []
            }
        },
        selectType: {
            type: Number,
            default: ALL
        },
        onlyContent: {
            type: Boolean,
            default: false
        },
        desc: {
            type: Object,
            default () {
                return {
                    all: '满意',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    }
}
</script>

<style lang="scss" scoped>
@import "../../common/scss/mixin";
.ratingSelect{
    .ratingType{
        margin: 0 18px;
        padding: 18px 0;
        @include border-1px(rgba(7,17,27,0.1));
        font-size: 0;
        .block{
            padding: 8px;
            line-height: 16px;
            font-size: 12px;
            color: rgb(77,85,93);
            border-radius: 1px;
            &:not(:last-child){
                margin-right: 8px;
            }
            .count{
                margin-left: 2px;
                font-size: 8px;
            }
            &.positive{
                background-color: rgba(0,160,220,0.2);
                &.active{
                    background-color: rgb(0,160,220);
                }
                
            }
            &.negative{
                background-color: rgba(77,85,93,0.2);
                &.active{
                    background-color: rgb(77,85,93);
                }
            }
            &.active{
                color: #fff;
            }
        }
    }
}
</style>

