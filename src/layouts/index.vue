<!-- eslint-disable vue/max-attributes-per-line -->
<template>
  <div class="homepage-container">
    <!-- <a-spin v-if="loading" tip="读取中" class="editor-spinner"> </a-spin> -->
    <a-layout :style="{ background: '#fff' }">
      <a-layout-header class="header" :class="{ 'transparent-header': isShowFooter }">
        <div class="page-title">
          <router-link to="/">
            <img alt="Vue logo" src="../assets/logo2.png" class="logo-img" />
          </router-link>
        </div>
        <div class="right-col">
          <!-- <user-profile :user="userInfo"></user-profile> -->
        </div>
      </a-layout-header>
      <a-layout-content class="home-layout">
        <router-view></router-view>
      </a-layout-content>
      <a-layout-footer v-if="isShowFooter">
        <div>
          <div class="footer-info">
            <a-row :gutter="16">
              <a-col :span="6" class="feature-item">
                <h3>慕课乐高</h3>
                <ul>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">购买课程</a>
                  </li>
                  <li><a href="https://imooc-lego.github.io/" target="_blank">作业和打卡</a></li>
                  <li><a href="https://github.com/imooc-lego" target="_blank">开源仓库</a></li>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">帮助</a>
                  </li>
                </ul>
              </a-col>
              <a-col :span="6" class="feature-item">
                <h3>设计制作帮助</h3>
                <ul>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">购买课程</a>
                  </li>
                  <li><a href="https://imooc-lego.github.io/" target="_blank">作业和打卡</a></li>
                  <li><a href="https://github.com/imooc-lego" target="_blank">开源仓库</a></li>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">帮助</a>
                  </li>
                </ul>
              </a-col>
              <a-col :span="6" class="feature-item">
                <h3>审核问题</h3>
                <ul>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">购买课程</a>
                  </li>
                  <li><a href="https://imooc-lego.github.io/" target="_blank">作业和打卡</a></li>
                  <li><a href="https://github.com/imooc-lego" target="_blank">开源仓库</a></li>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">帮助</a>
                  </li>
                </ul>
              </a-col>
              <a-col :span="6" class="feature-item">
                <h3>联系我们</h3>
                <ul>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">购买课程</a>
                  </li>
                  <li><a href="https://imooc-lego.github.io/" target="_blank">作业和打卡</a></li>
                  <li><a href="https://github.com/imooc-lego" target="_blank">开源仓库</a></li>
                  <li>
                    <a href="https://class.imooc.com/sale/fearchitect" target="_blank">帮助</a>
                  </li>
                </ul>
              </a-col>
            </a-row>
          </div>
          <ul class="list-inline" :class="{ 'extra-margin': isShowFooter }">
            <li class="list-inline-item">
              © 慕课网（imooc.com）版权所有
              <a href="https://beian.miit.gov.cn/#/Integrated/index" target="_blank"
                >津ICP备20000929号-2</a
              >
            </li>
            <li class="list-inline-item">
              <a href="https://class.imooc.com/sale/fearchitect" target="_blank">购买课程</a>
            </li>
            <li class="list-inline-item">
              <a href="https://imooc-lego.github.io/" target="_blank">作业和打卡</a>
            </li>
            <li class="list-inline-item">
              <a href="https://github.com/imooc-lego" target="_blank">开源仓库</a>
            </li>
            <li class="list-inline-item"><a href="#" target="_blank">帮助</a></li>
          </ul>
        </div>
      </a-layout-footer>
    </a-layout>
  </div>
</template>

<script lang="ts">
import { defineComponent, watch, ref } from 'vue'
import { useRoute } from 'vue-router'
export default defineComponent({
  name: 'LayoutIndex',
  components: {},
  setup() {
    const route = useRoute()
    const isShowFooter = ref(false)
    watch(
      () => route.meta.withFooter,
      () => {
        isShowFooter.value = route.meta.withFooter as boolean
      },
      {
        deep: true
      }
    )
    return {
      isShowFooter
    }
  }
})
</script>

<style scoped>
.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.ant-layout-header {
  z-index: 50;
  box-shadow: 0 10px 15px rgba(0, 0, 0, 0.1);
}
.transparent-header {
  background-color: rgba(0, 0, 0, 0.5);
}
.home-layout {
  position: relative;
}
.editor-spinner {
  position: fixed;
  right: 50%;
  top: 10px;
  z-index: 100;
}
.header .logo-img {
  height: 35px;
}
.header .ant-input-search {
  width: 250px;
}
.right-col > * {
  margin-left: 30px !important;
}
.banner {
  display: flex;
  position: relative;
  height: 192px;
  width: 100%;
  overflow: hidden;
  border-radius: 10px;
}
.banner img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}
.banner-text {
  position: absolute;
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-sizing: border-box;
}
.text-headline {
  text-shadow: 0 0 1px rgba(68, 92, 116, 0.02), 0 2px 8px rgba(57, 76, 96, 0.15);
  font-size: 3rem;
}
.text-link {
  color: #ffffff;
}
.text-link:hover {
  color: #ffffff;
  text-decoration: underline;
}
.poster-item {
  position: relative;
  margin-bottom: 20px;
}
.list-inline {
  list-style: none;
  display: flex;
  justify-content: center;
  padding: 0;
  margin: 0;
  padding-top: 24px;
  border-top: 1px solid #4d4d4d;
}
.list-inline li {
  margin-right: 20px;
}
.extra-margin {
  margin-top: 70px;
}
.ant-layout-footer {
  background: #333;
  color: #999;
}
.footer-info {
  max-width: 1200px;
  margin: 0 auto;
}
.footer-info .feature-item {
  text-align: left;
}
.footer-info .feature-item h3 {
  color: #fff;
  font-size: 19px;
}
.footer-info .feature-item ul {
  list-style-type: none;
  padding: 0;
  margin: 0;
}
.footer-info .feature-item li {
  height: 35px;
  line-height: 35px;
}
.footer-info .feature-item a {
  color: #999;
}
</style>
