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
        <van-cell-group>
            <van-field
                :value="nurse.name"
                clearable
                label="姓名"    
                placeholder="暂无数据"
                @change="nameChange"
            />
            <van-field
                :value="nurse.username"
                clearable
                label="用户名"    
                placeholder="暂无数据"
                @change="usernameChange"
            />
            <van-field
                :value="nurse.mobile"
                clearable
                label="电话"    
                placeholder="暂无数据"
                @change="mobileChange"
            />
            <van-field
                :value="nurse.openid"
                clearable
                label="微信"    
                placeholder="暂无数据"
                @change="openidChange"
            />
            <van-field
                :value="nurse.birthday"
                clearable
                label="出生日期"    
                placeholder="暂无数据"
                @change="birthdayChange"
            />
            <van-field
                :value="nurse.idcard"
                clearable
                label="身份证号"    
                placeholder="暂无数据"
                @change="idcardChange"
            />
            <van-field
                :value="nurse.jobnumber"
                clearable
                label="工作编号"    
                placeholder="暂无数据"
                @change="jobnumberChange"
            />
            <van-field
                :value="nurse.address"
                clearable
                label="地址"    
                placeholder="暂无数据"
                @change="addressChange"
            />
            <div class="zwzcfont">
                <view class="cu-form-group">
                    <view class="title">职称修改</view>
                    <picker @change="zcChange" :value="zcchange" :range="zcname">
                        <view class="picker">
                            {{zcchange?zcname[zcchange]:nurse.pid}}
                        </view>
                    </picker>
                </view>

                <view class="cu-form-group">
                    <view class="title">职务修改</view>
                    <picker @change="PickerChange" :value="zwchange" :range="zwname">
                        <view class="picker">
                            {{zwchange?zwname[zwchange]:nurse.tid}}
                        </view>
                    </picker>
                </view>
            </div>
            
            <van-field
                :value="nurse.instruction"
                label="个人简介"
                type="textarea"
                placeholder=""
                autosize
            />
        </van-cell-group>
        
            
        
            <!-- <div class="cu-form-group">
            <div class="title">身份证照片上传</div>
            </div>
            <div v-if="imgroute" style="display:flex;justify-content:center">
                <image :src="imgroute" style="width:200rpx;height:200rpx"></image>
            </div>
            <div v-else class="cu-form-group" style="border-top:none">
                <Upload width="120rpx" height="120rpx" max="6"  type="getidimg" @choosed="choosed" :srcs="imgroute"  @getidimg="setidimg" />
            </div> -->
        
        <button type="primary" class="subut2" @tap="updatenurse">确认修改</button>
    </div>
</template>

<script>
import Upload from '@/components/uploadimg'
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
           zwchange:'',
           zcchange:'',
           zwchangevalue:'',
           zcchangevalue:'',
           images:[],
           imgroutes:[]
        //    username:'',
        //    openid:'',
        //    name:'',
        //    sex:'',
        //    birthday:'',
        //    idcard:'',
        //    jobnumber:'',
        //    locate:'',
        //    address:'',
        //    mobile:'',
        //    idcard:'',
        //    director:'',
        //    instruction:''
      }
    },
    onLoad(options){

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
            //  if(this.nurse.name==null&&this.nurse==''){
            //      this.nurse.name=''
            //  }else if(this.nurse.sex=='0'){
            //      this.nurse.sex='男'
            //  }else if(){

            //  }
             this.zwchangevalue=this.nurse.tid
             this.zcchangevalue=this.nurse.pid
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
            if(this.nurse.images){
            this.images=JSON.parse(this.nurse.images)
                this.images.forEach((item,index)=>{
                    this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                })
            }
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
     zcChange(e) {
        this.zcchange=e.mp.detail.value
        this.zcchangevalue=this.zcname[this.zcchange]
        this.zc.forEach((item,index)=>{
            if(this.zcchangevalue==item.name){
                this.zcchangevalue=item.value
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
        updatenurse(){
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$http.state.nurseupdate,
            body:{username:this.nurse.username,openid:this.nurse.openid,name:this.nurse.name,sex:this.nurse.sex,birthday:this.nurse.birthday,idcard:this.nurse.idcard,jobnumber:this.nurse.jobnumber,address:this.nurse.address,mobile:this.nurse.mobile,instruction:this.nurse.instruction,nid:this.nid,tid:this.zwchangevalue,pid:this.zcchangevalue}
            }).then(res=>{
                wx.showToast({
                title: '修改成功',
                icon: 'success'
                // duration: 500 ,
                // success(data) {
                // setTimeout(function () {
                // wx.navigateTo({url: "/pages/hospitalupdate/main"})
                // }, 500) 
                // }
                
            })
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

</style>
