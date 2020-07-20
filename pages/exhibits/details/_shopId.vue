<template>
  <div>
    <Header />

    <!-- 内容区域 -->
    <div class="content">
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

        <div class="main">
          <div class="main-left">
            <div class="pic">
              <el-image
                style="width: 100%; height: 100%"
                :src="$store.state.imgUrl + details.showimages[imgActive]"
              ></el-image>
            </div>
            <div class="img-list">
              <div class="side" @click="handleMinus">
                <i class="el-icon-arrow-left" :class="{'none': imgActive === 0}"></i>
              </div>
              <div class="img-list-show">
                <div class="list" :style="imgListStyle">
                  <div
                    v-for="(item, index) in details.showimages"
                    class="item-img"
                    :class="{'item-img-active': imgActive === index}"
                    :key="index"
                    @click="handleActive(index)"
                  >
                    <img :src="$store.state.imgUrl + item" alt />
                  </div>
                </div>
              </div>
              <div class="side" @click="handlePlus">
                <i
                  class="el-icon-arrow-right"
                  :class="{'none': imgActive === details.showimages.length - 1}"
                ></i>
              </div>
            </div>
          </div>
          <div class="main-right">
            <h4>{{ details.title }}</h4>
            <span class="el-2">{{ details.describe }}</span>
            <div class="info">
              <p>
                价 格：
                <span>{{ details.price?details.price:'面议' }}</span>
              </p>
              <p>举办地点：{{ details.add }}</p>
              <p>展会行业：{{ details.tradename }}</p>
            </div>
            <p>
              如您需要人工服务，请致电国际展览导航服务热线：
              <a href="tel:400-8855-088">400-8855-088</a>咨询。
            </p>

            <div
              class="collect"
              v-if="details.isCollection && !isBuyer"
              @click="canelColl(pageObj.shopId)"
            >已收藏</div>
            <div
              class="collect"
              v-if="!details.isCollection && !isBuyer"
              @click="handleColl(pageObj.shopId)"
            >
              <i class="el-icon-plus"></i>收藏
            </div>
          </div>
        </div>

        <div class="intro">
          <div class="intro-title">商品详情</div>
          <div class="intro-content" v-html="details.goodscontent"></div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import { getGoodesDetails, deleteColl } from "~/api/exhibition";
import { setCollect } from "~/api/user";

export default {
  name: "ExhibitsDetails",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      isBuyer: false, //是否是卖家
      pageObj: {},
      details: {
        showimages: []
      },
      imgActive: 0,
      imgListStyle: {
        transform: "translateX(0px)"
      },
      selectIds: []
    };
  },
  computed: {
    ...mapGetters(["business"])
  },
  watch: {
    imgActive() {
      this.imgListStyle.transform =
        "translateX(-" + this.imgActive * 103 + "px)";
    }
  },
  async created() {
    const { params } = this.$route;
    this.pageObj = params;

    const modue = await getGoodesDetails(params.shopId);
    this.details = modue.data;
  },
  mounted() {
    if (this.business && this.business == "1") {
      this.isBuyer = true;
    }
  },
  methods: {
    // 图片滚动
    handlePlus() {
      const { imgActive, details } = this;
      if (imgActive >= details.showimages.length - 1) {
        return false;
      }
      this.imgActive++;
    },
    handleMinus() {
      const { imgActive } = this;
      if (imgActive === 0) {
        return false;
      }
      this.imgActive--;
    },
    handleActive(index) {
      this.imgActive = index;
    },
    //收藏
    async handleColl(id) {
      let data = await setCollect({ g_id: id });
      // console.log(data);
      if (data.status == "200") {
        this.$message.success(data.msg);
        this.details.isCollection = true;
      } else {
        this.$message.error(data.msg);
      }
    },
    //取消收藏
    async canelColl(id) {
      let data = await deleteColl(id);
      if (data.status !== "200") {
        this.$message.error(data.msg);
        return false;
      }
      this.$message.success(data.msg);
      this.details.isCollection = false;
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  border-top: 2px solid #1ca7ec;
  background-color: #f3f4f8;
  padding-bottom: 30px;

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

  .main {
    padding: 30px 50px;
    background-color: #fff;
    display: flex;

    &-left {
      width: 480px;

      .pic {
        width: 100%;
        height: 402px;
        margin-bottom: 10px;

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }

      .img-list {
        width: 100%;
        height: 93px;
        display: flex;

        .side {
          width: 39px;
          position: relative;
          cursor: pointer;

          i {
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            font-size: 32px;
            color: #999;

            &.none {
              color: #ddd;
            }

            &.el-icon-arrow-left {
              left: -15%;
            }

            &.el-icon-arrow-right {
              right: -15%;
            }
          }
        }

        &-show {
          flex: 1;
          white-space: nowrap;
          width: 402px;
          overflow: hidden;

          .list {
            transition: transform 0.3s;

            .item-img {
              width: 93px;
              height: 93px;
              display: inline-block;
              margin-right: 10px;
              cursor: pointer;

              &-active {
                border: 1px solid #1ca7ec;
              }

              &:last-child {
                margin-right: 0;
              }

              img {
                width: 100%;
                height: 100%;
                object-fit: cover;
              }
            }
          }
        }
      }
    }

    &-right {
      flex: 1;
      padding-left: 30px;

      h4 {
        font-size: 24px;
        color: #1ca7ec;
        font-weight: normal;
        margin: 20px 0 9px;
      }

      span {
        font-size: 16px;
        color: #1ca7ec;
        line-height: 1.5;
      }

      .info {
        background-color: #f3f4f8;
        padding: 29px 20px 11px;
        margin: 13px 0 19px;

        p {
          font-size: 16px;
          color: #666;
          margin-bottom: 18px;
          span {
            font-size: 20px;
          }
        }
      }

      > p {
        font-size: 14px;
        color: #999;

        a {
          color: #1ca7ec;
        }
      }
    }
  }

  .intro {
    margin-top: 20px;

    &-title {
      font-size: 16px;
      color: #1ca7ec;
      padding: 0 32px;
      line-height: 40px;
      background-color: #fff;
      border-top: 1px solid #1ca7ec;
      position: relative;
      margin-bottom: 20px;

      &::before {
        content: "";
        position: absolute;
        top: 0;
        left: 0;
        width: 0;
        height: 0;
        border-width: 8px 8px 8px 0;
        border-style: solid;
        border-color: transparent;
        border-top-color: #1ca7ec;
      }
    }

    &-contnet {
      background: #fff;
    }
  }
}

.collect {
  width: 120px;
  height: 44px;
  cursor: pointer;
  line-height: 44px;
  text-align: center;
  font-size: 16px;
  color: #1ca7ec;
  background: #f3f4f8;
  margin-top: 30px;
  i {
    margin-right: 4px;
    font-size: 18px;
  }
}
</style>
