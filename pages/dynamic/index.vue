<template>
  <div>
    <Header />

    <div class="content">
      <div class="wrap">
        <div class="page-bread">
          当前位置：
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>采购动态</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <!-- 分类 -->
        <div class="classify">
          <ul>
            <li>
              <label>行业</label>
              <dl
                ref="ul"
                :style="{ height: showMore ? 'auto' : '50px', transition: 'height .3s;' }"
              >
                <template v-for="(item, index) in ptrade">
                  <dd
                    :key="index"
                    :class="{ active: index === ptradeActice }"
                    @click="handlePtrade(item.id, index)"
                  >{{ item.trade }}</dd>
                </template>
              </dl>
              <div class="more" @click="showMore = !showMore">
                更多
                <div class="ico">
                  <i class="el-icon-arrow-up" :class="{ showMore: showMore }" />
                </div>
              </div>
            </li>
            <li>
              <label>子行业</label>
              <dl>
                <template v-for="(item, index) in trade">
                  <dd
                    :key="index"
                    :class="{ active: index === tradeActice }"
                    @click="handleTrade(item.id, index)"
                  >{{ item.name }}</dd>
                </template>
              </dl>
            </li>
          </ul>
        </div>

        <div class="main">
          <demand-info />
          <div class="main-left">
            <Screen @response-filter="handleFilter" />
            <el-table
              v-loading="listLoading"
              class="dataList"
              :data="tableData"
              style="width: 100%"
            >
              <el-table-column label="标题">
                <template slot-scope="scope">
                  <h5>
                    <nuxt-link :to="'/dynamic/details/' + scope.row.id">
                      {{
                      scope.row.title
                      }}
                    </nuxt-link>
                  </h5>
                  <p>
                    发布日期：{{ scope.row.create_time }}
                    <strong>|</strong>
                    交货地：{{ scope.row.delivery_area }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="采购量" width="100">
                <template slot-scope="scope">
                  <p>
                    <span>{{ scope.row.quantity }}</span>{{ scope.row.unit }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="报价截至日期" width="150">
                <template slot-scope="scope">
                  <p>{{ scope.row.end_time }}</p>
                  <p v-if="scope.row.remaining_day">
                    剩余<span>{{ scope.row.remaining_day }}</span>天
                  </p>
                  <p v-else class="waring">已过期</p>
                </template>
              </el-table-column>
              <el-table-column label="采购商信息" :width="showBtn?200:300">
                <template slot-scope="scope">
                  <p>
                    <!-- <nuxt-link to="/dynamic/purchaser/123">{{ -->
                    {{ scope.row.company }}
                    <!-- }}</nuxt-link> -->
                  </p>
                </template>
              </el-table-column>
              <el-table-column v-if="showBtn" label width="120">
                <template slot-scope="scope">
                  <el-button
                    size="small"
                    type="danger"
                    :disabled="!scope.row.remaining_day"
                    @click="gotoDetail(scope.row.id)"
                  >立即报价</el-button>

                  <!-- <p>
                    已有
                    <span>{{ scope.row.offerPeo }}</span
                    >人报价
                  </p>-->
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination
                background
                layout="prev, pager, next"
                :page-count="dataObj.last_page"
                @current-change="getDynamicList"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapMutations, mapGetters } from 'vuex'
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import { Screen, DemandInfo } from '@/components/dynamic'
import { getPtrade, getIndexTrade } from '~/api/index'
import { getList } from '@/api/dynamic'

export default {
  name: 'Dynamic',
  components: {
    Header,
    Footer,
    Screen,
    DemandInfo
  },
  data () {
    return {
      listLoading: false,
      ptrade: [],
      showMore: false,
      trade: [],
      ptradeActice: -1,
      tradeActice: -1,
      trade_id: '', // 子行业id
      dataObj: {
        last_page: 1
      },
      create_time: '1',
      end_time: '1',
      delivery_area_id: '',
      tableData: [],
      showBtn: true
    }
  },
  computed: {
    ...mapGetters([
      'isShowLogin',
      'business'
    ])
  },
  watch: {
    $route (to, from) {
      this.$router.go(0)
    },
    // 监听business是否变化
    business() {
      const getBusiness = this.business
      if (getBusiness && getBusiness == '2') {
        this.showBtn = false
      }
    }
  },
  created () {
    const getBusiness = this.business
    if (getBusiness && getBusiness == '2') {
      this.showBtn = false
    }
    this.getDynamicList()
  },
  async mounted () {
    const ptrade = await getPtrade()
    this.ptrade = ptrade.data
    this.trade = this.ptrade[0].child;
    // const trade = await getIndexTrade(1)
    // this.trade = trade.data // 行业路由
  },
  methods: {
    ...mapMutations([
      'changeLoginMask'
    ]),
    // 点击行业
    async handlePtrade (id, index) {
      this.ptradeActice = index
      this.tradeActice = 0
      const trade = await getIndexTrade(id)
      this.trade = trade.data // 展会分类列表改变
      this.trade_id = trade.data[0].id
      this.getDynamicList('1')
    },
    // 点击子行业
    async handleTrade (id, index) {
      this.tradeActice = index
      this.trade_id = id
      this.getDynamicList('1')
    },
    // 响应子页面返回数据
    handleFilter (create_time, end_time, delivery_area_id) {
      this.create_time = create_time
      this.end_time = end_time
      this.delivery_area_id = delivery_area_id
      this.getDynamicList('1')
    },
    // 获取列表数据
    async getDynamicList (page) {
      this.listLoading = true
      const { create_time, end_time, delivery_area_id, trade_id } = this
      const modue = await getList(
        create_time,
        end_time,
        delivery_area_id,
        page,
        trade_id
      )
      this.listLoading = false
      if (modue.status != 2000) {
        this.$message.warning(modue.msg)
        return false
      }
      this.tableData = modue.data.data
      this.dataObj.last_page = modue.data.last_page
    },
    // 跳转详情页
    gotoDetail (id) {
      if (this.isShowLogin) {
        this.$router.push('/dynamic/offer/' + id)
      } else {
        this.changeLoginMask()
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.content {
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

  // 分类
  .classify {
    margin-bottom: 11px;
    li {
      background-color: #fff;
      display: flex;
      padding: 0 30px;
      border-bottom: 1px dashed #e6e6e6;

      &:last-child {
        border-bottom: 0;
      }

      label {
        color: #999;
        width: 73px;
        line-height: 45px;
      }

      dl {
        flex: 1;
        display: flex;
        flex-wrap: wrap;
        overflow: hidden;
        transition: height 0.3s;

        dd {
          color: #333;
          margin-right: 30px;
          line-height: 45px;
          cursor: pointer;

          &.active {
            color: #1ca7ec;
          }
        }
      }

      .more {
        width: 70px;
        height: 45px;
        line-height: 45px;
        color: #666;
        cursor: pointer;
        text-align: right;

        .ico {
          display: inline-block;
          width: 22px;
          height: 22px;
          border: 1px solid #c1cbdb;
          margin-right: 4px;
          vertical-align: middle;
          position: relative;

          i {
            color: #999;
            position: absolute;
            top: 50%;
            left: 50%;
            margin-top: -7px;
            margin-left: -7px;
            transform: rotateZ(180deg);
            transition: transform 0.3s;

            &.showMore {
              transform: rotateZ(0);
            }
          }
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

      // tabel标签
      /deep/ .el-table {
        thead th {
          font-size: 16px;
          color: #333;
          font-weight: normal;
          background-color: #fafafc;
        }

        th:first-child,
        td:first-child {
          padding-left: 20px;
        }

        td {
          padding: 22.5px 0;

          h5 {
            margin-bottom: 4px;
            font-weight: normal;
            a {
              font-size: 16px;
              color: #1ca7ec;
            }
          }

          p {
            font-size: 14px;
            color: #666;

            &.waring {
              color: #1ca7ec;
            }

            span {
              color: #1ca7ec;
            }

            strong {
              font-weight: normal;
              display: inline-block;
              margin: 0 6px;
            }
          }

          p + p {
            margin-top: 4px;
          }

          button {
            background-color: #1ca7ec;
            border-color: #1ca7ec;
            margin-bottom: 4px;

            &.is-disabled {
              background: #ddd;
              border-color: #ddd;
              color: #999;
            }
          }
        }
      }

      // 分页
      .page {
        height: 95px;
        display: flex;
        align-items: center;
        justify-content: flex-end;
        padding-right: 80px;
      }
    }
  }
}
</style>
<style lang="scss">
.el-cascader-node.in-active-path,
.el-cascader-node.is-active,
.el-cascader-node.is-selectable.in-checked-path {
  color: #1ca7ec;
}
.page {
  text-align: center;
  .el-pagination.is-background .btn-next,
  .el-pagination.is-background .btn-prev,
  .el-pagination.is-background .el-pager li {
    background: none;
    border: #eee 1px solid;
    font-weight: 400;
  }
  .el-pagination.is-background .el-pager li:not(.disabled).active {
    background: none;
    // color: #1ca7ec !important;
    // border-color: #1ca7ec !important;
    color: #1ca7ec !important;
    border-color: #1ca7ec !important;
  }
  .el-pagination.is-background .el-pager li:not(.disabled):hover {
    // color: #1ca7ec !important;
    // border-color: #1ca7ec !important;
    color: #1ca7ec !important;
    border-color: #1ca7ec !important;
  }
}
</style>
