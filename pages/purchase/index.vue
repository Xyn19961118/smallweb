<template>
  <div>
    <Header />
    <!-- <div class="banner"></div> -->

    <div class="purchase-head">
      <img class="purchase-head-img" :src="headImg" alt />
      <!-- <div class="purchase-head-box">
        <div class="purchase-head-boxtit">你会得到什么？</div>
        <div class="purchase-head-boxList">
          <img class="purchase-head-boxImg" :src="iconImga" alt />
          <div class="purchase-head-boxTxt">50，000多家真正的优质提供商</div>
        </div>
        <div class="purchase-head-boxList">
          <img class="purchase-head-boxImg" :src="iconImga" alt />
          <div class="purchase-head-boxTxt">60多位贸易专家。</div>
        </div>
        <div class="purchase-head-boxList">
          <img class="purchase-head-boxImg" :src="iconImga" alt />
          <div class="purchase-head-boxTxt">节省了平均采购预算成本的10%-15%</div>
        </div>
      </div>-->
    </div>

    <div class="conter">
      <el-form
        ref="form"
        :label-position="labelPosition"
        :model="userForm"
        label-width="80px"
        @submit.native.prevent
      >
        <div class="purchase-maxtitle">告诉提供商您需要什么</div>
        <div class="purchase-title">您的信息越具体，我们就可以更准确地将您的请求与适当的提供商匹配。</div>
        <el-form-item label="产品:">
          <div class="purchase-inp" @click="productBtn">
            <div class="product-items">
              <div
                v-show="shopNames.length == 0 && radio=='1'"
                class="product-items-none"
              >选择产品购买标签（最多选择五个标签）</div>
              <div v-show="radio == '2'" class="product-items-zt">{{ userForm.interestProduct }}</div>
              <div v-for="(item,index) in shopNames" :key="index" class="product-item">{{ item }}</div>
              <i class="product-items-se el-icon-arrow-down" />
            </div>
            <input v-model="userForm.trade_ids" type="hidden" />
          </div>
          <div v-show="productshow" class="prodect-mask" @click="hideProduct" />
          <div v-show="productshow" class="product">
            <div class="product-left">
              <ul>
                <li
                  v-for="(item,index) in tabTitle"
                  :key="item.id"
                  :class="{active:cur==index}"
                  @mouseover="mouseHover(index)"
                >
                  {{ item.trade }}
                  <i class="iconfont icon-fanhui-copy-copy" />
                </li>
              </ul>
            </div>
            <div class="product-right">
              <ul>
                <li
                  v-for="(item,index) in tabTitle"
                  v-show="cur==index"
                  :key="item.id"
                  :data-id="item.id"
                >
                  <div class="product-title">
                    <el-radio v-model="radio" label="1">你可以在下面选择多个标签</el-radio>
                  </div>
                  <div v-if="cur==index" class="product-cont">
                    <div
                      v-for="(items,indexs) in item.child"
                      :key="items.id"
                      ref="tag"
                      class="product-list"
                      @click="productitem(items,indexs)"
                    >{{ items.name }}</div>
                  </div>
                  <div class="product-title">
                    <el-radio v-model="radio" label="2">找不到您需要的东西？告诉我们您想要什么？</el-radio>
                  </div>
                  <div class="product-inp">
                    <input
                      v-model="userForm.interestProduct"
                      type="text"
                      maxlength="50"
                      placeholder="输入感兴趣的产品"
                    />
                  </div>
                  <div class="product-btn">
                    <button @click="productbtndele(item)">确认一下</button>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </el-form-item>
        <el-form-item label="详细说明:">
          <el-input
            v-model="userForm.content"
            type="textarea"
            class="el-textarea"
            placeholder="请输入详细说明"
          />
        </el-form-item>
        <el-form-item label="购买数量:">
          <el-input
            v-model="userForm.num"
            onkeyup="this.value=this.value.replace(/[^\d.]/g,'');"
            maxlength="100"
            placeholder="请输入购买数量"
          />
          <el-select v-model="userForm.purch" placeholder="选择购买数量类型">
            <el-option
              v-for="item in purchaselist"
              :key="item.id"
              :label="item.title"
              :value="item.title"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="联系人:">
          <el-input v-model="userForm.link_man" placeholder="请输入联系人姓名" />
          <el-input v-model="userForm.phone" placeholder="请输入联系人电话" />
        </el-form-item>
        <el-form-item label="验证码:">
          <el-input v-model="userForm.code" placeholder="请输入验证码" />
          <img class="verifyImg" :src="imgCode" alt srcset />
          <button class="verifyBtn" @click="changeImgCode">换一张</button>
        </el-form-item>
        <div class="purchase-maxtitle" @click="purchasebtn()">
          其他需要
          <i class="iconfont icon-bottom" />
        </div>
        <div v-show="purchshow" class="purchase-title">包括每单位价格，上传图片，付款条款，运输条款</div>
        <el-form-item v-show="purchshow" label="上传图片:(0/3)">
          <el-upload
            action="http://data.itifexpo.com/index/upimg"
            list-type="picture-card"
            :on-preview="handlePictureCardPreview"
            :on-remove="handleRemove"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            :on-exceed="handleExceed"
            :on-error="imgUploadError"
          >
            <i class="el-icon-plus" />
          </el-upload>
          <el-dialog :visible.sync="dialogVisible">
            <img width="100%" :src="dialogImageUrl" alt />
          </el-dialog>
        </el-form-item>
        <el-form-item v-show="purchshow" label="单价:">
          <el-input v-model="userForm.price" placeholder="请输入单价" />
          <div class="purchase-mintitle">人民币</div>
        </el-form-item>
        <el-form-item v-show="purchshow" label="城市:">
          <el-input v-model="userForm.city" placeholder="请填写城市" />
          <el-select v-model="userForm.citytab" placeholder="选择城市类型">
            <el-option label="离岸价" value="离岸价" />
            <el-option label="到岸价" value="到岸价" />
          </el-select>
        </el-form-item>
        <el-form-item v-show="purchshow" label="付款条件:">
          <el-select v-model="userForm.pay_type" placeholder="选择付款条件类型">
            <el-option
              v-for="item in payment"
              :key="item.id"
              :label="item.title"
              :value="item.title"
            />
          </el-select>
        </el-form-item>
        <el-form-item v-show="purchshow" label="购买频率:">
          <el-input v-model="userForm.yearly" placeholder="请输入多少次" />
          <div class="purchase-mintitle">每年</div>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">提交</el-button>
        </el-form-item>
      </el-form>
    </div>
    <Footer />
  </div>
