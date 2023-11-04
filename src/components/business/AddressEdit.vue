<script setup>
import {areaList} from "@vant/area-data";
import {addressDeleteApi, addressDetailApi, addressSaveOrUpdateApi} from "@/api/business.js";
import {reactive} from "vue";
import {showSuccessToast} from "vant";
import router from "@/router/index.js";

const {id} = defineProps(["id"])
const addressInfo = reactive({})
if (id !== "0") {
  addressDetailApi(id).then(res => {
    const data = res.data
    if (data.status === "1") {
      addressInfo.isDefault = true
    }
    addressInfo.name = data.consignee
    addressInfo.areaCode = data.district || data.city || data.province
    addressInfo.addressDetail = data.address
    addressInfo.tel = data.mobile
  })
}
const onSave = (info) => {
  const data = {
    "consignee": info.name,
    "mobile": info.tel,
    "area": info.areaCode,
    "status": info.isDefault ? 1 : 0,
    "address": info.addressDetail
  }
  if (id != 0) {
    data.id = id
  }
  addressSaveOrUpdateApi(data).then(() => {
    showSuccessToast({
      message: "操作成功",
      duration: "200"
    })
    router.back()
  })
};
const onDelete = () => {
  addressDeleteApi(id).then(() => {
    showSuccessToast({
      message: "操作成功",
      duration: "200",
      onClose: () => {
        router.back()
      }
    })
  })
};
</script>

<template>
  <div>
    <van-nav-bar
        title="收货地址"
        @click-left="$router.back()"
        left-arrow
    >
    </van-nav-bar>
    <van-address-edit
        :area-list="areaList"
        :show-delete="id!=0"
        :address-info="addressInfo"
        show-set-default
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
    />
  </div>
</template>

<style scoped>

</style>