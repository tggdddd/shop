<script setup>
import {ref} from "vue";
import {addressListApi} from "@/api/business.js";
import router from "@/router/index.js";
import {useRoute} from "vue-router";
import {changeOrderAddressApi} from "@/api/product.js";

const route = useRoute();
const chosenAddressId = ref();
const addressList = ref();
addressListApi().then(res => {
  const data = res.data
  for (let i = 0; i < data.length; i++) {
    if (data[i].status == 1) {
      data[i].isDefault = true
    }
    data[i].address = data[i].address_detail
    data[i].name = data[i].consignee
    data[i].tel = data[i].mobile
  }
  addressList.value = data
})

function onAdd() {
  router.push(
      {
        name: "business.address.edit",
        params: {id: 0}
      }
  )
}
function onEdit(item, index) {
  router.push(
      {
        name: "business.address.edit",
        params: {id: item.id}
      }
  )
}



const action = route.query.action
const actionid = route.query.actionid
function selectedAddress(item) {
  if (action && actionid && action === "order_address"){
    changeOrderAddressApi(item.id,actionid)
        .then(res=>{
          router.replace({name:"order.confirm",params:{id:actionid}})
        })
  }
}
</script>

<template>
  <div>
    <van-sticky :offset-top="0">
    <van-nav-bar
        title="地址管理"
        @click-left="$router.back()"
        left-arrow
    >
    </van-nav-bar>
    </van-sticky>
    <van-address-list
        v-model="chosenAddressId"
        :list="addressList"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
        @select="selectedAddress"
    />
  </div>

</template>

<style scoped>

</style>