</template>

<script>
import { getPtrade, getAdvisory } from '~/api/index'
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
export default {
  components: {
    Header,
    Footer
  },
  data () {
    return {
      headImg: require('~/static/images/headicon.jpeg'),
      iconImga: require('~/static/images/chenggong.png'),
      radio: '1',
      imgCode: 'http://data.itifexpo.com/index/user/code',
      tabTitle: [],
      labelPosition: 'right',
      shopNames: [], // 选择产品的名称列表
      userForm: {
        trade_ids: [], // 选择产品的id
        content: '', // 详细说明
        num: '', // 购买数量输入值
        purch: '', // 购买数量下拉框
        link_man: '', // 联系人姓名
        phone: '', // 联系人电话
        code: '', // 验证码
        images: [], // 图片
        price: '', // 单价
        city: '', // 城市输入内容
        citytab: '', // 城市下拉框
        pay_type: '', // 付款条件
        yearly: '', // 购买频率
        interestProduct: '' // 感兴趣的产品
      },
      purchshow: false, // 其他需要是否显示
      dialogImageUrl: '',
      dialogVisible: false,
      productshow: false, // 产品
      selectIndex: null, // 产品下面的tab切换右侧列表点击
      cur: 0, // 产品下面的tab切换索引
      // 购买金额下拉框数据
      purchaselist: [
        { id: 1, title: '件' },
        { id: 2, title: '组' },
        { id: 3, title: '英亩' },
        { id: 4, title: '安培' },
        { id: 5, title: '袋' },
        { id: 6, title: '桶' },
        { id: 7, title: '刀' },
        { id: 8, title: '框' },
        { id: 9, title: '蒲式耳' },
        { id: 10, title: '克拉' },
        { id: 11, title: '纸箱' },
        { id: 12, title: '案件' },
        { id: 13, title: '厘米' },
        { id: 14, title: '链' },
        { id: 15, title: '组合' },
        { id: 16, title: '立方厘米' },
        { id: 17, title: '立方英尺' },
        { id: 18, title: '立方英寸' },
        { id: 19, title: '立方米' },
        { id: 20, title: '立方围场' },
        { id: 21, title: '摄氏温度' },
        { id: 22, title: '华氏度' },
        { id: 23, title: '打' },
        { id: 24, title: '德拉姆' },
        { id: 25, title: '液司' },
        { id: 26, title: '脚丫子' },
        { id: 27, title: '四十尺集装箱' },
        { id: 28, title: '福隆' },
        { id: 29, title: '加仑' },
        { id: 30, title: '鳃' },
        { id: 31, title: '粮食' },
        { id: 32, title: '公克' },
        { id: 33, title: '毛' },
        { id: 34, title: '公顷' },
        { id: 35, title: '赫兹' },
        { id: 36, title: '英寸' },
        { id: 37, title: '千安培' },
        { id: 38, title: '公斤' }
      ],
      // 付款条件下拉框
      payment: [
        { id: 1, title: '无' },
        { id: 2, title: '信用证' },
        { id: 3, title: 'D/A' },
        { id: 4, title: 'D/P' },
        { id: 5, title: '吨/吨' },
        { id: 6, title: '西方联盟' },
        { id: 7, title: '速汇金' },
        { id: 8, title: '其他' }
      ]
    }
  },
  watch: {
    // 判断，如果radio改变，就清空选择产品列表
    radio () {
      this.userForm.trade_ids = [] // 清空选择的id
      this.shopNames = [] // 清空选择的名称
      // 清空样式
      this.$refs.tag.forEach((item) => {
        item.className = 'product-list'
      })
    }
  },
  async created () {
    const tabTitle = await getPtrade()
    this.tabTitle = tabTitle.data
  },
  methods: {
    // 点击换一换刷新图片验证码
    changeImgCode () {
      const num = Math.ceil(Math.random() * 10) // 生成一个随机数（防止缓存）
      this.imgCode = 'http://data.itifexpo.com/index/user/code?id=' + num
    },
    // 点击向下箭头是否显示
    purchasebtn () {
      this.purchshow = true
    },
    // 产品
    productBtn () {
      this.productshow = true
    },
    hideProduct () {
      this.productshow = false
      this.userForm.trade_ids = []
      this.shopNames = []
      this.userForm.interestProduct = ''
      // 清空样式
      this.$refs.tag.forEach((item) => {
        item.className = 'product-list'
      })
    },
    // 产品下拉菜单
    productbtndele (item) {
      const { radio } = this
      if (radio == '1') {
        // 判断选择产品
        if (this.userForm.trade_ids.length == 0) {
          this.$message({
            showClose: true,
            message: '请至少选择一个',
            type: 'error'
          })
          return false
        }
        this.productshow = false
      } else {
        if (this.userForm.interestProduct == '') {
          this.$message({
            showClose: true,
            message: '请填写您感兴趣的产品',
            type: 'error'
          })
          return false
        }
        this.productshow = false
      }
    },
    // 鼠标划过产品大类
    mouseHover (index) {
      this.cur = index //
      this.radio = '1' // 选择标签切换至选择多个标签
      this.userForm.trade_ids = [] // 清空选择的id
      this.shopNames = [] // 清空选择的名称
      // 清空样式
      this.$refs.tag.forEach((item) => {
        item.className = 'product-list'
      })
    },
    // 产品下拉菜单里面单选内容
    productitem (items, indexs) {
      // 判断最多选择五个标签

      // 获取下当前点击的标签
      const thisTag = this.$refs.tag[indexs]

      if (thisTag.className == 'product-list active') {
        const { shopNames } = this
        const { trade_ids } = this.userForm
        // 执行取消选择
        thisTag.className = 'product-list'
        // 删除名称
        shopNames.forEach((item, i) => {
          if (item == items.name) {
            shopNames.splice(i, 1)
          }
        })
        // 删除id
        trade_ids.forEach((item, i) => {
          if (item == items.id) {
            trade_ids.splice(i, 1)
          }
        })
      } else {
        // 判断选择的个数
        if (this.shopNames.length < 5) {
          // 执行选择
          thisTag.className = 'product-list active'
          this.shopNames.push(items.name)
          this.userForm.trade_ids.push(items.id)
        } else {
          this.$message({
            showClose: true,
            message: '最多选择五个标签',
            type: 'warning'
          })
        }
      }
    },
    async onSubmit () {
      let {
        trade_ids,
        content,
        num,
        purch,
        link_man,
        phone,
        code,
        price,
        city,
        citytab,
        pay_type,
        images,
        yearly,
        interestProduct
      } = this.userForm
      if (!trade_ids.length) {
        this.$message.error('请选择产品购买标签')
        return
      }
      if (content == '') {
        this.$message.error('请输入详细说明')
        return
      }
      if (num == '') {
        this.$message.error('请输入购买数量')
        return
      }
      if (purch == '') {
        this.$message.error('请选择购买数量类型')
        return
      }
      if (link_man == '') {
        this.$message.error('请输入联系人姓名')
        return
      }
      const yzMobile = /^[1][3,4,5,6,7,8,9][0-9]{9}$/
      if (!yzMobile.test(phone)) {
        this.$message.error('请输入正确的手机号')
        return
      }
      if (code == '') {
        this.$message.error('请输入验证码')
        return
      }
      trade_ids = trade_ids.join(',')
      const dataObj = {
        trade_ids,
        content,
        num,
        images,
        price,
        city,
        pay_type,
        yearly,
        link_man,
        phone
      }
      const data = await getAdvisory(dataObj)
      this.$router.push('/purchase/1')
    },
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePictureCardPreview (file) {
      this.dialogImageUrl = file.url
      this.dialogVisible = true
    },
    // 文件上传之前调用做一些拦截限制
    beforeAvatarUpload (file) {
      const isJPG = true
      const isLt2M = file.size / 1024 / 1024 < 2
      if (!isLt2M) {
        this.$message.error('上传图片大小不能超过 2MB!')
      }
      return isJPG && isLt2M
    },
    // 图片上传成功
    handleAvatarSuccess (res, file) {
      if (res.status == 200) {
        this.userForm.images = this.userForm.images.concat(res.data)
        this.$message.success('图片上传成功')
      }
      this.imageUrl = URL.createObjectURL(file.raw)
    },
    // 图片上传超过数量限制
    handleExceed (files, fileList) {
      this.$message.error('上传图片不能超过3张!')
    },
    // 图片上传失败调用
    imgUploadError (err, file, fileList) {
      this.$message.error('上传图片失败!')
    }
  }
}
</script>

