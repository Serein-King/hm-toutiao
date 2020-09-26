<template>
   <div class="hm-login">
        <hm-header>登录</hm-header>
        <hm-logo></hm-logo>
        <!-- 表单校验 -->
      <van-form @submit="onSubmit">
         <van-field
            v-model="username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="[{ required: true, message: '请填写用户名' },
            {pattern:/^\d{5,11}$/,message: '请填写5-11位数字',trigger:'onChange'}]"
         />
         <van-field
            v-model="password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="[{ required: true, message: '请填写密码' },
            {pattern:/^\d{3,8}$/,message: '请填写3-8位数字',trigger:'onChange'}]"
         />
         <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
               提交
            </van-button>
         </div>
      </van-form>
   </div>
</template>

<script>
import axios from 'axios'
export default {
  data () {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    async onSubmit () {
      const res = await axios.post('http://localhost:3000/login', {
        username: this.username,
        password: this.password
      })
      // console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 引入 Toast 组件后，会自动在 Vue 的 prototype 上挂载 $toast 方法，便于在组件内调用。
      //   this.$toast.success(message)
      // 验证成功的话，保存token，跳转到个人中心页面
        this.$router.push('/user')
      } else {
        this.$toast.fail(message)
      }
    }
  }
}
</script>

<style lang='less'>
</style>
