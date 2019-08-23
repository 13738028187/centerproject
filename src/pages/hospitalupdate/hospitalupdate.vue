<template>
    <div class="container">
        <van-cell-group>
            <van-field
                :value="hosname"
                clearable
                label="医院名称"    
                placeholder=""
                @change="hosnameChange"
            />
            <van-field
                :value="hosmobile"
                clearable
                label="医院电话"    
                placeholder="暂无电话"
                @change="hosmobileChange"
            />
            <van-field
                :value="hoscore"
                clearable
                label="医院评分"    
                placeholder="暂无评分"
                @change="hoscoreChange"
            />
            <van-field
                :value="hosaddress"
                clearable
                label="医院地址"    
                placeholder="暂无地址"
                @change="hosaddressChange"
            />
            <div class="zwzcfont">
                    <view class="cu-form-group">
                        <view class="title">医院等级</view>
                        <picker @change="zcChange" :value="zcchange" :range="zcname">
                            <view class="picker">
                                {{zcchange?zcname[zcchange]:level}}
                            </view>
                        </picker>
                    </view>
                </div>

        </van-cell-group>

                    <div class="cu-form-group">
                    <div class="title">医院照片上传</div>
                    </div>
                
                    <scroll-view scroll-x="true" style=" white-space: nowrap; display: flex" >
                        <view style="display: inline-block">
                            <image v-for="(item,index) in imgroutes" :key="index" :src="item" style="width:250rpx;height:200rpx;margin-right:10rpx;margin-bottom:10rpx;margin-top:10rpx"></image>
                        </view>
                        <view style="display: inline-block">
                            <image v-for="(item1,index1) in datasubs" :key="index1" :src="item" style="width:250rpx;height:200rpx;margin-right:10rpx;margin-bottom:10rpx;margin-top:10rpx"></image>
                        </view>
                    </scroll-view>
                   
                    <div  class="cu-form-group" style="border-top:none">
                        <Upload width="120rpx" height="120rpx" max="6"  type="getidimg" @choosed="choosed"  :srcs="imgroute"   @getidimg="setidimg" />
                    </div>                 

                     
        <van-cell title="护士维护"  is-link @tap="urldeplist()"/> 
        <van-cell title="服务维护"  is-link @tap="urlhoservicelist()"/> 
        <van-cell title="器械维护"  is-link @tap="urlinstrumentlist()"/> 
        <button type="primary" class="subut2" @tap="updatehospital">确认修改</button>
    </div>
</template>

<script>
import Upload from '@/components/uploadimg'
export default {
    data () {
      return{
          guid:'',
          hosname:'',
          hosmobile:'',
          hoscore:'',
          hoslevel:'',
          hosaddress:'',
          idcardimg:'',
          imgroute:'',
          images:[],
          imgroutes:[],
          index:null,
          zc:[],
          zcname:[],
          zcchange:'',
          zcchangevalue:'',
          level:'',
          addr:[],
          datasub:[],
          datasubs:[]
      }
    },
    onLoad(options){

        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.hospitallevel,
        body:{}
        }).then(res=>{
            this.zc=res.rows
            this.zc.forEach((item,index)=>{
            this.zcname.push(item.name)
        })
        })

        this.guid=options.guid
        this.images=[]
        this.imgroutes=[]
        this.datasubs=[]
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.hospitaldetail,
        body:{guid:this.guid}
        }).then(res=>{
            this.hosname=res.rows[0].name
            this.hosmobile=res.rows[0].mobile
            this.hoscore=res.rows[0].score
            this.hoslevel=res.rows[0].level
           
           if(res.rows[0].address){
            this.addr=res.rows[0].address.substr(1,res.rows[0].address.length-2).split(',')
            this.hosaddress=this.addr[0].substring(1,this.addr[0].length-1)+this.addr[1].substring(1,this.addr[1].length-1)+this.addr[2].substring(1,this.addr[2].length-1)
            }
            this.level=res.rows[0].level
           
            this.zc.forEach((item,index) => {
                    if(item.value==this.level){
                        this.level=item.name
                    }else{
                    }
                });
          
            // this.imgroute = "https://www.ty5m.com:8088/phy/upload/" + res.rows[0].imgdate.split(' ')[0] + '/' + res.rows[0].imgroute
            this.images=JSON.parse(res.rows[0].images)
            if(this.images[0].imgdate){
                if(this.images.length!=0){
                this.images.forEach((item,index)=>{
                    this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                })
                }
            }
            this.datasub=JSON.parse(res.rows[0].datasub)
             if(this.datasub[0].imgdate){
                if(this.datasub.length!=0){
                this.datasub.forEach((item,index)=>{
                    this.datasubs.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                })
                }
            }
            
        })
    },
    
    components:{Upload},
    methods:{
        zcChange(e) {
        this.zcchange=e.mp.detail.value
        this.zcchangevalue=this.zcname[this.zcchange]
        this.zc.forEach((item,index)=>{
            if(this.zcchangevalue==item.name){
                this.zcchangevalue=item.value
            }
        })
    },
        urldeplist(){
            wx.navigateTo({url: "/pages/nursetouplist/main?guid="+this.guid,})
        },
        urlhoservicelist(guid){
            wx.navigateTo({url: "/pages/serviceupdatelist/main?guid="+this.guid,})
        },
        urlinstrumentlist(guid){
            wx.navigateTo({url: "/pages/instrupdatelist/main?guid="+this.guid,})
        },
        hosnameChange (event) {
            this.hosname= event.mp.detail
        },
        hosmobileChange (event) {
            this.hosmobile= event.mp.detail
        },
        hoslevelChange (event) {
            this.hoslevel= event.mp.detail
        },
        hoscoreChange (event) {
            this.hoscore= event.mp.detail
        },
        hosaddressChange (event) {
            this.hosaddress= event.mp.detail
        },
        updatehospital(){
            console.log('test'+this.idcardimg)
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$http.state.hospitalupdate,
            body:{value1:this.hosname,value2:this.hosmobile,value3:this.zcchangevalue,value4:this.hoscore,value5:this.hosaddress,value6:this.guid,img:this.idcardimg}
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
        ,
        setidimg(e){
            this.idcardimg=JSON.stringify(e)
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
