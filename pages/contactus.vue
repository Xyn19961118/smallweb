<template>
  <div class="container">
    <Header></Header>

    <div class="contactus">
      <div class="wrap">
        <!-- 顶栏start -->
        <div class="topbar" v-for="(item,index) in topbarList" :key="index">
          <div class="title_left">{{item.title}}</div>
          <!-- <div class="location_right">{{item.location}}</div> -->
        </div>
        <!-- 顶栏end -->
      </div>
    </div>
    <!-- 内容部分 -->
    <div class="content wrap">
      <!-- 左边公司 -->
      <div class="company_left">
        <div class="comp">{{aboutList.name}}</div>
        <div class="com">电话：{{aboutList.tel}}</div>
        <div class="com">传真：{{aboutList.tel}}</div>
        <div class="com">地址：{{aboutList.add}}</div>
      </div>
      <!-- 右边 声明 -->
      <div class="statement_rigt">
        <div class="attention">关注我们</div>
        <div class="statimg">
          <img :src="$store.state.imgUrl+aboutList.qr_code_images" alt />
        </div>
        <!-- <div class="statement">
          <div class="ementimg">
            <img
              src="https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=1175680608,1166258158&fm=26&gp=0.jpg"
              alt
            />
          </div>
          <div class="title">郑重声明</div>
        </div> -->
        <!-- <div class="text el2" v-html="aboutList.declare"></div> -->
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import { getWebset } from "~/api/index";
export default {
  async created() {
    let moule = await getWebset();
    this.aboutList = moule.data;
  },
  data() {
    return {
      aboutList: [],
      topbarList: [
        {
          title: "联系我们",
          location: "首页 / 关于我们 / 联系我们"
        }
      ],
      dataObj:
        "<p>北京xxx展览会由国家商务部、北京市商委批准，森展国际展览有限公司创办，从未授权任何企业或个人代理招展。任何除了主办单位以外的企业或个人</p>"
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>
<style lang='scss' scoped>
.container {
  .contactus {
    width: 100%;
    background: #f8f8f8;
    .topbar {
      height: 100px;
      line-height: 100px;
      margin-top: 22px;
      display: flex;
      justify-content: space-between;
      .title_left {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
      }
      .location_right {
        font-size: 16px;
        font-weight: bold;
        color: #999999;
      }
    }
  }
  //内容部分
  .content {
    display: flex;
    justify-content: space-between;
    margin-top: 58px;
    margin-bottom: 80px;
    .company_left {
      font-size: 18px;
      color: #666666;

      .comp {
        font-weight: bold;
        margin-bottom: 36px;
      }
      .com {
        margin-bottom: 20px;
      }
    }
    .statement_rigt {
      width: 546px;
      color: #666666;
      .attention {
        font-size: 18px;
        margin-bottom: 10px;
      }
      .statimg img {
        width: 126px;
        height: 126px;
        margin-bottom: 10px;
      }
      .statement {
        display: flex;
        .ementimg {
          img {
            width: 20px;
            height: 20px;
            display: block;
          }
        }
        .title {
          line-height: 20px;
        }
      }
    }
    .text {
      font-size: 12px;
      line-height: 24px;
    }
  }
}
</style>
