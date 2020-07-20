<template>
  <div>
    <div class="footer-wrap">
      <div class="wrap footer">
        <div class="footer-item footer-item01">
          <div class="footer-title">新手指南</div>
          <div class="footer-list">
            <nuxt-link to="/register" class="footer-li">免费注册</nuxt-link>
            <span class="footer-li" @click="handleIsLogin">我是买家</span>
            <span class="footer-li" @click="handleIsLogin">我是卖家</span>
          </div>
        </div>

        <div class="footer-item footer-item01">
          <div class="footer-title">快速通道</div>
          <div class="footer-list">
            <nuxt-link to="/live" class="footer-li">云展直播</nuxt-link>
            <nuxt-link to="/helpcenter" class="footer-li">帮助中心</nuxt-link>
            <nuxt-link to="/contactus" class="footer-li">关于我们</nuxt-link>
          </div>
        </div>

        <div class="footer-item footer-item01">
          <div class="footer-title">买家服务</div>
          <div class="footer-list">
            <nuxt-link to="/dynamic/replease" class="footer-li">发布需求</nuxt-link>
            <nuxt-link to="/hotselling" class="footer-li">热卖产品</nuxt-link>
            <nuxt-link to="/exhibits" class="footer-li">展商中心</nuxt-link>
          </div>
        </div>

        <div class="footer-item footer-item01">
          <div class="footer-title">卖家服务</div>
          <div class="footer-list">
            <nuxt-link to="/dynamic" class="footer-li">采购动态</nuxt-link>
            <nuxt-link v-if="showLL" to="/user/flow" class="footer-li">会员流量包</nuxt-link>
            <!-- <nuxt-link to="/review" class="footer-li">往期回顾</nuxt-link>
            <nuxt-link to="/news" class="footer-li">新闻资讯</nuxt-link>-->
          </div>
        </div>

        <!-- <div class="footer-item footer-item02">
          <div class="footer-title">帮助</div>
          <div class="footer-list">
            <nuxt-link
              class="footer-li"
              v-for="(item,index) in helpList"
              :key="index"
              :to="'/helpcenter/'+item.id"
            >{{item.name}}</nuxt-link>
          </div>
        </div>-->

        <div class="footer-item footer-item03">
          <div class="footer-title">联系我们</div>
          <div class="footer-list">
            <div class="footer-lis footer-lis01">{{navList.name}}</div>
            <div class="footer-lis footer-lis02">{{navList.tel}}</div>
            <div class="footer-lis footer-lis04">{{navList.add}}</div>
            <!-- <div class="footer-lis footer-lis03">{{navList.email}}</div> -->
          </div>
        </div>

        <div class="footer-item footer-item04">
          <div class="footer-title">关注官方微信服务号</div>
          <div class="footer-list">
            <div class="footer-ewm">
              <div class="footer-ewm-pic">
                <!-- <img :src="qrcode" alt="" /> -->
                <img src="~static/images/footer-ewm.png" alt />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="foot-wrap">
      <div class="wrap foot">{{navList.version}} {{navList.record}} {{navList.name}}</div>
    </div>
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex';
import { getWebset, getHelp } from "~/api/index";
export default {
  props: {},
  computed: {
    ...mapGetters([
      'isShowLogin',
      'business'
    ])
  },
  async created() {
    let tabTitle = await getWebset();
    this.navList = tabTitle.data;
    this.qrcode = this.$store.state.imgUrl + this.navList.qr_code_images;
    let moule = await getHelp();
    this.helpList = moule.data.data;
  },
  mounted() {
    if (process.client) {
      if (
        !this.business ||
        this.business == "2" ||
        !this.isShowLogin
      ) {
        this.showLL = false;
      } else {
        this.showLL = true;
      }
    }
  },
  data() {
    return {
      navList: [],
      qrcode: "",
      helpList: [],
      showLL: false //是否显示卖家流量包
    };
  },
  methods: {
    ...mapMutations([
      'changeLoginMask'
    ]),
    // 判断用户是否登录
    handleIsLogin() {
      const { isShowLogin } = this
      if (isShowLogin) {
        this.$router.push('/user');
      } else {
        this.changeLoginMask()
      }
    }
  }
};
</script>

<style scoped lang="scss">
.footer-wrap {
  width: 100%;
  min-width: 1200px;
  background: url("../../static/images/bg-footer.png") no-repeat;
  .footer {
    padding: 67px 0 46px;
    display: flex;
    .footer-item {
      margin-right: 30px;
      &.footer-item01 {
        width: 180px;
      }
      &.footer-item02 {
        width: 372px;
      }

      &.footer-item03 {
        width: 360px;
      }
      &.footer-item04 {
        width: 184px;
        margin-left: auto;
        margin-right: 0;

        .footer-title {
          font-size: 18px;
          color: #333;
          text-align: center;
        }

        .footer-list {
          margin-top: 29px;
        }
      }

      .footer-title {
        font-size: 16px;
        color: #333;
      }
      .footer-list {
        margin-top: 44px;
        .footer-li {
          margin-bottom: 14px;
          display: block;
          font-size: 16px;
          color: #666;
          cursor: pointer;
        }
        .footer-lis {
          margin-bottom: 14px;
          font-size: 16px;
          color: #666;
          position: relative;
          padding-left: 22px;

          &::before {
            content: "";
            display: block;
            width: 17px;
            height: 17px;
            background: url("~static/images/footer-icon01.png") center no-repeat;
            position: absolute;
            left: 0;
            top: 0;
          }

          &.footer-lis02::before {
            background: url("~static/images/footer-icon02.png") center no-repeat;
          }
          &.footer-lis03::before {
            background: url("~static/images/footer-icon03.png") center no-repeat;
          }
          &.footer-lis04::before {
            background: url("~static/images/footer-icon04.png") center no-repeat;
          }
        }

        .footer-ewm {
          width: 184px;
          height: 184px;
          .footer-ewm-pic {
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
    }
  }
}

.foot-wrap {
  width: 100%;
  min-width: 1200px;
  // background: #272d3b;
  background: #f7f8f8;
  .foot {
    padding: 24px 0 40px;
    color: #666;
    font-size: 16px;
    text-align: center;
  }
}
</style>
