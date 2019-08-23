<template>

<div class="container">
    <van-cell-group>
      <van-cell
        title="订单金额"
        :value="orderdetail.price"
      />
      <van-cell title="实付金额" :value="orderdetail.payprice"/>
      <div v-show="orderdetail.payment==0"><van-cell title="订单状态" value="未支付"/></div>
      <div v-show="orderdetail.payment==1"><van-cell title="订单状态" value="已支付"/></div>
      <van-cell title="服务项目" :value="orderdetail.itemname" />
      <van-cell title="所属医院" :value="orderdetail.hosname" />

      <van-cell
        title="提交时间"
        :value="orderdetail.dateline"
      />
    </van-cell-group>
    <div v-show="orderdetail.reason">
        <van-cell-group>
          <van-cell
            title="退款理由"
            :label="orderdetail.reason"
          />
      </van-cell-group>
    </div>
    <div v-show="orderdetail.norefundreason">
        <van-cell-group>
          <van-cell
            title="拒绝退款原因"
            :label="orderdetail.norefundreason"
          />
      </van-cell-group>
    </div>
    <van-collapse :value="activeName" @change="onChange($event)" custom-class="collapses" accordion>
      
      <van-collapse-item title="用户信息" name="1" >
        <div class="headimage">
                  <scroll-view scroll-x style="width: 100%" >
                    <div  style="display:flex;justify-content:center;">
                        <div v-for="(item,index) in images" :key="index">
                        <image :src="item" style="width:250rpx;height:200rpx;margin-right:10rpx;margin-bottom:10rpx"></image>
                        </div>
                    </div>
                  </scroll-view>
            {{orderdetail.name}}&nbsp;&nbsp;<span v-show="orderdetail.sex==0">男</span><span v-show="orderdetail.sex==1">女</span>
        </div>
        <van-cell-group custom-class="changegroups">
            <!-- <van-cell title="身份证号" :value="orderdetail.idcard" custom-class="changegroup"/> -->
            <van-cell title="病人关系" :value="orderdetail.relationname" custom-class="changegroup"/>
            <van-cell title="出生日期" :value="orderdetail.birthday" custom-class="changegroup"/>
            <van-cell title="电话"  :value="orderdetail.mobile" custom-class="changegroup"/>
            <!-- <van-cell title="微信" :value="orderdetail.openid" custom-class="changegroup"/> -->
            <van-cell title="地址"  :label="orderdetail.addressdetail" custom-class="changegroup"/>
        </van-cell-group>
      </van-collapse-item>

      <div v-show="shownurse">
      <van-collapse-item title="护士信息" name="2" >
        <van-cell-group custom-class="changegroups" >
            <!-- <van-cell title="身份证号" :value="nurseinfo.idcard" custom-class="changegroup"/> -->
            <van-cell title="护士姓名" :value="nurseinfo.name" custom-class="changegroup"/>
            <van-cell title="所属医院" :value="nurseinfo.hosname" custom-class="changegroup"/>
            <van-cell title="科室" :value="nurseinfo.ksname" custom-class="changegroup"/>
            <van-cell title="电话" :value="nurseinfo.mobile" custom-class="changegroup"/>
            <van-cell title="地址" :label="nurseinfo.address" custom-class="changegroup"/>
        </van-cell-group>
      </van-collapse-item>
      </div>

      <van-collapse-item title="器械信息" name="3" >
        <div v-for="(item,index) in machine" :key="index">
          <van-cell-group custom-class="changegroups" >
              <van-cell :title="item.name" :value="item.num" custom-class="changegroup"/>
          </van-cell-group>
        </div>
      </van-collapse-item>

      
    </van-collapse>
    
   
</div>

</template>

<script>
  
 
  export default {
    data () {
      return{
        activeName: '1',
        sid:'',
        orderdetail:{},
        nurseinfo:{},
        shownurse:false,
        imgroutes:[],
        images:[],
        machine:[]
      }
    },
    onLoad(options){
        this.sid=options.sid
        this.imageroutes=[]
        this.images=[]
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.orderdetail,
        body:{sid:this.sid}
        }).then(res =>{
          this.orderdetail=res.rows[0]
          this.machine = JSON.parse(this.orderdetail.machine)
          this.orderdetail.dateline= this.orderdetail.dateline.substring(0,16)
          this.orderdetail.birthday= this.orderdetail.birthday.substring(0,10)
          this.imgroutes=JSON.parse(this.orderdetail.images)
          this.imgroutes.forEach((item,index)=>{
          this.images.push("https://www.ty5m.com:8088/phy/upload/"+item.imgdate.substr(0,10)+'/'+item.imgroute)
        })
        })

        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.nursedetail,
        body:{nid:this.orderdetail.nid}
        }).then(res =>{
          // this.imgrouts=JSON.parse(res.row[0])
          // this.imgrouts.forEach((item,index)=>{
          //   this.images.push("http://www.fleecewithflower.xyz/ipload"+item.imgdate.substr(0,10)+'/'+item.imgroute)
          // })
          if(res.rows.length>0){
            this.shownurse=true
            this.nurseinfo=res.rows[0]
            this.nurseinfo.birthday= this.orderdetail.birthday.substring(0,10)
            
          }else{
            this.shownurse=false
          }
          
        })

       
    },
    methods: {
      onChange(event) {
         this.activeName = event.mp.detail
      }
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

.headimage{  
    width: 750rpx;
    text-align: center;
    font-size: 32rpx;
    background: white;
    padding-top: 20rpx;
    padding-bottom: 60rpx;
}

.userimgs{
    width: 450rpx;
    height: 250rpx;
    display:block;
    margin: 30rpx auto;
    border-radius: 5%
}
</style>