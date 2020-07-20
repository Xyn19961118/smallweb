<template>
  <div class="release">
    <div class="release-title">已发布</div>
    <div class="release-content">
      <el-table
        ref="multipleTable"
        v-loading="listLoading"
        :data="dataObj.data"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" label="全选" width="55" />
        <el-table-column label="求购商品" show-overflow-tooltip>
          <template slot-scope="scope">
            <nuxt-link
              :to="'/dynamic/details/'+scope.row.did"
              class="el price-title"
            >{{ scope.row.name }}</nuxt-link>
            <div class="price-time">{{ scope.row.ego_add_time }}</div>
          </template>
        </el-table-column>
        <el-table-column label="已报价" width="120">
          <template slot-scope="scope">
            <div class="price">{{ scope.row.ego_price }}元</div>
          </template>
        </el-table-column>
        <el-table-column label="剩余天数" width="120">
          <template slot-scope="scope">
            <div>{{ scope.row.ego_price_effective_time>=0 ? scope.row.ego_price_effective_time+'天' : "已过期" }}</div>
          </template>
        </el-table-column>
        <el-table-column label="采购公司" width="300">
          <template slot-scope="scope">
            <div class="el compy">{{ scope.row.company }}</div>
            <div class="compy-phone">{{ scope.row.mobile }}</div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <!-- <span @click="gotoDetail(scope.row.did,scope.row.end_time)" class="release-edit">编辑</span> -->
            <div class="release-delete" @click="handleDelete(scope.$index, scope.row)">删除</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="release-bottom">
        <div class="release-btns">
          <el-checkbox v-model="isCheckedAll" @change="handleAll" />
          <div class="release-btn" @click="btnSelectAll">全选</div>
          <div class="release-btn" @click="handleDeleteAll">删除</div>
        </div>
        <div class="page">
          <el-pagination
            background
            layout="prev, pager, next"
            :page-count="dataObj.last_page"
            :current-page="dataObj.current_page"
            @current-change="changePage"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserOffer, deleteUserOffer } from '~/api/user'
export default {
  data () {
    return {
      isCheckedAll: false, // 是否全选
      dataObj: {},
      listLoading: false
    }
  },
  async mounted () {
    this.listLoading = true
    const data = await getUserOffer({
      userRole: 1,
      page: 1
    })
    for (const i in data.result.data) {
      data.result.data[i].ego_price_effective_time = this.countTime(
        data.result.data[i].ego_price_effective_time
      )
    }
    this.dataObj = data.result
    this.listLoading = false
  },
  methods: {
    // 全选
    toggleSelection (rows) {
      // console.log(rows);
      if (rows) {
        this.$refs.multipleTable.clearSelection()
        rows.forEach((row) => {
          this.$refs.multipleTable.toggleRowSelection(row)
        })
      } else {
        this.$refs.multipleTable.clearSelection()
      }
    },
    handleAll () {
      if (this.isCheckedAll) {
        this.toggleSelection(this.dataObj.data)
      } else {
        this.toggleSelection()
      }
    },
    btnSelectAll () {
      if (this.isCheckedAll) {
        this.toggleSelection()
        this.isCheckedAll = false
      } else {
        this.toggleSelection(this.dataObj.data)
        this.isCheckedAll = true
      }
    },
    // 单选
    handleSelectionChange (val) {
      this.multipleSelection = val
      console.log(val)
    },
    // 删除操作
    handleDelete (index, row) {
      console.log(index, row)
      this.$confirm('此操作将永久删除该条发布内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          const data = await deleteUserOffer({ id: row.ego_id })
          if (data.status == '2000') {
            this.dataObj.data.splice(index, 1)
            this.$message({
              type: 'success',
              message: data.msg
            })
          } else {
            this.$message({
              type: 'error',
              message: data.msg
            })
          }
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 删除所有
    handleDeleteAll () {
      const allId = this.multipleSelection
      const list = this.dataObj.data
      this.$confirm('此操作将永久删除该条发布内容, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(async () => {
          for (const i in allId) {
            list.forEach((item, index) => {
              if (item.ego_id == allId[i].ego_id) {
                this.dataObj.data.splice(index, 1)
              }
            })
            const data = await deleteUserOffer({ id: allId[i].ego_id })
          }
          this.$message({
            type: 'success',
            message: '删除成功!'
          })
        })
        .catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          })
        })
    },
    // 编辑
    // gotoDetail(id,date){
    //   if(date<0){
    //     this.$message.error("该商品已过期，不能编辑")
    //   }else{
    //     this.$router.push("/dynamic/offer/"+id)
    //   }
    // },
    // 分页
    async changePage (val) {
      const data = await getUserOffer({
        userRole: 1,
        page: val
      })
      this.dataObj = data.result
    },
    // 计算剩余时间
    countTime (str) {
      str = str.substring(0, 19)
      str = str.replace(/-/g, '/')
      const timestamp = new Date(str).getTime() // 获取到时间戳
      const nowTime = parseInt(new Date().getTime())
      const dateSpan = timestamp - nowTime
      const iDays = Math.floor(dateSpan / (24 * 3600 * 1000))
      return iDays
    }
  }
}
</script>

<style scoped lang="scss">
.release {
  padding: 20px;
  background: #fff;
  .release-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }
  .release-content {
    .num {
      color: #1ca7ec;
      span {
        color: #666;
      }
    }
    .release-delete {
      color: #999;
      margin-top: 4px;
      cursor: pointer;
    }
    .release-edit {
      color: #1ca7ec;
      cursor: pointer;
    }
  }
  .release-bottom {
    padding: 30px 0;
    display: flex;
    .release-btns {
      display: flex;
      align-items: center;
      .release-btn {
        width: 44px;
        height: 26px;
        border: #dedede 1px solid;
        background: #f3f4f8;
        text-align: center;
        line-height: 26px;
        font-size: 12px;
        margin-left: 10px;
        cursor: pointer;
      }
    }
    .page {
      margin-left: auto;
    }
  }
}
.price-time {
  color: #1ca7ec;
}
.price {
  color: #1ca7ec;
}
</style>

<style lang="scss">
.release-content .el-table_1_column_3 .cell {
  text-align: center;
}
.release-content .el-table_1_column_4 .cell {
  text-align: center;
}
.release-content .el-table_1_column_5 .cell {
  text-align: center;
}
.release-content .el-checkbox__input.is-checked .el-checkbox__inner,
.release-content .el-checkbox__input.is-indeterminate .el-checkbox__inner {
  background-color: #1ca7ec !important;
  border-color: #1ca7ec !important;
}
.release-content .el-checkbox__inner:hover {
  border-color: #1ca7ec !important;
}
.page {
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
