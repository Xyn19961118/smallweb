<template>
  <div>
    <div class="myinfo">
      <div class="myinfo-left">
        <nuxt-link to="/user/myinfo">
          <span class="icon" />修改
        </nuxt-link>
        <div class="myinfo-pic">
          <img v-if="userInfo.header_image" :src="userInfo.header_image" alt />
          <img v-else :src="toxingImg" alt />
        </div>
        <div class="myinfo-tags">普通会员</div>
        <div class="myinfo-name">{{ userInfo.nickname }}</div>
      </div>
      <div class="myinfo-right">
        <div class="myinfo-detail-item">
          <div class="icon">
            <img :src="phonImg" alt />
          </div>
          <div class="myinfo-detail-cont">
            <p>登录账号：{{ userInfo.mobile }}</p>
            <span>手机号可以用于登录中企世博网，重置密码或其他安全验证</span>
          </div>
        </div>
        <div class="myinfo-detail-item">
          <div class="icon">
            <img :src="pwdImg" alt />
          </div>
          <div class="myinfo-detail-cont">
            <p>登录密码安全度：弱</p>
            <span>用于保护账号信息和登录安全</span>
          </div>
        </div>
        <div class="myinfo-detail-item">
          <div class="icon">
            <img :src="emailImg" alt />
          </div>
          <div class="myinfo-detail-cont">
            <p>
              邮箱地址：
              <span v-if="userInfo.email">{{ userInfo.email }}</span>
            </p>
            <span>用于接收通知等信息</span>
          </div>
        </div>
        <nuxt-link v-if="!isBuyer" to class="go-admin">后端管理后台</nuxt-link>
      </div>
    </div>

    <div v-if="!isBuyer" class="vip" style="display:none">
      <div class="vip-title">月流量包</div>
      <div class="vip-content">
        <div class="vip-progress">
          <el-progress
            :width="108"
            :stroke-width="4"
            color="#1ca7ec"
            :show-text="false"
            type="circle"
            :percentage="80"
          />
          <div class="vip-progress-cont">
            <div class="vip-progress-number">8</div>
            <div class="vip-progress-ms">剩余次数</div>
          </div>
        </div>
        <div class="vip-progress-all">总次数：10</div>
        <div class="vip-progress-all">已使用：2</div>
      </div>
    </div>

    <div v-if="!isBuyer" class="vip" style="display:none">
      <div class="vip-title">明细</div>
      <div class="detailed">
        <el-table :data="tableData" tooltip-effect="dark" style="width: 100%">
          <el-table-column prop="title" label="类型" show-overflow-tooltip />
          <el-table-column prop="type" label="明细" show-overflow-tooltip />
          <el-table-column prop="time" label="时间" width="250" />
        </el-table>
      </div>
      <div class="detailed-page">
        <el-pagination background layout="prev, pager, next" :total="100" />
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { getUserInfo } from '~/api/user'
export default {
  name: 'Myinfo',
  data () {
    return {
      toxingImg: require('~/static/images/default-headimg.png'), // 用户头像
      phonImg: require('~/static/images/myinfo-icon01.png'), // 账户左侧图片
      pwdImg: require('~/static/images/myinfo-icon02.png'), // 登录密码左侧图片
      emailImg: require('~/static/images/myinfo-icon03.png'), // 邮箱地址左侧图片
      isBuyer: true, // 是否是卖家
      userInfo: {
        header_image: ''
      }, // 用户信息
      tableData: [
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        },
        {
          title: '求购大量库存晒鞋架',
          type: '凉鞋架',
          time: '2020-05-20 13:14:52'
        }
      ]
    }
  },
  computed: {
    ...mapGetters([
      'business'
    ]),
    newUserInfo () { }
  },
  async mounted () {
    if (process.client) {
      const iAuth = this.business
      const data = await getUserInfo()
      if (data.status !== 5000) {
        sessionStorage.setItem('userInfo', JSON.stringify(data.data))
        data.data.email = this.starData(data.data.email)
        data.data.mobile = this.starData(data.data.mobile)
      }
      this.userInfo = data.data

      // console.log(userInfo);
      if (iAuth) {
        if (iAuth == '1') {
          this.isBuyer = false
        } else {
          this.isBuyer = true
        }
      }
    }
  },

  methods: {
    // 数据显示星号
    starData (str) {
      return str.substr(0, 3) + '****' + str.substr(7, str.split('').length)
    }
  },
  head () {
    return {
      title: '个人中心-会员中心'
    }
  }
}
</script>

