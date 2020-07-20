<template>
  <div class="steps-content">
    <div class="line" />
    <div class="item">
      <div class="steps" :class="{ active: stepsActive === 0 }">1</div>
      <p>身份验证</p>
    </div>
    <div class="line" />
    <div class="item">
      <div class="steps" :class="{ active: stepsActive === 1 }">2</div>
      <p>设置新密码</p>
    </div>
    <div class="line" />
    <div class="item">
      <div class="steps" :class="{ active: stepsActive === 2 }">3</div>
      <p>操作完成</p>
    </div>
    <div class="line" />
  </div>
</template>

<script>
export default {
  name: 'Steps',
  props: {
    stepsActive: {
      type: Number,
      default: 0
    }
  }
}
</script>

<style lang="scss" scoped>
.steps-content {
  display: flex;
  display: -webkit-flex;

  .steps {
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 48px;
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background-color: #ddd;
    margin: 0 11px;

    &.active {
      background-color: #1ca7ec;
    }
  }

  .line {
    flex: 1;
    height: 0;
    border-bottom: 2px dotted #ddd;
    margin-top: 23px;
  }

  .item {
    p {
      color: #999;
      text-align: center;
      margin-top: 9px;
    }
  }
}
</style>