<style scoped lang="scss">
.banner {
  width: 1500px;
  height: 300px;
  background: #1ca7ec;
  margin: 0 auto;
}
.conter {
  width: 1200px;
  margin: 70px auto 98px auto;
  border: 1px solid rgba(167, 167, 167, 0.08);
  box-shadow: 6px 6px 10px 0px rgba(0, 0, 0, 0.06);
  padding: 40px;
  .purchase-maxtitle {
    font-size: 24px;
    color: #333333;
    font-weight: bold;
    margin-bottom: 20px;
  }
  .purchase-title {
    font-size: 16px;
    color: #999999;
    margin-bottom: 40px;
  }
  .el-input {
    width: 280px;
    float: left;
    margin-right: 20px;
  }
  .el-textarea {
    width: 572px;
  }
  .purchase-mintitle {
    font-size: 16px;
    color: #acacac;
  }
  .verifyImg {
    float: left;
    width: 75px;
    height: 34px;
    margin-right: 5px;
  }
  .verifyBtn {
    float: left;
    font-size: 14px;
    color: #999999;
    background: #fff;
    border: none;
    margin-top: 3px;
  }
  .purchase-inp {
    float: left;
    line-height: 30px;
    font-size: 16px;
    color: #acacac;
    input {
      width: 190px;
      height: 30px;
      background: #fff;
      border: 1px solid #acacac;
      font-size: 14px;
      padding-left: 15px;
      float: left;
      margin-right: 20px;
    }
  }
  .product {
    position: absolute;
    margin-top: 30px;
    z-index: 99999;
    .product-left {
      width: 280px;
      background: #fff;
      border: 1px solid #acacac;
      box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.24);
      float: left;
      ul {
        padding-top: 12px;
        padding-bottom: 12px;
        li {
          font-size: 16px;
          color: #222;
          line-height: 38px;
          margin-left: 20px;
          cursor: pointer;
          position: relative;
          i {
            float: right;
            margin-right: 17px;
            font-size: 24px;
          }
          &.active {
            color: #1ca7ec;
          }
          &:hover {
            color: #1ca7ec;
          }
        }
      }
    }
    .product-right {
      width: 480px;
      background: #fff;
      border: 1px solid #acacac;
      box-shadow: 0px 3px 24px 0px rgba(0, 0, 0, 0.24);
      float: left;
      margin-left: 5px;
      padding: 15px;
      ul {
        margin-bottom: 20px;
        li {
          line-height: normal;
          .product-title {
            color: #222;
            input {
              width: 30px;
              display: inline-block;
            }
          }
          .product-cont {
            margin-top: 20px;
            margin-bottom: 20px;
            .product-list {
              color: #dadada;
              cursor: pointer;
              border: 1px solid #dadada;
              margin-bottom: 10px;
              font-size: 16px;
              margin-right: 10px;
              padding: 4px 10px;
              display: inline-block;
              *display: inline;
              font-size: 1;
              &.active {
                color: #fff;
                border: 1px solid #1ca7ec;
                background: #1ca7ec;
              }
              &:hover {
                color: #fff;
                border: 1px solid #1ca7ec;
                background: #1ca7ec;
              }
            }
          }
          .product-inp {
            margin-top: 25px;
            input {
              width: 430px;
              height: 30px;
              padding-left: 10px;
              font-size: 14px;
            }
          }
          .product-btn {
            button {
              margin-left: 40px;
              margin-top: 18px;
              width: 350px;
              height: 45px;
              background: #1ca7ec;
              border: none;
              font-size: 18px;
              color: #fff;
              outline: none;
              cursor: pointer;
            }
          }
        }
      }
    }
  }
}

