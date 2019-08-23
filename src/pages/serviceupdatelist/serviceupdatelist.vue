<template>
    <div class="container">
      <div v-for="(item,index) in readylist" :key="index">
        <van-row>
            <van-col span="16">
              <div class="left">{{item.name}}</div>
            </van-col>
            <van-col span="8">
              <div class="right">
                  
                  &nbsp;
                  <!-- <button class="cu-btn bg-red">删除</button> -->
                  <button class="cu-btn bg-green" @tap="urltoupdate(item.pid)" style="float:right;margin-top:6px;margin-right:10px">修改</button>
              </div>
            </van-col>
        </van-row>
      </div>
    </div>
</template>

<script>
export default {
    data () {
      return{
        pid:"",
        searchValue:'',
        active:1,
        readylist:[],
        nolist:[],
        newlist:[],
        name:''
      }
    },
    onLoad(options){
        this.guid=options.guid
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.servicelist,
        body:{guid:this.guid}
        }).then(res =>{
          console.log(res)
          this.readylist=res.rows
        })

    },
    methods:{
      urlorderapplication(e){
        wx.navigateTo({url: "/pages/serviceinformation/main?pid="+e,})
      },
      urlorderdetail(e){
        wx.navigateTo({url: "/pages/hoservicedetail/main?pid="+e,})
      },
      urltoupdate(e){
        wx.navigateTo({url: "/pages/serviceupdate/main?pid="+e,})
        console.log(e)
      }
    },
}
</script>
<style>
.left{
    height: 100rpx;
    width: 100%;
    line-height: 100rpx;
    font-size: 36rpx;
    padding-left: 25rpx;
    border-bottom: 1px solid #dddddd;
}
.right{
    height: 100rpx;
    width: 100%;
    line-height: 100rpx;
    border-bottom: 1px solid #dddddd;
}
</style>
