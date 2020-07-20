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
            <el-breadcrumb-item>我要报价</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="main">
          <div class="title">
            <h4>发布报价单</h4>
          </div>
          <div class="shop-info bgColor">
            <p>
              <label>询价单标题：</label>
              <nuxt-link :to="'/dynamic/details/' + demand.id">
                {{
                demand.title
                }}
              </nuxt-link>
            </p>
            <p>
              <label>交货地：</label>
              <span>{{ demand.delivery_area }}</span>
            </p>
            <p>
              <label>报价是否含税：</label>
              <span v-if="demand.duty == 1">是</span>
              <span v-else>否</span>
            </p>
            <p>
              <label>询价公司：</label>
              <span v-if="demand.contact != null">
                {{
                demand.contact.company
                }}
              </span>
              <span v-else>无</span>
            </p>
          </div>
          <div class="small-title">询价物品</div>
          <el-form ref="ruleForm" :model="form" :rules="rules">
            <!-- 询价物品 start -->
            <div class="inquiry" v-loading="listLoading">
              <ul>
                <li>
                  <div class="name">商品名称</div>
                  <div class="name">厂牌型号/规格属性</div>
                  <div class="name">采购量</div>
                  <div class="name is-require">单价</div>
                  <div class="name is-require">价格有效期</div>
                  <div class="name is-require">交货期</div>
                  <div class="name">备注</div>
                </li>
                <li v-for="(item, index) in demand.goods" :key="item.id">
                  <div class="el text">{{ item.name }}</div>
                  <div class="el text">{{ item.comments }}</div>
                  <div class="text">
                    {{ item.quantity }}
                    <span>{{ item.unit }}</span>
                  </div>
                  <div class="text">
                    <el-form-item
                      :prop="'goodsOfferList.' + index + '.ego_price'"
                      :rules="{
                        required: true,
                        message: '请填写单价',
                        trigger: 'blur'
                      }"
                    >
                      <el-input
                        type="number"
                        v-model="form.goodsOfferList[index].ego_price"
                        class="input single-price"
                        placeholder="请填写单价"
                      />元
                    </el-form-item>
                  </div>
                  <div class="text">
                    <el-form-item
                      :prop="
                        'goodsOfferList.' + index + '.ego_price_effective_time'
                      "
                      :rules="{
                        required: true,
                        message: '请选择日期',
                        trigger: 'blur'
                      }"
                    >
                      <el-date-picker
                        v-model="
                          form.goodsOfferList[index].ego_price_effective_time
                        "
                        type="date"
                        value-format="yyyy-MM-dd"
                        placeholder="选择日期"
                      />
                    </el-form-item>
                  </div>
                  <div class="text">
                    <el-form-item
                      :prop="'goodsOfferList.' + index + '.ego_date_delivery'"
                      :rules="{
                        required: true,
                        message: '请填写交货期',
                        trigger: 'blur'
                      }"
                    >
                      <el-input
                        type="number"
                        v-model="form.goodsOfferList[index].ego_date_delivery"
                        class="input"
                      />天
                    </el-form-item>
                  </div>
                  <div class="text">
                    <el-form-item>
                      <el-input
                        v-model="form.goodsOfferList[index].ego_remark"
                        class="input beizhu"
                      />
                    </el-form-item>
                  </div>
                </li>
              </ul>
              <div class="total">
                <p>
                  总计：
                  <span>{{ totalPrice }}</span>元
                </p>
              </div>
            </div>
            <!-- 询价物品 end -->
            <div class="small-title">其他说明</div>

            <!-- 其他说明 start -->
            <div class="other bgColor">
              <el-form-item label="报价是否含税" label-width="193px">
                <div class="radio">
                  <span @click="form.offerOtherInfo.ego_istax = '1'">
                    <img
                      v-if="form.offerOtherInfo.ego_istax === '1'"
                      src="@/static/images/yes.png"
                      alt="是"
                    />
                    <img v-else src="@/static/images/no.png" alt="是" />
                    是
                  </span>
                  <span @click="form.offerOtherInfo.ego_istax = '2'">
                    <img
                      v-if="form.offerOtherInfo.ego_istax === '2'"
                      src="@/static/images/yes.png"
                      alt="否"
                    />
                    <img v-else src="@/static/images/no.png" alt="否" />
                    否
                  </span>
                </div>
              </el-form-item>
              <el-form-item label="报价是否含运费" label-width="193px">
                <div class="radio">
                  <span @click="form.offerOtherInfo.ego_isfreight = '1'">
                    <img
                      v-if="form.offerOtherInfo.ego_isfreight === '1'"
                      src="@/static/images/yes.png"
                      alt="是"
                    />
                    <img v-else src="@/static/images/no.png" alt="是" />
                    是
                  </span>
                  <span @click="form.offerOtherInfo.ego_isfreight = '2'">
                    <img
                      v-if="form.offerOtherInfo.ego_isfreight === '2'"
                      src="@/static/images/yes.png"
                      alt="否"
                    />
                    <img v-else src="@/static/images/no.png" alt="否" />
                    否
                  </span>
                </div>
              </el-form-item>
              <el-form-item class="input" label="补充说明" label-width="193px">
                <el-input
                  v-model="form.offerOtherInfo.ego_price_remark"
                  placeholder="其他说明，如：优惠信息、公司资质说明等"
                />
              </el-form-item>
              <el-form-item label="上传附件" label-width="193px">
                <el-upload
                  :action="$store.state.codeImgUrl + 'qiniu/upimage'"
                  name="image"
                  :on-success="handleUpload"
                  list-type="picture-card"
                  :on-preview="handlePictureCardPreview"
                  :file-list="avatorList"
                  :limit="5"
                  :on-exceed="handleExceed"
                >
                  <div class="add">
                    <img src="@/static/images/upload.png" alt="上传图片" />
                    <span class="add-text">如有参考图 请在次上传</span>
                  </div>
                </el-upload>
                <el-dialog :visible.sync="dialogImg" append-to-body>
                  <img width="100%" :src="dialogImageUrl" alt />
                </el-dialog>
                <p class="tip">可以上传产品图片或公司资质证书，提升报价品质。</p>
              </el-form-item>
            </div>
            <!-- 其他说明 end -->
            <div class="small-title">联系信息</div>
            <div class="contact-info">
              <el-form-item
                class="contact-info-item"
                prop="offerOtherInfo.ego_company_name"
                label="公司名称"
                label-width="130px"
                :rules="{
                  required: true,
                  message: '请输入公司名称',
                  trigger: 'blur'
                }"
              >
                <el-input v-model="form.offerOtherInfo.ego_company_name" placeholder="请输入公司名称" />
              </el-form-item>
              <el-form-item
                class="contact-info-item"
                prop="offerOtherInfo.ego_bidder_name"
                label="您的姓名"
                label-width="130px"
                :rules="{
                  required: true,
                  message: '请输入您的姓名',
                  trigger: 'blur'
                }"
              >
                <el-input
                  v-model="form.offerOtherInfo.ego_bidder_name"
                  class="your-name"
                  placeholder="请输入您的姓名"
                />
                <div class="radio">
                  <span @click="form.offerOtherInfo.ego_bidder_sex = '1'">
                    <img
                      v-if="form.offerOtherInfo.ego_bidder_sex === '1'"
                      src="@/static/images/yes.png"
                      alt="先生"
                    />
                    <img v-else src="@/static/images/no.png" alt="先生" />
                    先生
                  </span>
                  <span @click="form.offerOtherInfo.ego_bidder_sex = '2'">
                    <img
                      v-if="form.offerOtherInfo.ego_bidder_sex === '2'"
                      src="@/static/images/yes.png"
                      alt="女士"
                    />
                    <img v-else src="@/static/images/no.png" alt="女士" />
                    女士
                  </span>
                </div>
              </el-form-item>
              <el-form-item
                class="contact-info-item"
                prop="offerOtherInfo.ego_bidder_phone"
                label="联系电话"
                label-width="130px"
                :rules="{
                  required: true,
                  validator: checkPhone,
                  trigger: 'blur'
                }"
              >
                <el-input v-model="form.offerOtherInfo.ego_bidder_phone" placeholder="请输入您的联系方式" />
              </el-form-item>
              <el-form-item
                class="contact-info-item"
                prop="offerOtherInfo.ego_bidder_email"
                label="邮箱"
                label-width="130px"
                :rules="{
                  required: true,
                  message: '请输入您的邮箱',
                  trigger: 'blur'
                }"
              >
                <el-input v-model="form.offerOtherInfo.ego_bidder_email" placeholder="请输入您的邮箱" />
              </el-form-item>
              <div class="submit">
                <el-button type="primary" @click.native="handleSubmit">发布</el-button>
              </div>
            </div>
          </el-form>
        </div>
      </div>
    </div>
    <Footer />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Header from "~/components/common/header";
