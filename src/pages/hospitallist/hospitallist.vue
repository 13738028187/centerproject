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

        
        <!-- <scroll-view scroll-y="true" style="height: 200px" @scrolltolower="lower">
            <view style="background: red; width: 100px; height: 100px" ></view>
            <view style="background: green; width: 100px; height: 100px"></view>
            <view style="background: blue; width: 100px; height: 100px"></view>
            <view style="background: yellow; width: 100px; height: 100px"></view>
        </scroll-view> -->


        <van-tabs  bind:change="onChange">
            <van-tab title="已申请">
                <div class="container2">

                    <scroll-view scroll-y style="height: 1000rpx;" @scrolltolower="lower">
                        <div v-for="(item,index) in hoslist" :key="index">
                            <div class="servlist" @tap="urlhospitaldetail(item.guid)">
                                <div class="listleft" v-if="item.images"><image :src="item.images"/></div>
                                <div class="listleft" v-if="item.show"><image src="../../static/images/wei.jpg"/></div>
                                <div class="listright">
                                    <span class="biao" style="display:block;overflow:auto;width:220px;height:25px" :title="item.name">{{item.name}}</span>
                                    <span class="user">{{item.dateline}}</span>
                                    <span class="nurse"></span>
                                    <van-icon name="arrow" custom-class="chanicon"/>
                                </div>
                            </div>
                        </div>
                    </scroll-view>

                </div>
            </van-tab>

            <van-tab title="待审核">
                <div class="container2">
                    <scroll-view scroll-y style="height: 1000rpx;" @scrolltolower="lower2">
                        <div v-for="(item,index) in hosnolist" :key="index">
                            <div class="servlist" @tap="urlhospitalapp(item.guid)">
                                <div class="listleft" v-if="item.images"><image :src="item.images"/></div>
                                <div class="listleft" v-if="item.show"><image src="../../static/images/wei.jpg"/></div>
                                <div class="listright">
                                    <div v-if="item.name!=null"><span class="biao" style="display:block;overflow:auto;width:220px;height:25px">{{item.name}}</span></div>
                                    <span class="user">{{item.dateline}}</span>
                                    <span class="nurse"></span>
                                    <van-icon name="arrow" custom-class="chanicon"/>
                                </div>
                            </div>
                        </div>
                    </scroll-view>
                </div>
            </van-tab>



            <van-tab title="申请">
                <div class="titleapl">账号申请</div>

                <van-cell-group>
                    <van-field
                        v-bind:user="name"
                        required
                        clearable
                        label="医院名称"
                        placeholder="请输入医院名称"
                        bind:click-icon="onClickIcon"
                        @change="nameChange"
                    />
                     <van-field
                        v-bind:user="name"
                        required
                        clearable
                        label="联系人"
                        placeholder="请输入联系人"
                        bind:click-icon="onClickIcon"
                        @change="cnameChange"
                    />
                    <van-field
                        v-bind:user="name"
                        required
                        clearable
                        label="联系人电话"
                        placeholder="请输入医院电话"
                        bind:click-icon="onClickIcon"
                        @change="mobileChange"
                    />
                    
                    <van-field
                        v-bind:user="name"
                        required
                        clearable
                        label="详细地址"
                        placeholder="请输入医院详细地址"
                        bind:click-icon="onClickIcon"
                        @change="addressChange"
                    />
                </van-cell-group>
                
                <div class="zwzcfont">
                    <view class="cu-form-group">
                        <view class="title">所属市区</view>
                            <picker mode="region" @change="RegionChange" :value="region" :custom-item="customItem">
                                <view class="picker">
                                    {{region[0]}}，{{region[1]}}，{{region[2]}}
                                </view>
                            </picker>
                    </view>
                </div>


                <div class="zwzcfont">
                    <view class="cu-form-group">
                        <view class="title">医院等级</view>
                        <picker @change="zcChange" :value="zcchange" :range="zcname">
                            <view class="picker">
                                {{zcchange?zcname[zcchange]:zcname[0]}}
                            </view>
                        </picker>
                    </view>
                </div>


                <!-- <van-button type="primary" custom-class="subut">申请</van-button> -->
                <button type="primary" class="subut2" @tap="addhospital">申请</button>   
                 
            </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import Upload from '@/components/uploadimg'
