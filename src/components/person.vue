<template>

    <div class="container">
        <div class="headimage">
            <image src="../../static/images/user.png" class="userimgs"/>
            李某某&nbsp;&nbsp;男
        </div>

        <van-cell-group custom-class="changegroups" >
            <van-cell title="出生日期" value="xxxxxxxxxx" custom-class="changegroup"/>
            <van-cell title="身份证号" value="370112199502011512" custom-class="changegroup"/>
            <van-cell title="地址" value="xxxxxxxxxxxxxxxxxx" custom-class="changegroup"/>
            <van-cell title="电话" value="17862796388" custom-class="changegroup"/>
            <van-cell title="邮箱" value="xxxxxxxxxxxxxxxxxx" custom-class="changegroup"/>
        </van-cell-group>

    </div>
</template>

<script>
  export default {
    data () {
      return{
     
      }
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
