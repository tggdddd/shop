<script setup>
import {ref, useAttrs} from "vue";

defineProps({
  type: {
    default: ""
  },
  name:{
    default:""
  },
  phone:{
    default:""
  },
  address:{
    default:""
  }
})
defineOptions({
  inheritAttrs: false
})
</script>

<template>
  <van-cell
      v-if="type"
      v-bind="$attrs"
      is-link
      icon="plus"
      style="padding: var(--van-contact-card-padding);">
    <template #title>
      <div><span>{{name}}</span><span style="margin-left:.4em">{{phone}}</span></div>
      <div>{{address}}</div>
    </template>
    <template #icon>
      <van-icon name="contact" size="18" style="margin-right:12px;"/>
    </template>
  </van-cell>
  <van-cell  v-else v-bind="$attrs" :title="'请选择收货地址'"
            is-link
            icon="plus"
            style="
      padding: var(--van-contact-card-padding);">
    <template #icon>
      <van-icon name="plus" size="24" color="white" style="
        background:var(--van-primary-color);border-radius:2px;margin-right:12px;"/>
    </template>
  </van-cell>
</template>

<style scoped>
.van-cell::before {
  position: absolute;
  right: 0;
  bottom: 0;
  left: 0;
  height: 2px;
  background: repeating-linear-gradient(-45deg, var(--van-warning-color) 0, var(--van-warning-color) 20%, transparent 0, transparent 25%, var(--van-primary-color) 0, var(--van-primary-color) 45%, transparent 0, transparent 50%);
  background-size: 80px;
  content: "";
}
</style>