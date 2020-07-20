<template>
  <div class="container">
    <Header />
    <div class="newsinformation">
      <div class="wrap">
        <!-- 顶栏start -->
        <div class="topbar">
          <div class="title_left">新闻资讯</div>
          <!-- <div class="location_right">
            <nuxt-link to="/">首页</nuxt-link>/
            <nuxt-link to="/">关于我们</nuxt-link>/
            <nuxt-link to="/news">新闻资讯</nuxt-link>
          </div> -->
        </div>
        <!-- 顶栏end -->
      </div>
    </div>
    <!-- 资讯详情start -->
    <div class="information wrap">
      <!--左边详情  -->
      <div class="left">
        <div v-for="(item,index) in newsList" :key="index" class="details_left">
          <div v-if="index<3" class="details_img">
            <nuxt-link :to="'/news/'+item.id">
              <img :src="$store.state.imgUrl+item.showimage" alt class="detaimg" />
            </nuxt-link>
          </div>
          <nuxt-link :to="'/news/'+item.id" class="el title">{{ item.name }}</nuxt-link>
          <div class="describe" v-html="item.newscontent">{{ item.describe }}</div>
          <div class="border" />
          <!-- 详情底部 (左边底部的左边和右边)-->
          <div class="details_base">
            <!-- 左边时间 -->
            <div class="time_left">
              <div class="clock">
                <img src="@/static/images/eyes.png" alt />
              </div>
              <div class="time">{{ item.create_time.slice(0,10) }}</div>
              <!-- <div class="eye">
                <img src="@/static/images/eyes.png" alt />
              </div>-->
            </div>
            <!-- 右边详情 -->
            <!-- <nuxt-link class="text" to="">详情</nuxt-link > -->
          </div>
        </div>
      </div>

      <!--右边标签  -->
      <div class="tag_right">
        <div class="text">
          <div class="tate" />
          <div class="tatext">标签</div>
        </div>
        <div class="tags">
          <nuxt-link
            v-for="(item,index) in tagList"
            :key="index"
            class="el tag"
            :to="'/exhibits/'+item.id"
          >{{ item.trade }}</nuxt-link>
        </div>
      </div>
    </div>
    <!-- 资讯详情end -->
    <div class="page">
      <el-pagination
        background
        :current-page="currentPage"
        :page-size="paseSize"
        layout="prev, pager, next, jumper"
        :total="total"
      />
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import { getPtrade, getNews } from '~/api/index'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      currentPage: 0, // 当前页
      total: 1, // 总条数
      totalPage: 1, // 总页数
      paseSize: 1, // 每页个数
      newsList: [],
      // 1
      detailsList: [],
      tagList: []
    }
  },
  async created () {
    const tabTitle = await getPtrade()
    this.tagList = tabTitle.data
    const news = await getNews()
    this.newsList = news.data.data
    this.total = news.data.total // 总条数
    this.totalPage = news.data.last_page // 总页数
    this.paseSize = news.data.per_page // 每页个数
    this.currentPage = news.data.current_page // 当前页
  }
}
</script>
<style lang='scss' scoped>
.container {
  .wrap {
    width: 1200px;
    margin: auto;
  }
  //顶栏
  .newsinformation {
    width: 100%;
    background: #f8f8f8;
    .topbar {
      height: 100px;
      line-height: 100px;
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
        a {
          color: #999999;
          margin: 0 8px 0 6px;
        }
      }
    }
  }
  //资讯详情
  .information {
    display: flex;
    flex-wrap: wrap;
    margin-top: 70px;
    .details_left {
      margin-bottom: 76px;
      .details_img {
        width: 846px;
        height: 512px;
        overflow: hidden;
        .detaimg {
          width: 846px;
          height: 512px;
        }
      }
      .title {
        font-size: 24px;
        font-weight: bold;
        color: #333333;
        display: block;
        margin-top: 36px;
      }
      .title:hover {
        color: #1ca7ec;
      }
      .describe {
        width: 844px;
        height: 54px;
        font-size: 16px;
        color: #333333;
        line-height: 30px;
        margin-top: 25px;
        text-overflow: -o-ellipsis-lastline;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .border {
        width: 847px;
        height: 1px;
        margin-top: 36px;
        background: #e4e4e4;
      }
      .details_base {
        display: flex;
        justify-content: space-between;
        margin-top: 23px;
        .time_left {
          display: flex;
          align-items: center;
          .clock {
            width: 16px;
            margin-right: 8px;
          }
          .time {
            font-size: 16px;
            color: #333333;
            margin-right: 24px;
          }
          .eye {
            width: 19px;
          }
        }
      }
    }
    .tag_right {
      line-height: 30px;
      margin-left: 40px;
      width: 250px;
      .text {
        margin-bottom: 10px;
        .tate {
          position: absolute;
          width: 6px;
          height: 35px;
          background: #1ca7ec;
        }
        .tate:after {
          content: "";
          position: absolute;
          top: 40%;
          right: -20px;
        }
        .tatext {
          font-size: 16px;
          color: #333333;
          line-height: 40px;
          margin-left: 9px;
        }
      }
      .tags {
        .tag {
          position: relative;
          display: block;
          padding-left: 15px;
          color: #666;

          &::before {
            content: "";
            display: block;
            position: absolute;
            left: 0;
            top: 12px;
            width: 6px;
            height: 6px;
            border-radius: 50%;
            background: #666;
          }
        }
      }
      .tags a:hover {
        color: #1ca7ec;
      }
    }
  }
}

.page {
  text-align: center;
  margin-bottom: 30px;
}
</style>

<style>
/* .el-pagination.is-background .btn-next,
.el-pagination.is-background .btn-prev,
.el-pagination.is-background .el-pager li {
  background: none;
  border: #ddd 1px solid;

} */
</style>
