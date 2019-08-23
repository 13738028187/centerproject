<template>
    <div class='container'>
      <div class="cu-form-group">
                    <div class="title">服务图片</div>
                    </div>
                    <scroll-view scroll-x="true" style=" white-space: nowrap; display: flex;background:white" >
                        <view style="display: inline-block">
                            <image v-for="(item,index) in imgroutes" :key="index" :src="item" style="width:250rpx;height:200rpx;margin-left:10rpx;margin-bottom:10rpx;margin-top:10rpx"></image>
                        </view>
                    </scroll-view>
        <van-cell title="服务名称" :value="service.name"/>
        <van-cell title="服务价格" :value="service.price"/>
        <van-cell title="服务时长" :value="service.duration"/>
        <van-cell title="服务人群" :value="service.target"/>
        <van-cell title="服务对象年龄" :value="service.age"/>
        <van-cell title="服务对象性别" :value="service.sex"/>
        <van-cell title="服务内容" :label="service.content"/>
    </div>
</template>

<script>
import Upload from '@/components/uploadimg'
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        pid:'',
        service:[],
        images:[],
        imgroutes:[]
      }
    },
    onLoad(options){
        this.images=[]
        this.imgroutes=[]
        this.pid=options.pid
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.servicedetail,
        body:{pid:this.pid}
        }).then(res =>{
          this.service=res.rows[0]
          if(res.rows[0].images){
           this.images=JSON.parse(res.rows[0].images)
                this.images.forEach((item,index)=>{
                    this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                })
          }
          if(this.service.sex=='0'){
            this.service.sex='男'
          }else if(this.service.sex=='1'){
            this.service.sex='女'
          }else{
            this.service.sex='全部'
          }
        })

    },
    components:{Upload},
    methods:{
        urlorderdetail(e){
        wx.navigateTo({url: "/pages/orderdetail/main?sid="+e,})
      }
    },
}
</script>

<style>
.container{
    width: 750rpx;
    background: white;
}
</style>