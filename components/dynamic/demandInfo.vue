<template>
  <div class="demand-info">
    <nuxt-link to="/dynamic/replease" v-if="isShowXq">
      <div class="release">
        <img src="~static/images/release.png" alt="发布需求" />
      </div>
    </nuxt-link>
    <div class="hot-info">
      <div class="title">热门需求信息</div>
      <ul>
        <li v-for="(item, index) in result" :key="index">
          <h5>
            <nuxt-link :to="'/dynamic/details/' + item.id">{{ item.title }}</nuxt-link>
          </h5>
          <p>
            报价截止时间：
            <span>{{ replace(item.end_time) }}</span>
          </p>
          <!-- <p>
            报价：
            <span>200</span>人
          </p>-->
          <nuxt-link v-if="!hideBj" :to="'/dynamic/offer/' + item.id">
            <el-button size="small" type="danger">立即报价</el-button>
          </nuxt-link>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { goodsHotOffer } from "@/api/dynamic";

export default {
  name: "DemandInfo",
  props: ["isSearch"],
  data () {
    return {
      result: [],
      isShowXq: true, //是否显示发布需求
      hideBj: false //是否隐藏立即报价按钮
    }
  },
  computed: {
    ...mapGetters([
      'business'
    ])
  },
  async created () {
    const modue = await goodsHotOffer();
    this.result = modue.result;
  },
  mounted () {
    if (process.client) {
      if (this.business == "1" || this.isSearch) {
        this.isShowXq = false
      } else {
        this.isShowXq = true
      }

      if (this.business && this.business == "2") {
        this.hideBj = true;
      }
    }
  },
  methods: {
    replace (val) {
      return val.slice(0, 10);
    }
  }
};
</script>

<style lang="scss" scoped>
.demand-info {
  width: 260px;
  float: right;

  .release {
    font-size: 24px;
    color: #1ca7ec;
    width: 100%;
    height: 132px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #ddebff;
    cursor: pointer;
    margin-bottom: 20px;
    img {
      width: 100%;
      height: 132px;
    }
  }

  .hot-info {
    border: 1px solid #dddddd;

    .title {
      font-size: 16px;
      color: #333;
      font-weight: bold;
      line-height: 40px;
      padding-left: 30px;
      background-color: #f3f4f8;
    }

    ul {
      li {
        background-color: #fff;
        padding: 20px;
        border-bottom: 1px solid #f3f4f8;

        &:last-child {
          border-bottom: 0;
        }

        h5 {
          font-weight: normal;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
          margin-bottom: 9px;

          a {
            font-size: 16px;
            color: #1ca7ec;
          }
        }

        p {
          font-size: 14px;
          color: #666;
          margin-bottom: 9px;

          span {
            color: #1ca7ec;
          }
        }

        button {
          color: #1ca7ec;
          background-color: #ffddde;
          border-color: #ffb2b5;
          margin-top: 5px;
        }
      }
    }
  }
}
</style>
