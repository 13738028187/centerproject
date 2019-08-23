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

        <van-cell-group>
            <van-field
                :value="message"
                label="需改内容"
                type="textarea"
                placeholder="请输入需要修改的内容"
                autosize
                :border="false"
                @change="changeChange"
            />
        </van-cell-group>
        <van-cell-group>
            <van-field
                :value="message"
                label="失败原因"
                type="textarea"
                placeholder="请输入原因"
                autosize
                :border="false"
                @change="reasonChange"
            />
        </van-cell-group>

    <button type="warn" class="sub1" @tap="toCheckno()">审核失败</button>
    <button type="primary" class="sub2" @tap="toCheck()">审核通过</button>
    </div>
</template>

<script>
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        pid:'',
        change:'',
        reason:'',
        service:{},
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
           this.images=JSON.parse(res.rows[0].images)
                this.images.forEach((item,index)=>{
                    this.imgroutes.push("https://www.ty5m.com:8088/phy/upload/" + item.imgdate.substr(0,10) + '/' + item.imgroute)
                })
          if(this.service.sex=='0'){
            this.service.sex='男'
          }else if(this.service.sex=='1'){
            this.service.sex='女'
          }
        })

    },
    methods:{
        urlorderdetail(e){
        wx.navigateTo({url: "/pages/orderdetail/main?sid="+e,})
      },
       toCheck(){
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$http.state.serviceappyes,
            body:{value1:this.pid,value2:this.change,value3:this.pid,value4:1}
            }).then(res =>{
            })
            wx.navigateTo({url: "/pages/servicereview/main"})
        },
        toCheckno(){
                this.$fly.request({
                method:"post", //post/get 请求方式
                url:this.$http.state.serviceappno,
                body:{value1:this.pid,value2:this.change,value3:this.pid,value4:2,value5:this.reason}
                }).then(res =>{
                    
                })
                wx.navigateTo({url: "/pages/servicereview/main"})
        },
        reasonChange (event) {
            this.reason= event.mp.detail
        },
        changeChange (event) {
            this.change= event.mp.detail
        }
    },
}
</script>

<style>
.container{
    width: 750rpx;
    background: white;
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