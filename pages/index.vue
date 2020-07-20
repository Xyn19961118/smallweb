<template>
  <div class="container">
    <!-- <div class="index-header" :class="isIndex?'':'fixed'">
      <Header :isIndex="isIndex"></Header>
    </div>-->
    <div class="home-index">
      <Header />
    </div>

    <!--- banner视频 --->
    <div class="live-wrap">
      <div class="wrap live">
        <div class="live-left">
          <div id="video-live" v-loading="loadding"></div>
        </div>
        <div class="live-right">
          <a
            class="live-item"
            v-for="(item) in videoList"
            :key="item.id"
            :href="item.link"
            target="_blank"
          >
            <div class="border"></div>
            <img :src="item.imgUrl" alt />
          </a>
        </div>
      </div>
    </div>

    <!--- banner视频 --->

    <!-- 中间模块 start -->
    <div class="mould">
      <div class="mould-items">
        <nuxt-link
          v-for="(item,index) in mouleList"
          :key="index"
          :to="'/exhibits/'+item.id"
          class="moule-item"
        >
          <img :src="$store.state.imgUrl+item.pavilionimage" alt />
          <span :style="{color:(item.color?item.color:'#ffffff')} ">{{ item.trade }}</span>
        </nuxt-link>
      </div>
    </div>
    <!-- 中间模块 end -->

    <!-- 展商直播厅 start -->
    <!-- <live-broadcast /> -->
    <!-- 展商直播厅 end -->

    <!-- 推荐商品 start -->
    <div class="exhibit-wrap">
      <div class="wrap exhibit product">
        <div class="exhibit-title">推荐商品</div>
        <div class="exhibit-desc">只为你推荐最好 商品</div>

        <!-- <div class="exhibit-content">
          <div class="exhibits-cont">
            <ul>
              <li v-for="item in tradelist" :key="item.id">
                <div class="exhibits-top">
                  <nuxt-link :to="'/exhibits/companylist/'+item.id">
                    <img :src="$store.state.imgUrl+item.companyavatar" alt />
                  </nuxt-link>
                </div>
                <div class="exhibits-bottom">
                  <nuxt-link
                    :to="'/exhibits/companylist/'+item.id"
                    class="el exhibits-title"
                  >{{item.name}}</nuxt-link>
                  <div class="el-2 exhibits-data">2020新款！秋冬毛呢！单面大衣，披风 等面料！</div>
                </div>
              </li>
            </ul>
          </div>
        </div>-->

        <div class="recommende">
          <nuxt-link
            v-for="(item,index) in productList.slice(0,9)"
            :key="index"
            class="commodities"
            :to="'/exhibits/details/' + item.id"
          >
            <div class="recommende-pic">
              <img class="recommende-img" :src="$store.state.imgUrl+item.showimage" alt />
              <div class="recommende-mask">
                <div class="cir">
                  <i class="el-icon-arrow-right" />
                </div>
              </div>
            </div>
            <div class="mr">
              <div class="price">{{ item.price && item.price !== "0.00" ?'￥'+item.price:"面议" }}</div>
              <div class="el-2 describe">{{ item.describe }}</div>
              <div class="originate">{{ item.name }}</div>
            </div>
          </nuxt-link>
        </div>
        <nuxt-link to="/hotselling" class="link-more">查看更多商品></nuxt-link>
      </div>
    </div>
    <!-- 推荐商品 end -->

    <!-- 内容求购 start -->
    <div class="img-wrap">
      <img class="img" src="~static/images/wantbuy.jpg" alt />
      <div class="wantbuy">
        <div class="wantbuy-top">
          <div class="wantbuy-title">内容求购</div>
          <div class="wantbuy-desc">只为您解决最好的需求</div>
        </div>
        <div class="wantbuy-content">
          <div class="wantbuy-cont wantbuy-cont-left">
            <div class="wantbuy-title">告诉提供商您需要什么</div>
            <div class="wantbuy-items">
              <div class="wantbuy-item">
                <div class="wantbuy-item-label">产品名称</div>
                <div class="wantbuy-item-right">
                  <el-input
                    v-model="wantBuyForm.name"
                    class="wantbuy-item-input01"
                    placeholder="请输入产品名称"
                  />
                </div>
              </div>
              <div class="wantbuy-item">
                <div class="wantbuy-item-label">数 量</div>
                <div class="wantbuy-item-right">
                  <el-input
                    v-model="wantBuyForm.number"
                    type="number"
                    class="wantbuy-item-input"
                    placeholder="请输入数量"
                  />
                  <el-select
                    v-model="wantBuyForm.selected"
                    class="wantbuy-item-input"
                    placeholder="请选择"
                  >
                    <el-option label="件" value="1" />
                    <el-option label="箱" value="2" />
                  </el-select>
                </div>
              </div>
            </div>
            <button class="wantbuy-sub">立即询价</button>
          </div>
          <div class="wantbuy-cont wantbuy-cont-right" @click="handleChats">
            <img src="~static/images/wantbuy-right.png" alt />
          </div>
        </div>
      </div>
    </div>

    <!-- 内容求购折线图 -->
    <div v-if="showChats" class="mask" @click="handleChats" />
    <transition name="bounce">
      <div v-if="showChats" class="charts">
        <div class="charts-title">我们的优势</div>
        <div class="el-icon-circle-close charts-close" @click="handleChats" />
        <ve-line :data="chartData" :extend="extend" />
      </div>
    </transition>

    <!-- 内容求购 end -->

    <!-- 精选展商 start -->
    <div class="exhibit-wrap">
      <div class="wrap exhibit">
        <div class="exhibit-title">精选展商</div>
        <div class="exhibit-desc">链接产业上下游，展示丰富产品品类</div>

        <div class="exhibit-content">
          <div class="exhibits-cont">
            <ul>
              <li v-for="item in tradelist.slice(0,12)" :key="item.id">
                <div class="exhibits-top">
                  <nuxt-link :to="'/exhibits/companylist/'+item.id">
                    <!-- <div class="overlay">
                      <div class="circle">
                        <i class="iconfont icon-fanhui-copy-copy"></i>
                      </div>
                    </div>-->
                    <img :src="$store.state.imgUrl+item.companyavatar" alt />
                  </nuxt-link>
                </div>
                <div class="exhibits-bottom">
                  <div class="el exhibits-title">{{ item.name }}</div>
                  <div class="el exhibits-mintitle">{{ item.summary }}</div>
                  <div class="el exhibits-data">2021.10.12 ~ 10.16</div>
                </div>
              </li>
            </ul>
          </div>
          <nuxt-link to="/exhibits" class="link-more">查看更多展商></nuxt-link>
        </div>
      </div>
    </div>
    <!-- 精选展商 end -->

    <!-- 国家 start -->
    <div class="wrap nation">
      <div class="nation-title">全球216个国家企业</div>
      <div class="nation-items">
        <div v-for="(item,index) in cityList" :key="index" class="nation-item">
          <div class="nation-item-pic">
            <img :src="item.imgUrl" alt />
          </div>

          <div class="nation-item-text">{{ item.name }}</div>
        </div>
      </div>
    </div>
    <!-- 国家 end -->

    <!-- 新闻资讯 start -->
    <div class="foryou-wrap">
      <div class="wrap foryou">
        <div class="foryou-title">新闻资讯</div>
        <div class="foryou-items">
          <nuxt-link
            v-for="(item,index) in newsList.slice(0,4)"
            :key="index"
            :to="'/news/' + item.id"
            class="foryou-item"
          >
            <div class="foryou-item-pic">
              <div class="foryou-item-pic">
                <img :src="$store.state.imgUrl + item.showimage" alt />
              </div>
              <div class="mask" />
              <div class="line" />
              <div class="el-2 foryou-item-text">{{ item.name }}</div>
            </div>
          </nuxt-link>
        </div>
      </div>
    </div>
    <!-- 新闻资讯 end -->

    <!-- 合作品牌 start -->
    <div class="foryou-wrap">
      <div class="wrap foryou">
        <div class="foryou-title">合作品牌</div>
        <div class="brand-items">
          <a
            v-for="(item,index) in brandList.slice(0,16)"
            :key="index"
            :href="item.src"
            class="brand-item"
          >
            <img class="brand-item-pic" :src="$store.state.imgUrl+item.image" alt />
          </a>
        </div>
      </div>
    </div>
    <!-- 合作品牌 end -->

    <!-- 数量 start -->
    <!-- <div class="record-wrap">
      <div class="record img-wrap">
        <img class="img" src="~static/images/record.jpg" alt />
        <div class="record-content">
          <div class="record-items">
            <div class="record-item">
              <div class="record-item-num">1000+</div>
              <div class="record-item-label">展商数量</div>
            </div>
            <div class="record-item">
              <div class="record-item-num">2100+</div>
              <div class="record-item-label">观展数量</div>
            </div>
            <div class="record-item">
              <div class="record-item-num">50+</div>
              <div class="record-item-label">合作媒体数量</div>
            </div>
            <div class="record-item">
              <div class="record-item-num">450+</div>
              <div class="record-item-label">专业合作伙伴</div>
            </div>
          </div>
          <nuxt-link to class="record-link">查看更多</nuxt-link>
        </div>
      </div>
    </div>-->
    <!-- 数量 end -->

    <!-- 首页新闻 start -->
    <!-- <div class="index-news-wrap">
      <div class="wrap index-news">
        <div class="index-news-left">
          <img src="~static/images/news-index-pic.jpg" alt />
        </div>
        <div class="index-news-right">
          <div class="index-news-title">加油武汉 加油中国</div>
          <div class="index-news-items">
            <nuxt-link
              v-for="(item,index) in newsList"
              :key="index"
              :to="'/news/'+item.id"
              class="el index-news-item"
            >{{item.create_time}}{{item.name}}</nuxt-link>
          </div>
          <nuxt-link to="/news" class="index-news-more">更多新闻</nuxt-link>
        </div>
      </div>
    </div>-->
    <!-- 首页新闻 end -->

    <!-- 合作品牌 start -->
    <!-- <div class="wrap brand">
      <div class="brand-title">合作品牌</div>
      <div class="brand-content">
        <el-carousel indicator-position="outside" :interval="4000" height="81px" :loop="true">
          <el-carousel-item v-for="(item,index) in brandList" :key="index">
            <div class="brand-items">
              <div class="brand-item" v-for="(childItem,childIndex) in item" :key="childIndex">
                <a :href="item.url">
                  <img class="brand-item-pic" :src="$store.state.imgUrl+childItem.image" alt />
                </a>
              </div>
            </div>
          </el-carousel-item>
        </el-carousel>
      </div>
    </div>-->
    <!-- 合作品牌 end -->

    <!-- 底部 start -->
    <Footer />
    <!-- 底部 end -->
  </div>
