<script setup>
import {getOrderDetail, getReturnDetailApi, returnSubmitApi, submitReturnExpressApi} from "@/api/product.js";
import {showConfirmDialog, showFailToast, showSuccessToast} from "vant";
import {reactive, ref} from "vue";
import Order from "@/components/comon/Order.vue";

const {id} = defineProps(['id'])
const active = ref(0)
const returnReason = ref("")
const fileList = ref([])
const expressCode = ref("")
const tipLoading = ref(false)
const order = ref({})
const returnOrder = ref({})
const returnList = reactive([])
const returnListNum = reactive({})

function requireReturn() {
  showConfirmDialog({
    title: "确定要退货吗",
    beforeClose: function (action) {
      return new Promise((resolve) => {
        if (action === 'confirm') {
          const data = {
            reason: returnReason.value,
            id: id,
            products: returnList.map(item => {
              return order.value.products[item].id + "," + returnListNum[item]
            })
          }
          if (data.reason.length === 0) {
            showFailToast("退货原因不能为空");
            resolve(true)
            return
          }
          if (data.products == null || data.products.length === 0) {
            showFailToast("请选择退货商品");
            resolve(true)
            return;
          }
          data.products = data.products.reduce((a, b) => a + "," + b)
          const formData = new FormData();
          const files = fileList.value.map(e => e.file)
          for (let file of files) {
            formData.append("files[]", file);
          }
          returnSubmitApi(data, formData)
              .then(res => {
                showSuccessToast(res.msg)
                nextTab()
              }).finally(() => {
            resolve(true);
          })
        } else {
          resolve(true);
        }
      })
    }
  })
}

function submitExpress() {
  showConfirmDialog({
    title: "请确认物流单号",
    message: expressCode.value,
    beforeClose: (action) =>
        new Promise((resolve) => {
          if (action === 'confirm') {
            submitReturnExpressApi(returnOrder.value.id, expressCode.value).then(res => {
              showSuccessToast(res.msg)
              load()
            })

            resolve(true);
          } else {
            resolve(true);
          }
        })
  })
}

function productBtnClick(product, index) {
  let pos = returnList.findIndex(value => value === index);
  if (pos === -1) {
    returnList.push(index)
  } else {
    returnList.splice(pos, 1)
  }
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
      contentBtn: "选择"
    }
    result.push(data)
  }
  return result
}

function tipClick() {
  tipLoading.value = true
  setTimeout(() => {
    showSuccessToast("已提醒")
    tipLoading.value = false
  }, 1200)
}

function nextTab() {
  load()
}

function load() {
  return new Promise(resolve => {
    getOrderDetail(id).then(res => {
      let data = res.data
      order.value = data
      getReturnDetailApi(data.code).then(res => {
        returnOrder.value = res.data
        expressCode.value = res.data.expresscode
      })
      returnReason.value = data.refundreason
      if (Number.parseInt(data.status) === -2) {
        active.value = 1
      } else if (Number.parseInt(data.status) === -3) {
        active.value = 2
      } else if (Number.parseInt(data.status) === -4 || Number.parseInt(data.status) === -5) {
        active.value = 3
      } else {
        active.value = 0
      }
    }).catch(err => {
      showFailToast(err)
    }).finally(() => {
      resolve()
    })
  })
}

load();
</script>


<template>
  <div>
    <van-nav-bar
        title="退货退款"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
  </div>
  <van-steps :active="active" :active-icon="order?.status==-5?'close':'success'"
             :active-color="order?.status==-5?'#ffa160':'#07c160'">
    <van-step>申请退货</van-step>
    <van-step>商家审核</van-step>
    <van-step>填写物流</van-step>
    <van-step v-if="order?.status==-5">退货失败</van-step>
    <van-step v-else>退款成功</van-step>
  </van-steps>
  <div v-show="active===0">
    <van-divider></van-divider>
    <van-cell-group inset>
      <Order
          :key="order.id"
          :orderCode="order.code"
          :totalPrice="order.amount"
          :create-time="order.createtime"
          :products="productsReduce(order.products)"
          @contentBtnClick="productBtnClick"
      />
      <van-cell v-for="item in returnList" :title="order.products[item].product.name">
        <template #value>
          <van-stepper v-model="returnListNum[item]" :max="order.products[item].pronum"/>
        </template>
      </van-cell>

      <van-field
          v-model="returnReason"
          rows="2"
          autosize
          type="textarea"
          maxlength="255"
          placeholder="请输退货原因"
          show-word-limit
      />
      <van-field
      >
        <template #input>
          <van-uploader v-model="fileList" multiple :max-count="7"/>
        </template>
      </van-field>
      <van-cell>
        <van-button type="primary" @click="requireReturn" size="small" text="申请"/>
      </van-cell>
    </van-cell-group>
  </div>
  <div v-show="active===1">
    <van-cell-group title="退货信息" inset>
      <van-cell v-for="item in returnOrder.back_products" :title="item.proid_text" :value="'x'+item.nums"></van-cell>
      <van-field
          v-model="returnReason"
          rows="2"
          autosize
          type="textarea"
          maxlength="255"
          readonly
      />
      <van-image width="100" height="100" v-for="item in returnOrder.thumbs" :src="item"
      />

      <van-cell style="color:var(--van-warning-color)" title="等待商家审核。。。">
        <template #value>
          <van-button type="primary" @click="tipClick" :loading="tipLoading" size="small" text="提醒"/>
        </template>
      </van-cell>
    </van-cell-group>
  </div>
  <div v-show="active===2">
    <van-cell-group title="退货信息" inset>
      <van-cell v-for="item in returnOrder.back_products" :title="item.proid_text" :value="'x'+item.nums"></van-cell>
      <van-field
          v-model="returnReason"
          rows="2"
          autosize
          type="textarea"
          maxlength="255"
          readonly
      />
      <van-image width="100" height="100" v-for="item in returnOrder.thumbs" :src="item"
      />

      <van-cell style="color:var(--van-success-color)" title="商家审核通过">
      </van-cell>
      <van-field
          v-model="expressCode"
          type="text"
          maxlength="255"
          placeholder="请填写物流单号"
          :readonly="returnOrder?.expresscode?.length>0"
      >
        <template #button>
          <van-button v-show="!(returnOrder?.expresscode?.length>0)" size="small" type="primary"
                      @click="submitExpress">提交
          </van-button>
        </template>
      </van-field>
    </van-cell-group>
  </div>
  <div v-show="active===3">
    <van-cell-group title="退货信息" inset>
      <van-cell v-for="item in returnOrder.back_products" :title="item.proid_text" :value="'x'+item.nums"></van-cell>
      <van-field
          v-model="returnReason"
          rows="2"
          autosize
          type="textarea"
          maxlength="255"
          readonly
      />
      <van-image width="100" height="100" v-for="item in returnOrder.thumbs" :src="item"
      />

      <van-cell style="color:var(--van-success-color)" title="商家审核通过">
      </van-cell>
      <van-field
          v-model="returnOrder.expresscode"
          type="text"
          maxlength="255"
          placeholder="请填写物流单号"
          readonly
      >
      </van-field>
      <van-cell  v-if="order?.status!=-5" style="color:var(--van-success-color)" title="退款成功"/>
      <template v-else>

      <van-cell style="color:var(--van-warning-color)" title="物品有问题"/>
      <van-cell style="color:var(--van-warning-color)" title="退货失败"/>
      </template>
    </van-cell-group>
  </div>

</template>

<style scoped>

</style>