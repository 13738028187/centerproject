<template>
  <div class="contain">
    <scroll-view scroll-x class="top">
      <div class="tabbar" :class="{'tabbar-bottom':currentTab==index}" v-for="(item,index) in tabBar" :key="index" @click="clickTab(index)">
        {{item.title}}
      </div>
    </scroll-view>
    <swiper :current="currentTab" @change="changeTab">
      <swiper-item>
        <div>
          111
        </div>
      </swiper-item>
      <swiper-item>
        <div>
          222
        </div>
      </swiper-item>
      <swiper-item>
        <div>
          333
        </div>
      </swiper-item>
    </swiper>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        tabBar: [
          { 'title': '本周最热' },
          { 'title': '好评排行' },
          { 'title': '借阅排行' }
        ],
        currentTab: 0
      }
    },
    methods: {
      clickTab (e) {
        this.currentTab = e
      },
      changeTab (e) {
        this.currentTab = e.mp.detail.current
      }
    }
  }
</script>

<style>
  .top {
    width: 100%;
    text-align: center;
    line-height: 42px;
    white-space: nowrap;
    position: relative;
    background: #fff;
  }
  .tabbar {
    width: 120px;
    font-size: 18px;
    height: 42px;
    display: inline-block;
    color: #000;
  }

  .tabbar-bottom {
    color: #2196f3;
    border-bottom: 2px solid #2196f3;
  }
</style>
