<template>
  <div>
    <Header />
    <div class="wrap">
      <div class="page-bread">
        当前位置：
        <el-breadcrumb separator-class="el-icon-arrow-right">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/exhibits' }">展商中心</el-breadcrumb-item>
          <!-- <el-breadcrumb-item
              :to="{ path: `/exhibits/companylist/${pageObj.id}` }"
              >公司</el-breadcrumb-item
          >-->
          <el-breadcrumb-item>详情</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
    </div>

    <div class="conter conter-oth">
      <div class="clearfix compan-top">
        <div class="compan-img">
          <img :src="$store.state.imgUrl + company.companyavatar" alt />
        </div>
        <div class="compan-right">
          <div class="compan-name">{{ company.name }}</div>
          <div class="compan-title">公司简介</div>
          <div
            class="compan-cent"
            :style="{'-webkit-line-clamp': isShowAll ? 'inherit' : '4'}"
          >{{ company.summary }}</div>
          <div class="compan-all compan-title">
            <span @click="isShowAll = !isShowAll">{{ isShowAll ? '收起全部' : '查看全部' }}</span>
            官网地址
          </div>
          <div class="compan-href">
            <a :href="company.webset" target="_blank">{{ company.webset }}</a>
          </div>
        </div>
      </div>
      <div class="exhibits-cont-wrapper">
        <div class="compan-maxtitle">商品展示</div>
        <div class="exhibits-cont">
          <ul>
            <li v-for="item in companyList" :key="item.id">
              <div class="exhibits-top">
                <nuxt-link :to="'/exhibits/details/' + item.id">
                  <div class="overlay">
                    <div class="circle">
                      <i class="iconfont icon-fanhui-copy-copy" />
                    </div>
                  </div>
                </nuxt-link>
                <img :src="$store.state.imgUrl+item.showimage" alt />
              </div>
              <div class="exhibits-bottom">
                <div
                  class="exhibits-num"
                >{{ item.price && item.price !== "0.00" ? '￥'+item.price : "面议" }}</div>
                <div class="exhibits-desc">{{ item.describe }}</div>
                <div class="exhibits-title">{{ item.name }}</div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getDetails } from "~/api/index";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      company: {},
      companyList: [],
      isShowAll: false
    };
  },
  async created() {
    const id = this.$route.params.id;
    const data = await getDetails(id);
    this.company = data.data.company;
    this.companyList = data.data.goods.data;
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.page-bread {
  display: flex;
  align-items: center;
  height: 54px;
  font-size: 14px;
  color: #999;

  /deep/ .el-breadcrumb__item {
    .el-breadcrumb__inner {
      color: #1ca7ec;

      &.is-link {
        color: #999;
        font-weight: normal;
      }
    }
  }
}
.conter {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden;
  &.conter-oth {
    width: 100%;
    min-width: 1200px;
  }
  .compan-top {
    width: 1200px;
    margin: 0 auto 45px;
    overflow: hidden;
    .compan-img {
      width: 555px;
      height: 333px;
      float: left;
      img {
        width: 555px;
        height: 333px;
      }
    }
    .compan-right {
      float: left;
      width: 590px;
      margin-left: 45px;
      .compan-name {
        font-size: 24px;
        color: #1ca7ec;
        margin-bottom: 60px;
      }
      .compan-title {
        color: #1ca7ec;
        font-size: 18px;
        margin-bottom: 25px;
      }
      .compan-cent {
        color: #888;
        line-height: 24px;
        overflow: hidden;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 4;
      }
      .compan-href {
        a {
          font-size: 14px;
          color: #888888;
        }
      }

      .compan-all {
        padding-top: 50px;
        position: relative;

        span {
          position: absolute;
          top: 0;
          left: 0;
          font-size: 14px;
          color: #1ca7ec;
          cursor: pointer;
          margin-top: 3px;
        }
      }
    }
  }
  .exhibits-cont-wrapper {
    padding-top: 40px;
    background: #f3f3f8;
  }
  .compan-maxtitle {
    font-size: 24px;
    color: #1ca7ec;
    text-align: center;
  }
  .exhibits-cont {
    width: 1200px;
    margin: 70px auto 0;
    overflow: hidden;
    ul {
      li {
        width: 375px;
        height: 520px;
        background: #fff;
        border: 1px solid rgba(0, 0, 0, 0.1);
        float: left;
        margin-right: 37px;
        margin-bottom: 40px;
        overflow: hidden;
        &:nth-child(3n) {
          margin-right: 0;
        }
        &:hover {
          box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
        }
        .exhibits-top {
          width: 375px;
          height: 375px;
          overflow: hidden;
          position: relative;
          a {
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
          }
          img {
            width: 375px;
            height: 375px;
            display: block;
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
          .exhibits-num {
            font-size: 24px;
            color: #1ca7ec;
            font-weight: bold;
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
            color: #888;
            font-size: 14px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
        }
      }
    }
  }
}
</style>