export default {
   data () {
      return{
          multiIndex: [0, 0, 0],
          index:null,
          zc:[],
          zcname:[],
          zcchange:'',
          zcchangevalue:'9',
          guid:'',
          active: 1,
          value: '',
          hoslist:[],
          newlist:[],
          newnolist:[],
          username:'',
          password:'',
          cname:'',
          name:'',
          mobile:'',
          address:'',
          level:'',
          idcardimg:'',
          searchValue:'',
          modelid:'249GTBY2RRYC',
          userName:'',
          pwd:'',
          page:0,
          page2:0,
          hosnolist:[],
          show1:false,
          show2:false,
          region: ['广东省', '广州市', '海珠区'],
          locate:''
      }
    },
     onLoad(options){
        
        this.$fly.request({
        method:"post", 
        url:this.$http.state.hospitallevel,
       body:{}
        }).then(res=>{
            this.zc=res.rows
            this.zc.forEach((item,index)=>{
            this.zcname.push(item.name)
        })
        })


        this.$fly.request({
        method:"post", 
        url:this.$http.state.hospitallist,
        body:{}
        }).then(res =>{
        this.hoslist=res.rows
        this.hoslist.forEach((item,index)=>{
          item.dateline=item.dateline.substring(0,16)
          if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substring(0,10)+'/'+item.images[0].imgroute
            }else{
                item.show=true
            }
          })
        })

        

        this.$fly.request({
        method:"post", //post/get 
        url:this.$http.state.hospitalnolist,
        body:{}
        }).then(res =>{
        this.hosnolist=res.rows
        this.hosnolist.forEach((item,index)=>{
          item.dateline=item.dateline.substring(0,16)
          if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substring(0,10)+'/'+item.images[0].imgroute
            }else{
                item.show=true
            }
          })
        })

        

    },
    components:{Upload},
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
     RegionChange(e) {
       this.region= e.mp.detail.value 
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
        handleSearchChange (event) {
            this.searchValue= event.mp.detail
        },
        handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:this.$http.state.hospitalsearch,
          body:{name:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/searchospital/main?name="+this.searchValue})
            }else{
              wx.showModal({
                title: '提示',
                content: '未查询到您所需要的医院',
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
        onChange(event) {
            wx.showToast({
                title: `切换到标签 ${event.detail.index + 1}`,
                icon: 'none'
            });
        },
        onChan(event) {
            // event.detail 为当前输入的值
            console.log(event.mp.detail);
        },
        urlhospitaldetail(e){
            wx.navigateTo({url: "/pages/hospitalupdate/main?guid="+e,})
        },
        usernameChange (event) {
            this.username= event.mp.detail
            this.userName=this.username
        },
        urlhospitalapp(e){
            wx.navigateTo({url: "/pages/hospitalapplication/main?guid="+e,})
        },
        passwordChange (event) {
            this.password= event.mp.detail
           this.pwd=this.password
        },
        nameChange(event){
            this.name= event.mp.detail
        },
        cnameChange(event){
            this.cname= event.mp.detail
        },
        mobileChange(event){
            this.mobile= event.mp.detail
        },
        addressChange(event){
            this.address= event.mp.detail
        },
        levelChange(event){
            this.level= event.mp.detail
        },
        lower(){
            this.page=this.page+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.hospitallist,
            body:{page:this.page}
            }).then(res =>{
            this.newlist=res.rows
            this.newlist.forEach((item,index)=>{
            item.dateline=item.dateline.substring(0,16)
            if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
            }else{
                item.show=true
            }
            this.hoslist.push(item)
            })
            
            })
        }
        ,
        lower2(){
            this.page2=this.page2+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.hospitalnolist,
            body:{page:this.page2}
            }).then(res =>{
            this.newnolist=res.rows
            this.newnolist.forEach((item,index)=>{
            item.dateline=item.dateline.substring(0,16)
            if(item.images!=null&&item.images!=''){
                item.images=JSON.parse(item.images)
                item.images="https://www.ty5m.com:8088/phy/upload/"+item.images[0].imgdate.substr(0,10)+'/'+item.images[0].imgroute
            }else{
                item.show=true
            }
            this.hosnolist.push(item)
            })
            
            })
        },
        addhospital(){
            var myreg = /^[1][3,4,5,7,8][0-9]{9}$/;
            console.log(this.mobile)
                this.$fly.request({
                    method:"post", 
                    url:"https://www.ty5m.com:8443/hi/main?hi=249SOD8D5F6W",
                    body:{mobile:this.mobile,name:this.name}
                    }).then(res =>{
                        console.log(res)
                        if(res.rows.length>0){
                            wx.showModal({
                            title: '提示',
                            content: '该医院或手机号已注册',
                            success(res) {
                                if (res.confirm) {
                                console.log('用户点击确定')
                                } else if (res.cancel) {
                                console.log('用户点击取消')
                                }
                            }
                            })
                        }else{
                            if(this.name==''&&this.level==''&&this.mobile==''&&this.address==''){
                                wx.showModal({
                                title: '提示',
                                content: '基本信息不可为空',
                                success(res) {
                                    if (res.confirm) {
                                    console.log('用户点击确定')
                                    } else if (res.cancel) {
                                    console.log('用户点击取消')
                                    
                                    }
                                }
                                })

                            }else if(!myreg.test(this.mobile)){
                                wx.showModal({
                                title: '提示',
                                content: '手机号码格式不正确',
                                success(res) {
                                    if (res.confirm) {
                                    console.log('用户点击确定')
                                    } else if (res.cancel) {
                                    console.log('用户点击取消')
                                    }
                                }
                                })

                                
                            }else{
                                this.$fly.request({
                                method:"post", 
                                url:"https://www.ty5m.com:8088/phy/addresstolocation.php",
                                body:{address:this.region[1]+this.name}
                                }).then(res =>{
                                    if(res.result.location){
                                        this.locate='('+res.result.location.lat+','+res.result.location.lng+')'
                                        console.log(this.locate)
                                        this.region = JSON.stringify(this.region)
                                        this.$fly.request({
                                        method:"post", 
                                        url:"https://www.ty5m.com:8443/hi/main?hi=249GTBY2SIPG",
                                        body:{value1:this.name,value2:this.cname,value3:this.mobile,value4:this.zcchangevalue,value5:this.region,value6:this.address,value7:this.locate}
                                        }).then(res =>{
                                            if(res.rows.length>0){
                                                this.region=['广东省', '广州市', '海珠区']
                                                wx.showToast({
                                                title: '申请成功',
                                                icon: 'success',
                                                duration: 1000
                                                })
                                                wx.navigateTo({url: "/pages/hospitallist/main"})
                                                }
                                            })  
                                    }else{
                                        wx.showToast({
                                        title: '请检查医院所属市区',
                                        icon: 'success',
                                        duration: 1000
                                        })
                                    }
                                    
                                })

                                
                            }
                        }
                    })

                
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
