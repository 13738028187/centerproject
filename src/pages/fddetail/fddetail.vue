<template>
    <div class="container">
        <div class="cu-form-group">
                    <div class="title">反馈图片</div>
                    </div>
                    <scroll-view scroll-x="true" style=" white-space: nowrap; display: flex;background:white" >
                        <view style="display: inline-block">
                            <image v-for="(item,index) in imgroutes" :key="index" :src="item" style="width:250rpx;height:200rpx;margin-left:10rpx;margin-bottom:10rpx;margin-top:10rpx"></image>
                        </view>
                    </scroll-view>
        <van-cell title="用户姓名" :value="nurse.username"/>
        <van-cell title="医院名称" :value="nurse.hosname"/>
        <van-cell title="护士名称" :value="nurse.nursename"/>
        <van-cell title="服务态度" :value="nurse.attitude"/>
        <van-cell title="专业技术" :value="nurse.skills"/>
        <van-cell title="亲和力" :value="nurse.affinity"/>
        <van-cell title="反馈时间" :value="nurse.dateline"/>
        <van-cell title="反馈内容" :label="nurse.content"/>   
        
    </div>
</template>

<script>
export default {
    data () {
      return{
          index:null,
           id:'',
           nurse:{},
           zw:[],
           zc:[],
           zwname:[],
           zcname:[],
           message:'',
           zwchange:'',
           zcchange:'',
           zwchangevalue:'',
           zcchangevalue:'',
           images:[],
           imgroutes:[],
           searchValue:''
      }
    },
    onLoad(options){
        this.images=[]
        this.imgroutes=[]
        
        this.id=options.id
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.fbdetail,
        body:{id:this.id}
        }).then(res=>{
            this.nurse=res.rows[0]
            if(res.rows[0].image){
                this.images=JSON.parse(res.rows[0].image)
            }
            if(this.images){
                this.images.forEach((item,index)=>{
                this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
            })
            }
            this.nurse.dateline=this.nurse.dateline.substr(0,16)
        })
    },
    methods:{
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
              wx.navigateTo({url: "/pages/findorders/main?id="+this.searchValue+"&page=0"})
            }else{
              console.log('无结果')
            }
            
          })
          
        }
      },
       PickerChange(e) {
        this.zwchange=e.mp.detail.value
        this.zwchangevalue=this.zwname[this.zwchange]
        this.zw.forEach((item,index)=>{
            if(this.zwchangevalue==item.name){
                this.zwchangevalue=item.value
            }
        })
       
    },
        urldeplist(guid){
            var url = "../deplist/main"
            wx.navigateTo({url: "/pages/deplist/main?guid="+guid,})
        },
        handleSearchChange (event) {
            this.searchValue= event.mp.detail
        },
        handleSearch () {
            console.log(this.searchValue)
            },
        nameChange(event){
            this.nurse.name= event.mp.detail
        },
        usernameChange(event){
            this.nurse.username= event.mp.detail
        },
        sexChange(event){
            this.nurse.sex= event.mp.detail
        },
        idcardChange(event){
            this.nurse.idcard= event.mp.detail
        },
        mobileChange(event){
            this.nurse.mobile= event.mp.detail
        },
        openidChange(event){
            this.nurse.openid= event.mp.detail
        },
        jobnumberChange(event){
            this.nurse.jobnumber= event.mp.detail
        },
        addressChange(event){
            this.nurse.address=event.mp.detail
        },
        instructionChange(event){
            this.nurse.instruction=event.mp.detail
        },
        mobileChange(event){
            this.nurse.mobile=event.mp.detail
        }
        


    }
}
</script>

<style>
    .container{
        width: 750rpx;
    }
  
    .container .headimage{  
    width: 750rpx;
    text-align: center;
    font-size: 32rpx;
    background: white;
    padding-top: 80rpx;
    padding-bottom: 60rpx;
}

.userimgs{
    width: 120rpx;
    height: 120rpx;
    display:block;
    margin: 15rpx auto;
    border-radius: 50%;
}

.subut2{
    width: 600rpx;
    height: 100rpx;
    margin: 50px auto;
    display: block;
    line-height: 100rpx;
    font-size: 12pt;
}
.sub1{
  width: 200rpx;
  height: 80rpx;
  font-size: 35rpx;
  float: left;
  margin-left: 120rpx;
  margin-top: 50px;
  margin-bottom: 50px;
}
.sub2{
  width: 200rpx;
  height: 80rpx;
  font-size: 35rpx;
  float: left;
  margin-left: 120rpx;
  margin-top: 50px;
  margin-bottom: 50px;
}
</style>