</template>

<script>
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import LiveBroadcast from "~/components/home/liveBroadcast";
import {
  getPavilion,
  getExhibRecommend,
  getNewsindex,
  getVideo,
  getCooper,
  getRecommend,
  getLiveVideo
} from "~/api/index";
export default {
  name: "Index",
  components: {
    Header,
    Footer,
    LiveBroadcast
  },
  data() {
    this.extend = {
      series: {
        label: {
          normal: {
            show: true
          }
        }
      }
    };
    return {
      showChats: false, // 是否显示折线图
      chartData: {
        columns: [
          "年份",
          "展商数量",
          "观赏数量",
          "合作媒体数量",
          "专业合作伙伴"
        ],
        rows: [
          {
            年份: "2013",
            展商数量: 560,
            观赏数量: 1293,
            合作媒体数量: 19,
            合作媒体数量: 235
          },
          {
            年份: "2014",
            展商数量: 621,
            观赏数量: 2673,
            合作媒体数量: 23,
            专业合作伙伴: 312
          },
          {
            年份: "2015",
            展商数量: 743,
            观赏数量: 4787,
            合作媒体数量: 32,
            专业合作伙伴: 396
          },
          {
            年份: "2016",
            展商数量: 854,
            观赏数量: 7856,
            合作媒体数量: 43,
            专业合作伙伴: 475
          },
          {
            年份: "2017",
            展商数量: 903,
            观赏数量: 9346,
            合作媒体数量: 56,
            专业合作伙伴: 587
          },
          {
            年份: "2018",
            展商数量: 1002,
            观赏数量: 16367,
            合作媒体数量: 67,
            专业合作伙伴: 687
          },
          {
            年份: "2019",
            展商数量: 1345,
            观赏数量: 25478,
            合作媒体数量: 87,
            专业合作伙伴: 876
          },
          {
            年份: "2020",
            展商数量: 4293,
            观赏数量: 36890,
            合作媒体数量: 103,
            专业合作伙伴: 1232
          }
        ]
      },

      useless: false,
      isIndex: true,

      // 精选展商
      tradelist: [],

      // 推荐产品
      productList: [],

      // 中间模块列表
      mouleList: [],

      // 新闻列表
      newsList: [],

      // 合作品牌列表
      brandList: [],

      // 内容求购表单
      wantBuyForm: {
        name: "",
        number: "",
        selected: ""
      },

      // 视频描述
      loadding: false,
      myPlayer: "",
      videoOPt: {
        id: "video-live",
        url: "",
        autoplay: true,
        // isLive: true,
        // useHls: true,
        loop: true,
        fluid: true,
        fitVideoSize: "auto",
        volume: 0.6,
        videoInit: true,
        playbackRate: [0.5, 0.75, 1, 1.5, 2],
        defaultPlaybackRate: 1
      },
      videoCurr: 0,
      videoList: [
        {
          id: 1,
          imgUrl: require("~/static/images/index/icon01.png"),
          link: "http://www.capunp.org/"
        },
        {
          id: 2,
          imgUrl: require("~/static/images/index/icon02.png"),
          link: "https://www.unv.org/"
        },
        {
          id: 3,
          imgUrl: require("~/static/images/index/icon03.png"),
          link: "https://www.unido.org/"
        },
        {
          id: 4,
          imgUrl: require("~/static/images/index/icon04.png"),
          link: "https://www.cn.undp.org/"
        }
      ],
      cityList: [
        {
          name: "中国",
          imgUrl: require("~/static/images/city/city01.png")
        },
        {
          name: "爱尔兰",
          imgUrl: require("~/static/images/city/city02.png")
        },
        {
          name: "奥地利",
          imgUrl: require("~/static/images/city/city03.png")
        },
        {
          name: "澳大利亚",
          imgUrl: require("~/static/images/city/city04.png")
        },
        {
          name: "巴基斯坦",
          imgUrl: require("~/static/images/city/city05.png")
        },
        {
          name: "巴西",
          imgUrl: require("~/static/images/city/city06.png")
        },
        {
          name: "德国",
          imgUrl: require("~/static/images/city/city07.png")
        },
        {
          name: "俄罗斯",
          imgUrl: require("~/static/images/city/city08.png")
        },
        {
          name: "厄瓜多尔",
          imgUrl: require("~/static/images/city/city09.png")
        },
        {
          name: "法国",
          imgUrl: require("~/static/images/city/city10.png")
        },
        {
          name: "芬兰",
          imgUrl: require("~/static/images/city/city11.png")
        },
        {
          name: "荷兰",
          imgUrl: require("~/static/images/city/city12.png")
        },
        {
          name: "加拿大",
          imgUrl: require("~/static/images/city/city13.png")
        },
        {
          name: "罗马尼亚",
          imgUrl: require("~/static/images/city/city14.png")
        },
        {
          name: "马来西亚",
          imgUrl: require("~/static/images/city/city15.png")
        },
        {
          name: "美国",
          imgUrl: require("~/static/images/city/city16.png")
        },
        {
          name: "南非",
          imgUrl: require("~/static/images/city/city17.png")
        },
        {
          name: "挪威",
          imgUrl: require("~/static/images/city/city18.png")
        },
        {
          name: "葡萄牙",
          imgUrl: require("~/static/images/city/city19.png")
        },
        {
          name: "瑞士",
          imgUrl: require("~/static/images/city/city20.png")
        },
        {
          name: "沙特阿拉伯",
          imgUrl: require("~/static/images/city/city21.png")
        },
        {
          name: "土耳其",
          imgUrl: require("~/static/images/city/city22.png")
        },
        {
          name: "乌克兰",
          imgUrl: require("~/static/images/city/city23.png")
        },
        {
          name: "西班牙",
          imgUrl: require("~/static/images/city/city24.png")
        },
        {
          name: "新加坡",
          imgUrl: require("~/static/images/city/city25.png")
        },
        {
          name: "意大利",
          imgUrl: require("~/static/images/city/city26.png")
        },
        {
          name: "印度",
          imgUrl: require("~/static/images/city/city27.png")
        },
        {
          name: "印度尼西亚",
          imgUrl: require("~/static/images/city/city28.png")
        },
        {
          name: "英国",
          imgUrl: require("~/static/images/city/city29.png")
        }
      ]
    };
  },
  watch: {
    showChats(val) {
      if (val) {
        if (process.client) {
          document.body.style.overflow = "hidden";
          document.addEventListener("touchmove", this.preD, { passive: false }); // 禁止页面滑动
        }
      } else if (process.client) {
        document.body.style.overflow = ""; // 出现滚动条
        document.removeEventListener("touchmove", this.preD, {
          passive: false
        });
      }
    }
  },
  async created() {
    // 监听页面滚动事件
    if (process.client) {
      window.addEventListener("scroll", this.handleScroll);
    }

    const moule = await getPavilion();
    this.mouleList = moule.data;
    const trade = await getExhibRecommend();
    this.tradelist = trade.data;
    const news = await getNewsindex();
    this.newsList = news.data;
    const data = await getCooper();
    // console.log(data.data)

    const newBrandList = [];
    data.data.map(item => {
      newBrandList.push(...item);
    });
    this.brandList = newBrandList;
    // console.log(this.brandList)

    const product = await getRecommend({
      page: 1,
      pageSize: 12
    });
    this.productList = product.data.data;
  },

  async mounted() {
    // 请求视频地址
    if (process.client) {
      let res = await getVideo();
      // console.log(res);
      let videoSrc = this.$store.state.imgUrl + res.data[0].file;
      let { videoList } = this;
      this.videoOPt.url = videoSrc;
      const HlsJsPlayer = require("xgplayer");
      this.myPlayer = new HlsJsPlayer(this.videoOPt);
    }
  },

  methods: {
    // 折线图操作

    // 显示隐藏
    handleChats() {
      this.showChats = !this.showChats;
    },

    // 禁止页面滚动操作
    preD(e) {
      e.preventDefault();
    }
    //

    // 页面滚动导航改变
    // 页面滚动
    // handleScroll(e) {
    //   let winScrollY = window.scrollY; //获取滚动距离
    //   let bannerHeight = this.$refs.banner.offsetHeight;

    //   if (winScrollY > bannerHeight) {
    //     this.isIndex = false;
    //   } else {
    //     this.isIndex = true;
    //   }
    // }
  }
};
</script>

