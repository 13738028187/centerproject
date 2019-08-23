<template>
    <div class="container">
        <div class="cu-form-group">
                    <div class="title">用户证件</div>
                    </div>
                    <scroll-view scroll-x="true" style=" white-space: nowrap; display: flex;background:white" >
                        <view style="display: inline-block">
                            <image v-for="(item,index) in imgroutes" :key="index" :src="item" style="width:250rpx;height:200rpx;margin-left:10rpx;margin-bottom:10rpx;margin-top:10rpx"></image>
                        </view>
                    </scroll-view>
        <van-cell title="患者姓名" :value="nurse.name"/>
        <van-cell title="患者电话" :value="nurse.mobile"/>
        <van-cell title="所在城市" :value="nurse.address"/>
        <van-cell title="详细地址" :label="nurse.addressdetail"/>
        <van-cell title="病例描述" :label="nurse.describe"/>
        
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
           imgroutes:[],
           attr:[]
      }
    },
    onLoad(options){
        this.images=[]
        this.imgroutes=[]
        this.nid=options.uid
        console.log(this.nid)
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.patientdetail,
        body:{uid:this.nid}
        }).then(res=>{
             this.nurse=res.rows[0]
             if(this.nurse.address){
                this.addr=this.nurse.address.substr(1,res.rows[0].address.length-2).split(',')
                this.nurse.address=this.addr[0].substring(1,this.addr[0].length-1)+this.addr[1].substring(1,this.addr[1].length-1)+this.addr[2].substring(1,this.addr[2].length-1)
                }
             if(this.nurse.images){
                this.images=JSON.parse(this.nurse.images)
                    this.images.forEach((item,index)=>{
                        this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                    })
                }
            //  if(this.nurse.sex==0){
            //      this.nurse.sex='男'
            //  }else if(this.nurse.sex==1){
            //     this.nurse.sex='女'
            //  }
             if(this.nurse.birthday){
                 this.nurse.birthday=this.nurse.birthday.substr(0,10)
             }
            
        })
    },
    methods:{
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
