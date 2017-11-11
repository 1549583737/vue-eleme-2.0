<<template>
    <div class="ratingSelect">
        <div class="ratingType border-1px">
            <span @click="select(2, $event)" class="block positive" :class="{'active': buttonType === 2}">{{desc.all}}<span class="count">{{ratings.length}}</span></span>
            <span @click="select(0, $event)" class="block positive" :class="{'active': buttonType === 0}">{{desc.positive}}<span class="count">{{positiveNum.length}}</span></span>
            <span @click="select(1, $event)" class="block negative" :class="{'active': buttonType === 1}">{{desc.negative}}<span class="count">{{negativeNum.length}}</span></span>
        </div>
        <div @click="toggleContent($event)" class="switch" :class="{'on': showContent}">
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
                    all: '全部',
                    positive: '满意',
                    negative: '不满意'
                }
            }
        }
    },
    data () {
        return {
            buttonType: 2,
            showContent: false
        }
    },
    computed: {
        positiveNum () {
            return this.ratings.filter((rating) => {
                return rating.rateType === POSITIVE
            })
        },
        negativeNum () {
            return this.ratings.filter((rating) => {
                return rating.rateType === NEGATIVE
            })
        }
    },
    methods: {
        select (type, event) {
             if (!event._constructed) {
                return
            }
            this.buttonType = type
            this.$emit('select', type)
        },
        toggleContent (event) {
            if (!event._constructed) {
                return
            }
            this.showContent = !this.showContent
            this.$emit('toggle', this.showContent)
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
    .switch{
        padding: 12px 18px;
        line-height: 24px;
        color: rgb(147, 153,159);
        font-size: 0;
        .fa{
            display: inline-block;
            font-size: 24px;
            vertical-align: top;
        }
        .text{
            display: inline-block;
            margin-left: 4px;
            font-size: 12px;
            vertical-align: top;
        }
        &.on{
            .fa{
                color: #00c850;
            }
        }
    }
}
</style>

