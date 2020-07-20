<template>
  <div class>
    <Header />
    <!-- <div class="banner">
      <img src="~static/images/help-banner.png" alt />
    </div>
    <div class="wrap help">
      <div class="help-title">{{dataObj.name}}</div>
      <div class="help-content" v-html="dataObj.newscontent"></div>
    </div>-->

    <div class="main-picture">
      <img src="~static/images/helpCenter/01.jpg" alt />
      <img src="~static/images/helpCenter/02.jpg" alt />
      <img src="~static/images/helpCenter/03.jpg" alt />
      <img src="~static/images/helpCenter/04.jpg" alt />
      <img src="~static/images/helpCenter/05.jpg" alt />
      <img src="~static/images/helpCenter/06.jpg" alt />
      <img src="~static/images/helpCenter/07.jpg" alt />
      <img src="~static/images/helpCenter/08.jpg" alt />
      <img src="~static/images/helpCenter/09.jpg" alt />
    </div>

    <Footer />
  </div>
</template>

<script>
import Header from '~/components/common/header'
import Footer from '~/components/common/footer'
import { getNewsData } from '~/api/index'

export default {
  name: 'HelpCenter',
  components: {
    Header,
    Footer
  },
  // async created() {
  // let id = this.$route.params.id;
  // let data = await getNewsData(id);
  // this.dataObj=data.data
  // },
  data () {
    return {
      dataObj: {
        name: '如何注册会员？',
        newscontent: '<p>问：怎么注册成为食品加工包装在线的会员？要付费吗？</p><p>问：怎么注册成为食品加工包装在线的会员？要付费吗？</p>'
      }
    }
  }
}
</script>
<style lang='scss' scoped>
.banner {
  width: 78.125%;
  margin: auto;
  min-width: 1200px;
  img {
    display: block;
    width: 100%;
  }
}

.help {
  padding: 70px 0;
  .help-title {
    font-size: 24px;
    color: #1ca7ec;
    font-weight: bold;
  }
  .help-content {
    margin-top: 70px;
    font-size: 16px;
    color: #666;
    line-height: 1.8;
  }
}

.main-picture {
  img {
    width: 100%;
  }
}
</style>
