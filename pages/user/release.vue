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
        <el-table-column label="时间" show-overflow-tooltip>
          <template slot-scope="scope">
            <nuxt-link
              :to="'/dynamic/details/'+scope.row.did"
              class="price-title"
            >{{ scope.row.title }}</nuxt-link>
            <div class="price-time">{{ scope.row.create_time }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="商品" width="200" />
        <el-table-column label="采购量" width="200">
          <template slot-scope="scope">
            <div class="num">
              {{ scope.row.quantity }}
              <span>个</span>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="200">
          <template slot-scope="scope">
            <nuxt-link :to="'/dynamic/replease/'+scope.row.did" class="release-edit">编辑</nuxt-link>
            <div class="release-delete" @click="handleDelete(scope.$index, scope.row)">删除</div>
          </template>
        </el-table-column>
      </el-table>
      <div class="release-bottom">
        <div class="release-btns">
          <el-checkbox v-model="isCheckedAll" @change="handleAll" />
          <div class="release-btn" @click="btnSelectAll">全选</div>
          <div class="release-btn" @click="btnDeleteAll">删除</div>
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
import { getUserOffer, deleteUserDemand } from "~/api/user";
export default {
  data() {
    return {
      isCheckedAll: false, // 是否全选
      tableData: [],
      dataObj: {},
      listLoading: false
    };
  },
  async mounted() {
    this.listLoading = true;
    const data = await getUserOffer({
      userRole: 2,
      page: 1
    });
    this.dataObj = data.result;
    this.listLoading = false;
  },
  methods: {
    // 全选
    toggleSelection(rows) {
      // console.log(rows);
      if (rows) {
        this.$refs.multipleTable.clearSelection();
        rows.forEach(row => {
          this.$refs.multipleTable.toggleRowSelection(row);
        });
      } else {
        this.$refs.multipleTable.clearSelection();
      }
    },
    handleAll() {
      if (this.isCheckedAll) {
        this.toggleSelection(this.dataObj.data);
      } else {
        this.toggleSelection();
      }
    },
    btnSelectAll() {
      if (this.isCheckedAll) {
        this.toggleSelection();
        this.isCheckedAll = false;
      } else {
        this.toggleSelection(this.dataObj.data);
        this.isCheckedAll = true;
      }
    },
    // 单选
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    // 删除操作
    handleDelete(index, row) {
      this.$confirm("此操作将永久删除该条发布内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          const data = await deleteUserDemand({ id: row.did });
          this.dataObj.data.splice(index, 1);
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          console.log("已取消删除");
        });
    },
    // 全部删除
    btnDeleteAll() {
      const allId = this.multipleSelection;
      const list = this.dataObj.data;
      this.$confirm("此操作将永久删除该条发布内容, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          for (const i in allId) {
            list.forEach((item, index) => {
              if (item.did == allId[i].did) {
                this.dataObj.data.splice(index, 1);
              }
            });
            const data = await deleteUserDemand({ id: allId[i].did });
          }
          this.$message({
            type: "success",
            message: "删除成功!"
          });
        })
        .catch(() => {
          console.log("取消删除");
        });
    },
    // 分页
    async changePage(val) {
      const data = await getUserOffer({
        userRole: 2,
        page: val
      });
      this.dataObj = data.result;
    }
  }
};
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
