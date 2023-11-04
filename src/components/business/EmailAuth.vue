<script setup>
import {onMounted, reactive, ref} from "vue";
import {getUserInfoApi, sendEmailCodeApi, validEmailApi} from "@/api/business.js";
import {showSuccessToast} from "vant";
import router from "@/router/index.js";

const data = ref({});
const code = ref()
onMounted(
    () =>
        getUserInfoApi().then(
            res => {
              data.value = res.data
            }
        )
)
const btn = reactive(({
  text: "发送验证码",
  disable: false,
  loading: false,
}))

function sendCode() {
  function autoPlay() {
    if (btn.time <= 0) {
      btn.text = "发送验证码"
      btn.disable = false
      return
    }
    btn.time--
    btn.text = btn.time + "秒"
    setTimeout(autoPlay, 1000)
  }

  btn.disable = true
  btn.time = 60
  btn.loading = true
  sendEmailCodeApi()
      .then(() => {
        showSuccessToast("发送成功")
      }).finally(
      () => {
        btn.loading = false
        autoPlay()
      }
  )
}

function onSubmit(form) {
  validEmailApi(form).then(() => {
    showSuccessToast({
      message: "验证成功",
      duration: 1000,
      onClose: () => {
        router.push({name: "business.index"})
      }
    })
  })
}
</script>

<template>
  <div>
  <van-nav-bar
      title="邮箱认证"
      left-text="返回"
      left-arrow
      @click-left="$router.back()"
  />
  <van-form @submit="onSubmit">
    <van-field
        v-model="data.email"
        name="email"
        label="邮箱"
        placeholder="邮箱"
        disabled
        type="email"
    />
    <van-field
        v-model="code"
        name="code"
        center
        clearable
        label="邮箱验证码"
        placeholder="请输入邮箱验证码"
        :rules="[{
          required:true,
          message:'请输入验证码'
        }]"
    >
      <template #button>
        <van-button size="small"
                    type="primary"
                    :text="btn.text"
                    :loading="btn.loading"
                    :disabled="btn.disable"
                    @click="sendCode"
        ></van-button>
      </template>
    </van-field>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>
  </div>
</template>

<style scoped>

</style>