.product-items {
  width: 572px;
  height: 40px;
  border: #dadada 1px solid;
  position: relative;
  padding: 8px 30px 8px 14px;
  display: flex;
  cursor: pointer;
  overflow: hidden;
  .product-items-se {
    position: absolute;
    right: 10px;
    top: 10px;
  }
  .product-items-none {
    font-size: 14px;
    line-height: 28px;
    color: #999;
  }
  .product-item {
    height: 24px;
    line-height: 24px;
    padding: 0 8px;
    background: #dedede;
    border-radius: 4px;
    font-size: 12px;
    color: #666;
    margin-right: 4px;
  }
}
//选择产品底部遮罩
.prodect-mask {
  position: fixed;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  z-index: 9;
  opacity: 0;
}

.purchase-head {
  width: 100%;
  margin: 0 auto;
  background: #fff;
  position: relative;
}
.purchase-head-img {
  width: 100%;
}
.purchase-head-box {
  position: absolute;
  left: 21px;
  top: 40px;
}
.purchase-head-boxtit {
  font-size: 20px;
  font-weight: bold;
  color: #222222;
  margin-bottom: 20px;
}
.purchase-head-boxList {
  display: flex;
  align-items: center;
  margin-bottom: 21px;
}
.purchase-head-boxImg {
  width: 17px;
  height: 17px;
  margin-right: 8px;
}
.purchase-head-boxTxt {
  font-size: 16px;
  color: #555555;
}
</style>
