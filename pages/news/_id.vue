<template>
  <div class="container">
    <Header />
    <div class="newsinformation">
      <div class="wrap">
        <!-- 顶栏start -->
        <div class="topbar">
          <div class="title_left">{{ newsList.name }}</div>
          <div class="location_right">
            <nuxt-link to="/">首页</nuxt-link>/
            <nuxt-link to="/">关于我们</nuxt-link>/
            <nuxt-link to="/news">新闻资讯</nuxt-link>
          </div>
        </div>
        <!-- 顶栏end -->
      </div>
    </div>
    <!-- 详情 -->
    <div class="details wrap">
      <!-- 详情的左边-->
      <div class="headline_left">
        <!-- 详情的顶部 -->
        <div class="details_top">
          <div class="time">{{ newsList.create_time }}</div>
          <div class="company">{{ newsList.company }}</div>
        </div>
        <!-- ----详情的正文部分--- -->
        <div class="main">
          <div class="content" v-html="newsList.newscontent" />
        </div>
      </div>
      <!-- 详情的右边-->
      <div class="news_rigt">
        <div class="news">
          <div class="tate" />
          <div class="tatext">推荐新闻</div>
        </div>
        <div class="new">
          <div v-for="(item,index) in news.slice(0, 5)" :key="index" class="tag-wrap">
            <nuxt-link class="el-2 tag" :to="'/news/'+item.id">{{ item.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import { getNewsData, getNews } from '~/api/index'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      // 详情内容
      newsList: [],
      // 右侧推荐
      news: []
    }
  },
  async created () {
    const id = this.$route.params.id
    const data = await getNewsData(id)
    this.newsList = data.data
    const news = await getNews()
    this.news = news.data.data
  }
}
</script>
<style lang='scss' scoped>
.container {
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
  .details {
    display: flex;
    justify-content: space-between;
    margin-top: 70px;
    .headline_left {
      width: 794px;
      .main {
        margin-bottom: 98px;
        .content {
          font-size: 16px;
          color: #666666;
          line-height: 36px;
        }
      }
    }
    .details_top {
      display: flex;
      align-items: center;
      font-size: 18px;
      color: #666666;
      line-height: 50px;
      border-top: 1px solid #e4e4e4;
      border-bottom: 1px solid #e4e4e4;
      .time {
        margin-right: 10px;
      }
      .clock {
        margin-right: 10px;
      }
    }
    .news_rigt {
      line-height: 30px;
      width: 360px;
      .news {
        border-bottom: 1px solid #e4e4e4;
        .tate {
          position: absolute;
          width: 6px;
          height: 35px;
          background: #73a5e0;
        }
        .tate:after {
          content: "";
          position: absolute;
          top: 40%;
          right: -20px;
        }
        .tatext {
          font-size: 18px;
          color: #333333;
          line-height: 40px;
          margin-left: 9px;
        }
      }
      .tag-wrap {
        padding: 20px 0;
        border-bottom: 1px solid #e4e4e4;
        &:last-child {
          border-bottom: none;
        }
      }
      .tag {
        color: #666666;
        font-size: 18px;
      }

      .tag:hover {
        color: #1ca7ec;
      }
    }
  }
}
</style>
