<template>
    <div class="container">
        <van-search
          :value="searchValue"
          placeholder="请输入搜索关键词"
          use-action-slot
          @change="handleSearchChange"
          bind:search="onSearch"
        >
          <view slot="action" @tap="handleSearch">搜索</view>
        </van-search>

        <div class="toptitle">
            请选择医院
        </div>
        <div class="conthos">
            <div class="hos"  v-for="(item,index) in list" :key="index">
                <div @tap="urldeplist(item.guid)">
                    <image src="../../static/images/serv2.jpg"/>
                    {{item.name}}
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return{
          list:[],
          searchValue:'',

      }
    },
    onShow(){
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:"http://192.168.2.27:8080/hi/main?hi=24987F6N2HPP",
        body:{}
        }).then(res =>{
        this.list=res.rows
        })
    },
    methods:{
        handleSearchChange (event) {
            this.searchValue= event.mp.detail
        },
        handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:"http://192.168.2.27:8080/hi/main?hi=24987F6N1WJ2",
          body:{name:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/searchospital2/main?name="+this.searchValue})
            }else{
              console.log('无结果')
            }
          })
        }
      },
        urldeplist(guid){
            wx.navigateTo({url: "/pages/hospitalupdate/main?guid="+guid})
        }
    }
}
</script>

<style>
    .container{
        width: 750rpx;
    }
    .toptitle{
        width: 100%;
        height: 40px;
        padding-left: 20px;
        font-size: 32rpx;
        line-height: 40px;
        background: white;
        margin-top: 20px;
        margin-bottom: 20px;
    }
    .hos{
        width: 250rpx;
        height: 250rpx;
        float: left;
        text-align: center;
        font-size: 32rpx;
    }
    .hos image{
        width: 80rpx;
        height: 80rpx;
        border-radius:50%;
        display: block;
        margin: 0 auto;
        margin-top: 40rpx;
        margin-bottom: 10rpx;
    }
</style>
