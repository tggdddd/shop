<script setup>
import {indexApi} from "@/api/product.js";
import {onMounted, ref} from "vue";

const carousel = ref()
const category = ref()
const shops = ref([])
const limit = ref(10)
const page = ref(1)
const shopFetchLoading = ref(false)
const shopHasMore = ref(false)
const refresh = ref(false)
const RefreshData = () => {
  page.value = 1
  shops.value = []
  fetchData().finally(e => {
    refresh.value = false
  })
}
const fetchData = async () => {
  shopFetchLoading.value = true
  indexApi(page.value, limit.value).then(res => {
    res = res.data
    if (res.carousel) {
      carousel.value = res.carousel
    }
    if (res.category) {
      category.value = res.category
    }
    shops.value.push(...res.shops)
    shopHasMore.value = res.shopsMore
    page.value++
  }).finally(() => {
    shopFetchLoading.value = false;
  })
}
onMounted(() => {
  RefreshData()
})
</script>

<template>
  <div>
    <van-pull-refresh v-model="refresh" @refresh="RefreshData">
      <!-- 头部 -->
      <div class="topBox" @click="$router.push({name:'category.detail',params:{id:0}})">
        <div class="L"><a href="#">LOGO</a></div>
        <div class="C">
          <div class="saerchbox">
            <input name="" readonly type="text" placeholder="请输入您要搜索的内容"><img src="/assets/images/ss.png">
          </div>
        </div>
        <div class="R"><img src="/assets/images/tr.png"></div>
      </div>

      <!-- 轮播图 -->
      <van-swipe :autoplay="3000" lazy-render>
        <van-swipe-item v-for="image in carousel" @click="$router.push({path:'/product/detail/'+image.id})" :key="image.id">
          <van-image style="ackground: #c8d7ff2b;padding: 2px;box-sizing: border-box;" height="196" block :src="image.thumb">
            <template v-slot:error>加载失败</template>
          </van-image>
        </van-swipe-item>
      </van-swipe>
      <!-- 分类 -->
      <van-grid :border="false">
        <van-grid-item v-for="item in category" :key="item.id" :to="'/category/'+item.id">
          <van-image :src="item.thumb" fit="contain" height="60" round width="60">
            <template v-slot:error>加载失败</template>
          </van-image>
          <p>{{ item.name }}</p>
        </van-grid-item>
      </van-grid>

      <!--  推荐商品-->

      <van-list
          v-model:loading="shopFetchLoading"
          :finished="!shopHasMore"
          finished-text="没有更多了"
          @load="fetchData"
      >
        <van-grid :border="false" :column-num="2">
          <van-grid-item v-for="item in shops" :key="item.id" :to="{name:'product.detail',params:{id:item.id}}">
            <van-image style="border-radius: 8px;overflow:hidden;" height="120" width="100%" fit="fill" :src="item.thumb">
              <template v-slot:error>加载失败</template>
            </van-image>
            <p class="con-p">￥{{ item.price }}</p>
          </van-grid-item>
        </van-grid>
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<style scoped>
.con-p {
  text-align: left;
  height: 20px;
  line-height: 20px;
  background: #eeeeee44;
  font-size: 14px;
  color: rgb(80 80 80 / 77%);
  width: 100%;
}

.con-p span {
  font-size: 14px;
}
</style>