<template>
  <div class="broadcast-wrap">
    <div class="wrap exhibit">
      <div class="exhibit-title">展商直播厅</div>
      <div class="exhibit-desc">共有546个直播正在进行中</div>

      <div class="boradcast-content">
        <el-tabs v-model="activeName" type="type">
          <el-tab-pane label="展商直播厅" name="first">
            <div class="boradcast-content-top">
              <template v-for="(item, index) in [1, 2, 3]">
                <div class="pic" :key="index">
                  <img src="~static/images/live-pic01.jpg" alt="">
                </div>
              </template>
            </div>
            <div class="boradcast-content-bottom">
              <template v-for="(item, index) in [1, 2, 3, 4, 5, 6, 7, 8]">
                <div class="item" :key="index">
                  <div class="pic">
                    <img src="~static/images/live-pic01.jpg" alt="">
                    <el-button v-if="item === 1" class="handing" type="primary" size="mini">
                      <img src="~static/images/broadcast.png" alt="">直播中
                    </el-button>
                    <el-button v-else-if="item === 2" class="soon" type="primary" size="mini">即将直播</el-button>
                    <el-button v-else-if="item === 3" class="playback" type="primary" size="mini">直播回放</el-button>
                  </div>
                  <div class="main">
                    <h5>
                      <img src="~static/images/live-pic01.jpg" alt="">温州海赛普进出口有限公司
                    </h5>
                    <p>
                      所属展区：
                      <span class="blue">防护耗资设备</span>
                    </p>
                    <p>
                      开始时间：
                      <span>2020-6-19 9:30</span>
                    </p>
                  </div>
                </div>
              </template>
            </div>
          </el-tab-pane>
          <el-tab-pane label="即将直播" name="second">配置管理</el-tab-pane>
          <el-tab-pane label="直播回放" name="third">角色管理</el-tab-pane>
        </el-tabs>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'LiveBroadcast',
  data() {
    return {
      activeName: 'first'
    }
  }
}
</script>

<style lang="scss" scoped>
.broadcast-wrap {
  width: 100%;
  min-width: 1200px;
  background: #f8f8f8;
  overflow: hidden;

  .exhibit {
    padding: 70px 0 36px;
    .exhibit-title {
      text-align: center;
      font-size: 30px;
      color: #000;
    }
    .exhibit-desc {
      text-align: center;
      font-size: 24px;
      color: #999;
      margin-top: 20px;
    }
  }

  .boradcast-content {
    padding: 60px 0 0;

    /deep/ .el-tabs__header {
      margin-bottom: 50px;

      .el-tabs__nav-wrap {
        &::after {
          content: none;
        }

        .el-tabs__nav {
          float: none;
          text-align: center;
        }

        .el-tabs__item {
          font-size: 24px;
          color: #000;
          height: 48px;
          line-height: 48px;
          padding: 0;
          margin: 0 80px;

          &.is-active {
            color: #1CA7EC;
            border-bottom: 3px solid #1CA7EC;
          }
        }
      }
    }

    &-top {
      display: flex;
      margin-bottom: 40px;

      .pic {
        width: 384px;
        height: 218px;
        margin-right: 24px;
        cursor: pointer;

        &:nth-child(3n) {
          margin-right: 0;
        }

        img {
          width: 100%;
          height: 100%;
          object-fit: cover;
        }
      }
    }

    &-bottom {
      display: flex;
      flex-wrap: wrap;

      .item {
        width: 288px;
        height: 262px;
        margin-right: 16px;
        margin-bottom: 30px;
        cursor: pointer;

        &:nth-child(4n) {
          margin-right: 0;
        }

        .pic {
          width: 100%;
          height: 162px;
          position: relative;

          > img {
            width: 100%;
            height: 100%;
            object-fit: cover;
          }

          .el-button {
            position: absolute;
            top: 7px;
            right: 10px;
            padding: 0 9px;
            line-height: 26px;
            height: 26px;

            img {
              width: 12px;
              display: inline-block;
              margin-right: 4px;
              vertical-align: text-top;
            }

            &.handing{
              background-color: #1CA7EC;
              border-color: #1CA7EC;
            }

            &.soon{
              background-color: #797EF6;
              border-color: #797EF6;
            }

            &.playback{
              background-color: #2D356A;
              border-color: #2D356A;
            }
          }
        }

        .main {
          height: 100px;
          background-color: #fff;
          padding: 10px 15px;

          h5 {
            font-size: 16px;
            color: #000000;
            line-height: 28px;
            font-weight: normal;

            img {
              width: 28px;
              height: 28px;
              border-radius: 50%;
              display: inline-block;
              margin-right: 11px;
              vertical-align: top;
            }
          }

          p {
            font-size: 14px;
            color: #999999;
            margin-top: 10px;

            span {
              color: #333;

              &.blue {
                color: #1CA7EC;
              }
            }
          }
        }
      }
    }
  }
}
</style>
