<script setup>
import {productAddCartApi, productDetailApi, productStarApi} from "@/api/product.js";
import {ref} from "vue";
import {showConfirmDialog, showSuccessToast} from "vant";
import router from "@/router/index.js";

const {id} = defineProps(["id"]);
const product = ref({})
const showShare = ref(false)
const options = [
  [
    {name: '微信', icon: 'wechat'},
    {name: '朋友圈', icon: 'wechat-moments'},
    {name: '微博', icon: 'weibo'},
    {name: 'QQ', icon: 'qq'},
  ],
  [
    {name: '复制链接', icon: 'link'},
    {name: '分享海报', icon: 'poster'},
    {name: '二维码', icon: 'qrcode'},
    {name: '小程序码', icon: 'weapp-qrcode'},
  ],
];
productDetailApi(id).then(res => {
  product.value = res.data;
})

async function star() {
  const action = !product.value.star
  const data = await productStarApi(id, action)
  product.value.star = action
  showSuccessToast(data.msg)
}

async function addCart() {
  const num = (await productAddCartApi(id)).data
  product.value.cart = num
}

function share(option, index) {
  console.log("点击了", option.name);
}

function purchase(){
  showConfirmDialog({
    title:"温馨提示",
    message:"是否跳转到购物车进行结算",
    beforeClose(action) {
      if (action === "confirm"){
        router.push({name:'cart'})
      }
      return true
    }
  })
}
</script>

<template>
  <van-nav-bar
      title="详情描述"
      @click-left="$router.back()"
      left-arrow
  >
    <template #right>
      <van-icon @click="showShare=!showShare" name="ellipsis" :size="18"/>
    </template>
  </van-nav-bar>
  <van-share-sheet
      v-model:show="showShare"
      title="立即分享给好友"
      :options="options"
      @select="share"
  />
  <van-swipe :autoplay="3000" lazy-render>
    <van-swipe-item v-for="(image,index) in product.thumbs" :key="index">
      <van-image height="196" block :src="image" fit="contain">
        <template v-slot:error>加载失败</template>
      </van-image>
    </van-swipe-item>
  </van-swipe>
  <div class="detailbox" style="background: white">
    <h4>{{ product.name }}</h4>
    <div class="price"><em>￥</em>{{ product.price }}<span>￥{{ product.price }}</span>
      <b>已售{{ product.sale }}件</b>
    </div>
  </div>
  <div v-html="product.content"></div>
  <van-action-bar>
    <van-action-bar-icon icon="service-o" url="tel:15014586591" text="客服"/>
    <van-action-bar-icon icon="cart-o" to="/cart" :badge="product.cart=='0'?null:product.cart" text="购物车"/>
    <van-action-bar-icon @click="star" :icon="product.star?'star':'star-o'" :color="product.star?'#ff5000':'#323233'"
                         text="收藏"/>
    <van-action-bar-button type="warning" @click="addCart" text="加入购物车"/>
    <van-action-bar-button type="danger" @click="purchase" text="立即购买"/>
  </van-action-bar>
</template>

<style scoped>
</style>