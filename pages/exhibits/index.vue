<template>
  <div style="background:#f3f3f7">
    <Header />
    <div class="banner">
      <img src="~static/images/exhib-banner.jpg" alt />
    </div>
    <div class="conter">
      <div class="nav">
        <div class="nav-title">展会分类:</div>
        <ul>
          <li
            v-for="(item, index) in ptrade"
            :key="item.id"
            :class="{ active: curr == index }"
            @click="handleVal(item.id, index)"
          >
            {{ item.trade }}
          </li>
        </ul>
      </div>
      <div class="nav">
        <div class="nav-title">子行业:</div>
        <ul>
          <li
            v-for="(item, index) in trade"
            :key="item.id"
            :class="{ active: currIndex == index }"
            @click="industryVal(item.id, index)"
          >
            {{ item.name }}
          </li>
        </ul>
      </div>
      <div v-loading="listLoading" class="exhibits-cont">
        <ul>
          <li v-for="item in tradelist" :key="item.id">
            <div class="exhibits-top">
              <nuxt-link :to="'/exhibits/companylist/' + item.id">
                <div class="overlay">
                  <div class="circle">
                    <i class="iconfont icon-fanhui-copy-copy" />
                  </div>
                </div>
              </nuxt-link>
              <img :src="$store.state.imgUrl + item.companyavatar" alt />
            </div>
            <div class="exhibits-bottom">
              <div class="exhibits-title">{{ item.name }}</div>
              <div class="exhibits-mintitle">{{ item.summary }}</div>
            </div>
          </li>
        </ul>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="dataObj.last_page"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import request from "~/plugins/request";
import { getPtrade, getIndexTrade, getTrade } from "~/api/index";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      listLoading: false,
      currentPage: 0, // 当前页
      curr: -1, // 展会分类索引
      currIndex: -1, // 子行业选中索引
      ptrade: [], // 展会分类列表
      trade: [], // 子行业列表
      tradelist: [],
      dataObj: {},
      pagesize: 15, // 每页个数数量
      page: 1, // 默认第1页
      exhibiton: "", // 展会分类
      trade_id: "" // 子行业
    };
  },
  async created() {
    const ptrade = await getPtrade();
    this.ptrade = ptrade.data;
    const trade = await getIndexTrade(this.ptrade[0].id);
    this.trade = trade.data; // 行业路由
    const { pagesize } = this;
    const { exhibiton } = this;
    const { trade_id } = this;
    const { page } = this;

    this.listLoading = true;
    const tradelist = await getTrade(pagesize, "", "", page);
    setTimeout(() => {
      this.listLoading = false;
    }, 300);
    this.dataObj = tradelist.data;
    this.tradelist = tradelist.data.data; // 商品列表
  },
  methods: {
    // 点击展会分类事件
    async handleVal(id, index) {
      this.curr = index;
      this.currIndex = "";
      const trade = await getIndexTrade(id);
      this.trade = trade.data; // 展会分类列表改变
      this.exhibiton = id; // 展会分类列表id
      const trade_id = ""; // 子行业id为空
      const { pagesize, exhibiton } = this; // 每页个数不变
      const page = 1; // page页面从1开始
      this.tradelist = []; // 原来的数据列表清空
      this.listLoading = true;
      const tradelist = await getTrade(pagesize, exhibiton, trade_id, page);
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
      this.dataObj = tradelist.data;
      this.tradelist = tradelist.data.data; // 商品列表
    },
    // 点击子行业事件
    async industryVal(id, index) {
      this.currIndex = index;
      const { exhibiton } = this; // 展会分类列表id：为当前选择状态下的id
      this.trade_id = id; // 子行业id为当前点击的id
      const { pagesize, trade_id } = this; // 每页个数不变
      const page = 1; // page页面从1开始
      this.tradelist = []; // 原来的数据列表清空
      this.listLoading = true;
      const tradelist = await getTrade(pagesize, exhibiton, trade_id, page);
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
      this.dataObj = tradelist.data;
      this.tradelist = tradelist.data.data; // 商品列表
    },
    // 点击分页
    async handleCurrentChange(currentPage, alltradelist) {
      // console.log(currentPage)
      // 获取点击的当前页
      const page = currentPage;
      this.currentPage = currentPage;
      const { pagesize } = this; // 每页的个数不变
      const { exhibiton } = this; // 展会分类列表id：为当前选中状态下的id
      const { trade_id } = this; // 子行业id：为当前选中状态下的id
      this.page = page; // 当前的页面值
      this.listLoading = true;
      const tradelist = await getTrade(pagesize, exhibiton, trade_id, page);
      setTimeout(() => {
        this.listLoading = false;
      }, 300);
      this.dataObj = tradelist.data;
      this.tradelist = tradelist.data.data; // 商品列表
    }
  }
};
</script>

<style scoped lang="scss">
.banner {
  width: 100%;
  margin: auto;
  min-width: 1200px;
  img {
    display: block;
    width: 100%;
  }
}
.conter {
  width: 1200px;
  margin: 0 auto;
  .nav {
    margin-top: 65px;
    overflow: hidden;
    &:nth-child(2) {
      margin-top: 30px;
    }
    .nav-title {
      float: left;
      width: 100px;
      font-size: 16px;
      color: #666;
      font-weight: bold;
      line-height: 44px;
    }
    ul {
      float: left;
      width: 1100px;
      li {
        width: 174px;
        height: 44px;
        line-height: 44px;
        background: #fff;
        border: 1px solid #dadada;
        color: #666666;
        font-size: 16px;
        float: left;
        text-align: center;
        margin-right: 10px;
        margin-bottom: 10px;
        cursor: pointer;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
        &:nth-child(6n) {
          margin-right: 0;
        }
        &.active {
          background: #1ca7ec;
          color: #fff;
          border: 1px solid #1ca7ec;
        }
        &:hover {
          background: #1ca7ec;
          color: #fff;
          border: 1px solid #1ca7ec;
        }
      }
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
        border: 1px solid rgba(0, 0, 0, 0.1);
        float: left;
        margin-right: 37px;
        margin-bottom: 40px;
        transition: 0.3s;
        -webkit-transition: 0.3s;
        &:hover {
          box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
        }
        &:nth-child(3n) {
          margin-right: 0;
        }
        .exhibits-top {
          width: 375px;
          height: 178px;
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
          margin-top: 30px;
          margin-left: 33px;
          width: 250px;
          .exhibits-title {
            color: #333333;
            font-size: 18px;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
          }
          .exhibits-mintitle {
            font-size: 16px;
            color: #888888;
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
            margin-top: 25px;
          }
          .exhibits-data {
            font-size: 16px;
            color: #999;
            margin-top: 15px;
          }
        }
      }
    }
  }
  .page {
    text-align: center;
    margin: 40px;
  }
}
</style>
