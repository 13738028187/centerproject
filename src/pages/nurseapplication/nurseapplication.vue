<template>
    <div class="container">
        <div class="cu-form-group">
                    <div class="title">护士证件</div>
                    </div>
                    <scroll-view scroll-x="true" style=" white-space: nowrap; display: flex;background:white" >
                        <view style="display: inline-block">
                            <image v-for="(item,index) in imgroutes" :key="index" :src="item" style="width:250rpx;height:200rpx;margin-left:10rpx;margin-bottom:10rpx;margin-top:10rpx"></image>
                        </view>
                    </scroll-view>
        <van-cell title="护士姓名" :value="nurse.name"/>
        <van-cell title="护士性别" :value="nurse.sex"/>
        <van-cell title="医院" :value="nurse.hosname"/>
        <van-cell title="科室" :value="nurse.ksname"/>
        <van-cell title="医院" :value="nurse.hosname"/>
        <van-cell title="职称" :value="nurse.tid"/>
        <van-cell title="职务" :value="nurse.pid"/>
        <van-cell title="出生年月" :value="nurse.birthday"/>
        <van-cell title="手机号码" :value="nurse.mobile"/>
                
        <van-cell title="自我描述" :label="nurse.instruction"/>   
        
        <button type="warn" class="sub1" @tap="toCheckno()">审核失败</button>
        <button type="primary" class="sub2" @tap="toCheck()">审核通过</button>
    </div>
</template>

<script>
export default {
    data () {
      return{
           index:null,
           nid:'',
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
           imgroutes:[]
      }
    },
    onLoad(options){
        this.images=[]
        this.imgroutes=[]
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursezw,
        body:{}
        }).then(res=>{
            this.zw=res.rows
            this.zw.forEach((item,index)=>{
            this.zwname.push(item.name)
        })
        })
        
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursezc,
        body:{}
        }).then(res=>{
            this.zc=res.rows
            this.zc.forEach((item,index)=>{
            this.zcname.push(item.name)
        })
        })

        this.nid=options.nid
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursedetail,
        body:{nid:this.nid}
        }).then(res=>{
             this.nurse=res.rows[0]
             this.zwchangevalue=this.nurse.tid
             this.zcchangevalue=this.nurse.pid
             this.images=JSON.parse(res.rows[0].images)
                this.images.forEach((item,index)=>{
                    this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                })
             if(this.nurse.sex==0){
                 this.nurse.sex='男'
             }else{
                 this.nurse.sex='女'
             }
                this.zc.forEach((item,index) => {
                    if(item.value==this.nurse.tid){
                        this.nurse.tid=item.name
                    }else{}
                });
                this.zw.forEach((item,index) => {
                    if(item.value==this.nurse.pid){
                        this.nurse.pid=item.name
                    }else{}
                });
        })
    },
    methods:{
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
        },
        toCheckno(){
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:"http://192.168.2.27:8080/hi/main?hi=249GTBY2RUVD",
            body:{sta:2,id:this.nid}
            }).then(res=>{
                
            })
        
        },
        toCheck(){
            this.$fly.request({
                method:"post", //post/get 请求方式
                url:"http://192.168.2.27:8080/hi/main?hi=249GTBY2RUVD",
                body:{sta:1,id:this.nid}
                }).then(res=>{
                    
                })
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
