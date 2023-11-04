<script setup>
import {getExpressDetailApi} from "@/api/product.js";
import {showFailToast} from "vant";
import router from "@/router/index.js";
import {ref} from "vue";
const {id} = defineProps(['id'])
const info = ref({})
getExpressDetailApi(id).then(res => {
  let data = res.data
  data.list.reverse()
  info.value = data
}).catch(err => {
  showFailToast(err)
  router.back()
})
</script>


<template>
  <div>
    <van-sticky :offset-top="0">
    <van-nav-bar
        title="物流信息"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    </van-sticky>
  </div>
  <van-contact-card type="edit" :name="info.name||''"  :editable="false"  :tel="info.phone||''"></van-contact-card>
  <van-steps direction="vertical" :active="0">
    <van-step v-for="item in info.list">
      <h3>{{item.AcceptStation}}</h3>
      <p>{{item.AcceptTime}}</p>
    </van-step>
  </van-steps>

</template>

<style scoped>

</style>