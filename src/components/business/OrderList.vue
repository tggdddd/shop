<script setup>
import {reactive, ref} from "vue";
import Order from "@/components/comon/Order.vue";
import {getBusinessOrdersApi} from "@/api/business.js";
import router from "@/router/index.js";
import {showConfirmDialog, showSuccessToast} from "vant";
import {cancelOrderApi, commentOrderApi, confirmReceivedApi, refundOrderApi} from "@/api/product.js";

const activeTab = ref(1)
const tabs = reactive([
  {
    title: "全部订单",
    name: "5"
  }, {
    title: "未支付",
    name: "0"
  },
  {
    title: "已支付",
    name: "1"
  },
  {
    title: "已发货",
    name: "2"
  },
  {
    title: "已收货",
    name: "3"
  },
  {
    title: "已完成",
    name: "4"
  },
  {
    title: "仅退款",
    name: "-1"
  },
  {
    title: "退款退货",
    name: "-2"
  },
  {
    title: "售后中",
    name: "-3"
  },
  {
    title: "退货成功",
    name: "-4"
  },
  {
    title: "退货失败",
    name: "-5"
  },
])
const refresh = ref()
const fetchLoading = ref(false)
const hasMore = ref(false)
const page = ref(1)
const size = ref(10)
const records = ref([])


const comment = ref("");
const commentRate = ref();
const commentDialog = ref(false);
const commentId = ref()

function commentClick(action) {
  return new Promise((resolve) => {
    if (action === "confirm") {
      commentOrderApi(commentId.value)
          .then(res => {
            showSuccessToast(res.msg)
          }).finally(() => {
        resolve(true)
      })
    } else {
      resolve(true)
    }

  })

}

function refreshData() {
  page.value = 1
  records.value = []
  fetchData().finally(e => {
    refresh.value = false
  })
}

const fetchData = async () => {
  fetchLoading.value = true
  getBusinessOrdersApi(activeTab.value, page.value, size.value).then(res => {
    records.value.push(...res.data)
  }).finally(() => {
    fetchLoading.value = false;
  })
}

function productsReduce(products) {
  const result = []
  for (let i = 0; i < products?.length; i++) {
    const res = products[i]
    const data = {
      thumb: res.product.thumb,
      name: res.product.name,
      price: res.product.price,
      num: res.pronum,
      contentBtn: "",
      click: () => {
        router.push({name: "product.detail", params: {id: res.product.id}})
      }
    }
    result.push(data)
  }
  return result
}

function detailOrder(id) {
  router.push({name: 'order.confirm', params: {id}})
}

function cancelOrder(id) {
  showConfirmDialog(
      {
        title: "请确认",
        message: "是否取消该订单",
        beforeClose: (action) =>
            new Promise((resolve) => {
              if (action === 'confirm') {
                cancelOrderApi(id)
                    .then(res => {
                      showSuccessToast("操作成功")
                      records.value.splice(records.value.findIndex(item => item.id === id), 1)
                    }).finally(() => {
                  resolve(true);
                })
              } else {
                resolve(true);
              }
            })
      })
}

function refund(id) {
  showConfirmDialog(
      {
        title: "请确认",
        message: "是否申请退款",
        beforeClose: (action) =>
            new Promise((resolve) => {
              if (action === 'confirm') {
                refundOrderApi(id)
                    .then(res => {
                      showSuccessToast(res.msg)
                      refreshData()
                    }).finally(() => {
                  resolve(true);
                })
              } else {
                resolve(true);
              }
            })
      })
}

function confirmReceived(id) {
  showConfirmDialog(
      {
        title: "请确认",
        message: "是否已收到货物",
        beforeClose: (action) =>
            new Promise((resolve) => {
              if (action === 'confirm') {
                confirmReceivedApi(id)
                    .then(res => {
                      showSuccessToast(res.msg)
                      refreshData()
                    }).finally(() => {
                  resolve(true);
                })
              } else {
                resolve(true);
              }
            })
      })

}

function refundAndProduct(id) {
  router.push({name: 'order.return', params: {id}})
}

function shippingStatus(id) {
  router.push({name: 'order.express', params: {id}})
}

function commentOrder(id) {
  commentId.value = id
  commentDialog.value = true
}
</script>

<template>
  <div>
    <van-sticky :offset-top="0">
    <van-nav-bar
        title="我的订单"
        @click-left="$router.back()"
        left-arrow
    >
    </van-nav-bar>
    </van-sticky>
    <van-tabs v-model:active="activeTab" @change="refreshData" swipeable>
      <van-tab v-for="item in tabs" :title="item.title" :name="item.name">
        <van-pull-refresh v-model="refresh" @refresh="refreshData">
          <van-empty image="error" description="暂无内容"  v-if="records?.length===0"/>
          <van-list
              v-else
              v-model:loading="fetchLoading"
              :finished="!hasMore"
              finished-text="没有更多了"
              @load="fetchData"
          >
            <Order
                v-for="order in records"
                :key="order.id"
                :orderCode="order.code"
                :status="order.status_text"
                :totalPrice="order.amount"
                :create-time="order.createtime"
                :products="productsReduce(order.products)"
                :footer-btns="[
                  {
                    text:'订单详情',
                    hidden: Number.parseInt(order.status)!==0,
                    clickFn:()=>{detailOrder(order.id)}
                  },
                  {
                      text:'查看物流',
                    hidden: order.expresscoode&&order.expresscoode.length,
                    clickFn:()=>{shippingStatus(order.id)}
                  },
                  {
                    text:'取消订单',
                    hidden: Number.parseInt(order.status)!==0,
                    clickFn:()=>{cancelOrder(order.id)}
                  },
                  {
                    text:'申请退款',
                    hidden: Number.parseInt(order.status)!==1,
                    clickFn:()=>{refund(order.id)}
                  },
                  {
                      text:'退货退款',
                      hidden: [0,1].includes(Number.parseInt(order.status)),
                    clickFn:()=>{refundAndProduct(order.id)}
                  },
                  {
                      text:'确认收货',
                       hidden: ![2, 1, -3,-5].includes(Number.parseInt(order.status)),
                    clickFn:()=>{confirmReceived(order.id)}
                  },
                  {
                      text:'评价',
                    hidden: Number.parseInt(order.status)!==3,
                    clickFn:()=>{commentOrder(order.id)}
                  },
              ]"
            />
          </van-list>
        </van-pull-refresh>
      </van-tab>
    </van-tabs>

    <van-dialog v-model:show="commentDialog" :beforeClose="commentClick" confirm-button-text="评价" title="评价"
                show-cancel-button>
      <van-cell-group>
        <van-field label="满意度">
          <template #input>
            <van-rate
                v-model="commentRate"
                :size="25"
                color="#ffd21e"
                void-icon="star"
                void-color="#eee"
            />
          </template>
        </van-field>

        <van-field
            v-model="comment"
            rows="2"
            autosize
            type="textarea"
            maxlength="255"
            placeholder="请输入评价内容"
            show-word-limit
        />
      </van-cell-group>
      <van-cell>

      </van-cell>
    </van-dialog>
  </div>
</template>

<style scoped>

</style>