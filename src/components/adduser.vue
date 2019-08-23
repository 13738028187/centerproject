
<!--

  病人信息录入

-->

<template>
  <div>
    <Upload width="120rpx" height="120rpx" max="6"  type="getidimg" @choosed="choosed" @delete="" @getidimg="setidimg" />
  </div>
</template>

<script>
  import Upload from '@/components/uploadimg'
  export default {
    data(){
      return{
        $arr:[]
      }
    },
    components:{Upload},
    methods:{

    }

  }
</script>

<style>
</style>