import Footer from "~/components/common/footer";
import { getDynamicDetails, goodsOfferInsert } from "@/api/dynamic";

export default {
  name: "Offer",
  components: {
    Header,
    Footer
  },
  data () {
    return {
      demand: {},
      listLoading: false,
      form: {
        goodsOfferList: [
          {
            eg_id: "",
            ego_price: "", // 报价单价
            ego_price_effective_time: "", // 报价有效期
            ego_date_delivery: "", // 交货期
            ego_remark: "" // 备注
          }
        ],
        offerOtherInfo: {
          ego_istax: "1",
          ego_isfreight: "1",
          ego_price_remark: "",
          ego_company_name: "",
          ego_bidder_name: "",
          ego_bidder_sex: "1",
          ego_bidder_phone: "",
          ego_bidder_email: ""
        },
        offerImages: [],
        buyerEmail: "",
        buyerUserName: ""
      },
      // 上传图片
      dialogImageUrl: "",
      dialogImg: false,
      limitCount: 1,
      avatorShow: [],
      rules: {}
    };
  },
  computed: {
    ...mapGetters([
      'isShowLogin'
    ]),
    avatorList () {
      return this.avatorShow;
    },
    totalPrice () {
      let tempPrice = 0;
      const { goodsOfferList } = this.form;
      goodsOfferList.forEach(item => {
        tempPrice += Number(item.ego_price) * Number(item.quantity);
      });
      return isNaN(tempPrice) ? 0 : tempPrice;
    }
  },
  mounted () {
    this.handleAttrInfo();
  },
  methods: {
    // 获取详细信息
    async handleAttrInfo () {
      this.listLoading = true;
      const modue = await getDynamicDetails(this.$route.params.id);
      this.listLoading = false;
      if (modue.status != 2000) {
        this.$message.warning(modue.msg);
        return false;
      }
      const { demand } = modue.data;
      const tempgoodsOfferList = demand.goods.map(item => {
        return {
          eg_id: item.id,
          quantity: item.quantity,
          ego_price: "", // 报价单价
          ego_price_effective_time: "", // 报价有效期
          ego_date_delivery: "", // 交货期
          ego_remark: "" // 备注
        };
      });
      this.demand = demand;
      this.form.goodsOfferList = tempgoodsOfferList;
    },
    // 表单校验
    checkPhone (rule, value, callback) {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8|9][0-9]\d{8}$/;
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    },
    // 点击文件列表中已上传的文件
    handlePictureCardPreview (file, fileList) {
      this.dialogImageUrl = file.url;
      this.dialogImg = true;
    },
    handleExceed(files, fileList) {
      this.$message.warning(`当前限制选择 5 个文件，共选择了 ${files.length + fileList.length} 个文件`);
    },
    // 上传成功
    handleUpload (res, file) {
      this.form.offerImages.push({ path: res.data });
    },
    handleSubmit () {
      const { form } = this;

      this.$refs["ruleForm"].validate(async valid => {
        if (!valid) {
          return false;
        }
        let modue = await goodsOfferInsert(form);
        if (modue.status != 2000) {
          this.$message.warning(modue.msg);
          return false;
        }
        this.$message.success(modue.msg);
        this.$router.push("/user/offer");
        // this.$refs["ruleForm"].resetFields();
      });
    },
    handelLog () {

    }
  }
};
</script>

