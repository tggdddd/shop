<script setup>
import {getUserInfoApi, loginOutApi} from "@/api/business.js";
import {onActivated, onMounted, ref} from "vue";

const data = ref({});
onMounted(() => getUserInfoApi().then(
    res => {
      data.value = res.data
    }
))
onActivated(onMounted)
</script>

<template>
  <div>
    <div class="myBox">
      <div class="L"><img :src="data.avatar_text"/></div>
      <div class="C">
        <div class="tit">{{ data.nickname }}</div>
        <div class="sub">{{ data.mobile }}</div>
      </div>
    </div>

    <div class="allkbox"></div>
    <van-cell title="基本资料" is-link to="/business/profile"></van-cell>
    <van-cell title="邮箱认证" v-if="'0'===data.auth" is-link to="/business/auth"></van-cell>
    <van-cell title="我的收货地址" is-link to="/business/address"></van-cell>
    <van-cell title="我的订单" is-link to="/business/order"></van-cell>
    <van-cell title="消费记录" is-link  to="/business/consume"></van-cell>
<!--    <van-cell title="充值记录" is-link  to="/business/charge"></van-cell>-->
    <van-cell title="注销" is-link to="/business/login" @click="loginOutApi"></van-cell>
  </div>
</template>

<style scoped>

</style>