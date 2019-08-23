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

      
      <van-tabs bind:change="onChange">

          <van-tab title="待审核">
                  <div class="container3">
                    <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower1">
                      <div v-for="(item1,index1) in nolist" :key="index1">  
                        <div class="servlist"  @tap="urlorderapplication(item1.sid)">
                            <div class="listleft"><image :src="item1.images"/></div>
                            <div class="listright">
                                <span class="biao">{{item1.name}} 的服务申请</span>
                                <span class="user" >待退款</span>
                                <!-- <span class="nurse" v-show="item1.complete==0">待处理</span>
                                <span class="nurse" v-show="item1.complete==1">未完成</span>
                                <span class="nurse" v-show="item1.complete==2">进行中</span>
                                <span class="nurse" v-show="item1.complete==3">已完成</span>
                                <span class="nurse" v-show="item1.complete==4">已领取</span>
                                <span class="nurse" v-show="item1.complete==5">待领取</span> -->
                                <span class="time">{{item1.time}}</span>
                                <span class="timeday">{{item1.date}}</span>
                            </div>
                        </div>
                      </div>
                    </scroll-view>
                  </div>
              </van-tab>


          <van-tab title="已退款">
            <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower2">
            <div v-for="(item,index) in readylist" :key="index">
              <div class="servlist" @tap="urlorderdetail(item.sid)">
                  <div class="listleft"><image :src="item.images" @tap="taskuser"/>
                  </div>
                  <div class="listright">
                    <span class="biao">{{item.name}} 的服务申请</span>
                    <span class="user">已退款</span>
                              <!-- <span class="nurse" v-show="item.complete==0">待处理</span>
                              <span class="nurse" v-show="item.complete==1">未完成</span>
                              <span class="nurse" v-show="item.complete==2">进行中</span>
                              <span class="nurse" v-show="item.complete==3">已完成</span>
                              <span class="nurse" v-show="item.complete==4">已领取</span>
                              <span class="nurse" v-show="item.complete==5">已派发</span> -->
                              <span class="time">{{item.time}}</span>
                              <span class="timeday">{{item.date}}</span>
                  </div>
              </div>
            </div>
            </scroll-view>
          </van-tab>

          <van-tab title="未退款">
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
        method:"post", 
        url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DQ3',
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
        method:"post", 
        url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DOL',
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
        method:"post", 
        url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DQ5',
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
    console.log('下拉')
    this.page1=0
    this.page2=0
    this.page3=0
    this.getList()
    wx.stopPullDownRefresh()
    },
    mounted () {        // 调用应用实例的方法获取全局数据
    this.getList()
    },
    
    methods: {
      getList(){
        this.$fly.request({
        method:"post", 
        url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DQ3',
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
        method:"post", 
        url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DOL',
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
        method:"post", 
        url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DQ5',
        body:{}
        }).then(res =>{   
        this.checknolist=res.rows
        console.log(this.checknolist)
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
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      }
      ,
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4IU4',
          body:{id:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/refundsearch/main?id="+this.searchValue})
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
            url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DOL',
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
            url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DQ3',
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
        lower3(){
            this.page3=this.page3+1
            this.$fly.request({
            method:"post", 
            url:'https://www.ty5m.com:8443/hi/main?hi=249SOD8D4DQ5',
            body:{page:this.page2}
            }).then(res =>{
            this.newreadylist=res.rows
            this.newreadylist.forEach((item,index)=>{
            item.dateline=item.dateline.substring(0,16)
            if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
            }else{
            }
            this.readylist.push(item)
            })
            })
        }, 
      taskuser(){
        mpvue.navigateTo({url:'../userpaitent/main'})
      },

      urlorderdetail(e){
        wx.navigateTo({url: "/pages/refunddetail/main?sid="+e,})
      },

      urlorderapplication(e){
        wx.navigateTo({url: "/pages/refundapplication/main?sid="+e,})
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