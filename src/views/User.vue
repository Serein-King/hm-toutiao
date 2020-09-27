<template>
  <div class="user">
      <div class="header">
          <div class="avatar">
            <!-- 图片路径必须是绝对路劲 -->
              <img :src="$axios.defaults.baseURL+user.head_img" alt="">
          </div>
          <div class="info">
              <div class="name">
                  <span v-if="user.gender===1" class="iconfont iconxingbienan"></span>
                  <span v-else class="iconfont iconxingbienv"></span>
                  <span>{{user.nickname}}</span>
              </div>
              <div class="time">
                  {{user.create_date | time}}
              </div>
          </div>
          <div class="arrow">
             <span class="iconfont iconjiantou1"></span>
          </div>
      </div>
      <!-- 导航条 -->
      <hm-navitem to='/follow'>
          <template>我的关注</template>
          <template #content>关注的内容</template>
      </hm-navitem>
      <hm-navitem>
          <template>我的跟帖</template>
         <template #content>跟帖/回复</template>
      </hm-navitem>
       <hm-navitem>
          <template>我的收藏</template>
         <template #content>文章/视频</template>
      </hm-navitem>
       <hm-navitem to='/edit'>
          <template >设置</template>
          <template #content></template>
      </hm-navitem>
      <!-- 退出按钮 -->
      <div class="logout" style="margin:15px" @click='logout'>
        <van-button type="primary" block>退出</van-button>
      </div>
  </div>
</template>

<script>
export default {
  methods: {
    // logout () {
    //   this.$dialog.confirm({
    //     title: '温馨提示',
    //     message: '您确定要退出吗'
    //   })
    //     .then(() => {
    //       localStorage.removeItem('token')
    //       localStorage.removeItem('userId')
    //       this.$toast.success('退出成功')
    //       this.$router.push('/login')
    //     })
    //     .catch(() => {
    //       this.$toast.success('取消成功')
    //     })
    // }
    async logout () {
      try {
        await this.$dialog.confirm({
          title: '温馨提示',
          message: '您确定要退出吗'
        })
        localStorage.removeItem('token')
        localStorage.removeItem('userId')
        this.$toast.success('退出成功')
        this.$router.push('/login')
      } catch {
        return this.$toast.success('取消成功')
      }
    }
  },
  data () {
    return {
      user: ''
    }
  },
  // 登陆成功后获取token
  async created () {
    // const token = localStorage.getItem('token')
    const userId = localStorage.getItem('userId')
    const res = await this.$axios.get(`/user/${userId}`)
    // , {
    //   headers: {
    //     Authorization: token
    //   }
    // }

    // console.log(res.data)
    const { statusCode, data } = res.data
    if (statusCode === 200) {
      this.user = data
      // 如果是假token
    }
    // else if (statusCode === 401) {
    //   this.$router.push('/login')
    //   this.$toast('用户验证失败')
    //   localStorage.removeItem('token')
    //   localStorage.removeItem('userId')
    // }
  }
}
</script>

<style lang='less' scoped>
.header {
    display: flex;
    border-bottom: 3px solid #ddd;
    align-items: center;
    padding: 20px 10px;
    .avatar{
      width: 70px;
      height: 70px;
      img{
        width: 70px;
        height: 70px;
        border-radius: 50%;
      }
    }
    .info{
        flex: 1;
        padding-left: 10px;
        font-size: 14px;
         .time {
        margin-top: 10px;
        color: #666;
      }
      .iconxingbienan {
        color: #7bbcec;
      }
       .iconxingbienv {
      color: pink;
      }
    }
}
</style>
