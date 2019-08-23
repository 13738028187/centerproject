<template>
    <div class="container">
        <van-cell-group>
            <van-field
                :value="hospital.name"
                clearable
                label="医院名称"    
                placeholder="暂无数据"
                @change="hosnameChange"
            />
            <van-field
                :value="hospital.cname"
                clearable
                label="联系人"    
                placeholder="暂无数据"
                @change="cnameChange"
            />
            <van-field
                :value="hospital.mobile"
                clearable
                label="联系人电话"    
                placeholder="暂无数据"
                @change="hosmobileChange"
            />
            <van-field
                :value="hospital.address"
                clearable
                label="医院地址"    
                placeholder="暂无数据"
                @change="hosaddressChange"
            />
            <van-field
                :value="hospital.hosaddressdetail"
                clearable
                label="详细地址"    
                placeholder="暂无数据"
                @change="hosaddressChange"
            />
            <van-field
                :value="hospital.level"
                clearable
                label="医院等级"    
                placeholder="暂无数据"
                @change="hosaddressChange"
            />
            
            
            <van-field
                :value="hospital.mobile"
                required
                clearable
                label="用户名"    
                placeholder="请输入用户名"
                @change="usernameChange"
            />
            <van-field
                required
                clearable
                label="密码"    
                placeholder="请输入密码"
                @change="passwordChange"
            />
        </van-cell-group>
        
             
                     
        <button type="warn" class="sub1" @tap="toCheckno(guid)">审核失败</button>
        <button type="primary" class="sub2" @tap="updatehospital">审核通过</button>
    </div>
</template>

<script>
import Upload from '@/components/uploadimg'
export default {
    data () {
      return{
          guid:'',
          hospital:{},
          username:'',
          password:'',
          index:null,
          zc:[],
          zcname:[],
          zcchange:'',
          zcchangevalue:'',
          addr:[]
      }
    },
    onLoad(options){

         this.$fly.request({
            method:"post", 
            url:this.$http.state.hospitallevel,
            async:false,
            body:{}
            }).then(res=>{
                this.zc=res.rows
                this.zc.forEach((item,index)=>{
                this.zcname.push(item.name)
            })
            })

        this.guid=options.guid
        // this.images=[]
        // this.imgroutes=[]
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.hospitaldetail,
        async:false,
        body:{guid:this.guid}
        }).then(res=>{
            this.hospital=res.rows[0]
            if(this.hospital.address){
                this.addr=this.hospital.address.substr(1,this.hospital.address.length-2).split(',')
                this.hospital.address=this.addr[0].substring(1,this.addr[0].length-1)+this.addr[1].substring(1,this.addr[1].length-1)+this.addr[2].substring(1,this.addr[2].length-1)
            }
            
            this.username=this.hospital.mobile
            this.zcchangevalue=this.hospital.level
                this.zc.forEach((item,index) => {
                    if(item.value==this.hospital.level){
                        this.hospital.level=item.name
                    }else{

                    }
                });
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
            this.hospital.name= event.mp.detail
        },
        hosmobileChange (event) {
            this.hospital.mobile= event.mp.detail
        },
        hoslevelChange (event) {
            this.hospital.level= event.mp.detail
        },
        cnameChange(event){
            this.hospital.cname=event.mp.detail
        }
        ,
        hosaddressChange (event) {
            this.hospital.address = event.mp.detail
        },
        usernameChange (event) {
            this.username= event.mp.detail
        },
        passwordChange (event) {
            this.password= event.mp.detail
        },
        updatehospital(){
            if(this.username==null&&this.password==null){
                 wx.showModal({
                    title: '提示',
                    content: '用户名密码不可为空',
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
            method:"post", //post/get 请求方式
            url:this.$http.state.hospitalapp,
            body:{username:this.username,password:this.password,guid:this.guid,userName:this.username,pwd:this.password,modelid:'249GTBY2RRYC'}
            }).then(res=>{
                wx.showToast({
                    title: '审核成功',
                    icon: 'success',
                    duration: 1000
                })
            wx.redirectTo({url: "/pages/hospitallist/main"})
            })
            }
        },
        toCheckno(id){
        //   if(this.message!=''&&this.message!=null){
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:"https://www.ty5m.com:8443/hi/main?hi=249MJYGJLUUL",
            body:{guid:this.guid}
            }).then(res =>{
            })
            wx.navigateTo({url: "/pages/hospitallist/main"})
        //   }else{
        //       wx.showModal({
        //       title: '提示',
        //       content: '请输入失败原因',
        //       success(res) {
        //         if (res.confirm) {
        //           console.log('用户点击确定')
        //         } else if (res.cancel) {
        //           console.log('用户点击取消')
        //         }
        //    }
        //     })
        //   }
          
      },
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
