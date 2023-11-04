<script setup>
import "@/../public/assets/js/jquery-1.8.2.min.js";
import {deleteCartApi, productCartApi, submitOrderApi, updateCartApi} from "@/api/product.js";
import {computed, reactive, ref} from "vue";
import {showFailToast} from "vant";
import router from "@/router/index.js";

const checkedGroup = ref()
const checkboxGroup = ref()
const carts = reactive([])
productCartApi().then(res => {
  carts.push(...res.data)
})

function changeNum(item, num) {
  if (item.num + num < 1) {
    return
  }
  item.num += num;
}

async function deleteCart(id) {
  deleteCartApi(id).then(() => {
    for (let i = 0; i < carts.length; i++) {
      if (carts[i].id === id) {
        carts.splice(i, 1)
      }
    }
  })
}

const totalPrice = computed(() => {
  let total = 0;
  checkedGroup?.value?.forEach(index => {
    const cart = carts[index]
    let price = Math.round(cart.product.price * 100) * cart.num
    total += price
  })
  // 保存状态
  const data = []
  for (let i = 0; i < carts.length; i++) {
    const item = {id: carts[i].id, num: carts[i].num, checked: 0}
    checkedGroup?.value?.forEach(index => {
      if (index == i) {
        item.checked = 1
      }
    })
    data.push(item)
  }
  updateCartApi(data)
  return total;
})
const selectedAll = computed({
  get: () => {
    return carts?.length === checkedGroup?.value?.length
  },
  set: () => {
    checkboxGroup?.value.toggleAll()
  }
})

async function onSubmit() {
  const data = []
  checkedGroup?.value?.forEach(index => {
    const cart = carts[index]
    data.push({
      id: cart.id,
      num: cart.num
    })
  })
  if (0 === data.length) {
    showFailToast("请选择商品");
    return
  }
  submitOrderApi(data).then(res => {
    router.push({name: "order.confirm", params: {id: res.data}})
  })
}
</script>

<template>
  <div>
    <van-sticky :offset-top="0">
    <van-nav-bar
        title="购物车"
    >
    </van-nav-bar>
    </van-sticky>
    <div class="card-list" v-if="carts.length">
      <!-- 商品 -->
      <van-checkbox-group v-model="checkedGroup" ref="checkboxGroup">
        <van-swipe-cell v-for="(item,index) in carts" :key="item.id">
          <div class="card-wrap">
            <van-checkbox :name="index" checked-color="#ff6034"></van-checkbox>
            <van-card
                :price="item.product.price *100 * item.num /100"
                :title="item.product.name"
                :thumb="item.product.thumb"
            >
              <template #desc>
                <div style="color: #969799">库存：{{ item.product.stock }}</div>
                <div>单价：￥{{ item.product.price }}</div>
              </template>
              <template #num>
                <van-stepper
                    v-model="item.num"
                    theme="round"
                    button-size="22"
                    disable-input
                    @minus="changeNum(item,-1)"
                    @plus="changeNum(item,1)"
                />
              </template>
            </van-card>
          </div>
          <template #right>
            <van-button square @click="deleteCart(item.id)" text="删除" type="danger" class="delete-button"/>
          </template>
        </van-swipe-cell>
      </van-checkbox-group>

      <!-- 合计 -->
      <van-submit-bar :style="{bottom: $route.meta.menu?'var(--van-nav-bar-height)':'0'}" :price="totalPrice"
                      button-text="去结算" @submit="onSubmit">
        <van-checkbox v-model="selectedAll" checked-color="#ff6034">全选</van-checkbox>
      </van-submit-bar>
    </div>

    <!-- 购物车为空 -->
    <div class="gwcbox" v-else>
      <p style="text-align: center;margin-top:24px">
        <van-icon name="shopping-cart-o" size="128" color="#cdcdcd"/>
      </p>

      <div class="gwckbox">
        <div class="T1"><img src="/assets/images/kgwc.png">
          <p>购物车还是空的</p>
        </div>
        <div class="T2">再忙也不能亏待自己啦，快去挑选好货吧~</div>
        <router-link to="/category/0">逛一逛</router-link>
      </div>
    </div>
  </div>
</template>

<style scoped>

.van-swipe-cell {
  &:not(:first-child) {
    margin-top: var(--van-padding-xs);
  }

  .card-wrap {
    display: flex;
    background: var(--van-card-background);

    .van-checkbox {
      flex-basis: 20px;
      transform: translateX(10px);
      z-index: 2;
    }

    .van-card {
      margin-top: 0;
      flex-grow: 1;
    }
  }

  .delete-button {
    height: 100%;
  }
}
</style>