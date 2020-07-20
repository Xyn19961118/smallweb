<template>
  <div class="release collect">
    <div class="release-title">已收藏</div>

    <div class="collect-items">
      <div class="collect-item" v-for="(item, index) in dataObj.data" :key="index">
        <div class="collect-pic">
          <nuxt-link to>
            <img class="collect-img" :src="$store.state.codeImgUrl+item.showimage" alt />
          </nuxt-link>
          <div
            class="collect-select"
            :class="item.selected?'selected':''"
            @click="selectColl(index,item.c_id)"
          ></div>
          <div class="collect-delete" @click="deleteOnce(item.c_id,index)"></div>
        </div>
        <div class="collect-con">
          <nuxt-link class="el collect-title" to>{{item.name}}</nuxt-link>
          <div class="collect-time">{{item.create_time}}</div>
        </div>
      </div>
    </div>

    <div class="release-bottom">
      <div class="release-btns">
        <el-checkbox v-model="isCheckedAll"></el-checkbox>
        <div class="release-btn" @click="selectAll">全选</div>
        <div class="release-btn" @click="deleteAll">删除</div>
      </div>
      <div class="page">
        <el-pagination
          background
          layout="prev, pager, next"
          :page-count="dataObj.last_page"
          :current-page="dataObj.current_page"
          @current-change="changePage"
        ></el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserCollect, deleteUserCollect } from "~/api/user";
export default {
  data() {
    return {
      isCheckedAll: false, //是否全选
      dataObj: {}, //g_id 商品id 、 name 商品名称   create_time 时间     c_id 收藏id
      selectIds: [] //收藏的id
    };
  },
  async created() {
    let data = await getUserCollect({
      page: 1,
      pagesize: 24
    });
    let newData = data.data.data;
    for (let i in newData) {
      this.$set(newData[i], "selected", false);
    }
    data.data.data = newData;
    this.dataObj = data.data;
  },
  methods: {
    //单选
    selectColl(index, id) {
      let collList = this.dataObj.data;
      for (let i in collList) {
        if (i == index) {
          if (collList[i].selected) {
            //取消选择
            collList[i].selected = false;
            let selectIndex = this.selectIds.indexOf(id);
            this.selectIds.splice(selectIndex, 1);
          } else {
            //选择
            collList[i].selected = true;
            this.selectIds.push(id);
          }
        }
      }
    },

    //全选
    selectAll() {
      let collList = this.dataObj.data;
      this.selectIds = [];
      if (this.isCheckedAll) {
        //取消全选
        for (let i in collList) {
          collList[i].selected = false;
        }
        this.isCheckedAll = false;
      } else {
        for (let i in collList) {
          collList[i].selected = true;
          this.selectIds.push(collList[i].c_id);
        }
        this.isCheckedAll = true;
      }
    },

    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    //删除操作
    deleteAll() {
      this.$confirm("此操作将取消该收藏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {

          let data = await deleteUserCollect(this.selectIds);
          this.$message({
            type: "success",
            message: "取消收藏成功!"
          });
        })
        .catch(() => {
          console.log("取消");
        });
    },
    deleteOnce(id, index) {
      this.$confirm("此操作将取消该收藏, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(async () => {
          this.selectIds.push(id);
          // console.log('id:'+this.selectIds)
          let data = await deleteUserCollect(this.selectIds);
          this.dataObj.data.splice(index, 1);
          console.log(data);
          this.$message({
            type: "success",
            message: "取消收藏成功!"
          });
        })
        .catch(() => {
          this.selectIds = [];
        });
    },

    //分页
    async changePage(val) {
      let data = await getUserCollect({
        page: val,
        pagesize: 24
      });
      let newData = data.data.data;
      for (let i in newData) {
        this.$set(newData[i], "selected", false);
      }
      data.data.data = newData;
      this.dataObj = data.data;
    }
  }
};
</script>

<style scoped lang="scss">
.release {
  padding: 20px;
  background: #fff;
  &.collect {
    padding: 20px 48px;
  }
  .release-title {
    font-size: 14px;
    color: #333;
    font-weight: bold;
  }

  .collect-items {
    display: flex;
    flex-wrap: wrap;
    margin-top: 20px;
    padding: 0 10px;
    .collect-item {
      width: 130px;
      height: 160px;
      margin-right: 20px;
      margin-bottom: 10px;
      &:nth-child(6n) {
        margin-right: 0;
      }
      .collect-pic {
        width: 130px;
        height: 110px;
        overflow: hidden;
        position: relative;
        .collect-img {
          display: block;
          width: 130px;
          height: 110px;
        }
        .collect-select {
          position: absolute;
          width: 18px;
          height: 18px;
          position: absolute;
          left: 5px;
          top: 5px;
          background: rgba(0, 0, 0, 0.3);
          z-index: 6;
          &.selected {
            background: url("../../static/images/coll-selected.png") center
              no-repeat;
          }
        }
        .collect-delete {
          position: absolute;
          width: 20px;
          height: 20px;
          position: absolute;
          right: 5px;
          top: 5px;
          background: url("../../static/images/coll-close.png") center no-repeat;
          z-index: 6;
          cursor: pointer;
        }
      }
      .collect-con {
        padding: 10px 4px;
        .collect-title {
          display: block;
          font-size: 14px;
          color: #333;
        }
        .collect-time {
          font-size: 12px;
          color: #999;
          margin-top: 2px;
        }
      }
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
