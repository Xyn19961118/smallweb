<template>
  <div class="container">
    <Header></Header>

    <div class="wrap">
      <!-- 为您推荐start -->
      <div class="recoTop" v-for="(item,index) in recoTopList" :key="index">
        <div class="title">搜索结果</div>
      </div>
      <div class="search-none" v-if="recomList.length == 0">没有搜索到任何结果</div>
      <div class="recommende">
        <nuxt-link
          class="commodities"
          v-for="(item,index) in recomList"
          :key="index"
          :to="'/exhibits/details/' + item.id"
        >
          <div class="recommende-pic">
            <img class="recommende-img" :src="$store.state.imgUrl+item.showimage" alt />
            <div class="recommende-mask">
              <div class="cir">
                <i class="el-icon-arrow-right"></i>
              </div>
            </div>
          </div>
          <div class="mr">
            <div class="price">{{item.price?'￥'+item.price:"面议"}}</div>
            <div class="el-2 describe">{{item.title}}</div>
            <div class="originate">{{item.companyName}}</div>
          </div>
        </nuxt-link>
      </div>
      <!-- 为您推荐end -->
      <div class="page">
        <el-pagination
          @current-change="handleCurrentChange"
          background
          :current-page="currentPage"
          :page-size="paseSize"
          layout="prev, pager, next, jumper"
          :total="total"
        ></el-pagination>
      </div>
    </div>
    <Footer></Footer>
  </div>
</template>

<script>
import request from "~/plugins/request";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import { getSearchGoods } from "~/api/index";
export default {
  components: {
    Header,
    Footer
  },
  created() {
    this.keyword = this.$route.query.search;
    this.getSearch(this.keyword);
  },
  data() {
    return {
      keyword: "",
      currentPage: 0, // 当前页
      total: 1, // 总条数
      totalPage: 1, // 总页数
      paseSize: 12, // 每页个数
      recoTopList: [
        {
          title: "为您推荐",
          time: "最新更新时间：2020年5月19日"
        }
      ],
      recomList: []
    };
  },
  methods: {
    async handleCurrentChange(currentPage, alltradelist) {
      // 获取点击的当前页
      this.currentPage = currentPage;
      this.getSearch(this.keyword, this.currentPage);
    },
    //请求数据调用接口
    async getSearch(keyword, page) {
      let shop = await getSearchGoods(keyword, page);
      this.recomList = shop.data.data;
      this.total = shop.data.total; //总条数
      this.totalPage = shop.data.last_page; // 总页数
      this.currentPage = shop.data.current_page; // 当前页
    }
  },
  watch: {
    $route() {
      // console.log(this.$route.query);
      this.getSearch(this.$route.query.search);
    }
  }
};
</script>
<style lang='scss' scoped>
.container {
  // banner
  background: #f3f3f7;
  .banner {
    width: 100%px;
    margin: auto;
    min-width: 1200px;
    img {
      display: block;
      width: 100%;
    }
  }
  // 为您推荐(上面)
  .recoTop {
    display: flex;
    justify-content: space-between;
    margin: 68px 0px 68px 0px;
    .title {
      color: #000000;
      font-size: 30px;
    }
    .time {
      font-size: 20px;
      font-style: italic;
      color: #999999;
    }
  }
  //为您推荐(商品部分)
  .recommende {
    display: flex;
    flex-wrap: wrap;
    width: 1239px;
    .commodities {
      width: 375px;
      height: 520px;
      margin-right: 38px;
      background: #ffffff;
      border: 1px solid rgba(0, 0, 0, 0.1);
      margin-bottom: 38px;
      transition: 0.3s;
      -webkit-transition: 0.3s;
      overflow: hidden;
      &:hover {
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
        .recommende-pic .recommende-mask {
          background: rgba(255, 255, 255, 0.8);
        }
        .recommende-pic .recommende-mask .cir {
          background: rgba(0, 0, 0, 0.7);
        }
        .recommende-pic .recommende-mask .cir i {
          display: block;
        }
      }
      .recommende-pic {
        width: 375px;
        height: 375px;
        margin-bottom: 22px;
        overflow: hidden;
        position: relative;
        .recommende-img {
          width: 375px;
          height: 375px;
        }
        .recommende-mask {
          position: absolute;
          left: 0;
          top: 0;
          background: rgba(255, 255, 255, 0);
          width: 100%;
          height: 100%;
          transition: 0.3s;
          display: flex;
          align-items: center;
          justify-content: center;
          .cir {
            height: 50px;
            width: 50px;
            background: rgba(0, 0, 0, 0);
            overflow: hidden;
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            transition: 0.3s;
            i {
              color: #fff;
              font-size: 20px;
              font-weight: bold;
              display: none;
            }
          }
        }
      }

      .mr {
        padding: 0 21px 0 34px;
      }
      .price {
        font-size: 24px;
        font-weight: bold;
        color: #1ca7ec;
        margin-bottom: 17px;
      }
      .describe {
        width: 320px;
        font-size: 16px;
        margin-bottom: 10px;
        color: #333333;
      }
      .originate {
        font-size: 14px;
        color: #888888;
      }
    }
  }
}
.page {
  text-align: center;
  margin: 30px 0;
}
.search-none {
  font-size: 20px;
  color: #999;
}
</style>
