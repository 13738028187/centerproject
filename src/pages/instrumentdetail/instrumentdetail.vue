<template>
    <div class='container'>
        <van-cell title="器械名称" :value="instrument.name"/>
        <van-cell title="器械单价" :value="instrument.price"/>
        <van-cell title="生产厂家" :value="instrument.manufacturers"/>
        <van-cell title="有效期" :value="instrument.effective"/>
        <van-cell title="剩余数量" :value="instrument.num"/>
        <van-cell title="主要用途" :label="instrument.value"/>
    </div>
</template>

<script>
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        mid:'',
        instrument:[]
      }
    },
    onLoad(options){
        this.mid=options.mid
        
        this.$fly.request({
        method:"post", 
        url:this.$http.state.instrudetail,
        body:{mid:this.mid}
        }).then(res =>{
          this.instrument=res.rows[0]
          this.instrument.effective=this.instrument.effective.substring(0,10)
        })
    },
    methods:{
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      },
      transformtime(e){
        return e.substr(0,5)
      }
      ,
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:this.$http.state.ordersearch,
          body:{id:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/findorders/main?id="+this.searchValue})
            }else{
              console.log('无结果')
            }
            
          })
          
        }
      },
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