<template>
  <div>
    <Header />
    <div class="banner-wrap">
      <img src="~static/images/live-banner.jpg" alt />
    </div>
    <div class="live-wrap">
      <div class="wrap live">
        <!-- 推荐 start -->
        <div class="live-recomd-items">
          <div
            v-for="(item,index) in recommendList.slice(0,2)"
            :key="index"
            class="live-recomd-item"
          >
            <div class="live-recomd-pic">
              <a :href="item.url" target="_blank">
                <img class="live-recomd-img" :src="$store.state.imgUrl+item.showimage" alt />
                <div class="label">
                  <div class="xui-playing">
                    <i />
                    <i />
                    <i />
                  </div>直播
                </div>
                <div class="recommende-mask">
                  <div class="cir">
                    <i class="el-icon-arrow-right" />
                  </div>
                </div>
              </a>
            </div>
            <div class="live-recomd-content">
              <a :href="item.url" target="_blank" class="el live-recomd-title">{{ item.title }}</a>
              <div class="live-tags">
                <div class="live-tag orange">展览360官方</div>
                <div class="live-tag blue">最新推荐</div>
              </div>
              <div class="el live-desc">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <!-- 推荐 end -->

        <!-- 其他直播 start -->
        <div class="live-items">
          <div v-for="(item,index) in liveList" :key="index" class="live-item">
            <div class="live-item-pic">
              <a :href="item.url" target="_blank">
                <img class="live-item-img" :src="$store.state.imgUrl+item.showimage" alt />
                <div class="label">
                  <div class="xui-playing">
                    <i />
                    <i />
                    <i />
                  </div>直播
                </div>
                <div class="recommende-mask">
                  <div class="cir">
                    <i class="el-icon-arrow-right" />
                  </div>
                </div>
              </a>
            </div>
            <div class="live-item-content">
              <a :href="item.url" class="el live-item-title">{{ item.title }}</a>
              <div class="live-tags">
                <div class="live-tag orange">展览360官方</div>
                <div class="live-tag blue">展商直播</div>
              </div>
              <div class="el-2 live-item-desc">{{ item.detailed }}</div>
              <div class="el live-item-company">{{ item.name }}</div>
            </div>
          </div>
        </div>
        <!-- 其他直播 end -->
      </div>
      <div class="page">
        <el-pagination
          background
          :current-page="currentPage"
          :page-size="paseSize"
          layout="prev, pager, next, jumper"
          :total="total"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getLive, getLiveList } from "~/api/index";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
export default {
  components: {
    Header,
    Footer
  },
  data() {
    return {
      currentPage: 0, // 当前页
      total: 1, // 总条数
      totalPage: 1, // 总页数
      paseSize: 6, // 每页个数
      // 推荐列表
      recommendList: [],
      // 直播列表
      liveList: []
    };
  },
  async created() {
    const live = await getLive();
    this.recommendList = live.data;
    const livelist = await getLiveList();
    this.liveList = livelist.data.data;
    this.total = livelist.data.total; // 总条数
    this.totalPage = livelist.data.last_page; // 总页数
    this.currentPage = livelist.data.current_page; // 当前页
  },
  methods: {
    async handleCurrentChange(currentPage, alltradelist) {
      // 获取点击的当前页
      this.currentPage = currentPage;
      const trades = await request.get(
        "index/Cloudexhibition?page=" + currentPage
      );
      this.recomList = trades.data.data;
    }
  }
};
</script>

<style scoped lang="scss">
.banner-wrap {
  width: 100%;
  min-width: 1200px;
  img {
    display: block;
    width: 100%;
  }
}

