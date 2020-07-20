<template>
  <div class="container">
    <Header />
    <div class="newsinformation">
      <div class="wrap">
        <!-- 顶栏start -->
        <div class="topbar">
          <div class="title_left">往期回顾</div>
          <!-- <div class="location_right">
            <nuxt-link to="/">首页</nuxt-link>/
            <nuxt-link to="/">关于我们</nuxt-link>/
            <nuxt-link to="/review">往期回顾</nuxt-link>
          </div> -->
        </div>
        <!-- 顶栏end -->
      </div>
    </div>
    <!-- 瞄点 -->
    <div class="wrap2">
      <div class="anchor">
        <ul>
          <li v-for="(item,index) in reviewList" :key="index">
            {{ item.create_time.split("/")[0] }}
            <i />
            <span />
          </li>
        </ul>
      </div>
    </div>
    <div class="review">
      <div v-for="item in reviewList" :key="item.id" class="review-list">
        <div class="review-img">
          <img :src="$store.state.imgUrl+item.showimage" alt />
        </div>
        <div class="review-cont">
          <div class="review-data">
            <img src="~static/images/data.png" alt />
            <span>{{ item.create_time }}</span>
          </div>
          <div class="review-title">{{ item.title }}</div>
          <div class="review-maxtit">{{ item.subhead }}</div>
          <div class="review-mintitle">{{ item.describe }}</div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import { getReview } from '~/api/index'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      reviewList: []
    }
  },
  async created () {
    const moule = await getReview()
    this.reviewList = moule.data.data
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
  .wrap2 {
    width: 1200px;
    margin: 0 auto;
    position: relative;
    .anchor {
      width: 42px;
      position: absolute;
      top: 70px;
      left: -52px;
      ul {
        li {
          float: left;
          margin-bottom: 20px;
          font-size: 12px;
          font-weight: 300;
          color: #1ca7ec;
          position: relative;
          i {
            width: 10px;
            height: 10px;
            background: #1ca7ec;
            border-radius: 50%;
            display: block;
            float: right;
            margin-top: 2px;
            margin-left: 5px;
          }
          span {
            width: 2px;
            height: 27px;
            background: #1ca7ec;
            display: block;
            position: absolute;
            right: 4px;
            top: 10px;
          }
          &:nth-last-child(1) span {
            display: none;
          }
        }
      }
    }
  }
  .review {
    width: 1200px;
    margin: 0 auto;
    overflow: hidden;
    .review-list {
      padding: 70px 0;
      overflow: hidden;
      border-bottom: 1px solid #e4e4e4;
      .review-img {
        width: 360px;
        // height: 440px;
        background: #fff;
        border: 1px solid #e4e4e4;
        // box-shadow: 0px 3px 16px 0px rgba(0, 0, 0, 0.11);
        float: left;
        padding: 10px;
        img {
          width: 338px;
          height: 204px;
          margin-bottom: 10px;
          &:nth-last-child(1) {
            margin-bottom: 0;
          }
        }
      }
      .review-cont {
        float: right;
        width: 810px;
        .review-data {
          color: #1ca7ec;
          font-size: 24px;
          font-weight: bold;
          overflow: hidden;
          line-height: 35px;
          margin-bottom: 45px;
          img {
            width: 35px;
            height: 35px;
            float: left;
            margin-right: 15px;
          }
        }
        .review-title {
          margin-bottom: 15px;
          color: #666666;
          font-size: 18px;
          font-weight: bold;
        }
        .review-maxtit {
          color: #666666;
          font-size: 18px;
          font-weight: bold;
          margin-bottom: 44px;
        }
        .review-mintitle {
          height: 120px;
          font-size: 16px;
          font-weight: 400;
          color: #666666;
          line-height: 30px;
          text-overflow: -o-ellipsis-lastline;
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-line-clamp: 4;
          line-clamp: 4;
          -webkit-box-orient: vertical;
        }
      }
      &:nth-child(2n) .review-img {
        float: right;
      }
      &:nth-child(2n) .review-cont {
        float: left;
      }
    }
  }
}
</style>
