<template>
  <div class="release collect">
    <div class="release-title">会员流量包</div>
    <div class="flow">
      <div class="flow-item">
        <div class="flow-title">月流量包</div>
        <div class="flow-time">(1个月)</div>
        <div class="flow-price">
          <span>￥</span>39
        </div>
        <div class="flow-sm">权益：查看求购信息30次</div>
        <div class="flow-buy">去支付</div>
      </div>

      <div class="flow-item">
        <div class="flow-title">季度流量包</div>
        <div class="flow-time">(3个月)</div>
        <div class="flow-price">
          <span>￥</span>199
        </div>
        <div class="flow-sm">权益：查看求购信息110次</div>
        <div class="flow-buy">去支付</div>
      </div>

      <div class="flow-item">
        <div class="flow-title">半年流量包</div>
        <div class="flow-time">(6个月)</div>
        <div class="flow-price">
          <span>￥</span>399
        </div>
        <div class="flow-sm">权益：查看求购信息360次</div>
        <div class="flow-buy">去支付</div>
      </div>

      <div class="flow-item">
        <div class="flow-title">一年流量包</div>
        <div class="flow-time">(12个月)</div>
        <div class="flow-price">
          <span>￥</span>599
        </div>
        <div class="flow-sm">权益：查看求购信息660次</div>
        <div class="flow-buy">去支付</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {}
  },
  created () { },
  methods: {}
}
</script>

<style scoped lang="scss">
.release {
  padding: 20px;
  background: #fff;
  height: 640px;
  &.collect {
    padding: 20px 30px;
  }
  .release-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .flow {
    margin-top: 30px;
    display: flex;
    justify-content: space-between;
    .flow-item {
      width: 220px;
      height: 280px;
      background: #fff;
      border: #aacedb 1px solid;
      border-radius: 4px;
      padding: 18px 0 20px 20px;
      position: relative;
      transition: 0.3s;
      -webkit-transition: 0.3s;
      &:hover {
        background: #dde8eb;
      }
      .flow-title {
        color: #1ca7ec;
        font-size: 20px;
      }
      .flow-time {
        color: #1ca7ec;
        font-size: 16px;
        margin-top: 6px;
      }
      .flow-price {
        font-size: 45px;
        color: #1ca7ec;
        font-weight: bold;
        margin-top: 25px;
        span {
          font-size: 20px;
          font-weight: 300;
        }
      }
      .flow-buy {
        width: 120px;
        height: 30px;
        margin: 30px auto 0;
        background: #1ca7ec;
        color: #fff;
        font-size: 16px;
        text-align: center;
        line-height: 30px;
        cursor: pointer;
      }
      .flow-sm {
        margin-top: 20px;
        font-size: 16px;
        color: #1ca7ec;
      }
    }
  }
}
</style>
