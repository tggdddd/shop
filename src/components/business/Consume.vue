<script setup>

import {onMounted, ref} from "vue";
import {consumeRecordApi, indexApi} from "@/api/product.js";

const list = ref([])
const size = ref(10)
const page = ref(1)
const fetchLoading = ref(false)
const hasMore = ref(false)
const refresh = ref(false)
const RefreshData = () => {
  page.value = 1
  list.value = []
  fetchData().finally(e => {
    refresh.value = false
  })
}
const fetchData = async () => {
  fetchLoading.value = true
  consumeRecordApi(page.value, size.value).then(res => {
    res = res.data
    list.value.push(...res.list)
    hasMore.value = res.more
    page.value++
  }).finally(() => {
    fetchLoading.value = false;
  })
}
onMounted(() => {
  RefreshData()
})
</script>

<template>
  <div>
    <van-sticky :offset-top="0">
    <van-nav-bar
        title="消费记录"
        @click-left="$router.back()"
        left-arrow
    >
    </van-nav-bar>
    </van-sticky>
      <van-pull-refresh v-model="refresh" @refresh="RefreshData">
        <van-empty image="error" description="暂无内容"  v-if="list?.length===0"/>
      <van-list
          v-else
          v-model:loading="fetchLoading"
          :finished="!more"
          finished-text="没有更多了"
          @load="fetchData"
      >
        <template v-for="item in list" :key="item.id">
          <van-divider></van-divider>
        <van-cell-group inset>
          <van-cell title="消费金额" :value="'￥'+item.total"></van-cell>
          <van-cell title="消费描述">
            <template #value>
              <div v-html="item.content"></div>
            </template>
          </van-cell>
          <van-cell title="消费时间"  :value="item.createtime_text"></van-cell>
        </van-cell-group>
        </template>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>

</style>