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

        <div class="toptitle">相关服务</div>
        <div class="hoscheck">
          <div class="conin">
            <image src="../../static/images/serv1.png" @tap="urlhospital"/>
            医院申请
          </div>
          <div class="conin">
            <image src="../../static/images/serv2.png" @tap="urlnursepanel"/>
            护士查询
          </div>
          <div class="conin">
            <image src="../../static/images/serv3.png" @tap="urlserv"/>
            用户信息
          </div>
          <div class="conin">
            <image src="../../static/images/serv4.png" @tap="urlservrew"/>
            服务查询
          </div>
        </div>

        <div class="toptitle">服务申请</div>

        <van-tabs bind:change="onChange">

          <van-tab title="待审核">
                  <div class="container3">
                    <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower1">
                      <div v-for="(item1,index1) in nolist" :key="index1">  
                        <div class="servlist"  @tap="urlorderapplication(item1.sid)">
                            <div class="listleft"><image :src="item1.images"/></div>
                            <div class="listright">
                                <span class="biao">{{item1.name}} 的服务申请</span>
                                <span class="user" v-show="item1.pass==1" style="color:red">未通过</span>
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
                                <span class="nurse" v-show="item1.complete==5">待领取</span>
                                <span class="time">{{item1.time}}</span>
                                <span class="timeday">{{item1.date}}</span>
                            </div>
                        </div>
                      </div>
                    </scroll-view>
                  </div>
              </van-tab>


          <van-tab title="已审核">
            <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower2">
            <div v-for="(item,index) in readylist" :key="index">
              <div class="servlist" @tap="urlorderdetail(item.sid)">
                  <div class="listleft"><image :src="item.images" @tap="taskuser"/>
                  </div>
                  <div class="listright">
                    <span class="biao">{{item.name}} 的服务申请</span>
                    <span class="user" v-show="item.pass==1" style="color:red">未通过</span>
                              <span class="user" v-show="item.pass==0">审核中</span>
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
                              <span class="nurse" v-show="item.complete==5">已派发</span>
                              <span class="nurse" v-show="item.complete==6">已拒绝</span>
                              <span class="time">{{item.time}}</span>
                              <span class="timeday">{{item.date}}</span>
                    <span></span>
                  </div>
              </div>
            </div>
            </scroll-view>
          </van-tab>

          <van-tab title="未通过">
            <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower3">
            <div v-for="(item,index) in checknolist" :key="index">
              <div class="servlist" @tap="urlorderdetail(item.sid)">
                  <div class="listleft"><image :src="item.images" @tap="taskuser"/>
                  </div>
                  <div class="listright">
                    <span class="biao">{{item.name}} 的服务申请</span>
                    <span class="user" style="color:red">未通过</span>
                              <span class="time">{{item.time}}</span>
                              <span class="timeday">{{item.date}}</span>
                    <span></span>
                  </div>
              </div>
            </div>
            </scroll-view>
          </van-tab>

          </van-tabs>

          

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
        newnolist:[],
        newreadylist:[],
        newlist:[],
        checknolist:[],
        page1:0,
        page2:0,
        page3:0
      }
    },
    onLoad(){
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

        this.$fly.request({
        method:"post", //post/get 未审核请求
        url:this.$http.state.orderchecknolist,
        body:{}
        }).then(res =>{   
        this.checknolist=res.rows
        this.checknolist.forEach((item,index)=>{
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
    async onPullDownRefresh () {
    this.page1=0
    this.page2=0
    this.page3=0
    this.getList()
    wx.stopPullDownRefresh()
    },
    mounted () {        // 调用应用实例的方法获取全局数据
    this.getList()
    },
    methods:{
      getList(){
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

        this.$fly.request({
        method:"post", //post/get 未审核请求
        url:this.$http.state.orderchecknolist,
        body:{}
        }).then(res =>{   
        this.checknolist=res.rows
        this.checknolist.forEach((item,index)=>{
          item.time=item.dateline.substring(10,16)
          item.date=item.dateline.substring(0,10)
          if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
            }else{
            }
          })
        })


      }
      ,
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      }
      ,
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", 
          url:this.$http.state.ordersearch,
          body:{id:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/findorders/main?id="+this.searchValue+"&page=0"})
            }else{
              wx.showModal({
                title: '提示',
                content: '未查询到订单',
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
              })

            }
          })
        }
      },
      lower1(){
            this.page1=this.page1+1
            this.$fly.request({
            method:"post", 
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
            this.readylist.push(item)
            })
            })
        },
        lower3(){
            this.page3=this.page3+1
            this.$fly.request({
            method:"post", 
            url:this.$http.state.orderchecknolist,
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
            this.readylist.push(item)
            })
            })
        },
      urlnursepanel(){
            wx.navigateTo({url: "/pages/nurseapplicationlist/main"})
        },
      urlhospital(){
            wx.navigateTo({url: "/pages/hospitallist/main?page=0"})
        },
        urlserv(){
            wx.navigateTo({url: "/pages/userlist/main"})
        },
        urlorderdetail(e){
        wx.navigateTo({url: "/pages/orderdetail/main?sid="+e,})
      },
      urlorderapplication(e){
        wx.navigateTo({url: "/pages/orderapplication/main?sid="+e,})
      },
        urlservrew(){
            wx.navigateTo({url: "/pages/servicereview/main"})
        }
    },
}
</script>

<style>
.container{
    width: 750rpx;
    background: white;
}
.toptitle{
    width: 100%;
    height: 50px;
    padding-left: 20px;
    font-size: 32rpx;
    line-height: 50px;
    background: #F2F3F5;
    color:#8A979E;
    margin-top: 15px;
}

.hoscheck{
  width: 100%;
  height: 100px;
}

.hoscheck .conin{
  width:187rpx;
  height: 100px;
  float: left;
  text-align: center;
  font-size: 32rpx;
}

.hoscheck .conin image{
  width: 55px;
  height: 55px;

  margin-top: 38rpx;
  margin-bottom: 15rpx;
  display: block;
  margin-left: 43rpx;
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
  font-size: 30rpx;
}
.servlist .listright .nurse{
  position: absolute;
  top: 90rpx;
  left: 150rpx;
  font-size: 30rpx;
}
.servlist .listright .time{
  position:absolute;
  right: 20rpx;
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