<style lang="scss" scoped>
.myinfo {
  overflow: hidden;
  .myinfo-left {
    width: 390px;
    height: 270px;
    background: #fff;
    padding: 20px;
    position: relative;
    float: left;
    a {
      position: absolute;
      right: 20px;
      top: 20px;
      font-size: 14px;
      color: #999;
      span {
        display: inline-block;
        vertical-align: middle;
        width: 12px;
        height: 12px;
        background: url("~static/images/message.png") center no-repeat;
        background-size: 12px;
        margin-right: 4px;
      }
    }
    .myinfo-pic {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      overflow: hidden;
      border: #eee 1px solid;
      margin: auto;
      img {
        width: 80px;
        height: 80px;
      }
    }
    .myinfo-tags {
      width: 66px;
      height: 22px;
      margin: 20px auto 0;
      border: #1ca7ec 1px solid;
      font-size: 12px;
      color: #1ca7ec;
      text-align: center;
      line-height: 20px;
    }
    .myinfo-name {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      text-align: center;
      margin-top: 12px;
    }
  }
  .myinfo-right {
    float: right;
    width: 600px;
    height: 270px;
    background: #fff;
    padding: 20px 15px;
    .myinfo-detail-item {
      margin-bottom: 20px;
      overflow: hidden;
      .icon {
        margin-top: 6px;
        float: left;
      }
      .myinfo-detail-cont {
        width: 320px;
        font-size: 12px;
        margin-left: 10px;
        color: #999;
        float: left;
        p {
          font-size: 14px;
          color: #333;
          margin-bottom: 4px;
        }
      }
    }
    .go-admin {
      display: block;
      width: 135px;
      height: 34px;
      border: #5b7fa3 1px solid;
      line-height: 34px;
      color: #5b7fa3;
      padding-left: 34px;
      margin-top: 30px;
      background: url("~static/images/goadmin.png") 14px center no-repeat;
      transition: 0.3s;
      -webkit-transition: 0.3s;
      &:hover {
        background: #dde8eb url("~static/images/goadmin.png") 14px center
          no-repeat;
      }
    }
  }
}
.recomm {
  width: 680px;
  height: auto;
  background: #fff;
  margin-top: 20px;
  padding: 20px;
  .recomm-title {
    font-size: 16px;
    color: #333;
    font-weight: bold;
  }
  .recomm-cont {
    margin-top: 22px;
    overflow: hidden;
    .recomm-list {
      float: left;
      margin-right: 20px;
      width: 145px;
      &:nth-child(4n) {
        margin-right: 0;
      }
      .recomm-img {
        width: 145px;
        height: 120px;
        a {
          img {
            width: 100%;
            height: 100%;
          }
        }
      }
      .recomm-mintitle {
        font-size: 14px;
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
        margin-top: 10px;
        a {
          color: #333;
        }
      }
      .recomm-bottom {
        margin-top: 3px;
        .recomm-data {
          font-size: 12px;
          color: #999;
          float: left;
        }
        .recomm-del {
          float: left;
          margin-left: 20px;
          margin-top: 3px;
        }
      }
    }
  }
}

.vip {
  width: 100%;
  padding: 30px;
  margin-top: 10px;
  background: #fff;
  .vip-progress {
    width: 108px;
    height: 108px;
    margin: 30px auto 20px;
    position: relative;
  }
  .vip-progress-cont {
    width: 100px;
    height: 100px;
    background: rgba(91, 128, 163, 0.1);
    position: absolute;
    left: 4px;
    top: 4px;
    border-radius: 50%;
    overflow: hidden;

    .vip-progress-number {
      text-align: center;
      font-size: 24px;
      color: #1ca7ec;
      font-weight: bold;
      margin-top: 30px;
    }
    .vip-progress-ms {
      text-align: center;
      font-size: 14px;
      color: #999;
      margin-top: 4px;
    }
  }

  .vip-content {
    padding-bottom: 40px;
    .vip-progress-all {
      text-align: center;
      color: #666;
      font-size: 16px;
      margin-bottom: 6px;
    }
  }
  .detailed {
    margin-top: 24px;
  }
}
</style>

<style lang="scss">
.vip {
  svg path:first-child {
    stroke: #fff;
  }
}
.detailed-page {
  text-align: right;
  margin-top: 20px;
  .el-table thead th,
  .el-table thead tr {
    background: #fafafc;
  }
  .el-table th > .cell {
    color: #333;
    font-weight: 400;
  }
  .el-table .cell {
    color: #666;
  }
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background: none;
    border: #eee 1px solid;
    font-weight: 400;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: none;
    color: #1ca7ec !important;
    border-color: #1ca7ec !important;
    // color: #1ca7ec !important;
    // border-color: #1ca7ec !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    // color: #1ca7ec !important;
    // border-color: #1ca7ec !important;
    color: #1ca7ec !important;
    border-color: #1ca7ec !important;
  }
}
</style>
