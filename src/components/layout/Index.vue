<script setup>
import Menu from "@/components/layout/Menu.vue"
</script>

<template>
  <div class="empty-wrap">
    <div class="empty-wrap"
         :style="{position:'relative',height: $route.meta.menu?'calc(100% - var(--van-tabbar-height))':'100%'}">
      <router-view v-slot="{Component}">
        <KeepAlive v-if="$route.meta.cache">
          <component :is="Component"></component>
        </KeepAlive>
        <component :is="Component" v-else></component>
      </router-view>
    </div>
    <div v-show="$route.meta.menu">
      <Menu/>
    </div>
  </div>
</template>

<style scoped>

</style>