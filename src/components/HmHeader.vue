<template>
  <div class="hm-header">
      <div class="left" @click='goBack'>
        <span class='iconfont iconjiantou2'></span>
      </div>
      <div class="center">
          <slot></slot>
      </div>
      <div class="right"></div>
  </div>
</template>

<script>
export default {
  methods: {
    goBack () {
      this.$router.go(-1)
    }
  }
}
</script>

<style lang='less' scoped>
  .hm-header{
      display: flex;
      height: 50px;
      border-bottom: 1px solid #ccc;
      line-height: 50px;
      text-align: center;
  }
  .left,
  .right{
    width: 50px;
  }
  .center{
      flex: 1;
      font-size: 18px;
      font-weight:500;
  }
</style>
