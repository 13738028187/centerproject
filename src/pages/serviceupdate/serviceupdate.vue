<template>
    <div class="container">
        <van-cell-group>
            <van-field
                :value="service.name"
                clearable
                label="服务名称"    
                placeholder="暂无数据"
                @change="nameChange"
            />
            <van-field
                :value="service.price"
                clearable
                label="服务单价"    
                placeholder="暂无数据"
                @change="priceChange"
            />
            <van-field
                :value="service.duration"
                clearable
                label="服务时长"    
                placeholder="暂无数据"
                @change="durationChange"
            />
            <van-field
                :value="service.age"
                clearable
                label="服务年龄"    
                placeholder="暂无数据"
                @change="ageChange"
            />
            
            <van-field
                :value="service.content"
                clearable
                label="服务描述" 
                placeholder="暂无数据"
                type="textarea"
                autosize
                @change="contentChange"
            />
        </van-cell-group>
        <button type="primary" class="subut2" @tap="serviceupdate">确认修改</button>
    </div>
</template>

<script>
export default {
    data () {
      return{
           pid:'',
           service:{}
      }
    },
    onLoad(options){
        this.pid=options.pid
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.servicedetail,
        body:{pid:this.pid}
        }).then(res =>{
          this.service=res.rows[0]
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
            this.service.name=event.mp.detail
        },
        priceChange(event){
            this.service.price=event.mp.detail
        },
        durationChange(event){
            this.service.duration=event.mp.detail
        },
        ageChange(event){
            this.service.age=event.mp.detail
        },
        sexChange(event){
            this.service.sex=event.mp.detail
        },
        contentChange(event){
            this.service.content=event.mp.detail
        },
        serviceupdate(){
            this.$fly.request({
            method:"post", 
            url:this.$http.state.serviceupdate,
            body:{name:this.service.name,price:this.service.price,duration:this.service.duration,age:this.service.age,sex:this.service.sex,pid:this.pid,content:this.service.content}
            }).then(res =>{
                wx.showToast({
                title: '修改成功',
                icon: 'success'
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
