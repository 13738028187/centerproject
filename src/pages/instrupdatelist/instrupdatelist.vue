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
                    <!-- <button class="cu-btn bg-red" @tap="deleteinstru(item.mid)">删除</button> -->
                    <button class="cu-btn bg-green" @tap="instrudetail(item.mid)" style="float:right;margin-top:6px;margin-right:10px">修改</button>
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
        console.log(this.guid)
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.instrulist,
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
      instrudetail(e){
          wx.navigateTo({url: "/pages/instrupdate/main?mid="+e,})
      },
    //   deleteinstru(e){
    //     this.$fly.request({
    //     method:"post", //post/get 已审核请求
    //     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N20FI",
    //     body:{mid:e}
    //     }).then(res =>{

    //     })
    //   }
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
