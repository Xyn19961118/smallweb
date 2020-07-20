<template>
  <div class="release">
    <div class="release-title">已发布</div>
    <div class="release-content">
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="标题" show-overflow-tooltip>
          <template slot-scope="scope">{{ scope.row.title }}</template>
        </el-table-column>
        <el-table-column prop="time" label="时间" width="200"></el-table-column>
      </el-table>
      <div class="release-bottom">
        <div class="release-btns">
          <el-checkbox v-model="isCheckedAll" @change="handleAll"></el-checkbox>
          <div class="release-btn" @click="btnSelectAll">全选</div>
          <div class="release-btn">删除</div>
        </div>
        <div class="page">
          <el-pagination background layout="prev, pager, next" :total="100"></el-pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCheckedAll: false, //是否全选
      tableData: [
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        },
        {
          title: "求购大量库存晒鞋架",
          time: "2020-05-20 13:14:52",
          number: "2,000"
        }
      ]
    };
  },
  created() {},
  methods: {
    //全选
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
        this.toggleSelection(this.tableData);
      } else {
        this.toggleSelection();
      }
    },
    btnSelectAll() {
      if (this.isCheckedAll) {
        this.toggleSelection();
        this.isCheckedAll = false;
      } else {
        this.toggleSelection(this.tableData);
        this.isCheckedAll = true;
      }
    },
    //单选
    handleSelectionChange(val) {
      this.multipleSelection = val;
      console.log(val);
    },
    //删除操作
    handleDelete(index, row) {
      console.log(index, row);
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