.live-wrap {
  width: 100%;
  min-width: 1200px;
  background: #73a5e0 url("~static/images/live-bg.png") top right no-repeat;
  .live {
    padding: 70px 0;

    .live-recomd-items {
      display: flex;
      width: 1220px;
      .live-recomd-item {
        width: 590px;
        background: #fff;
        margin-right: 24px;
        margin-bottom: 50px;

        &:hover {
          .recommende-mask {
            background: rgba(255, 255, 255, 0.8);
          }
          .recommende-mask .cir {
            background: rgba(0, 0, 0, 0.7);
          }
          .recommende-mask .cir i {
            display: block;
          }
        }

        .live-recomd-pic {
          width: 590px;
          height: 334px;
          position: relative;
          .live-recomd-img {
            width: 590px;
            height: 334px;
          }
        }

        .live-recomd-content {
          width: 590px;
          height: 108px;
          background: #fff;
          padding: 20px;
          .live-recomd-title {
            display: block;
            font-size: 18px;
            color: #333;
          }

          .live-desc {
            color: #888;
            margin-top: 10px;
          }
        }
      }
    }
  }
}

.live-tags {
  margin-top: 10px;
  display: flex;
  .live-tag {
    font-size: 12px;
    padding: 2px 4px;
    margin-right: 1px;
    &.orange {
      background: #fff1e6;
      color: #1ca7ec;
    }
    &.blue {
      background: #ebf5ff;
      color: #04a0f1;
    }
  }
}

.label {
  position: absolute;
  width: 60px;
  height: 30px;
  background: #1ca7ec;
  color: #fff;
  left: 20px;
  top: 12px;
  z-index: 2;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 12px;
}

.live-items {
  width: 1224px;
  display: flex;
  flex-wrap: wrap;
  .live-item {
    width: 386px;
    height: 378px;
    background: #fff;
    margin-right: 22px;
    margin-bottom: 20px;
    &:hover {
      .recommende-mask {
        background: rgba(255, 255, 255, 0.8);
      }
      .recommende-mask .cir {
        background: rgba(0, 0, 0, 0.7);
      }
      .recommende-mask .cir i {
        display: block;
      }
    }
    .live-item-pic {
      width: 386px;
      height: 220px;
      overflow: hidden;
      position: relative;
      .live-item-img {
        width: 386px;
        height: 220px;
      }
    }
    .live-item-content {
      width: 386px;
      height: 156px;
      padding: 20px;
      .live-item-title {
        font-size: 18px;
        color: #333;
        font-weight: bold;
        display: block;
        margin-bottom: 10px;
      }
      .live-item-desc {
        margin-top: 4px;
        color: #999;
        font-size: 12px;
        line-height: 1.8;
      }
      .live-item-company {
        font-size: 16px;
        color: #333;
        margin-top: 6px;
      }
    }
  }
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

//直播动画css
.xui-playing {
  margin-right: 4px;
  font-size: 0;
}
.xui-playing::after {
  content: "";
  display: inline-block;
  width: 100%;
  height: 0;
  overflow: hidden;
}

.xui-playing i {
  display: inline-block;
  width: 3px;
  height: 12px;
  border-radius: 6px;
  background: #fff;
  -webkit-animation: is-playing 0.5s ease infinite alternate;
  animation: is-playing 0.5s ease infinite alternate;
  -webkit-transform-origin: bottom;
  -ms-transform-origin: bottom;
  transform-origin: bottom;
  margin-right: 2px;
}

.xui-playing i:nth-child(1) {
  -webkit-animation-delay: 0.15s;
  animation-delay: 0.15s;
}

.xui-playing i:nth-child(2) {
  -webkit-animation-delay: 0.3s;
  animation-delay: 0.3s;
}
.xui-playing i:nth-child(3) {
  -webkit-animation-delay: 0.45s;
  animation-delay: 0.45s;
}

@-webkit-keyframes is-playing {
  0% {
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
  }

  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}

@keyframes is-playing {
  0% {
    -webkit-transform: scaleY(0.2);
    transform: scaleY(0.2);
  }

  100% {
    -webkit-transform: scaleY(1);
    transform: scaleY(1);
  }
}
.page {
  text-align: center;
  padding-bottom: 30px;
}
</style>
