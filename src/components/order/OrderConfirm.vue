<script setup>
import {cancelOrderApi, getOrderDetail, payOrderApi} from "@/api/product.js";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import router from "@/router/index.js";
import {ref} from "vue";
import CAddress from "@/components/comon/CAddress.vue";

const info = ref({})
const id = defineProps(["id"])
const remark = ref("")
getOrderDetail(id).then(res => {
  info.value = res.data
}).catch(err => {
  showFailToast(err)
  router.replace({name: 'cart'})
})

function cancelOrder() {
  showConfirmDialog(
      {
        title: "请确认",
        message: "是否取消该订单",
        beforeClose: (action) =>
            new Promise((resolve) => {
              if (action === 'confirm') {
                cancelOrderApi(id)
                    .then(res => {
                      resolve(true);
                      showSuccessToast("操作成功")
                      router.back()
                    })
              } else {
                resolve(true);
              }
            })
      })
}
function pay(){
  payOrderApi(id)
      .then(res => {
        showSuccessToast(res.msg)
        router.back()
      })
}
</script>

<template>
  <van-nav-bar
      title="支付订单"
      @click-left="$router.back()"
      left-arrow
  >
  </van-nav-bar>
  <CAddress :type="info?.address?.id"
            :to="{name:'business.address',query:{action:'order_address',actionid:info?.id}}"
            :name="info?.address?.consignee"
            :phone="info?.address?.mobile"
            :address="info?.address?.address_detail"
  ></CAddress>
  <van-card
      v-for="(item) in info.products"
      :price="item.total"
      :title="item.product.name"
      :thumb="item.product.thumb"
  >
    <template #desc>
      <div style="color: #969799">数量：{{ item.pronum }}</div>
      <div>单价：￥{{ item.price }}</div>
    </template>
  </van-card>
  <van-cell-group inset>
    <div class="van-cell justify-between">
      <div>订单号</div>
      <div class="van-cell__value">{{ info.code }}</div>
    </div>
    <div class="van-cell justify-between">
      <div>创建时间</div>
      <div class="van-cell__value">{{ $formatTime(info.createtime) }}</div>
    </div>
    <div class="van-cell justify-between">
      <div>到期时间</div>
      <van-count-down :time="info.createtime" style="color: var(--van-warning-color)" format="DD 天 HH 时 mm 分 ss 秒"/>
    </div>

    <van-field
        v-model="remark"
        autosize
        type="textarea"
        rows="2"
        show-word-limit
        maxlength="100"
        placeholder="请输入订单备注"
    />
  </van-cell-group>
  <van-action-bar>
    <van-action-bar-icon icon="service-o" url="tel:15014586591" text="客服"/>
    <van-action-bar-button type="danger" @click="cancelOrder" text="取消订单"/>
    <van-action-bar-button type="warning" @click="pay" text="确认支付"/>
  </van-action-bar>
</template>

<style scoped>
.justify-between {
  justify-content: space-between;
}
</style>