<style lang="scss" scoped>
// .index-header {
//   position: fixed;
//   left: 0;
//   top: 0;
//   z-index: 11;
//   width: 100%;
//   transition: 0.3s;

//   &.fixed {
//     position: fixed;
//     left: 0;
//     top: 0;
//     z-index: 11;
//     width: 100%;
//   }
// }

.banner {
  position: relative;
  width: 100%;
  margin: auto;

  &:hover .banner-desc {
    opacity: 1;
  }

  .banner-videos {
    width: 14%;
    height: 200px;
    position: absolute;
    top: 150px;
    right: 40px;
    z-index: 10;
    .banner-video {
      width: 100%;
      position: relative;
      margin-bottom: 50px;
      cursor: pointer;
      .mask {
        position: absolute;
        left: 0;
        top: 0;
        z-index: 11;
        background: rgba(0, 0, 0, 0.2);
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        span {
          display: block;
          width: 39px;
          height: 39px;
          background: url("~static/images/player-icon.png") center no-repeat;
        }
      }
      img {
        width: 100%;
        display: block;
      }
    }
  }

  .banner-desc {
    position: absolute;
    left: 6%;
    bottom: 100px;
    z-index: 10;
    color: #fff;
    opacity: 0;
    transition: 0.3s;
    .banner-time {
      font-size: 24px;
    }
    .banner-title {
      font-size: 40px;
      font-weight: bold;
      margin-top: 14px;
    }
  }
}

