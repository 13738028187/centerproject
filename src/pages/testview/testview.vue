<template>
    <div class="container">
       <scroll-view scroll-y style="height: 200px;">

       </scroll-view>

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
        newlist:[]
      }
    },
    onLoad(){
        
    },
    methods:{
      
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
