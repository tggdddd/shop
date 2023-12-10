<script setup>
import {reactive, ref} from "vue";
import {areaList} from '@vant/area-data';
import {getUserInfoApi, modifyProfileApi} from "@/api/business.js";
import {showSuccessToast} from "vant";
import router from "@/router/index.js";

const data = ref({});
getUserInfoApi().then(
    res => {
      data.value = res.data
      data.value.avatarList = ref([{url: res.data.avatar_text}])
      data.value.areaText = [res.data.province_text, res.data.city_text, res.data.district_text].filter(a => a && a.length).join("/")
    }
)
const rules = reactive({
  mobile: [
    {
      required: true,
      message: "请输入手机号"
    },
    {
      pattern: /^1\d{10}$/,
      message: "格式不正确"
    }],
  password: [
    {
      pattern: /^$|.{6,}/,
      message: "密码至少6位"
    }
  ],
  email: [
    {
      required: true,
      message: "请输入邮箱"
    },
    {
      pattern: /^\w{2,}@\w{2,}\.\w{2,}$/,
      message: "邮箱格式不正确"
    }]
})
const showArea = ref(false)

function uploadAvatar(file) {
  data.value.avatar = file.file
}

function confirmArea(val) {
  const options = val.selectedOptions;
  data.value.province = options[0].value
  data.value.city = options[1].value
  data.value.district = options[2].value
  data.value.areaText = options.map(escape => escape.text).reduce((a, b) => a + "/" + b)
  showArea.value = false
}

function onSubmit() {
  const params = {
    id: data.value.id,
    mobile: data.value.mobile,
    nickname: data.value.nickname,
    password: data.value.password,
    avatar: data.value.avatar || data.value.avatar_text,
    gender: data.value.gender,
    province: data.value.province,
    city: data.value.city,
    district: data.value.district,
    email: data.value.email
  }
  modifyProfileApi(params).then(res => {
    showSuccessToast(
        {
          message: res.msg,
          onClose: () => {
            router.push({name: "business.index"})
          }
        }
    )
  })
}
</script>

<template>
  <div>
    <van-nav-bar
        title="个人资料"
        left-text="返回"
        left-arrow
        @click-left="$router.back()"
    />
    <van-form @submit="onSubmit">
      <van-cell-group inset>
        <van-field
            name="avatar"
            label="头像"
        >
          <template #input>
            <van-uploader v-model="data.avatarList" :max-count="1" :after-read="uploadAvatar"/>
          </template>
        </van-field>
        <van-field
            v-model="data.nickname"
            name="nickname"
            label="昵称"
            placeholder="昵称"
            :rules="rules.nickname"
        />
        <van-field
            v-model="data.mobile"
            name="mobile"
            label="手机号"
            placeholder="手机号"
            :rules="rules.mobile"
        />
        <van-field
            v-model="data.email"
            name="email"
            label="邮箱"
            placeholder="邮箱"
            :rules="rules.email"
        />
        <van-field
            v-model="data.password"
            type="password"
            name="password"
            label="密码"
            placeholder="密码"
            :rules="rules.password"
        />
        <van-field label="性别" name="sex">
          <template #input>
            <van-radio-group v-model="data.gender" direction="horizontal">
              <van-radio name="0">保密</van-radio>
              <van-radio name="1">男</van-radio>
              <van-radio name="2">女</van-radio>
            </van-radio-group>
          </template>
        </van-field>
        <van-field label="地区" name="area" @click="showArea=true" v-model="data.areaText">
        </van-field>
        <van-popup
            v-model:show="showArea"
            position="bottom"
            :style="{ height: '35%' }"
        >
          <van-area title="选择地区" @confirm="confirmArea" :area-list="areaList" v-model="data.area"/>
        </van-popup>
      </van-cell-group>
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