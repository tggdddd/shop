<script setup>
import {nextTick, onMounted, ref} from "vue";
import {categoryApi} from "@/api/product.js";
  const selectedIndex = ref()
  const category = ref([])
import "@/../public/assets/js/jquery-1.8.2.min.js";
import "@/../public/assets/js/scrollTab.js";
import router from "@/router/index.js";
onMounted(async ()=>{
  category.value = (await categoryApi()).data
  await nextTick(() => {
    window.dispatchEvent(new Event("load"))
  })
})
function more(id){
  router.push({
    name: "category.detail",
    params:{
      id: id
    }
  })
}
</script>
<template>
  <div class="mainWarp">
    <div class="typeboxtit">
      <div class="tit">
        <p>商品分类</p>
      </div>
    </div>
    <div class="aui-scrollView">
      <div class="m-scrolltab" data-ydui-scrolltab>
        <div class="scrolltab-nav">
          <a href="javascript:;"  class="scrolltab-item" v-for="item in category" :key="item.id">
            <div
                class="scrolltab-title">{{ item.name }}
            </div>
          </a>
        </div>
        <div class="scrolltab-content">
          <div class="scrolltab-content-item" v-for="item in category" :key="item.id">
            <div>
<!--              <div class="aui-ad-head clearfix">-->
<!--                <a href="list.html"><img src="/assets/images/4.jpg" alt=""></a>-->
<!--                <a href="list.html"><img src="/assets/images/15.jpg" alt=""></a>-->
<!--                <a href="list.html" style="margin-right:0"><img src="/assets/images/5.jpg" alt=""></a>-->
<!--              </div>-->
              <h2 style="font-weight: bold">{{item.name}}<span style="padding-left: .2em"></span> <van-tag @click="more(item.id)" type="primary" size="medium">全部</van-tag></h2>
              <div>
<!--              <div class="aui-class-ad-img"><a href="javascript:;"> <img src="/assets/images/8.jpg" alt=""> </a>-->
              </div>
                <div class="aui-flex-links">
                  <van-grid :column-num="3" :border="false">
                    <van-grid-item :to="'/product/detail/'+product.id" v-for="product in item.products" :key="product.id" :icon="product.thumb" :text="product.name" />
                  </van-grid>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
@import "/assets/css/typelist.css";
:deep(.van-grid-item__text){
  text-align: center;
}
</style>