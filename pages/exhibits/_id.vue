<template>
  <div>
    <Header></Header>
    <div class="banner">
      <img src="~static/images/exhib-banner.jpg" alt />
    </div>
    <div class="conter">
      <div class="nav">
        <ul>
          <li
            v-for="(item,index) in trade"
            :key="item.id"
            @click="handleVal(item.id,index)"
            :class="{ active: curr==index }"
          >{{item.name}}</li>
        </ul>
      </div>
      <div class="exhibits-cont">
        <ul>
          <li v-for="item in tradelist" :key="item.id">
            <div class="exhibits-top">
              <nuxt-link :to="'/exhibits/companylist/'+item.id">
                <div class="overlay">
                  <div class="circle">
                    <i class="iconfont icon-fanhui-copy-copy"></i>
                  </div>
                </div>
              </nuxt-link>
              <img :src="$store.state.imgUrl+item.companyavatar" alt />
            </div>
            <div class="exhibits-bottom">
              <div class="exhibits-title">{{item.name}}</div>
              <div class="exhibits-mintitle">{{item.summary}}</div>
              <!-- <div class="exhibits-data">2021.10.12 ~ 10.16</div> -->
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
        ></el-pagination>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import request from "~/plugins/request";
import { getTrade, getIndexTrade } from "~/api/index";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      currentPage: 0, // 当前页
      curr: 0,
      trade: [],
      tradelist: [],
      dataObj: {},
      pagesize: 15, // 每页个数数量
      page: 1, // 默认第1页
      exhibiton: this.$route.params.id, // 当前大类的id
      trade_id: "" // 大类下面的小类的id
    };
  },
  async created () {
    let id = this.$route.params.id;
    let trade = await getIndexTrade(id);
    this.trade = trade.data; //行业路由
    let { pagesize } = this;
    let { exhibiton } = this;
    let { trade_id } = this;
    let { page } = this;
    let tradelist = await getTrade(pagesize, exhibiton, trade_id, page);
    this.dataObj = tradelist.data;
    this.tradelist = tradelist.data.data; // 商品列表
  },
  methods: {
    async handleVal (id, index) {
      this.curr = index;
      let trade_id = id;
      this.trade_id = trade_id; // 传值获取商品的数据
      let { pagesize } = this;
      let { exhibiton } = this;
      let page = 1; // page页面从1开始
      this.tradelist = []; // 原来的数据列表清空
      let tradelist = await getTrade(pagesize, exhibiton, trade_id, page);
      this.dataObj = tradelist.data;
      this.tradelist = tradelist.data.data; // 商品列表
    },
    async handleCurrentChange (currentPage, alltradelist) {
      // 获取点击的当前页
      let page = currentPage;
      this.currentPage = currentPage;
      let { pagesize } = this;
      let { exhibiton } = this;
      let { trade_id } = this;
      this.page = page;
      let tradelist = await getTrade(pagesize, exhibiton, trade_id, page);
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
    ul {
      li {
        width: 191px;
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
