<template>
   <div class="hm-register">
      <hm-header>注册</hm-header>
      <hm-logo></hm-logo>
        <!-- 表单校验 -->
      <van-form @submit="register">
         <van-field
            v-model="user.username"
            name="用户名"
            label="用户名"
            placeholder="用户名"
            :rules="rules.username"
         />
            <van-field
            v-model="user.nickname"
            name="昵称"
            label="昵称"
            placeholder="昵称"
            :rules="rules.nickname"
         />
         <van-field
            v-model="user.password"
            type="password"
            name="密码"
            label="密码"
            placeholder="密码"
            :rules="rules.password"
         />
         <div style="margin: 16px;">
            <van-button round block type="info" native-type="submit">
               注册
            </van-button>
         </div>
      </van-form>
      <p>已有账号？去<router-link to="/login">登录</router-link></p>
   </div>
</template>

<script>

export default {
  methods: {
    async register () {
      const res = await this.$axios.post('/register', this.user)
      console.log(res)
      const { statusCode, message } = res.data
      if (statusCode === 200) {
        // 在组件中必须  this.$toast才能使用
        this.$toast.success(message)
        //   this.$router.push(`/login?username=${this.user.username}&password=${this.user.password}`)
        // 1 路由传参 通过 query
        //   this.$router.push({
        //     path: '/login',
        //     query: {
        //       username: this.user.username,
        //       password: this.user.password
        //     }
        //   })
        // 2.通过params 传参
        this.$router.push({
          name: 'login',
          params: this.user
        })
      } else {
        this.$toast.fail(message)
      }
    }
  },
  data () {
    return {
      user: {
        username: '',
        nickname: '',
        password: ''
      },
      rules: {
        username: [{ required: true, message: '请填写用户名', trigger: 'onChange' },
          { pattern: /^\d{5,11}$/, message: '请填写5-11位数字', trigger: 'onChange' }],
        nickname: [{ required: true, message: '请填写昵称', trigger: 'onChange' },
          { pattern: /^[\u4e00-\u9fa5]{3,8}$/, message: '请填写3-8位中文', trigger: 'onChange' }],
        password: [{ required: true, message: '请填写密码', trigger: 'onChange' },
          { pattern: /^\d{3,9}$/, message: '请填写3-8位数字', trigger: 'onChange' }]
      }
    }
  }
}
</script>

<style lang='less' scoped>
   p{
      font-size: 16px;
      text-align: right;
      margin-right: 30px;
      a{
         color: orange;
      }
   }
</style>