.mould {
  padding: 100px 0 30px;

  width: 1200px;
  margin: auto;
  .mould-items {
    display: flex;
    flex-wrap: wrap;
    .moule-item {
      display: block;
      width: 386px;
      height: 200px;
      margin-right: 14px;
      position: relative;
      margin-bottom: 40px;
      img {
        width: 100%;
      }
      span {
        position: absolute;
        left: 20px;
        top: 40px;
        z-index: 2;
        font-size: 24px;
        font-weight: bold;
        display: block;
      }
    }
  }
}

.exhibit-wrap {
  width: 100%;
  min-width: 1200px;
  background: #fff;
  overflow: hidden;
  .exhibit {
    padding: 50px 0;
    .exhibit-title {
      text-align: center;
      font-size: 30px;
      color: #000;
    }
    .exhibit-desc {
      text-align: center;
      font-size: 24px;
      color: #999;
      margin-top: 20px;
    }
  }
}

.exhibits-cont {
  margin-top: 70px;
  overflow: hidden;
  ul {
    li {
      width: 285px;
      height: 285px;
      background: #fff;
      float: left;
      margin-right: 20px;
      margin-bottom: 30px;
      position: relative;
      transition: 0.3s;
      &:nth-child(4n) {
        margin-right: 0;
      }
      &:hover {
        box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
      }
      .exhibits-top {
        width: 285px;
        height: 285px;
        overflow: hidden;
        position: relative;
        a {
          img {
            width: 285px;
            height: 285px;
          }
        }
      }
      .exhibits-bottom {
        width: 285px;
        height: 100px;
        overflow: hidden;
        position: absolute;
        left: 0;
        bottom: 0;
        z-index: 2;
        background: #fff;
        padding: 10px;
        .exhibits-title {
          color: #333333;
          font-size: 16px;
        }
        .exhibits-mintitle {
          font-size: 16px;
          color: #888888;
          margin-top: 10px;
        }
        .exhibits-data {
          font-size: 16px;
          color: #999;
          margin-top: 10px;
        }
      }
    }
  }
}

