<template>
    <div class='container'>
        <div v-for="(item,index) in readylist" :key="index">
            <van-cell :title="item.name" value="详情" @tap='urlservicedetail(item.mid)'/>
        </div>
    </div>
</template>

<script>
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        guid:'',
        readylist:[],
        nolist:[],
        newlist:[]
      }
    },
    onLoad(options){
        this.guid=options.guid
        console.log(this.guid)
        this.$fly.request({
        method:"post", //post/get 已审核请求
        url:this.$http.state.instrulist,
        body:{guid:this.guid}
        }).then(res =>{
          console.log(res)
          this.readylist=res.rows
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
        urlservicedetail(e){
        wx.navigateTo({url: "/pages/instrumentdetail/main?mid="+e})
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