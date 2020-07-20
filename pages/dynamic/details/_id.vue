<template>
  <div>
    <Header ref="header" />

    <div class="content">
      <div class="wrap">
        <div class="page-bread">
          当前位置：
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dynamic' }">采购动态</el-breadcrumb-item>
            <el-breadcrumb-item v-if="demand.contact != null">{{ demand.contact.company }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="main">
          <demand-info />
          <div class="main-left">
            <div class="title">{{ demand.title }}</div>
            <div class="offer-info">
              <div class="offer-info-left">
                <h5 v-if="demand.remaining_day">
                  距离报价结束还剩
                  <span>{{ demand.remaining_day }}</span>天
                </h5>
                <h5 v-else>报价已结束</h5>
                <p>截至日期：{{ demand.end_time }}</p>
              </div>
              <div v-if="showBtn" class="offer-info-right" :class="!demand.remaining_day?'galy':''">
                <nuxt-link :to="'/dynamic/offer/' + demand.id">
                  <el-button>{{ demand.remaining_day?'我要报价':'已过期' }}</el-button>
                </nuxt-link>
              </div>
            </div>
            <div class="inquiry">
              <div class="small-title">询价物品</div>
              <el-table v-loading="listLoading" :data="demand.goods" style="width: 100%">
                <el-table-column prop="name" label="物品名称" align="center" />
                <el-table-column label="图片" align="center">
                  <template slot-scope="scope">
                    <template v-if="scope.row.enquiry_image === ''">无</template>
                    <template v-else>
                      <div class="picture">
                        <img :src="scope.row.enquiry_image" alt="图片" />
                      </div>
                    </template>
                  </template>
                </el-table-column>
                <el-table-column prop="num" label="采购量" align="center">
                  <template slot-scope="scope">
                    <span>{{ scope.row.quantity }}</span>
                    {{ scope.row.unit }}
                  </template>
                </el-table-column>
                <el-table-column label="广牌型号/规格属性" align="center">
                  <template slot-scope="scope">{{ scope.row.comments || '无' }}</template>
                </el-table-column>
              </el-table>
            </div>
            <!-- 判断用户是否登录 -->
            <template v-if="isShowLogin">
              <div>
                <div class="small-title">求购要求</div>
                <ul class="detail-msg">
                  <li>
                    <div class="li-title">交货地</div>
                    <div class="li-text">{{ demand.delivery_area }}</div>
                  </li>
                  <li>
                    <div class="li-title two">对供应商要求</div>
                    <div class="li-text two">
                      <p v-if="demand.duty == 1">报价设置：是</p>
                      <p v-else>报价设置：否</p>
                      <p v-if="demand.manage_type == 1">经营模式：生产制造</p>
                      <p v-else-if="demand.manage_type == 2">经营模式：贸易批发</p>
                      <p v-else-if="demand.manage_type == 3">经营模式：商业服务</p>
                      <p v-else>经营模式：其他组织</p>
                    </div>
                  </li>
                  <li>
                    <div class="li-title">备注</div>
                    <div class="li-text">{{ demand.supply_content }}</div>
                  </li>
                </ul>
              </div>
              <div v-if="showBtn">
                <div class="small-title">联系信息</div>
                <!-- 判断用户是否报价 -->
                <template v-if="demand.contact_authority">
                  <ul class="detail-msg">
                    <li>
                      <div class="li-title">公司名称</div>
                      <div
                        v-if="demand.contact != null"
                        class="li-text"
                      >{{ demand.contact.company }}</div>
                    </li>
                    <li>
                      <div class="li-title">联系人</div>
                      <div v-if="demand.contact != null" class="li-text">{{ demand.contact.name }}</div>
                    </li>
                    <li>
                      <div class="li-title">联系电话</div>
                      <div v-if="demand.contact != null" class="li-text">{{ demand.contact.mobile }}</div>
                    </li>
                    <li>
                      <div class="li-title">邮箱</div>
                      <div v-if="demand.contact != null" class="li-text">{{ demand.contact.email }}</div>
                    </li>
                  </ul>
                </template>
                <template v-else>
                  <p class="none-offer">报价后可见联系信息</p>
                </template>
                <!-- <template v-else>
                  <div class="flow">
                    <p class="none-offer">您的免费查看次数已用完，请您购买流量包！</p>
                    <el-button type="primary">流量包</el-button>
                  </div>
                </template>-->
              </div>
            </template>
            <template v-else>
              <div class="flow" style="margin-top: 50px;">
                <p class="none-offer">您还没有登陆哦！</p>
                <el-button type="primary" @click="handleLogin">登录</el-button>
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>

    <Footer />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import { DemandInfo } from "@/components/dynamic";
import { getDynamicDetails } from "@/api/dynamic";

export default {
  name: "DynamicDetails",
  components: {
    Header,
    Footer,
    DemandInfo
  },
  data() {
    return {
      demand: {
        contact: {}
      },
      listLoading: false,
      showBtn: true
    };
  },
  computed: {
    ...mapGetters(["isShowLogin", "business"])
  },
  mounted() {
    const business = this.business;
    if (business && business == "2") {
      this.showBtn = false;
    }
    this.handleAttrInfo();
  },
  methods: {
    // 获取详细信息
    async handleAttrInfo() {
      this.listLoading = true;
      const modue = await getDynamicDetails(this.$route.params.id);
      this.listLoading = false;
      if (modue.status != 2000) {
        this.$message.warning(modue.msg);
        return false;
      }
      const { demand } = modue.data;
      this.demand = demand;
    },
    // 登录
    handleLogin() {
      this.$refs.header.handleLogin();
    }
  }
};
</script>

<style lang="scss" scoped>
.content {
  border-top: 2px solid #1ca7ec;
  background-color: #f3f4f8;
  padding-bottom: 30px;

  .page-bread {
    display: flex;
    align-items: center;
    height: 54px;
    font-size: 14px;
    color: #999;

    /deep/ .el-breadcrumb__item {
      .el-breadcrumb__inner {
        color: #1ca7ec;

        &.is-link {
          color: #999;
          font-weight: normal;
        }
      }
    }
  }

  // 主要内容区域
  .main {
    overflow: hidden;

    .main-left {
      margin-right: 280px;
      background-color: #fff;
      padding: 30px 30px 106px;

      .title {
        font-size: 24px;
        color: #333;
        margin-bottom: 30px;
      }

      .offer-info {
        width: 660px;
        height: 120px;
        background-color: #f3f3f7;
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding-left: 42px;

        &-left {
          h5 {
            font-size: 18px;
            color: #666;
            font-weight: normal;
            margin-bottom: 12px;

            span {
              font-size: 24px;
              color: #1ca7ec;
            }
          }

          p {
            font-size: 14px;
            color: #999;
          }
        }

        &-right {
          width: 220px;
          height: 68px;
          background: url("../../../static/images/bgOffer.png") no-repeat;
          background-size: 100% 100%;
          margin-right: -8px;

          &.galy {
            background: url("../../../static/images/bgOffer2.png") no-repeat;
            background-size: 100% 100%;
            button {
              color: #999;
            }
          }

          button {
            width: 112px;
            height: 34px;
            padding: 0;
            border: 0;
            color: #1ca7ec;
            border-radius: 0;
            margin: 13px 39px 13px 69px;
          }
        }
      }

      .small-title {
        font-size: 18px;
        color: #333;
        margin: 30px 0 20px;
      }

      // 询价物品
      .inquiry {
        /deep/ .el-table {
          th {
            background-color: #fafafc;
          }

          td {
            span {
              color: #1ca7ec;
            }

            .picture {
              width: 50px;
              height: 50px;
              margin: 0 auto;

              img {
                width: 100%;
                height: 100%;
                object-fit: contain;
              }
            }
          }
        }
      }

      // 采购要求/联系信息
      .detail-msg {
        li {
          display: flex;
          align-items: center;

          .li-title {
            font-size: 16px;
            color: #333;
            width: 150px;
            height: 55px;
            background-color: #fafafc;
            display: flex;
            align-items: center;
            justify-content: center;

            &.two {
              height: 110px;
            }
          }

          .li-text {
            flex: 1;
            height: 55px;
            font-size: 14px;
            color: #666;
            display: flex;
            align-items: center;
            padding-left: 35px;
            border-bottom: 1px solid #eeeeee;

            p + p {
              margin-top: 20px;
            }

            &.two {
              flex-direction: column;
              height: 110px;
              align-items: flex-start;
              justify-content: center;
            }
          }

          &:first-child {
            .li-text {
              border-top: 1px solid #eeeeee;
            }
          }
        }
      }
    }
  }
}

.none-offer {
  font-size: 18px;
  color: #999;
  text-align: center;
  line-height: 50px;
}

.flow {
  text-align: center;
  button {
    width: 150px;
    height: 40px;
    padding: 0;
    border-color: #1ca7ec;
    border-radius: 0;
    background-color: #1ca7ec;
    margin-top: 10px;
  }
}
</style>