.record-wrap {
  padding: 100px 0;
  width: 100%;
  height: 620px;
  overflow: hidden;
  .record {
    height: 420px;
    .img {
      height: 420px;
    }

    .record-content {
      position: absolute;
      width: 1200px;
      top: 0;
      left: -600px;
      z-index: 2;

      .record-items {
        margin-top: 100px;
        display: flex;
        justify-content: space-around;
        .record-item {
          text-align: center;
          color: #fff;
          .record-item-num {
            font-size: 36px;
            font-weight: bold;
            padding: 14px;
            position: relative;
            &::after {
              content: "";
              display: block;
              width: 60px;
              height: 3px;
              background: #fff;
              position: absolute;
              left: 50%;
              margin-left: -35px;
              bottom: 0;
            }
          }

          .record-item-label {
            margin-top: 12px;
            font-size: 18px;
          }
        }
      }

      .record-link {
        width: 136px;
        height: 40px;
        border: #fff 1px solid;
        border-radius: 20px;
        display: block;
        margin: 60px auto;
        line-height: 40px;
        text-align: center;
        font-size: 18px;
        color: #fff;
      }
    }
  }
}

.index-news-wrap {
  width: 100%;
  min-width: 1200px;
  background: #f8f8f8;
  .index-news {
    padding: 100px 0;
    display: flex;
    .index-news-left {
      width: 550px;
      height: 310px;
      overflow: hidden;
      img {
        width: 550px;
        height: 310px;
      }
    }

    .index-news-right {
      margin-left: 36px;
      width: 600px;
      .index-news-title {
        font-size: 36px;
        color: #333;
        font-weight: bold;
      }
      .index-news-items {
        margin-top: 16px;
        .index-news-item {
          display: block;
          position: relative;
          height: 40px;
          line-height: 40px;
          padding-left: 44px;
          font-size: 18px;
          color: #999;
          transition: 0.3s;

          &:hover {
            color: #1ca7ec;
          }

          &::before {
            content: "";
            display: block;
            width: 23px;
            height: 23px;
            position: absolute;
            left: 0;
            top: 9px;
            background: url("~static/images/index-news-icon.png") center
              no-repeat;
          }
        }
      }

      .index-news-more {
        width: 136px;
        height: 40px;
        display: block;
        text-align: center;
        line-height: 40px;
        background: #1ca7ec;
        color: #fff;
        border-radius: 20px;
        font-size: 18px;
        margin-top: 10px;
      }
    }
  }
}

