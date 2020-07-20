<template>
  <div class="user-bg">
    <Header></Header>

    <div class="content">
      <div class="content-top">
        <div class="content-crumbs">
          当前位置：
          <nuxt-link to="/">首页</nuxt-link>>
          <nuxt-link to>个人中心页</nuxt-link>
        </div>
      </div>
      <div class="content-center">
        <div class="content-left">
          <el-collapse v-model="activeName" accordion>
            <el-collapse-item v-for="(item,index) in menuList" :key="index" :name="item.name">
              <template slot="title">
                <div class="menu-title">
                  <img class="menu-icon" :src="item.iconUrl" alt />
                  {{item.title}}
                </div>
              </template>
              <nuxt-link
                v-for="(childItem,childIndex) in item.child"
                :key="childIndex"
                :to="childItem.link"
                class="menu-item"
              >{{childItem.name}}</nuxt-link>
            </el-collapse-item>
          </el-collapse>
        </div>
        <div class="content-right">
          <nuxt-child></nuxt-child>
        </div>
      </div>
    </div>

    <Footer></Footer>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";

//获取菜单列表
import { seller, buyer } from "~/static/utils/auth";
import { getUserInfo } from "~/api/user";
export default {
  middleware: "auth",
  components: {
    Header,
    Footer
  },
  data() {
    return {
      activeName: "1", //
      menuList: [] //菜单列表
    };
  },
  computed: {
    ...mapGetters([
      'userToken',
      'business'
    ])
  },

  async beforeMount() {
    let getToken = this.userToken;
    if (!getToken) {
      this.$message.error("未登录，请登录");
      this.$router.push("/");
      return false;
    }
    let data = await getUserInfo();
    // console.log(data);
    if (data.status !== 5000) {
      sessionStorage.setItem("userInfo", JSON.stringify(data.data));
    }

    //判断是否是卖家，更换左侧菜单
    const iAuth = this.business;
    // const iAuth = "2";
    if (iAuth) {
      if (iAuth == "1") {
        this.menuList = seller;
      } else {
        this.menuList = buyer;
      }
    }
  },
  methods: {}
};
</script>

<style scoped lang="scss">
.user-bg {
  background: #f7f7f7;
}
.content {
  width: 1200px;
  margin: 0 auto 60px;
}
.content-top {
  .content-crumbs {
    padding: 20px 0;
    font-size: 14px;
    color: #999;
    a {
      font-size: 14px;
      color: #999;
      &:last-child {
        color: #5b7fa3;
      }
    }
  }
}
.content-center {
  display: flex;
  justify-content: space-between;
  .content-left {
    width: 180px;
    min-height: 640px;
    background: #fff;
    .menu-title {
      display: flex;
      align-items: center;
      padding-left: 20px;
      font-size: 16px;
      color: #333;
      font-weight: bold;
      .menu-icon {
        width: 20px;
        height: 20px;
        margin-right: 6px;
      }
    }
    .menu-item {
      display: block;
      line-height: 40px;
      color: #999;
      font-size: 16px;

      &.nuxt-link-exact-active.nuxt-link-active {
        color: #5b7fa3;
      }
    }
  }
  .content-right {
    width: 1000px;
  }
}
</style>

<style lang="scss">
.content-left {
  .el-collapse-item__header.is-active {
    border-bottom: #eee 1px solid;
  }
  .el-collapse-item__content {
    padding: 10px 0;
    text-align: center;
  }
}
</style>
