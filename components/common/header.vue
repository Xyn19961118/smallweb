<template>
  <div class="header-wrap">
    <!-- 登录组件 start -->
    <Login />
    <!-- 登录组件 end -->
    <div class="header-top-wrap">
      <div class="header-top">
        <div class="header-top-left">
          <span>hi~</span>
          <template v-if="isShowLogin">
            <nuxt-link
              to="/user"
              class="header-top-link"
              style="font-size: 16px; color: #1ca7ec"
            >{{ nickname }}</nuxt-link>
            <span class="login-out" @click="loginOut">[退出]</span>
          </template>
          <template v-else>
            <div class="header-top-link" @click="handleLogin">请登录</div>
            <nuxt-link to="/register" class="header-top-link">用户注册</nuxt-link>
          </template>
        </div>
        <div class="header-top-right">
          <span
            style="font-size: 12px; color: #666;font-weight: normal; padding-right: 10px;"
          >中国联合国采购促进会 主办</span>
          免费服务热线：
          <span>010-69235235</span>
        </div>
      </div>
    </div>
    <div class="wrap">
      <!-- <div class="header-top">
        <span>扫一扫关注</span>
      </div>-->
      <div class="header">
        <nuxt-link to="/" class="logo" />
        <div class="opera">
          <div class="search">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              />
            </el-select>
            <el-input v-model="input" placeholder="请输入搜索的关键词" />
            <el-button type="primary" @click.native="searchSub">搜 索</el-button>
          </div>
          <div class="opera-right">
            <div
              v-if="isBusiness"
              class="opera-right-item"
              @click="$router.push('/dynamic/replease')"
            >
              <img src="@/static/images/release0.png" alt="发布需求" />
              发布需求
            </div>
            <!-- <div class="opera-right-item" @click="$router.push('/news')">
              <img src="@/static/images/news.png" alt="消息中心" />
              消息中心
            </div>-->
          </div>
        </div>
      </div>
      <div class="nav-items">
        <div v-for="(item, index) in navList" :key="index" class="nav-item">
          <nuxt-link v-if="!item.isSelect" class="nav-item-link" :exact="!index" :to="item.link">
            {{ item.name }}
            <img v-if="index === 1" src="@/static/images/hot.png" alt="热卖" />
          </nuxt-link>
          <div v-else class="nav-item-oth">{{ item.name }}</div>
          <div v-if="item.isSelect" class="nav-item-select">
            <nuxt-link
              v-for="(childItem, childIndex) in item.children"
              :key="childIndex"
              :to="{ path: childItem.link }"
              class="nav-item-se"
            >{{ childItem.name }}</nuxt-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations } from "vuex";
