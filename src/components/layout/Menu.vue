<script setup>
  import {useRoute} from 'vue-router'
  import {onMounted, ref, watch, watchEffect} from "vue";
  const route = useRoute()
  const active = ref()
  watchEffect(()=>{
    active.value = route.name
  })
</script>

<template>
  <van-tabbar v-model="active">
    <van-tabbar-item replace to="/home" name="home" icon="home-o">首页</van-tabbar-item>
    <van-tabbar-item replace to="/category" name="category" icon="search">分类</van-tabbar-item>
    <van-tabbar-item to="/cart" name="cart" icon="friends-o">购物车</van-tabbar-item>
    <van-tabbar-item replace to="/business/index" name="business.index" icon="setting-o">我的</van-tabbar-item>
  </van-tabbar>
</template>

<style scoped>

</style>