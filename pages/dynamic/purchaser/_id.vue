<template>
  <div>
    <Header />

    <div class="content">
      <div class="wrap">
        <div class="page-bread">
          当前位置：
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dynamic' }">采购动态</el-breadcrumb-item>
            <el-breadcrumb-item>临清市增益轴承有限公司</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="main">
          <demand-info />
          <div class="main-left">
            <div class="title">
              <span>询价信息</span>
            </div>
            <!-- 搜索 -->
            <div class="search">
              <div class="form">
                <el-input
                  v-model="value"
                  maxlength="30"
                  placeholder="询价标题/物品名称"
                  @keyup.enter.prevent.native="handleSearch"
                />
                <el-button type="primary" @click.prevent="handleSearch">搜索</el-button>
              </div>
              <p>
                搜索结果：
                <span>100</span>条
              </p>
            </div>

            <el-table v-loading="false" class="dataList" :data="tableData" style="width: 100%">
              <el-table-column label="询价信息">
                <template slot-scope="scope">
                  <h5>
                    <nuxt-link to="/dynamic/details/12">
                      {{
                      scope.row.name
                      }}
                    </nuxt-link>
                  </h5>
                  <p>
                    发布日期：{{ scope.row.fbDate }}
                    <strong>|</strong>
                    交货地：{{
                    scope.row.address
                    }}
                  </p>
                </template>
              </el-table-column>
              <el-table-column prop="name" label="物品名称" width="150" />
              <el-table-column label="采购量" width="130">
                <template slot-scope="scope">
                  <p>
                    <span>{{ scope.row.num }}</span>件
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="报价截至日期" width="170">
                <template slot-scope="scope">
                  <p>{{ scope.row.jzDate }}</p>
                  <p>
                    剩余
                    <span>{{ scope.row.time }}</span>天
                  </p>
                </template>
              </el-table-column>
              <el-table-column label="报价人数" width="120">
                <template slot-scope="scope">
                  <p>
                    已有
                    <span>{{ scope.row.offerPeo }}</span>人报价
                  </p>
                </template>
              </el-table-column>
            </el-table>
            <div class="page">
              <el-pagination background layout="prev, pager, next" :page-count="dataObj.last_page" />
              <!-- @current-change="handleCurrentChange" -->
            </div>
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
import { DemandInfo } from '@/components/dynamic'

export default {
  name: 'Purchaser',
  components: {
    Header,
    Footer,
    DemandInfo
  },
  data () {
    return {
      value: '',
      dataObj: {
        last_page: 1
      },
      tableData: [
        {
          name: '采购库存轴承',
          fbDate: '2019-12-17',
          address: '山东 聊城',
          num: '2,000',
          jzDate: '2020-06-10',
          time: '1',
          company: '临清市增益轴承有限公司',
          offerPeo: 8
        }
      ]
    }
  },
  methods: {
    // 搜索
    handleSearch () {
      console.log(this.value)
    }
  }
}
</script>

<style lang="scss" scoped>
$color: #1ca7ec;
$red-color: #1ca7ec;

.content {
  border-top: 2px solid $color;
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
        color: $color;

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
      padding: 0 0 30px;

      .title {
        background-color: #eeeeee;

        span {
          font-size: 18px;
          color: $color;
          display: inline-block;
          width: 130px;
          line-height: 55px;
          background-color: #fff;
          text-align: center;
          border-top: 3px solid $color;
        }
      }

      // 搜索
      .search {
        display: flex;
        align-items: center;
        padding: 20px 30px;

        /deep/ .form {
          border: 1px solid $color;

          .el-input {
            width: 240px;

            input {
              height: 32px;
              border: 0;
            }
          }

          button {
            border: 0;
            border-radius: 0;
            width: 60px;
            height: 32px;
            padding: 0;
            background-color: $color;
          }
        }

        p {
          font-size: 14px;
          color: #333;
          margin-left: auto;

          span {
            color: $red-color;
          }
        }
      }

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
