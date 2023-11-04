<script setup>
import {categoryDetailApi, categoryListApi} from "@/api/product.js";
import {computed, ref} from "vue";

const {id} = defineProps({
  id:{
    default:0
  }
})
const search = ref()
const products = ref([])
const size = ref(10)
const page = ref(1)
const refresh = ref(false)
const fetchLoading = ref(false)
const hasMore = ref(false)
const searchModal = ref(false)
const options = ref([
  {
    options: [
      {text: "全部推荐", value: 0},
    ],
    value: Number.parseInt(id),
    field: "id"
  },
  {
    options: [
      {text: "全部", value: "0"},
      {text: "新品", value: "1"},
      {text: "热销", value: "2"},
      {text: "推荐", value: "3"},
    ],
    value: "0",
    field: "flag"
  },
  {
    options: [
      {text: "最新", value: "0"},
      {text: "价格", value: "1"},
      {text: "库存", value: "2"}
    ],
    value: "0",
    field: "order"
  },
  {
    options: [
      {text: "降序", value: "0"},
      {text: "升序", value: "1"}
    ],
    value: "0",
    field: "sort"
  }
])
categoryListApi().then(
    res => {
      options.value[0].options.push(...res.data)
    }
)
const typeText = computed(() => {
  for (let op of options.value[0].options) {
    if (op.value === options.value[0].value) {
      return op.text
    }
  }
  return ""
})
const RefreshData = () => {
  page.value = 1
  products.value = []
  fetchData().finally(e => {
    refresh.value = false
  })
}
const fetchData = async () => {
  fetchLoading.value = true
  const data = {
    search: search.value,
    page: page.value,
    size: size.value
  }
  for (let option of options.value) {
    data[option.field] = option.value
  }
  categoryDetailApi(data).then(res => {
    res = res.data
    products.value.push(...res)
    hasMore.value = res.more
    page.value++
  }).finally(() => {
    fetchLoading.value = false;
  })
}
RefreshData()
</script>
<template>
  <div>
    <van-sticky :offset-top="0">
    <van-nav-bar
        :title="typeText"
        @click-left="$router.back()"
        left-arrow
        @clickRight="searchModal=!searchModal"
    >
      <template #right>
        <van-icon name="search" :size="18"></van-icon>
      </template>
    </van-nav-bar>
    <van-popup v-model:show="searchModal" position="top">
      <van-search
          v-model="search"
          placeholder="输入关键字..."
          input-align="center"
          @search="RefreshData"
      />
    </van-popup>
    </van-sticky>
    <van-dropdown-menu id="menu" swipe-threshold="4">
      <van-dropdown-item @change="RefreshData" v-for="item in options" v-model="item.value" :options="item.options"/>
    </van-dropdown-menu>
    <van-pull-refresh v-model="refresh" @refresh="RefreshData">
      <van-list
          v-model:loading="fetchLoading"
          :finished="!hasMore"
          finished-text="没有更多了"
          @load="fetchData"
      >
        <div class="mainWarp">
          <ul class="proul">
            <li v-for="item in products" :key="item.id">
              <router-link :to="'/product/detail/'+item.id"><img :src="item.thumb" style="height: 150px;object-fit: cover;"/></router-link>
              <router-link :to="'/product/detail/'+item.id">
                <p class="tit">{{ item.name }}</p>
              </router-link>
              <div class="price">
                <p>￥{{ item.price }}<span>￥{{ item.price }}</span></p>
              </div>
            </li>
          </ul>
        </div>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
@import "/assets/css/typelist.css";

:deep(.van-grid-item__text) {
  text-align: center;
}
</style>