<template>
  <div class="screen">
    <ul>
      <!-- <el-popover placement="bottom" width="444" trigger="click">
        <div class="region">
          <div class="region-li">
            <div class="title">所有地区</div>
            <dl>
              <dd v-for="(item, index) in firstList" :key="index">{{ item }}</dd>
            </dl>
          </div>
          <div class="region-li">
            <dl>
              <dd v-for="(item, index) in firstList" :key="index">{{ item }}</dd>
            </dl>
          </div>
        </div>
        <li class="address" slot="reference">
          交货地
          <i class="el-icon-caret-bottom"></i>
        </li>
      </el-popover> -->
      <li class="address" slot="reference">
        <el-cascader v-model="value" :props="address" @change="handleChange" />
        <i class="el-icon-caret-bottom"></i>
      </li>
      <li class="date">
        报价截至日期
        <img
          src="@/static/images/arrow-0.png"
          alt="向上"
          @click="handleFilter('create_time', '1')"
        />
        <img
          src="@/static/images/arrow-1.png"
          alt="向下"
          @click="handleFilter('create_time', '2')"
        />
      </li>
      <li class="date">
        发布日期
        <img
          src="@/static/images/arrow-0.png"
          alt="向上"
          @click="handleFilter('end_time', '1')"
        />
        <img
          src="@/static/images/arrow-1.png"
          alt="向下"
          @click="handleFilter('end_time', '2')"
        />
      </li>
    </ul>
  </div>
</template>

<script>
import { addressCity } from "@/api/dynamic";

export default {
  name: "Screen",
  data() {
    return {
      value: [],
      address: {
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level, value } = node;
          const id = level === 0 ? 0 : value;
          let ptrade = await addressCity(id);
          const tempArr = ptrade.data;
          const nodes = tempArr.map(item => ({
            value: item.id,
            label: item.name,
            leaf: level >= 2
          }));
          // 通过调用resolve将子节点数据返回，通知组件数据加载完成
          resolve(nodes);
        }
      },
      create_time: "1",
      end_time: "1",
      delivery_area_id: ""
    };
  },
  methods: {
    // 点击事件选择
    handleFilter(type, typeCash) {
      this[type] = typeCash;
      const { create_time, end_time, delivery_area_id } = this;
      this.$emit("response-filter", create_time, end_time, delivery_area_id);
    },
    handleChange(value) {
      this.delivery_area_id = value[2];
      const { create_time, end_time, delivery_area_id } = this;
      this.$emit("response-filter", create_time, end_time, delivery_area_id);
    }
  }
};
</script>

<style lang="scss" scoped>
.screen {
  padding: 20px 30px;

  ul {
    display: flex;

    li {
      width: 165px;
      height: 35px;
      background-color: #f3f4f8;
      font-size: 14px;
      color: #999;
      padding: 0 11px;
      display: flex;
      align-items: center;
      margin-right: 10px;

      &.address {
        cursor: pointer;

        i {
          pointer-events: none;
        }

        /deep/ .el-cascader {
          input {
            background-color: transparent;
            border: 0;
            padding: 0 15px 0 0;
          }

          .el-input__icon {
            display: none;
          }
        }
      }

      &.date {
        padding-right: 15px;

        &:last-child {
          width: 140px;
        }

        img {
          margin-left: auto;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