<style lang="scss" scoped>
$color: #1ca7ec;
$red-color: #1ca7ec;
$bg-color: #f3f4f8;

.hide {
  height: 100px;

  /deep/ .el-upload--picture-card {
    display: none;
  }
}

.content {
  border-top: 2px solid $color;
  background-color: $bg-color;
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

  .main {
    background-color: #fff;
    padding: 42px 30px;

    .title {
      h4 {
        font-size: 24px;
        color: #333;
        text-align: center;
      }
    }
  }
}

.bgColor {
  background-color: $bg-color;
}

.small-title {
  margin: 30px 30px 20px;
  font-size: 18px;
  color: #333;
}

.shop-info {
  padding: 30px 0;
  font-size: 16px;
  color: #999;
  margin: 30px 0;

  p {
    margin-bottom: 15px;

    label {
      display: inline-block;
      width: 140px;
      text-align: right;
    }

    span {
      color: #666;
    }

    a {
      font-size: 18px;
      color: $color;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
}

// 询价物品
.inquiry {
  ul {
    border-top: 1px solid #eee;
    li {
      display: flex;
      align-items: center;
      border: 1px solid #eee;
      border-top: 0;

      .el-form-item {
        margin-bottom: 0;
      }

      .name {
        font-size: 16px;
        color: #333;
        line-height: 55px;
        background-color: #fafafc;
        padding: 0 10px;

        &.is-require::before {
          content: "*";
          color: $red-color;
          margin-right: 4px;
        }
      }

      .text {
        line-height: 74px;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        padding: 0 10px;
      }

      > div:first-child {
        flex: 1;
        &.name {
          padding-left: 30px;
        }
        &.text {
          padding-left: 30px;
        }
      }
      > div:nth-child(2) {
        width: 160px;
      }
      > div:nth-child(3) {
        width: 100px;
      }
      > div:nth-child(4) {
        width: 160px;
        .el-input:first-child {
          width: 110px;
          margin-right: 4px;
        }
      }
      > div:nth-child(5) {
        width: 160px;
      }
      > div:nth-child(6) {
        width: 150px;
        .el-input:first-child {
          width: 110px;
          margin-right: 4px;
        }
      }
      > div:nth-child(7) {
        width: 190px;
      }
    }
  }

  .total {
    border: 1px solid #eee;
    border-top: 0;

    p {
      font-size: 16px;
      color: #666;
      line-height: 72px;
      padding: 0 30px;

      span {
        font-size: 18px;
        color: $red-color;
      }
    }
  }

  /deep/ .input {
    width: 90px;

    &.beizhu {
      width: 158px;
    }

    input {
      padding: 0 11px;
      background-color: $bg-color;
      border: 0;
      border-radius: 0;
    }

    &.single-price input {
      color: $red-color;
    }
  }

  // 日期
  /deep/ .el-date-editor--date {
    width: 132px;

    input {
      padding: 0 11px;
      background-color: $bg-color;
      border: 0;
      border-radius: 0;
    }

    .el-input__prefix {
      left: auto;
      top: 11px;
      right: 10px;
      width: 20px;
      height: 18px;
      background: url("../../../static/images/date.png") no-repeat;
      background-size: 20px 18px;
      pointer-events: none;

      i {
        display: none;
      }
    }
  }
}

// 其他说明
.other {
  padding: 20px 0;

  /deep/ .el-form-item {
    label {
      font-size: 16px;
      color: #666;
      line-height: 1;
      padding-right: 40px;
    }

    // 是否报税
    .radio {
      flex: 1;
      line-height: 1;

      span {
        margin-right: 30px;
        cursor: pointer;
        img {
          display: inline-block;
          width: 18px;
          margin-right: 10px;
          vertical-align: middle;
        }
      }
    }

    &.input {
      label {
        line-height: 40px;
      }

      .el-input {
        width: 395px;

        input {
          border: 0;
          border-radius: 0;
        }
      }
    }

    .el-upload-list--picture-card .el-upload-list__item {
      width: 100px;
      height: 100px;
    }

    .el-upload--picture-card {
      width: 100px;
      height: 100px;
      border-color: #ddd;
      border-radius: 0 !important;
      position: relative;

      .add {
        width: 80px;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        line-height: 1;

        img {
          width: 20px;
          height: 20px;
          margin: 0 auto 10px;
        }

        &-text {
          font-size: 14px;
          color: #999;
          line-height: 1.5em;
        }
      }
    }

    .tip {
      margin-top: 10px;
      color: $color;
    }
  }
}

// 联系信息
.contact-info {
  background-color: $bg-color;
  padding: 22px 0 42px;

  &-item {
    margin-bottom: 20px;

    /deep/ .el-form-item__content {
      display: flex;
      align-items: center;
    }

    label {
      width: 130px;
      display: inline-block;
      color: #666;
      text-align: right;
      padding-right: 20px;
    }

    /deep/ .el-input {
      width: 437px;

      &.your-name {
        width: 170px;
      }

      input {
        border: 0;
        border-radius: 0;
      }
    }

    /deep/ .radio {
      width: 300px;
      line-height: 1;

      span {
        margin-left: 20px;
        display: inline-block;
        line-height: 1;
        cursor: pointer;
      }

      img {
        width: 18px;
        display: inline-block;
        vertical-align: middle;
        margin-right: 10px;
      }
    }
  }

  // 提交按钮
  .submit {
    padding-left: 242px;
    margin-top: 40px;

    .el-button {
      width: 130px;
      border: 0;
      border-radius: 0;
      background-color: $color;
    }
  }
}

// 提交信息
/deep/ .el-form {
  .el-form-item__error {
    font-size: 14px;
    color: #1ca7ec;
    line-height: 16px;

    &::before {
      content: "";
      width: 16px;
      height: 16px;
      display: inline-block;
      background-size: 16px 16px;
      background: url("../../../static/images/warn.png") no-repeat;
      vertical-align: middle;
      position: relative;
      top: -2px;
    }
  }
}
</style>
<style lang="scss">
.submit-info-last {
  .el-progress {
    /deep/ .el-progress-circle {
      width: 100px !important;
      height: 100px !important;
    }
  }
}
</style>
