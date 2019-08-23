<template>
    <swiper :indicator-dots="true" :autoplay="true"
            :interval="5000" :duration="900" :circular="true">
      <div v-for="(item,index) in imgUrls" :key="index">
        <swiper-item>
          <image :src="item" class="slide-image"/>
        </swiper-item>
      </div>
    </swiper>
</template>
<script>
  export default {
    name:"SimpleSwiper",
    props: {
        images: {
          type: Array
      }
    },
    data() {
      return {
        imgUrls: [
          '/static/images/yuan1.jpg',
          '/static/images/yuan2.jpg',
          '/static/images/yuan3.jpg',
          ]
      }
    }
}
</script>
<style scoped>
  .slide-image {
    width: 100%;
    height: 100%;
  }
</style>