// .brand {
//   padding: 100px 0;
//   .brand-title {
//     text-align: center;
//     font-size: 30px;
//     color: #333;
//   }
//   .brand-content {
//     margin-top: 70px;
//     .brand-items {
//       display: flex;
//       .brand-item {
//         width: 185px;
//         height: 81px;
//         overflow: hidden;
//         margin-right: 30px;
//         .brand-item-pic {
//           width: 135px;
//           height: 81px;
//           display: block;
//           margin: auto;
//         }
//       }
//     }
//   }
// }
.brand-items {
  display: flex;
  flex-wrap: wrap;
  margin-top: 40px;
  .brand-item {
    display: flex;
    width: 140px;
    height: 70px;
    background: #fff;
    margin-right: 11px;
    margin-bottom: 10px;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    &:nth-child(8n) {
      margin-right: 0;
    }

    .brand-item-pic {
      max-width: 100%;
    }
  }
}
.exhibit-wrap .exhibit.product {
  .exhibits-data {
    font-size: 14px;
    line-height: 1.8;
  }
  .exhibits-cont ul li {
    height: auto;
    .exhibits-bottom {
      position: relative;
    }
  }
}
.img-wrap {
  height: 600px;
}
.wantbuy {
  width: 1200px;
  height: 600px;
  position: absolute;
  top: 0;
  left: 0;
  margin-left: -600px;
  padding-top: 70px;
  z-index: 2;
  .wantbuy-top {
    color: #fff;
    text-align: center;
    .wantbuy-title {
      font-size: 30px;
    }
    .wantbuy-desc {
      font-size: 24px;
      margin-top: 16px;
    }
  }
  .wantbuy-content {
    width: 1200px;
    background: #fff;
    height: 306px;
    margin-top: 70px;
    display: flex;
    .wantbuy-cont {
      width: 600px;
      height: 306px;
      overflow: hidden;
      &.wantbuy-cont-left {
        padding: 40px 37px;
        .wantbuy-title {
          text-align: center;
          font-size: 24px;
          color: #666;
        }
        .wantbuy-items {
          margin-top: 40px;
          .wantbuy-item {
            margin-bottom: 20px;
            display: flex;
            justify-content: space-between;
            .wantbuy-item-label {
              width: 70px;
              font-size: 16px;
              color: #333;
              height: 36px;
              line-height: 36px;
            }
            .wantbuy-item-right {
              width: 440px;
              height: 36px;
              display: flex;
              justify-content: space-between;
              .wantbuy-item-input {
                width: 210px;
              }
            }
          }
        }
        .wantbuy-sub {
          display: block;
          width: 130px;
          height: 40px;
          background: #1ca7ec;
          color: #fff;
          text-align: center;
          line-height: 40px;
          font-size: 16px;
          border: none;
          cursor: pointer;
          outline: none;
          margin: 30px auto 0;
        }
      }
      &.wantbuy-cont-right {
        background: #1ca7ec;
        cursor: pointer;
      }
    }
  }
}
.nation {
  padding: 60px 0 30px;
  .nation-title {
    text-align: center;
    font-size: 30px;
    color: #000;
  }
  .nation-items {
    width: 1212px;
    margin-top: 30px;
    display: flex;
    flex-wrap: wrap;
    .nation-item {
      width: 190px;

      margin-right: 12px;
      margin-bottom: 20px;
      .nation-item-pic {
        width: 190px;
        height: 90px;
        // border: rgba(0, 0, 0, 0.1) 1px solid;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        img {
          width: 190px;
          height: 90px;
          display: block;
        }
      }
      .nation-item-text {
        text-align: center;
        margin-top: 18px;
        font-size: 18px;
        color: #333;
      }
    }
  }
}
.foryou-wrap {
  width: 100%;
  min-width: 1200px;
  background: #f8f8f8;
  overflow: hidden;
  .foryou {
    padding: 50px 0;
    .foryou-title {
      text-align: center;
      font-size: 30px;
      color: #333;
    }
    .foryou-items {
      margin-top: 40px;
      width: 1216px;
      display: flex;
      flex-wrap: wrap;
      .foryou-item {
        display: block;
        width: 288px;
        height: 173px;
        background: #fff;
        margin-right: 16px;
        transition: 0.5s;
        &:hover {
          box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
        }
        .foryou-item-pic {
          width: 288px;
          height: 173px;
          position: relative;
          overflow: hidden;
          img {
            width: 288px;
            height: 173px;
            display: block;
          }
          .mask {
            width: 100%;
            height: 100%;
            position: absolute;
            left: 0;
            top: 0;
            z-index: 3;
            background: rgba(0, 0, 0, 0.3);
          }
          .line {
            width: 44px;
            height: 2px;
            background: #fff;
            position: absolute;
            left: 16px;
            top: 96px;
            z-index: 4;
          }
          .foryou-item-text {
            color: #fff;
            padding: 20px 15px;
            position: absolute;
            width: 100%;
            left: 0;
            bottom: 0;
            font-size: 16px;
            z-index: 4;
            line-height: 1.5;
            height: 88px;
          }
        }
        .foryou-item-text {
          padding: 10px 20px;
          line-height: 32px;
          font-size: 16px;
          color: #333;
        }
      }
    }
  }
}
//为您推荐(商品部分)
.recommende {
  margin-top: 40px;
  display: flex;
  flex-wrap: wrap;
  width: 1239px;
  .commodities {
    width: 375px;
    height: 520px;
    margin-right: 38px;
    background: #ffffff;
    border: 1px solid rgba(0, 0, 0, 0.1);
    transition: 0.3s;
    -webkit-transition: 0.3s;
    overflow: hidden;
    margin-bottom: 38px;
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
#banner-video {
  width: 100%;
}

.index-video {
  width: 100%;
}

.mask {
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  z-index: 99;
  background: rgba(0, 0, 0, 0.4);
}

.charts {
  width: 1000px;
  height: 600px;
  background: #fff;
  position: fixed;
  left: 50%;
  top: 50%;
  z-index: 100;
  margin-left: -500px;
  margin-top: -300px;
  padding: 30px 20px;
  .charts-title {
    text-align: center;
    line-height: 40px;
    font-size: 24px;
    color: #333;
    margin-bottom: 30px;
    // font-weight: bold;
  }
  .charts-close {
    font-size: 30px;
    position: absolute;
    right: 20px;
    top: 20px;
    cursor: pointer;
    color: #999;
  }
}

// .charts-2 {
//   width: 100%;
//   height: 600px;
//   position: fixed;
//   left: 0;
//   top: 50%;
//   margin-top: -300px;
//   z-index: 100;
//   .charts-icon {
//     position: absolute;
//     top: 50%;
//     margin-top: -40px;
//     z-index: 101;
//     i {
//       font-size: 80px;
//       color: #333;
//       cursor: pointer;
//     }
//     &.charts-left {
//       left: 0;
//     }
//     &.charts-right {
//       right: 0;
//     }
//   }
//   .chart-wrap {
//     width: 3800px;
//     transition: 0.3s;
//     -webkit-transition: 0.3s;
//   }
//   .chart {
//     width: 800px;
//     height: 600px;
//     background: #fff;
//     display: inline-block;
//     vertical-align: top;
//     margin: 0 20px;
//   }
// }

.bounce-enter-active {
  animation: bounce-in 0.5s;
}
.bounce-leave-active {
  animation: bounce-in 0.5s reverse;
}
@keyframes bounce-in {
  0% {
    transform: scale(0);
  }
  50% {
    transform: scale(1.1);
  }
  100% {
    transform: scale(1);
  }
}

.link-more {
  text-align: center;
  color: #1ca7ec;
  display: block;
  font-size: 16px;
  margin-top: 14px;
}

.live-wrap {
  width: 100%;
  height: 620px;
  padding: 20px 0;
  background: url("~static/images/home-bg.jpg") top center no-repeat;
}

.live {
  height: 562px;
  display: flex;
  justify-content: space-between;
  .live-left {
    width: 1000px;
    height: 562px;
    background: #fff;
  }
  .live-right {
    width: 188px;
    .live-item {
      width: 188px;
      height: 133px;
      display: block;
      position: relative;
      box-sizing: border-box;
      background: #fff;
      margin-bottom: 10px;
      border-radius: 5px;
      overflow: hidden;
      cursor: pointer;
      transition: 0.3s;
      .border {
        position: absolute;
        left: 0;
        top: 0;
        width: 188px;
        height: 133px;
        z-index: 2;
      }

      img {
        width: 188px;
        height: 133px;
      }
      &:hover .border {
        border: #4adede 5px solid;
      }
    }
  }
}
</style>

<style>
.brand-content .el-carousel__arrow {
  display: none !important;
}
.brand-content .el-carousel__button {
  width: 10px;
  height: 10px;
  border-radius: 50%;
}
.vjs-big-play-centered .vjs-big-play-button {
  display: none;
}
video::-internal-media-controls-download-button {
  display: none;
}
video::-webkit-media-controls-enclosure {
  overflow: hidden;
}
video::-webkit-media-controls-panel {
  width: calc(100% + 30px);
}
</style>
