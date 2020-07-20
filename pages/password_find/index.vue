<template>
  <div class="login-container">
    <Header />

    <!-- 内容区域 start -->
    <div class="content-wrap">
      <div class="wrap content">
        <nuxt-child />
      </div>
    </div>
    <!-- 内容区域 end -->

    <Footer />
  </div>
</template>

<script>
import Header from "@/components/common/header";
import Footer from "@/components/common/footer";

export default {
  name: "Password_find",
  head() {
    return {
      title: "忘记密码"
    };
  },
  components: {
    Header,
    Footer
  }
};
</script>

<style lang="scss" scoped>
$color: #1ca7ec;
$bg-color: #f3f4f8;

// 内容区域
.content-wrap {
  background-color: $bg-color;
  overflow: hidden;

  .content {
    margin: 10px auto;
    background-color: #fff;
    padding: 120px 180px 116px;
    height: 673px;
  }
}
</style>
