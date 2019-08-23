<template>

    <div class="container" >
        <div class="headimage">
            <image src="../../static/images/user.png" class="userimgs"/>
            {{nurse.name}}&nbsp;&nbsp; <span v-show="nurse.sex==0">女</span><span v-show="nurse.sex==1">男</span>
        </div>

        <van-cell-group custom-class="changegroups">
            <van-cell title="护士账号" :value="nurse.username" custom-class="changegroup"/>
            <van-cell title="身份证号" :value="nurse.idcard" custom-class="changegroup"/>
            <van-cell title="护士职称" :value="nurse.tid" custom-class="changegroup"/>
            <van-cell title="护士职务" :value="nurse.pid" custom-class="changegroup"/>
            <van-cell title="出生日期" :value="nurse.birthday" custom-class="changegroup"/>
            <van-cell title="微信号"   :value="nurse.openid" custom-class="changegroup"/>
            <van-cell title="电话"     :value="nurse.mobile" custom-class="changegroup"/>
            <van-cell title="职称"     :value="nurse.pid" custom-class="changegroup"/>
            <van-cell title="职务"     :value="nurse.tid" custom-class="changegroup"/>
            <van-cell title="地址"     :label="nurse.address" custom-class="changegroup"/>
            <van-cell title="自我描述"  :label="nurse.instruction" custom-class="changegroup"/>
        </van-cell-group>
        
    </div>
</template>

<script>
  export default {
    data () {
        return{
            nid:'',
            nurse:{},
            zw:[],
            zc:[]
        }
    },
    onLoad(options){

        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursezw,
        body:{}
        }).then(res=>{
            this.zw=res.rows
        })

        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursezc,
        body:{}
        }).then(res=>{
            this.zc=res.rows
        })

        this.nid=options.nid
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursedetail,
        body:{nid:this.nid}
        }).then(res=>{
            this.nurse=res.rows[0]
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
    methods: {
      taskuser(){
        var url = "../tasklist/main"
        wx.navigateTo({url})
      }
    }
  }
</script>

<style scoped>
.container{
    width: 750rpx;
    padding-right: 38rpx;
    background: white;
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
.formation{
    display: flex;
}
.formation .name{
    float: left;
    margin-right: 0.5rem;
    margin-left: 1.5rem;
}
.formation .age{
    float: left;
}
.formation2{
    margin-top: 20px;
}
.formation2 .shenfen{
    margin-left: 1.5rem;
}
.changegroups{
    padding-right: 15rpx!important;
}
</style>