import { getHelp } from "~/api/index";
export default {
  props: ["isIndex"],
  // async created() {
  // let moule = await getHelp();
  // let data = moule.data.data;
  // for (let i in data) {
  //   let dataObj = {};
  //   dataObj.id = data[i].id;
  //   dataObj.name = data[i].name;
  //   dataObj.link = "/helpcenter/" + data[i].id;
  //   this.navList[5].children.push(dataObj);
  // }
  // },
  data() {
    return {
      isBusiness: false,
      options: [
        {
          value: "1",
          label: "产品"
        },
        {
          value: "2",
          label: "求购"
        }
      ],
      value: "1",
      input: "",
      isLogin: true,
      navList: [
        {
          name: "首页",
          link: "/",
          isSelect: false
        },
        {
          name: "热卖产品",
          link: "/hotselling",
          isSelect: false
        },
        {
          name: "展商中心",
          link: "/exhibits",
          isSelect: false
        },
        {
          name: "采购动态",
          isSelect: false,
          link: "/dynamic"
          // children: [
          //   {
          //     name: "国内动态",
          //     link: "/dynamic?city=1"
          //   },
          //   {
          //     name: "国外动态",
          //     link: "/dynamic?city=2"
          //   }
          // ]
        },
        {
          name: "云展直播",
          link: "/live",
          isSelect: false
        },
        // {
        //   name: "采购询盘",
        //   link: "/purchase",
        //   isSelect: false
        // },
        {
          name: "帮助中心",
          isSelect: false,
          link: "/helpcenter",
          children: []
        },
        {
          name: "关于我们",
          isSelect: true,
          children: [
            {
              name: "往期回顾",
              link: "/review"
            },
            {
              name: "新闻资讯",
              link: "/news"
            },
            {
              name: "联系我们",
              link: "/contactus"
            }
          ]
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["isShowLogin", "nickname", "business"])
  },
  watch: {
    isLogin() {
      this.$router.go(0);
    }
  },
  mounted() {
    if (process.client) {
      if (this.business == "2" || !this.business) {
        this.isBusiness = true;
      } else {
        this.isBusiness = false;
      }
    }
  },
  methods: {
    ...mapMutations(["removeToken", "changeLoginMask"]),
    // 显示登录弹框
    handleLogin() {
      this.changeLoginMask();
    },
    loginOut() {
      this.removeToken();
      this.isLogin = false;
    },
    // 搜索
    searchSub() {
      const { input, value } = this;
      if (input == "") {
        this.$message.warning("请输入搜索内容");
        return false;
      }
      if (value == "1") {
        // 执行搜索产品
        this.$router.push({
          path: "/searchproduct",
          query: { search: input }
        });
      } else {
        // 执行搜索求购
        // 执行搜索产品
        this.$router.push({
          path: "/searchbuy",
          query: { search: input }
        });
      }
    }
  }
};
</script>

<style scoped lang="scss">
.header-top-wrap {
  width: 100%;
  min-width: 1200px;
  height: 32px;
  background: #f7f8f8;
  line-height: 32px;
  .header-top {
    width: 1200px;
    margin: auto;
    display: flex;
    .header-top-left {
      display: flex;
      span {
        font-size: 12px;
        color: #999;
      }

      .header-top-link {
        display: block;
        margin-left: 20px;
        font-size: 12px;
        color: #666;
        cursor: pointer;
        &:hover {
          color: #1ca7ec;
        }
      }
      .login-out {
        cursor: pointer;
        display: block;
        margin-left: 15px;
        font-size: 14px;
      }
    }
    .header-top-right {
      margin-left: auto;
      font-size: 12px;
      color: #333;
      span {
        font-size: 16px;
        color: #1ca7ec;
        font-weight: bold;
      }
    }
  }
}

.header-wrap {
  border-bottom: 2px solid #1ca7ec;
  transition: 0.3s;
  width: 100%;
  min-width: 1200px;
  background: #fff;
  &.black {
    background: rgba(28, 34, 58, 0.5);
    border-bottom: none;
    .header {
      .logo {
        background: url("../../static/images/logo-write.png") no-repeat;
      }
      .nav-items .nav-item .nav-item-link {
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
      .nav-items .nav-item .nav-item-oth {
        color: #fff;
        &:hover {
          color: #fff;
        }
      }
    }
  }
  .header {
    padding: 10px 0;
    height: 100px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    .logo {
      display: block;
      width: 262px;
      height: 80px;
      background: url("../../static/images/logo-black.png") 0 15px no-repeat;
    }

    .opera {
      flex: 1;
      display: flex;

      .search {
        display: flex;
        width: 614px;
        margin: 0 18px 0 42px;
        border: 2px solid #1ca7ec;

        /deep/ .el-select {
          width: 100px;

          .el-input__inner {
            color: #6d798c;
            background-color: #f7f8f8;
            border: 0;
          }

          .el-input__suffix {
            color: #6d798c;

            .el-input__icon {
              font-weight: bold;
            }
          }
        }

        /deep/ .el-input {
          flex: 1;
          .el-input__inner {
            border: 0;
          }
        }

        .el-button {
          font-size: 16px;
          border-radius: 0;
          width: 100px;
          border: 0;
          background-color: #1ca7ec;
        }
      }

      .opera-right {
        display: flex;
        align-items: center;

        &-item {
          font-size: 16px;
          line-height: 31px;
          color: #333;
          // width: 50%;
          margin-left: 30px;
          cursor: pointer;

          img {
            width: 31px;
            display: inline-block;
            vertical-align: bottom;
            margin-right: 7px;
          }
        }
      }
    }
  }

  .nav-items {
    display: flex;
    align-items: center;

    .nav-item {
      margin-right: 25px;
      position: relative;

      &:last-child {
        margin-right: 0;
      }

      &:hover {
        .nav-item-link {
          color: #1ca7ec;
        }
        .nav-item-oth {
          color: #1ca7ec;
        }
        .nav-item-select {
          display: table;
          height: auto;
        }
      }
      .nav-item-link {
        font-size: 18px;
        color: #333;
        display: block;
        height: 52px;
        padding: 15px 32px 0;
        cursor: pointer;
        position: relative;

        &.nuxt-link-active {
          border-bottom: 6px solid #1ca7ec;
        }

        img {
          position: absolute;
          top: 12px;
          right: 17px;
          width: 12px;
        }
      }

      .nav-item-oth {
        font-size: 18px;
        color: #333;
        padding: 15px 0 0 32px;
        height: 50px;
        cursor: pointer;
      }

      .nav-item-select {
        position: absolute;
        left: 20px;
        top: 50px;
        z-index: 11;
        width: 100%;
        height: 0;
        overflow: hidden;
        transition: 0.3s;
        border-radius: 4px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
        .nav-item-se {
          padding: 0 16px;
          line-height: 45px;
          height: 45px;
          white-space: nowrap;
          background: #fff;
          color: #606266;
          display: block;
          font-size: 14px;
          &:hover {
            color: #1ca7ec;
            background-color: #f5f7fa;
          }
        }
      }
    }
  }
}
</style>
<style lang="scss">
.el-select-dropdown__item.selected {
  color: #1ca7ec;
}
</style>
