<script setup>
import {reactive} from "vue";
import {registerApi} from "@/api/business.js";
import {showSuccessToast} from "vant";
import router from "@/router/index.js";

const formData = reactive({
  mobile: "",
  password: "",
})
const formRule = reactive({
  mobile: [
    {required: true, message: '请填写手机号'},
    {message: '手机号格式有误', pattern: /^1\d{10}$/}
  ],
  password: [
    {required: true, message: '请填写密码', pattern: /^.{6,}$/},
    {
      message: '密码不少于6位',
      pattern: /.{6,}/
    }],
})
const onSubmit = function (values) {
  registerApi(values).then(res=>{
    showSuccessToast(res.msg)
    router.push({name:"business.login"})
  }).catch(e=>{

  })
}
</script>
<template>
  <div class="container-login100">
    <div class="wrap-login100">
      <van-form class="van-form" @submit="onSubmit">
        <van-image
            round
            width="120"
            height="120"
            src="/assets/images/pexels-spencer-selover-428364.jpg"
            :style="{margin: '0 auto',marginBottom: '65px'   , left: 'calc(50% - 60px)'}"
        />
        <div class="wrap-input100 validate-input">
          <van-field
              v-model="formData.mobile"
              name="mobile"
              label="用户名"
              placeholder="用户名"
              :rules="formRule.mobile"
              :style="{marginBottom: '20px',borderRadius:'24px'}"
          />
        </div>
        <div class="wrap-input100 validate-input">
          <van-field
              v-model="formData.password"
              type="password"
              name="password"
              label="密码"
              placeholder="密码"
              :rules="formRule.password"
              :style="{marginBottom: '20px',borderRadius:'24px'}"
          />
        </div>
        <div class="container-login100-form-btn">
          <van-button block color="#333333" native-type="submit" round
                      :style="{marginBottom: '20px'}">
            注册
          </van-button>
        </div>
        <van-row justify="center">
          <van-col>
            <router-link to="/business/login" class="txt1">立即登录 》</router-link>
          </van-col>
        </van-row>


      </van-form>
    </div>
  </div>
</template>

<style scoped>
.container-login100 {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  padding: 15px;
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
  position: relative;
  z-index: 1;
  background-image: url("/assets/images/back.jpg");
  min-height: 100vh;
}

@media (max-width: 576px)

.wrap-login100 {
  padding-top: 80px;
  padding-left: 15px;
  padding-right: 15px;
}

.wrap-login100 {
  width: 390px;
  background: transparent;
  padding-bottom: 30px;
}

.txt1 {
  font-family: Montserrat-Regular;
  font-size: 16px;
  color: #082a81;
  line-height: 1.4;
  text-decoration: none;
  font-weight: bold;
}
</style>