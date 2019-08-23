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

      <van-tabs  bind:change="onChange">
        <van-tab title="已申请">

          <div v-for="(item,index) in readylist" :key="index">
            <div class="servlist" @tap="urlorderdetail(item.sid)">
                <div class="listleft"><image :src="item.images" @tap="taskuser"/></div>
                <div class="listright">
                  <span class="biao">{{item.name}} 的服务申请</span>
                  <span class="user" v-show="item.pass==0">审核中</span>
                  <span class="user" v-show="item.pass==1" style="color:red">未通过</span>
                  <span class="user" v-show="item.pass==2">取消中</span>
                  <span class="user" v-show="item.pass==3">进行中</span>
                  <span class="user" v-show="item.pass==4">待评价</span>
                  <span class="user" v-show="item.pass==5">已完成</span>
                  <span class="user" v-show="item.pass==6">已审核</span>
                  <span class="user" v-show="item.pass==7">已审核</span>
                  <span class="nurse" v-show="item.complete==0">待处理</span>
                  <span class="nurse" v-show="item.complete==1">未完成</span>
                  <span class="nurse" v-show="item.complete==2">进行中</span>
                  <span class="nurse" v-show="item.complete==3">已完成</span>
                  <span class="nurse" v-show="item.complete==4">已领取</span>
                  <span class="time">{{item.time}}</span>
                  <span class="timeday">{{item.date}}</span>
                </div>
            </div>
          </div>
        </van-tab>

        <van-tab title="待审核">
                <div class="container3">
                  <div v-for="(item1,index1) in nolist" :key="index1">  
                    <div class="servlist"  @tap="urlorderapplication(item1.sid)">
                        <div class="listleft"><image :src="item1.images"/></div>
                        <div class="listright">
                            <span class="biao">{{item1.name}} 的服务申请</span>
                            <span class="user" v-show="item1.pass==0">审核中</span>
                            <span class="user" v-show="item1.pass==2">取消中</span>
                            <span class="user" v-show="item1.pass==3">进行中</span>
                            <span class="user" v-show="item1.pass==4">待评价</span>
                            <span class="user" v-show="item1.pass==5">已完成</span>
                            <span class="user" v-show="item1.pass==6">已审核</span>
                            <span class="user" v-show="item1.pass==7">已审核</span>
                            <span class="nurse" v-show="item1.complete==0">待处理</span>
                            <span class="nurse" v-show="item1.complete==1">未完成</span>
                            <span class="nurse" v-show="item1.complete==2">进行中</span>
                            <span class="nurse" v-show="item1.complete==3">已完成</span>
                            <span class="nurse" v-show="item1.complete==4">已领取</span>
                            <span class="time">{{item1.time}}</span>
                            <span class="timeday">{{item1.date}}</span>
                        </div>
                    </div>
                  </div>  
                    
                </div>
            </van-tab>
      </van-tabs>
    </div>

</template>

<script>
  export default {
    data () {
      return{
          active: 1 ,
          readylist:[],
          nolist:[],
          newreadylist:[],
          newnolist:[],
          page1:0,
          page2:0,
          searchValue:''
      }
    },
    onLoad(){
        this.page1=0;
        this.page2=0;
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.orderreadylist,
        body:{}
        }).then(res =>{
          this.readylist=res.rows
          this.readylist.forEach((item,index)=>{
          item.time=item.dateline.substring(10,16)
          item.date=item.dateline.substring(0,10)
          if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
            }else{
            }
          })
        })

        this.$fly.request({
        method:"post", //post/get 未审核请求
        url:this.$http.state.ordernolist,
        body:{}
        }).then(res =>{
        this.nolist=res.rows
        this.nolist.forEach((item,index)=>{
          item.time=item.dateline.substring(10,16)
          item.date=item.dateline.substring(0,10)
          if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
            }else{
            }
          })
        })
    },
    methods: {
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      }
      ,
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:this.$http.state.ordersearch,
          body:{id:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/findorders/main?id="+this.searchValue})
            }else{
              console.log('无结果')
            }
            
          })
          
        }
      },
      lower1(){
            this.page1=this.page1+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.ordernolist,
            body:{page:this.page1}
            }).then(res =>{
            this.newnolist=res.rows
            this.newnolist.forEach((item,index)=>{
            item.time=item.dateline.substring(10,16)
            item.date=item.dateline.substring(0,10)
            if(item.images!=null&&item.images!=''){
                  item.images=JSON.parse(item.images)
                  item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
              }else{
              }
            this.nolist.push(item)
            })
            })
        },

      lower2(){
            this.page2=this.page2+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.orderreadylist,
            body:{page:this.page2}
            }).then(res =>{
            this.newreadylist=res.rows
            this.newreadylist.forEach((item,index)=>{
            item.time=item.dateline.substring(10,16)
            item.date=item.dateline.substring(0,10)
            if(item.images!=null&&item.images!=''){
                  item.images=JSON.parse(item.images)
                  item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
              }else{
              }
            this.nolist.push(item)
            })
            })
        },  
      taskuser(){
        mpvue.navigateTo({url:'../userpaitent/main'})
      },

      urlorderdetail(e){
        wx.navigateTo({url: "/pages/orderdetail/main?sid="+e,})
      },

      urlorderapplication(e){
        wx.navigateTo({url: "/pages/orderapplication/main?sid="+e,})
      },

      onChange(event) {
            wx.showToast({
                title: `切换到标签 ${event.detail.index + 1}`,
                icon: 'none'
            });
        }
    }
  }
</script>

<style scoped>
.container{
  width: 750rpx;
  background: white;
  
}
.servlist{
  width: 100%;
  height: 150rpx;
}
.servlist .listleft{
  width: 20%;
  height: 150rpx;
  float: left;
  text-align: center;
}
.servlist .listleft image{
  width: 110rpx;
  height: 100rpx;
  border-radius: 50%;
  margin-top: 30rpx;
}
.servlist .listright{
  width: 80%;
  height: 150rpx;
  border-bottom: 1rpx #dddddd solid;
  float: left;
  position: relative;
}
.servlist .listright .biao{
  font-family: "微软雅黑";
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 11pt;
}
.servlist .listright .user{
  position: absolute;
  top: 90rpx;
  left: 20rpx;
  font-size: 9pt;
}
.servlist .listright .nurse{
  position: absolute;
  top: 90rpx;
  left: 150rpx;
  font-size: 9pt;
}
.servlist .listright .time{
  position:absolute;
  right: 25rpx;
  top: 30rpx;
  font-size: 30rpx;
}
.servlist .listright .timeday{
  position:absolute;
  right: 20rpx;
  top: 90rpx;
  font-size: 30rpx;
}
.chanicon{
    position: absolute!important;
    top: 60rpx!important;
    right: 20rpx!important;
}
.docheck{
    font-size: 30rpx;
    color: red;
    position: absolute!important;
    top: 58rpx!important;
    right: 60rpx!important;

}
.static{
  font-size: 30rpx;
  color: #1989fa;
  position: absolute;
  top: 55rpx;
  right: 130rpx;
}

</style>