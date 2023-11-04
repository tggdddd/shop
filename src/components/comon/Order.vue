<script setup>
defineProps(
    {
      orderCode: {default: "",},
      status: {default: "",},
      statusColor: {default: "#b97d2e",},
      createTime:{default:""},
      products:{
        default:[
            {
              // thumb: {default: ""},
              // name: {default: ""},
              // desc: {default: ""},
              // price: {default: ""},
              // num: {default: ""},
              // contentBtn:{default:"按钮"},
          }
        ]
      },

      contentBtn: {default: ""},
      express: {default: ""},
      cardRadius: {default: 0},
      totalPrice:{default:0},
      footerBtns: {
        default: [
          // {
          //   text: "",
          //   clickFn: function () {
          //   }
          // }
        ]
      },
      fit: {default: "fill"},
    }
)
const emits = defineEmits(["contentBtnClick"])
function formatPrice(price){
  let str = price.toString()
  let pointIndex = str.indexOf(".")
  if (pointIndex === -1){
    return str+".00";
  }else if (pointIndex===str.length-2){
    return str+"0"
  }
  return str
}
function voidFn(){}
</script>

<template>
  <div class="order-card" :style="{borderRadius: cardRadius}">
    <div class="order-header">
      <div class="order-header-left">
        <slot name="title">
          订单号：{{ orderCode }}
        </slot>
      </div>
      <div class="order-header-right" :style="{color: statusColor}">
        <slot name="headDesc">
          {{ status }}
        </slot>
      </div>
    </div>
    <div class="order-content" @click.stop="product.click||voidFn" v-for="(product,index) in products">
      <slot name="thumb">
        <img class="order-content-left" :style="{objectFit:fit}" :src="product.thumb"/>
      </slot>
      <div class="order-content-right">
        <div class="order-content-title">
          <slot name="name">
            {{ product.name }}
          </slot>
        </div>
        <div class="order-content-desc">
          <slot name="desc">
            {{ product.desc }}
          </slot>
        </div>
        <div class="order-content-footer">
          <div class="order-content-footer-left">
            <slot name="price">
                <span class="order-shop-price"  v-if="product.price">
                ￥{{ formatPrice(product.price) }}
            </span>
            </slot>
            <slot name="num">
                <span class="order-shop-num" v-if="product.num">
                {{ product.num }}
            </span>
            </slot>
          </div>
          <div class="order-content-footer-right">
            <slot name="content-btn">
              <div v-if="product.contentBtn||contentBtn" @click.stop="$emit('contentBtnClick',product,index,this)" class="order-content-footer-btn">{{product.contentBtn || contentBtn }}</div>
            </slot>
          </div>
        </div>
      </div>
    </div>
    <div class="order-footer"  v-if="express||totalPrice||footerBtns||createTime">
      <div class="order-footer-info"  v-if="express||totalPrice||createTime">
        <slot name="footer-info">
          <div class="order-express left" v-if="createTime">
            创建时间：{{ $formatTime(createTime) }}
          </div>
          <div class="order-express" v-if="express">
            运费：￥{{ formatPrice(express) }}
          </div>
          <div class="order-total-price"  v-if="totalPrice">
            总金额：￥{{ formatPrice(totalPrice) }}
          </div>
        </slot>
      </div>
      <div class="order-footer-info" v-if="footerBtns">
        <slot name="footer-btn">
          <div :class="'order-footer-btn'" v-show="!item.hidden" @click.stop="item.clickFn" v-for="item in footerBtns">
            {{ item.text }}
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>

<style scoped>
.order-card {
  &:not(:first-child){
    margin-top: 8px;
  }
  font-size: 12px;
  padding: 8px 12px;
  background: var(--van-card-background);

  &, & * {
    box-sizing: border-box
  }

  color: #000;

  .order-header {
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid #00000004;
    .left {
      color: #000;
    }

    .right {

    }
  }

  .order-content {
    display: flex;
    --order-content-height: 72px;
    line-height: calc(var(--order-content-height) / 4);
    height: var(--order-content-height);
    font-size: .94em;

    .order-content-left {
      flex: 0 0;
      width: var(--order-content-height);
      height: var(--order-content-height);
      object-fit: fill;
    }

    .order-content-right {
      padding-left:8px;
      flex: 1 1;
      display: flex;
      flex-direction: column;
      justify-content: space-evenly;
      .order-content-title {
        line-height: 1.4em;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        overflow: hidden;
        word-break: break-all;
      }

      .order-content-desc {
        color: #7e7e7e;
        font-size: .85em;
      }

      .order-content-footer {
        display: flex;
        justify-content: space-between;
        position: relative;

        .order-content-footer-left {
          .order-shop-price {
            font-size: 1.04em;
          }

          .order-shop-num {
            color: #7e7e7e;
            margin-left: .5em;

            &::before {
              content: "x";
            }
          }
        }

        .order-content-footer-right {
          position: absolute;
          bottom: 0;
          right: 0;

          .order-content-footer-btn {
            text-align: center;
            border-radius: 16px;
            border: 1px solid #cecece;
            opacity: .7;
            font-size: .9em;
            padding: .1em .6em;
          }
        }
      }
    }
  }

  .order-footer {
    border-top: 1px solid #0000000e;

    .order-footer-info {
      margin-top: .2em;
      display: flex;
      flex-wrap:wrap;
      justify-content: flex-end;
      .left{
        margin-right: auto;
      }
      .order-express {
        font-size: .94em;
        color: #7e7e7e;
        margin-left: .7em;
      }

      .order-total-price {
        font-size: .94em;
        margin-left: .7em;
      }

      .order-footer-btn {
        text-align: center;
        border-radius: 16px;
        opacity: .7;
        font-size: .9em;
        padding: .1em 1em;
        background: #ececec;
        margin-left: .7em;
        text-wrap: nowrap;
      }
    }
  }
}
</style>