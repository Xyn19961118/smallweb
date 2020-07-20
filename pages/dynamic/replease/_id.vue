<template>
  <div>
    <Header />

    <div class="content" v-loading.fullscreen.lock="fullscreenLoading">
      <div class="wrap">
        <div class="page-bread">
          当前位置：
          <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item :to="{ path: '/dynamic' }">采购动态</el-breadcrumb-item>
            <el-breadcrumb-item>发布需求</el-breadcrumb-item>
          </el-breadcrumb>
        </div>

        <div class="main">
          <div class="title">
            <h4>发布需求</h4>
          </div>
          <el-form :model="form" :rules="rules" ref="ruleForm" label-width="146px">
            <ul>
              <li>
                <div class="li-title">标题</div>
                <el-form-item class="title" label="询价单标题" label-width="130px" prop="title">
                  <el-input v-model="form.title" placeholder="请输入询价单标题" />
                </el-form-item>
              </li>

              <li>
                <div class="li-title">询价物品</div>
                <div class="goods">
                  <div class="goods-header">
                    <el-row>
                      <el-col :span="4">
                        <span class="is-require">商品名称</span>
                      </el-col>
                      <el-col :span="3">
                        <span class="is-require">所属行业</span>
                      </el-col>
                      <el-col :span="3">
                        <span class="is-require">采购量</span>
                      </el-col>
                      <el-col :span="4">
                        <span class="is-require">单位</span>
                      </el-col>
                      <el-col :span="5">
                        <span>厂牌型号/规格属性</span>
                      </el-col>
                      <el-col :span="3">
                        <span>物品图片</span>
                      </el-col>
                      <el-col :span="2">
                        <span>操作</span>
                      </el-col>
                    </el-row>
                  </div>

                  <div class="goods-content">
                    <div class="goods-item" v-for="(item, index) in form.goods" :key="index">
                      <el-row>
                        <el-col :span="4">
                          <el-form-item
                            :prop="'goods.' + index + '.name'"
                            :rules="{
                              required: true,
                              message: '商品标题不能为空',
                              trigger: 'blur'
                            }"
                          >
                            <el-input v-model="item.name" placeholder="请填写商品标题"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item
                            :prop="'goods.' + index + '.trade_id'"
                            :rules="{
                              required: true,
                              message: '请选择所属行业',
                              trigger: 'change'
                            }"
                          >
                            <el-cascader
                              v-if="item.showTrade"
                              v-model="item.trade_id"
                              :props="tradeList"
                              @change="changeTrade"
                            ></el-cascader>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <el-form-item
                            :prop="'goods.' + index + '.quantity'"
                            :rules="{
                              required: true,
                              message: '请填写采购量',
                              trigger: 'blur'
                            }"
                          >
                            <el-input v-model="item.quantity" type="number" placeholder="请填写采购量"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="4">
                          <el-form-item
                            :prop="'goods.' + index + '.unit'"
                            :rules="{
                              required: true,
                              message: '请填写单位信息',
                              trigger: 'blur'
                            }"
                          >
                            <el-input v-model="item.unit" placeholder="请填写单位信息"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="5">
                          <el-form-item prop="comments">
                            <el-input v-model="item.comments" placeholder="填写规格说明，获得精确报价"></el-input>
                          </el-form-item>
                        </el-col>
                        <el-col :span="3">
                          <div class="submit-info submit-info-last">
                            <el-form-item :prop="'goods.' + index + '.enquiry_image'">
                              <el-upload
                                :action="$store.state.codeImgUrl + 'qiniu/upimage'"
                                name="image"
                                accept="image/jpeg, image/png"
                                :on-remove="handleDelete.bind(null, {'index':index})"
                                :on-success="handleUpload.bind(null, {'index':index,'data':item})"
                                :on-change="handleChange.bind(null, {'index':index})"
                                list-type="picture-card"
                                :file-list="showList[index]"
                                :class="{ hide: item.hideUpload }"
                              >
                                <div class="add">
                                  <img src="@/static/images/upload.png" alt="上传图片" />
                                  <span class="add-text">上传</span>
                                </div>
                              </el-upload>
                              <!-- <el-dialog :visible.sync="dialogImg" append-to-body>
                                <img width="100%" :src="item.enquiry_image" alt />
                              </el-dialog>-->
                            </el-form-item>
                          </div>
                        </el-col>
                        <el-col :span="2">
                          <el-popconfirm
                            title="这个商品确定删除吗？"
                            icon="el-icon-info"
                            iconColor="red"
                            @onConfirm="deleteProduct(index)"
                          >
                            <span slot="reference" class="goods-delete">删除</span>
                          </el-popconfirm>
                          <!--  -->
                        </el-col>
                      </el-row>
                    </div>
                  </div>
                </div>
              </li>

              <li>
                <div class="add-product" @click="addProduct">
                  <i class="el-icon-circle-plus"></i>
                  添加商品
                </div>
              </li>

              <!-- 询价物品 start -->
              <li class="other-info">
                <div class="li-title">采购要求</div>
                <el-form-item label="报价截止日期" prop="end_time">
                  <el-date-picker
                    v-model="form.end_time"
                    type="date"
                    placeholder="选择日期"
                    value-format="yyyy-MM-dd"
                  >
                    <i slot="suffix" class="el-input__icon el-icon-date"></i>
                  </el-date-picker>
                </el-form-item>
                <el-form-item label="交货地">
                  <el-cascader
                    v-if="isShowAddressInfo"
                    v-model="form.delivery_area_id"
                    :props="address"
                  />
                </el-form-item>
                <el-form-item label="对供应商要求">
                  <div class="require-info">
                    <div class="require-info-item">
                      <label>报价是否含税</label>
                      <div class="radio">
                        <span @click="form.duty = 2">
                          <img v-if="form.duty === 2" src="@/static/images/yes.png" alt="否" />
                          <img v-else src="@/static/images/no.png" alt="否" />
                          否
                        </span>
                        <span @click="form.duty = 1">
                          <img v-if="form.duty === 1" src="@/static/images/yes.png" alt="是" />
                          <img v-else src="@/static/images/no.png" alt="是" />
                          是
                        </span>
                      </div>
                    </div>
                    <div class="require-info-item">
                      <label>发票类型</label>
                      <div class="fapiao">
                        <el-select v-model="form.receipt_type" placeholder="请选择">
                          <el-option
                            v-for="item in fpList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>
                        <label>税点</label>
                        <el-input type="number" v-model="form.tax_point"></el-input>%
                      </div>
                    </div>
                    <div class="require-info-item">
                      <label>所在地区</label>
                      <div class="fapiao">
                        <!-- <el-select
                          v-model="form.supply_area_id"
                          placeholder="请选择"
                        >
                          <el-option
                            v-for="item in ragionList"
                            :key="item.value"
                            :label="item.label"
                            :value="item.value"
                          ></el-option>
                        </el-select>-->
                        <el-cascader
                          v-if="isShowAddressInfo"
                          v-model="form.supply_area_id"
                          :props="address"
                        />
                      </div>
                    </div>
                    <div class="require-info-item">
                      <label>经营模式</label>
                      <div class="mode">
                        <el-radio v-model="form.manage_type" :label="1">生产制造</el-radio>
                        <el-radio v-model="form.manage_type" :label="2">贸易批发</el-radio>
                        <el-radio v-model="form.manage_type" :label="3">商业服务</el-radio>
                        <el-radio v-model="form.manage_type" :label="4">其他组织</el-radio>
                      </div>
                    </div>
                    <div class="require-info-item">
                      <label>证照要求</label>
                      <div class="mode">
                        <el-checkbox-group v-model="form.credentials_demand">
                          <el-checkbox label="工商营业执照"></el-checkbox>
                        </el-checkbox-group>
                      </div>
                    </div>
                  </div>
                </el-form-item>
                <el-form-item label="备注">
                  <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入备注信息"
                    v-model="form.supply_content"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系信息">
                  <div class="contact-info">
                    <el-form-item
                      class="contact-info-item"
                      prop="contact.company"
                      :rules="{
                        required: true,
                        message: '请输入公司名称',
                        trigger: 'blur'
                      }"
                    >
                      <label>公司名称</label>
                      <el-input v-model="form.contact.company" placeholder="请输入公司名称" />
                    </el-form-item>
                    <el-form-item
                      class="contact-info-item"
                      prop="contact.name"
                      :rules="{
                        required: true,
                        message: '请输入您的姓名',
                        trigger: 'blur'
                      }"
                    >
                      <label>您的姓名</label>
                      <el-input
                        v-model="form.contact.name"
                        class="your-name"
                        placeholder="请输入您的姓名"
                      />
                      <div class="radio">
                        <span @click="form.contact.sex = '1'">
                          <img
                            v-if="form.contact.sex === '1'"
                            src="@/static/images/yes.png"
                            alt="先生"
                          />
                          <img v-else src="@/static/images/no.png" alt="先生" />
                          先生
                        </span>
                        <span @click="form.contact.sex = '2'">
                          <img
                            v-if="form.contact.sex === '2'"
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
                      prop="contact.mobile"
                      :rules="{
                        required: true,
                        min: 11, max: 11,
                        message: '请输入您的联系电话',
                        trigger: 'blur'
                      }"
                    >
                      <label>联系电话</label>
                      <el-input v-model="form.contact.mobile" placeholder="请输入您的联系方式" />
                    </el-form-item>
                    <el-form-item
                      class="contact-info-item"
                      prop="contact.email"
                      :rules="{
                        required: true,
                        message: '请输入您的邮箱',
                        trigger: 'blur'
                      }"
                    >
                      <label>邮箱</label>
                      <el-input v-model="form.contact.email" placeholder="请输入您的邮箱" />
                    </el-form-item>
                    <el-form-item
                      class="contact-info-item"
                      prop="contact.disclosure_type"
                      :rules="{
                        required: true,
                        message: '请选择是否公开信息',
                        trigger: 'blur'
                      }"
                    >
                      <label>公开联系信息</label>
                      <div class="radio gk">
                        <span @click="form.contact.disclosure_type = 1">
                          <img
                            v-if="form.contact.disclosure_type === 1"
                            src="@/static/images/yes.png"
                            alt="不公开"
                          />
                          <img v-else src="@/static/images/no.png" alt="不公开" />
                          不公开
                        </span>
                        <span @click="form.contact.disclosure_type = 2">
                          <img
                            v-if="form.contact.disclosure_type === 2"
                            src="@/static/images/yes.png"
                            alt="报价后公开"
                          />
                          <img v-else src="@/static/images/no.png" alt="报价后公开" />
                          报价后公开
                        </span>
                        <span @click="form.contact.disclosure_type = 3">
                          <img
                            v-if="form.contact.disclosure_type === 3"
                            src="@/static/images/yes.png"
                            alt="公开"
                          />
                          <img v-else src="@/static/images/no.png" alt="公开" />
                          公开
                        </span>
                      </div>
                    </el-form-item>
                    <div class="submit">
                      <el-button type="primary" @click.native="handleSubmit">发布</el-button>
                    </div>
                  </div>
                </el-form-item>
              </li>
              <!-- 询价物品 end -->
            </ul>
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
import { getPtrade, getIndexTrade } from "~/api/index";
import {
  release,
  addressCity,
  getDynamicDetails,
  updateRelease
} from "@/api/dynamic";

