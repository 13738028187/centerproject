<template>

<div class="container">
    <van-cell-group>
      <van-cell title="服务名称" :value="orderdetail.name"/>
      <van-cell title="所属医院" :value="orderdetail.hosname"/>
      <van-cell title="服务范围" :value="orderdetail.target"/>
      <van-cell title="服务年龄" :value="orderdetail.age"/>
      <van-cell title="服务时长" :value="orderdetail.duration"/>
      <van-cell title="服务价格" :value="orderdetail.price"/>
      <van-cell title="提交时间" :value="orderdetail.dateline"/>
      <van-cell title="服务描述" :label="orderdetail.content"/>
    </van-cell-group>
    
    <!-- <van-collapse :value="activeName" @change="onChange($event)" custom-class="collapses" accordion>
      <van-collapse-item title="用户信息" name="1">
        <div class="headimage">
            <image src="../../static/images/user.png" class="userimgs"/>
            {{orderdetail.name}}&nbsp;&nbsp;<span v-show="orderdetail.sex==1">男</span><span v-show="orderdetail.sex==0">女</span>
        </div>

        <van-cell-group custom-class="changegroups" >
            <van-cell title="出生日期" :value="orderdetail.birthday" custom-class="changegroup"/>
            <van-cell title="病人关系" :value="orderdetail.relationship" custom-class="changegroup"/>
            <van-cell title="电话" :value="orderdetail.mobile" custom-class="changegroup"/>
            <van-cell title="微信" :value="orderdetail.openid" custom-class="changegroup"/>
            <van-cell title="地址" :lavel="orderdetail.address" custom-class="changegroup"/>
        </van-cell-group>
      </van-collapse-item>
    </van-collapse> -->

    
</div>



</template>

<script>
  import person from "@/components/person"
  export default {
    data () {
      return{
        activeName: '1',
        pid:'',
        orderdetail:{},
        masssage:''
      }
    },
    onLoad(options){
        this.pid=options.pid
        this.$fly.request({
        method:"post", 
        url:this.$http.state.servicedetail,
        body:{pid:this.pid}
        }).then(res =>{
        console.log(res)
        this.orderdetail=res.rows[0]
        this.orderdetail.dateline=this.orderdetail.dateline.substring(0,16)
        })
    },
    methods: {
      onChange(event) {
         this.activeName = event.mp.detail
      },
      reasonChange (event) {
            this.message= event.mp.detail
        }
    },
    components: {
      person
    }
  }
</script>

<style scoped>

.container{
    width: 750rpx;
}
.container .ordermodel{
  width: 100%;
  height: 50px;
  padding: 0 15px;
  background: white;
  
}
.container .ordermodel .left{
  width: 85px;
  height: 100%;
  float: left;
  line-height: 50px;
  font-size: 33rpx;
  border-bottom: 0.5px solid #dddddd;
}
.container .ordermodel .right{
  width: 260px;
  height: 100%;
  float: left;
  font-size: 33rpx;
  border-bottom: 1rpx solid #dddddd;
  text-align: right;
  line-height: 50px;
}

.bar1{
  width: 96%;
  margin: 0 auto;
}
.bar2{
  width: 100%;
  height: 15rpx;
}
.collapses{
  font-size: 10pt!important;
}

.userimgs{
    width: 450rpx;
    height: 400rpx;
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
.headimage{  
    width: 750rpx;
    text-align: center;
    font-size: 32rpx;
    background: white;
    padding-top: 20rpx;
    padding-bottom: 60rpx;
}

.userimgs{
    width: 120rpx;
    height: 120rpx;
    display:block;
    margin: 15rpx auto;
    border-radius: 50%;
}
</style>