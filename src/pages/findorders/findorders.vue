<template>
        <container>
          <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower1">
            <div v-for="(item,index) in readylist" :key="index">
              <div class="servlist" @tap="item.pass==0?urlorderapplication(item.sid):urlorderdetail(item.sid)">
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
                    <span class="time">{{item.time}}</span>
                    <span class="timeday">{{item.date}}</span>
                    <span></span>
                  </div>
              </div>
            </div>
          </scroll-view>
        </container>
</template>
<script>
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        readylist:[],
        nolist:[],
        id:'',
        newnolist:[],
        newreadylist:[],
        newlist:[],
        page:0
      }
    },
    onLoad(options){
        this.id=options.id
        this.page
        this.$fly.request({
        method:"post", 
        url:this.$http.state.ordersearch,
        body:{id:this.id,page:this.page}
        }).then(res =>{
          this.readylist=res.rows
          this.readylist.forEach((item,index)=>{
          item.time=item.dateline.substring(10,16)
          item.date=item.dateline.substring(0,10)
          if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
                console.log(item.complete)
            }else{
            }
        })
        })
    },
    methods:{
        urlorderdetail(e){
        wx.navigateTo({url: "/pages/orderdetail/main?sid="+e,})
      },
       urlorderapplication(e){
        wx.navigateTo({url: "/pages/orderapplication/main?sid="+e,})
      },
     lower1(){
            this.page=this.page+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:"http://192.168.2.27:8080/hi/main?hi=24987F6N10NF",
            body:{page:this.page}
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
        }
    }
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
  font-size: 35rpx;
}

.hoscheck .conin image{
  width: 50px;
  height: 50px;
  border-radius:50%;
  margin-top: 38rpx;
  margin-bottom: 15rpx;
  display: block;
  margin-left: 43rpx;
}

.servlist{
  width: 100%;
  height: 150rpx;
  background: white
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