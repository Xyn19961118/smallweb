<template>
  <div class="main-body">
    <!-- 个人头像 -->
    <div class="head-portrait">
      <div class="headline">个人头像</div>
      <div class="portrait-box">
        <div class="portrait-boxImg">
          <img
            class="portrait-image"
            :src="ruleForm.header_image ? ruleForm.header_image : portraitImage"
            alt
          />
        </div>
        <div class="portrait-uploading">
          <div class="uploading-box">
            <button class="uploading-btn">选择文件</button>
            <input class="uploading-input" @change="add_img" accept="image/*" type="file" />
          </div>
          <div class="uploading-text">尺寸100*100像素</div>
        </div>
      </div>
    </div>

    <!-- 个人信息 -->
    <div class="news-portrait">
      <div class="headline">个人信息</div>
      <div class="myinfo-items">
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <el-form-item label="昵　　称" prop="nickname">
            <el-input v-model="ruleForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="真实姓名" prop="name">
            <el-input v-model="ruleForm.name"></el-input>
          </el-form-item>
          <el-form-item label="性　　别" prop="sex">
            <el-radio-group v-model="ruleForm.sex">
              <el-radio label="男"></el-radio>
              <el-radio label="女"></el-radio>
            </el-radio-group>
          </el-form-item>
          <el-form-item label="公司名称" prop="company">
            <el-input v-model="ruleForm.company"></el-input>
          </el-form-item>
          <el-form-item label="微　　信" prop="wx">
            <el-input v-model="ruleForm.wx"></el-input>
          </el-form-item>
          <el-form-item label="邮　　箱" prop="email">
            <el-input v-model="ruleForm.email"></el-input>
          </el-form-item>
          <el-form-item label="营业执照">
            <el-upload
              :action="$store.state.codeImgUrl+'qiniu/upimage'"
              name="image"
              list-type="picture-card"
              :on-preview="handlePictureCardPreview"
              :on-remove="handleRemove"
              :on-success="uploadSucc"
              :on-error="uploadError"
              :limit="1"
              :on-exceed="outOrange"
            >
              <i class="el-icon-plus"></i>
            </el-upload>
            <el-dialog :visible.sync="ruleForm.dialogVisible">
              <img width="100%" :src="ruleForm.licence_image" alt />
            </el-dialog>
          </el-form-item>

          <el-form-item label="备　　注" prop="desc">
            <el-input
              :rows="6"
              type="textarea"
              v-model="ruleForm.desc"
              maxlength="100"
              show-word-limit
            ></el-input>
          </el-form-item>
          <el-form-item>
            <div class="submit-button">
              <el-button type="primary" @click="submitForm('ruleForm')">确定并保存</el-button>
            </div>
          </el-form-item>
        </el-form>
      </div>
      <div class="other">
        <div class="other-title">说明</div>
        <div class="other-content">
          <p>1、请认真填写以上各项；</p>
          <p>2、“头像/LOGO”以个人照片或者能代表企业形象的标识为主，不符要求的图像将会被管理员删除；</p>
          <p>3、审核通过后以上信息不可修改。</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { getUserOne, changeUserOne } from "~/api/user";