export default {
  name: "Replease",
  components: {
    Header,
    Footer
  },
  data () {
    return {
      id: 0,
      fullscreenLoading: false,
      dialogImageUrl: "",
      isShowAddressInfo: false,
      showList: [],
      tradeList: {
        lazy: true,
        async lazyLoad (node, resolve) {
          const { level, value } = node;
          if (level === 0) {
            let ptrade = await getPtrade();
            const nodes = ptrade.data.map(item => ({
              value: item.id,
              label: item.trade,
              leaf: level >= 1
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          } else {
            let ptrade = await getIndexTrade(value);
            const nodes = ptrade.data.map(item => ({
              value: item.id,
              label: item.name,
              leaf: level >= 1
            }));
            // 通过调用resolve将子节点数据返回，通知组件数据加载完成
            resolve(nodes);
          }
        }
      }, //所属行业列表
      form: {
        avator: "",
        title: "",
        shopName: "",
        shopIndustry: "",
        shopNum: "",
        shopUnit: "",
        shopModel: "",
        end_time: "",
        delivery_area_id: [],
        duty: 1,
        receipt_type: "",
        tax_point: "",
        supply_area_id: "",
        manage_type: 0,
        goods: [
          {
            name: "", //商品名称
            trade_id: [], //所属行业
            quantity: "", //采购量
            unit: "", //单位信息
            comments: "", //规格
            enquiry_image: "", //图片
            hideUpload: false //是否隐藏上传按钮
          }
        ],
        credentials_demand: false,
        supply_content: "",
        contact: {
          company: "",
          name: "",
          sex: "1",
          mobile: "",
          email: "",
          disclosure_type: 1
        }
      },
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
      fpList: [
        // 发票
        {
          label: "收据",
          value: 1
        },
        {
          label: "普通地税发票",
          value: 2
        },
        {
          label: "普通国税发票",
          value: 3
        },
        {
          label: "增值税普通发票",
          value: 4
        },
        {
          label: "增值税专用发票",
          value: 5
        }
      ],
      ragionList: [
        {
          label: "区域不限",
          value: "0"
        },
        {
          label: "河南",
          value: "1"
        }
      ],
      // 上传图片
      dialogImg: false,
      limitCount: 1,
      avatorShow: [],
      rules: {
        title: [
          { required: true, message: "请输入询价单标题", trigger: "blur" }
        ],
        end_time: [
          { required: true, message: "请选择报价截止日期", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    ...mapGetters([
      'isShowLogin'
    ])
  },
  mounted () {
    this.fullscreenLoading = true;
    this.id = this.$route.params.id;
    getDynamicDetails(this.id).then(res => {
      if (res.status == 2000) {
        let data = res.data.demand;
        // console.log(data);
        this.form.title = data.title; //询价单标题
        let imgList = [];
        data.goods.forEach((item, index) => {
          // if (item.enquiry_image) {
          //   this.$set(item, "hideUpload", true);
          // } else {
          //   this.$set(item, "hideUpload", false);
          // }

          this.$set(item, "hideUpload", true);
          this.$set(item, "showTrade", false);

          let img = [];
          let da = {
            name: "img" + index,
            url: item.enquiry_image
          };
          img.push(da);
          imgList.push(img);
        });
        this.showList = imgList;
        this.form.goods = data.goods; // 询价物品
        this.form.goods.forEach(item => {
          item.showTrade = true;
        });
        this.form.end_time = data.end_time; // 截止时间
        this.form.delivery_area_id = data.delivery_area_id; // 交货地
        this.form.duty = data.duty; // 报价是否含税
        this.form.receipt_type = data.receipt_type ? data.receipt_type : ""; // 发票类型
        this.form.tax_point = data.tax_point ? data.tax_point : ""; // 税点
        this.form.supply_area_id = data.supply_area_id; //所在地区
        this.isShowAddressInfo = true; // 控制
        this.form.manage_type = data.manage_type; //经营模式

        this.form.credentials_demand = data.credentials_demand ? true : false; //证件要求
        this.form.supply_content = data.supply_content; //备注
        this.form.contact = data.contact;
        this.fullscreenLoading = false;
      }
    });

    if (!this.isShowLogin) {
      this.$message.error("未登录，请登录！");
    }
  },
  computed: {
    avatorList () {
      return this.avatorShow;
    }
  },
  methods: {
    // 文件状态改变
    handleChange (index) {
      this.form.goods[index.index].hideUpload = true;
      // this.hideUpload = fileList.length >= this.limitCount;
    },
    // 点击文件列表中已上传的文件
    handlePictureCardPreview (file, fileList, index) {
      // console.log(index)
      // this.
      // this.dialogImageUrl = file.url;
      // this.dialogImg = true;
    },
    // 上传成功
    handleUpload (index, res, file) {
      console.log(index, res, file);
      this.form.goods[index.index].enquiry_image = res.data;
      this.form.goods[index.index].hideUpload = true;
    },

    //移出上传图片
    handleDelete (index) {
      this.form.goods[index.index].hideUpload = false;
      this.form.goods[index.index].enquiry_image = "";
    },

    //选择所属行业
    changeTrade (value) { },

    //添加商品
    addProduct () {
      let data = {
        name: "", //商品名称
        trade_id: [], //所属行业
        quantity: "", //采购量
        unit: "", //单位信息
        comments: "", //规格
        enquiry_image: "", //图片
        hideUpload: false,
        showTrade: true,
        demand_id: this.id
      };
      let { goods } = this.form;
      if (goods.length >= 10) {
        this.$message.error("最多添加十个产品");
      } else {
        this.form.goods.push(data);
      }
    },

    //删除商品
    deleteProduct (index) {
      let { goods } = this.form;
      if (goods.length == 1) {
        this.$message.error("必须保留一条商品信息");
      } else {
        for (let i in goods) {
          if (i == index) {
            goods.splice(index, 1);
          }
        }
      }
    },

    //提交
    handleSubmit () {
      // console.log(this.form);
      this.$refs["ruleForm"].validate(async valid => {
        if (valid) {
          this.form.credentials_demand = this.form.credentials_demand ? 1 : 0;
          this.form.goods.forEach(item => {
            item.trade_id = item.trade_id[1];
          });
          this.form.delivery_area_id = this.form.delivery_area_id[2];
          this.form.supply_area_id = this.form.supply_area_id[2];
          let subData = JSON.parse(JSON.stringify(this.form));
          subData.goods.forEach(item => {
            delete item.hideUpload;
            delete item.showTrade;
            delete item.trade;
          });
          // console.log(subData);
          let modue = await updateRelease(subData, this.id);
          // console.log(modue);
          if (modue.status != 2000) {
            this.$message.warning(modue.msg);
            return false;
          }
          this.$message.success(modue.msg);
          this.$router.push("/user/release");
          this.$refs["ruleForm"].resetFields();
        } else {
          return false;
        }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
$color: #1ca7ec;
$red-color: #1ca7ec;
$bg-color: #f3f4f8;

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

      ul li {
        .li-title {
          font-size: 18px;
          color: #333;
          margin: 32px 30px 20px;
        }

        .el-form-item__label {
          padding-right: 20px;
        }

        // 标题
        .title {
          .el-form-item__label {
            text-align: left;
            padding: 0 0 0 30px;
          }
          .el-input {
            width: 437px;

            input {
              border: 0;
              border-radius: 0;
              background-color: $bg-color;
            }
          }
        }

        // 其他信息
        &.other-info {
          .el-form-item__label {
            font-size: 16px;
          }

          // 日期
          .el-date-editor--date {
            width: 150px;

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
              background: url("../../../static/images/date.png") no-repeat;
              background-size: 20px 18px;
              pointer-events: none;

              i {
                display: none;
              }
            }
          }

          // 交换地
          .el-cascader {
            // width: 300px;
            input {
              background-color: $bg-color;
              border: 0;
              border-radius: 0;
            }
            .el-input__suffix {
              top: 17.5px;
              right: 10px;
              width: 11px;
              background: url("../../../static/images/xiala.png") no-repeat;
              background-size: 11px 5px;
              pointer-events: none;

              i {
                display: none;
              }
            }
          }

          // 对供应商要求
          .require-info {
            background-color: $bg-color;
            padding: 20px 0;

            &-item {
              display: flex;
              align-items: center;
              margin-bottom: 22px;

              label {
                font-size: 16px;
                color: #666;
                line-height: 1;
                display: inline-block;
                width: 126px;
                text-align: right;
                padding-right: 10px;
              }

              // 是否报税
              .radio {
                flex: 1;
                line-height: 1;

                span {
                  margin-left: 30px;
                  cursor: pointer;
                  img {
                    display: inline-block;
                    width: 18px;
                    margin-right: 10px;
                    vertical-align: middle;
                  }
                }
              }

              // 发票类型
              .fapiao {
                flex: 1;

                .el-cascader {
                  width: 150px;

                  input {
                    background-color: #fff;
                  }
                }

                .el-select {
                  width: 150px;

                  .el-input__suffix {
                    top: 17.5px;
                    right: 10px;
                    width: 11px;
                    background: url("../../../static/images/xiala.png")
                      no-repeat;
                    background-size: 11px 5px;
                    pointer-events: none;

                    i {
                      display: none;
                    }
                  }
                }

                > .el-input {
                  width: 85px;
                }
              }

              // 经营模式
              .mode {
                flex: 1;

                .el-checkbox-group {
                  display: flex;
                }

                .el-checkbox {
                  width: auto;
                  padding-left: 10px;
                  margin-right: 10px;

                  .el-checkbox__inner {
                    width: 20px;
                    height: 20px;

                    &::after {
                      width: 6px;
                      top: 3px;
                      left: 5px;
                    }
                  }

                  .el-checkbox__label {
                    font-size: 16px;
                  }

                  .el-checkbox__input.is-checked + .el-checkbox__label {
                    color: $color;
                  }

                  .el-checkbox__input.is-checked .el-checkbox__inner {
                    background-color: $color;
                    border-color: $color;
                  }
                }

                .el-radio {
                  text-align: left;
                  padding-left: 10px;

                  .el-radio__inner {
                    width: 20px;
                    height: 20px;
                    border-radius: 2px;

                    &::after {
                      width: 6px;
                      top: 3px;
                      left: 5px;
                      box-sizing: content-box;
                      content: "";
                      border: 1px solid #fff;
                      border-left: 0;
                      border-top: 0;
                      height: 7px;
                      position: absolute;
                      transition: transform 0.15s ease-in 0.05s;
                      transform: rotate(45deg) scaleY(1);
                      transform-origin: center;
                      border-radius: 0;
                      background-color: transparent;
                    }
                  }

                  .el-radio__input.is-checked .el-radio__inner {
                    background-color: $color;
                    border-color: $color;
                  }

                  .el-radio__input.is-checked + .el-radio__label {
                    color: $color;
                  }

                  .el-radio__label {
                    font-size: 16px;
                    color: #666;
                  }
                }
              }
            }
          }

          // 要求
          .el-textarea {
            textarea {
              height: 120px;
              background-color: $bg-color;
              border: 0;
              border-radius: 0;
            }
          }

          // 联系信息
        }
      }
    }
  }
}

// 询价信息
.is-require {
  &::before {
    content: "*";
    color: #f56c6c;
    margin-right: 4px;
  }
}
.price-flex {
  display: flex;
  border: 1px solid #eeeeee;

  &-item {
    .name {
      font-size: 16px;
      color: #333;
      line-height: 55px;
      background-color: #fafafc;
    }

    /deep/ .submit-info {
      height: 148px;
      padding-top: 20px;
      margin-right: 10px;

      .el-form-item__content {
        margin-left: 0 !important;
      }

      .el-input input {
        border: 0;
        border-radius: 0;
        background-color: $bg-color;
      }

      &-first {
        width: 220px;
      }
      &-second {
        width: 130px;
      }
      &-third {
        width: 130px;
      }
      &-four {
        width: 200px;
      }
      &-five {
        width: 277px;
      }
      &-last {
        flex: 1;

        .el-upload-list--picture-card .el-upload-list__item {
          width: 100px;
          height: 100px;
        }

        .el-upload--picture-card {
          width: 100px;
          height: 100px;
          border: 0;
          background-color: $bg-color;
          position: relative;

          .add {
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
              line-height: 1;
            }
          }
        }
      }
    }

    &:first-child {
      .name,
      .submit-info {
        padding-left: 30px;
      }
    }
    &:last-child {
      flex: 1;
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

      .el-form-item__error {
        margin-left: 130px;
      }
    }

    label {
      width: 130px;
      display: inline-block;
      color: #666;
      text-align: right;
      padding-right: 20px;

      &::before {
        content: "*";
        color: #f56c6c;
        margin-right: 4px;
      }
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

      &.gk {
        width: 437px;

        span {
          margin: 0 20px 0 0;
        }
      }

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

.hide {
  /deep/ .el-upload--picture-card {
    display: none;
  }
}

//询价物品
.goods {
  margin: 32px 30px 20px;
  .goods-header {
    height: 55px;
    background: #fafafc;
    line-height: 55px;
    span {
      font-size: 16px;
      color: #333;
    }
  }

  .goods-content {
    border: #eee 1px solid;
    .goods-item {
      padding: 20px 0;
      border-bottom: #eee 1px solid;

      &:last-child {
        border-bottom: none;
      }

      /deep/ .el-form-item__content {
        margin-left: 0 !important;
      }

      .goods-delete {
        color: #888;
        cursor: pointer;
      }

      /deep/ .el-input__inner {
        padding: 0 10px;
        background: #f3f4f8;
        border: none;
      }

      /deep/ .submit-info {
        margin-right: 10px;

        &.submit-info-last {
          width: 100px;
          height: 100px;
        }

        .el-form-item__content {
          margin-left: 0 !important;
        }

        /deep/ .el-progress-circle {
          width: 100px !important;
          height: 100px !important;
          margin: auto !important;
        }

        /deep/ .el-form-item {
          margin-bottom: 0;
        }

        .el-input input {
          border: 0;
          border-radius: 0;
          background-color: $bg-color;
        }

        .el-upload-list--picture-card .el-upload-list__item {
          width: 100px;
          height: 100px;
        }

        .el-upload--picture-card {
          width: 100px;
          height: 100px;
          border: 0;
          background-color: $bg-color;
          position: relative;

          .add {
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
              line-height: 1;
            }
          }
        }
      }
    }
  }

  /deep/ .el-col {
    padding: 0 5px 0 10px;
  }
}

.add-product {
  margin: 20px 0 10px 32px;
  width: 100px;
  color: #1ca7ec;
  font-size: 14px;
  display: flex;
  align-items: center;
  cursor: pointer;
  user-select: none;
  -webkit-user-select: none;
  i {
    font-size: 18px;
    margin-right: 6px;
  }
}
</style>

<style lang="scss">
.el-popconfirm__main {
  margin-bottom: 10px !important;
  .el-button--primary {
    color: #fff;
    background-color: #1ca7ec;
    border-color: #1ca7ec;
  }
}
</style>
