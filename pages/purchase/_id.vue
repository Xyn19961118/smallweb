<template>
  <div>
    <Header />
    <!-- <div class="banner"></div> -->
    <div class="purchase-head">
      <img class="purchase-head-img" :src="headImg" alt />
      <!-- <div class="purchase-head-box">
        <div class="purchase-head-boxtit">你会得到什么？</div>
        <div class="purchase-head-boxList">
          <img class="purchase-head-boxImg" :src="iconImga" alt />
          <div class="purchase-head-boxTxt">50，000多家真正的优质提供商</div>
        </div>
        <div class="purchase-head-boxList">
          <img class="purchase-head-boxImg" :src="iconImga" alt />
          <div class="purchase-head-boxTxt">60多位贸易专家。</div>
        </div>
        <div class="purchase-head-boxList">
          <img class="purchase-head-boxImg" :src="iconImga" alt />
          <div class="purchase-head-boxTxt">节省了平均采购预算成本的10%-15%</div>
        </div>
      </div>-->
    </div>
    <div class="conter">
      <div class="supplier-top">
        <div class="supplier-top-title">为您获取到供应商的报价</div>
        <div class="supplier-top-data">最新更新时间：2020年5月19日</div>
      </div>
      <div class="exhibits-cont">
        <ul>
          <li v-for="(item,index) in companyList" :key="item.id">
            <div class="exhibits-top">
              <div class="overlay">
                <div class="circle" @click="purchasebtn(index)">
                  <i class="iconfont icon-fanhui-copy-copy" />
                </div>
              </div>
              <img :src="$store.state.imgUrl+item.showimage" :alt="item.name" />
            </div>
            <div class="exhibits-bottom">
              <div class="exhibits-data">
                <div class="exhibits-num">￥{{ item.price }}</div>
                <div class="exhibits-btn" @click="purchasebtn(index)">立即联系</div>
              </div>
              <div class="exhibits-desc">{{ item.company }}</div>
              <div class="exhibits-title">{{ item.name }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
    <!-- 遮罩层 -->
    <div v-show="purchshow" class="mask" />
    <!-- 弹框 -->
    <div v-show="purchshow" class="sign">
      <div class="sign-title">{{ maskObj.name }}</div>
      <div class="sign-num">
        <img :src="telnum" />
        电话: {{ maskObj.phone }}
      </div>
      <div class="sign-btn" @click="signbtn()">关闭</div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import { getProduct } from '~/api/index'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      headImg: require('~/static/images/headicon.jpeg'),
      iconImga: require('~/static/images/chenggong.png'),
      telnum: require('~/static/images/tel.png'),
      purchshow: false, // 列表弹框点击是否显示
      maskObj: {}, // 弹窗内容
      companyList: []
    }
  },
  async created () {
    const id = this.$route.params.id
    const moule = await getProduct(id)
    this.companyList = moule.data.data
  },
  methods: {
    // 列表点击弹框
    purchasebtn (index) {
      const { companyList } = this
      this.maskObj = companyList[index]
      this.purchshow = true
    },
    // 点击弹框关闭
    signbtn () {
      this.purchshow = false
      maskObj: {
      }
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  width: 1500px;
  height: 300px;
  background: #1ca7ec;
  margin: 0 auto;
}
.conter {
  width: 1200px;
  margin: 70px auto 100px auto;
  overflow: hidden;
  .supplier-top {
    .supplier-top-title {
      float: left;
      font-size: 24px;
      color: #222222;
      font-weight: bold;
    }
    .supplier-top-data {
      float: right;
      font-size: 20px;
      color: #999999;
    }
  }
  .exhibits-cont {
    margin-top: 70px;
    overflow: hidden;
    ul {
      li {
        width: 375px;
        height: 328px;
        background: #fff;
        border: 1px solid rgba(167, 167, 167, 0.08);
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
        float: left;
        margin-right: 37px;
        margin-bottom: 40px;
        &:nth-child(3n) {
          margin-right: 0;
        }
        .exhibits-top {
          width: 375px;
          height: 178px;
          overflow: hidden;
          position: relative;
          .overlay {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: rgba(255, 255, 255, 0.9);
            opacity: 0;
            -webkit-transition-duration: 0.4s;
            -moz-transition-duration: 0.4s;
            -o-transition-duration: 0.4s;
            -ms-transition-duration: 0.4s;
            transition-duration: 0.4s;
            cursor: pointer;
            .circle {
              width: 50px;
              height: 50px;
              background: #444;
              border-radius: 50%;
              -webkit-border-radius: 50%;
              -moz-border-radius: 50%;
              position: absolute;
              top: 45%;
              opacity: 0;
              left: 50%;
              cursor: pointer;
              margin-left: -25px;
              margin-top: -25px;
              -webkit-transition-duration: 0.4s;
              -moz-transition-duration: 0.4s;
              -o-transition-duration: 0.4s;
              -ms-transition-duration: 0.4s;
              transition-duration: 0.4s;
              i {
                color: #fff;
                font-size: 30px;
                text-align: center;
                line-height: 52px;
                float: left;
                width: 52px;
                font-weight: bold;
              }
            }
          }
          img {
            width: 375px;
          }
          &:hover .overlay {
            opacity: 1;
          }
          &:hover .overlay .circle {
            top: 50%;
            opacity: 1;
          }
        }
        .exhibits-bottom {
          margin-top: 20px;
          margin-left: 33px;
          width: 320px;
          .exhibits-data {
            overflow: hidden;
            .exhibits-num {
              font-size: 24px;
              color: #1ca7ec;
              font-weight: bold;
              float: left;
            }
            .exhibits-btn {
              width: 69px;
              height: 21px;
              text-align: center;
              line-height: 21px;
              background: #ebf5ff;
              color: #2ba7f2;
              font-size: 16px;
              float: right;
              cursor: pointer;
            }
          }
          .exhibits-desc {
            height: 39px;
            font-size: 16px;
            color: #333333;
            font-weight: 300;
            margin-top: 13px;
            margin-bottom: 10px;
            text-overflow: -o-ellipsis-lastline;
            overflow: hidden;
            text-overflow: ellipsis;
            display: -webkit-box;
            -webkit-line-clamp: 2;
            line-clamp: 2;
            -webkit-box-orient: vertical;
          }
          .exhibits-title {
            color: #333333;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
.mask {
  background: rgba(0, 0, 0, 1);
  opacity: 0.2;
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 999999;
}
.sign {
  width: 600px;
  height: 315px;
  background: #fff;
  border-radius: 4px;
  position: fixed;
  top: 50%;
  left: 50%;
  z-index: 9999999;
  margin-left: -300px;
  margin-top: -168px;
  .sign-title {
    margin-top: 97px;
    font-size: 24px;
    color: #222;
    margin-left: 134px;
  }
  .sign-num {
    margin-top: 47px;
    font-size: 24px;
    color: #222;
    margin-left: 134px;
    img {
      float: left;
      margin-right: 13px;
    }
  }
  .sign-btn {
    position: absolute;
    right: 70px;
    bottom: 40px;
    font-size: 18px;
    color: #222;
    cursor: pointer;
  }
}

.purchase-head {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  position: relative;
}
.purchase-head-img {
  width: 100%;
}
.purchase-head-box {
  position: absolute;
  left: 21px;
  top: 40px;
}
.purchase-head-boxtit {
  font-size: 20px;
  font-weight: bold;
  color: #222222;
  margin-bottom: 20px;
}
.purchase-head-boxList {
  display: flex;
  align-items: center;
  margin-bottom: 21px;
}
.purchase-head-boxImg {
  width: 17px;
  height: 17px;
  margin-right: 8px;
}
.purchase-head-boxTxt {
  font-size: 16px;
  color: #555555;
}
</style>