import axios from "axios";
export default {
  name: "myinfo",
  data() {
    return {
      portraitImage: require("~/static/images/defaultImg.png"),
      isLoad:false,
      ruleForm: {
        header_image: "", //头像
        nickname: "", //昵称
        name: "", //真实姓名
        sex: "男", //性别
        company: "", //公司
        email: "",
        wx: "",
        desc: "", // 备注
        licence_image: "", //营业执照
        dialogVisible: false
      },
      rules: {
        nickname: [{ required: true, message: "请填写昵称", trigger: "blur" }],
        name: [
          { required: true, message: "请填写您的真实姓名", trigger: "blur" }
        ],
        wx: [{ required: true, message: "请填写您的微信", trigger: "blue" }],
        email: [
          { required: true, message: "请填写您的邮箱地址", trigger: "blue" },
          {
            type: "email",
            message: "请输入正确的邮箱地址",
            trigger: ["blur", "change"]
          }
        ]
      }
    };
  },
  async created() {
    let data = await getUserOne();
    if (data.status == "200") {
      // this.ruleForm = data.data;
      // console.log(data.data);
      this.ruleForm.header_image = data.data.header_image; //头像
      this.ruleForm.nickname = data.data.nickname; //昵称
      this.ruleForm.name = data.data.name; //真实姓名
      this.ruleForm.sex = data.data.sex; //性别
      this.ruleForm.wx = data.data.wx; //性别
      this.ruleForm.company = data.data.company; //公司
      this.ruleForm.email = data.data.email;
      this.ruleForm.desc = data.data.desc; // 备注
      this.ruleForm.licence_image = data.data.licence_image; //营业执照
    }
  },
  methods: {
    //   上传图片
    async add_img(event) {
      let formData = new FormData();
      let oFReader = new FileReader();
      let file = event.path[0].files[0];
      formData.append("image", file);
      let res = await axios.post(
        this.$store.state.codeImgUrl + "qiniu/upimage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data"
          }
        }
      );
      if (res.data.status == "2000") {
        this.ruleForm.header_image = res.data.data;
      }
    },

    //删除营业执照
    handleRemove(file, fileList) {
      console.log(file, fileList);
    },
    //查看大图
    handlePictureCardPreview(file) {
      this.ruleForm.licence_image = file.url;
      this.ruleForm.dialogVisible = true;
    },
    //超出上传范围
    outOrange() {
      this.$message.error("最多上传两张图片");
    },

    submitForm(formName) {
      this.$refs[formName].validate(async valid => {
        if (valid) {
          delete this.ruleForm.dialogVisible;
          let data = await changeUserOne(this.ruleForm);
          console.log(data);
          if (data.status == "200") {
            this.$message.success(data.msg);
            this.isLoad = true;
          } else {
            this.$message.error(data.msg);
          }
        } else {
          this.$message.error(data.msg);
          return false;
        }
      });
    },

    //营业执照上传成功
    uploadSucc(res, file) {
      this.ruleForm.licence_image = res.data;
      // console.log(res)
    },
    uploadError() {}
  },
  watch: {
    isLoad(){
      this.$router.go(0)
    }
  }
};
</script>

<style scoped>
.main-body {
  width: 740px;
  background: #ffffff;
  padding: 40px;
}

/* 个人头像 */
.headline {
  font-size: 14px;
  color: #343434;
  font-weight: bold;
  margin-bottom: 20px;
}

.head-portrait {
  margin-bottom: 40px;
}
.portrait-box {
  display: flex;
  align-items: center;
}
.portrait-boxImg {
  width: 100px;
  height: 100px;
  border-radius: 50px;
}
.portrait-image {
  width: 100px;
  height: 100px;
  border-radius: 50px;
  background: #d1d1d1;
}
.portrait-uploading {
  margin-left: 40px;
}
.uploading-box {
  position: relative;
  margin-bottom: 4px;
  cursor: pointer;
}
.uploading-btn {
  width: 66px;
  height: 22px;
  text-align: center;
  line-height: 22px;
  margin-bottom: 10px;
  background: #f3f4f8;
  color: #666;
  font-size: 12px;
  border: none;
  padding: 0;
  outline: none;
  cursor: pointer;
}
.uploading-input {
  width: 66px;
  height: 22px;
  position: absolute;
  left: 0;
  top: 0;
  opacity: 0;
  cursor: pointer;
  z-index: 10;
}
.uploading-text {
  font-size: 14px;
  color: #999999;
  cursor: pointer;
}
.other {
  margin-left: 100px;
}
.other-title {
  color: #ec0005;
}
.other-content {
  margin-top: 6px;
}
.other-content p {
  font-size: 12px;
  color: #9a9a9a;
  line-height: 24px;
}
</style>


<style lang="scss">
.myinfo-items {
  .el-button--primary {
    background: #5c80a4;
    border-color: #5c80a4;
  }
  .el-button--primary:focus,
  .el-button--primary:hover {
    background: #536e8a;
    border-color: #536e8a;
  }
  .el-radio__input.is-checked .el-radio__inner {
    border-color: #5c80a4;
    background: #5c80a4;
  }
  .el-radio__input.is-checked + .el-radio__label {
    color: #5c80a4;
  }
  .el-input.is-active .el-input__inner,
  .el-input__inner:focus {
    border-color: #5c80a4;
  }
  .el-input__inner {
    background: #f3f4f8;
    border-color: #f3f4f8;
  }
  .el-textarea__inner {
    background: #f3f4f8;
    border-color: #f3f4f8;
  }
  .el-textarea .el-input__count {
    background: #f3f4f8;
  }
  .submit-button {
    .el-button {
      width: 200px;
      height: 40px;
      border-radius: 0;
    }
  }
}
</style>
