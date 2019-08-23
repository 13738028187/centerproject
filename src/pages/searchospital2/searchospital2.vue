<template>
    <div class="container">
        <div class="container2">
                    <div v-for="(item,index) in hoslist" :key="index">
                        <div class="servlist" @tap="urlhospitaldetail(item.guid)">
                            <div class="listleft"><image src="../../static/images/logo4.jpg"/></div>
                            <div class="listright">
                                <span class="biao">{{item.name}}</span>
                                <span class="user">{{item.dateline}}</span>
                                <span class="nurse"></span>
                                <van-icon name="arrow" custom-class="chanicon"/>
                            </div>
                        </div>
                    </div>
                </div>
    </div>
</template>

<script>
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        hoslist:[],
        name:''
      }
    },
    onLoad(options){
        this.name=options.name
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.hospitalsearch,
        body:{name:this.name}
        }).then(res =>{
          console.log(res)
          this.hoslist=res.rows
          this.hoslist.forEach((item,index)=>{
          item.dateline=item.dateline.substring(0,16)
        })
        })
    },
    methods:{
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      },
      urlhospitaldetail(e){
            wx.navigateTo({url: "/pages/hospitalupdate/main?guid="+e,})
        }
    }
}
</script>

<style>

.container{
    width: 100%;

}
.container2{
    width: 100%;
}
.container3{
    width: 100%;
}
.servlist{
  width: 100%;
  height: 150rpx;
  background: white;
  padding: 0 2%;
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
  position: absolute;
  top: 20rpx;
  left: 20rpx;
  font-size: 37rpx;
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
.chanicon{
    position: absolute!important;
    top: 60rpx!important;
    right: 20rpx!important;
    float: ri!important;
}
.docheck{
    font-size: 30rpx;
    color: red;
    position: absolute!important;
    top: 58rpx!important;
    right: 60rpx!important;

}
.titleapl{
    margin-top: 5px;
    width: 100%;
    height: 50px;
    line-height: 50px;
    color: #8a979e;
    font-size: 10pt;
    padding-left: 10px;
}

.subut{
    width: 80%!important;
    height: 45px!important;
    margin: 50px auto!important;
    display: block!important;
    line-height: 45px!important;
}

.subut2{
    width: 600rpx;
    height: 100rpx;
    margin: 50px auto;
    display: block;
    line-height: 100rpx;
    font-size: 12pt;
}

</style>
