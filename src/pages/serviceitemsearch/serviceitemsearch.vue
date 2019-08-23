<template>
    <div class="container">
    
                    <scroll-view scroll-y style="height: 1150rpx;" @scrolltolower="lower1">
                    <div v-for="(item,index) in readylist" :key="index" class="floatright">
                    <div class="servlist"  @tap="urlorderdetail(item.pid)">
                        <div class="listright">
                            <van-cell-group>
                                <van-cell :title="item.name" value="详情" :label="item.hosname"/>
                            </van-cell-group>
                        </div>
                    </div>
                    </div>
                    </scroll-view>

    </div>
</template>

<script>
export default {
    data () {
      return{
        searchValue:'',
        active:1,
        readylist:[],
        nolist:[],
        newlist:[],
        name:'',
        page:0
      }
    },
    // onLoad(options){
    //     this.name=options.name
    //     this.$fly.request({
    //     method:"post", //post/get 已审核请求
    //     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N1XTZ",
    //     body:{name:this.name}
    //     }).then(res =>{
    //       this.newlist=res.rows
    //       this.newlist.forEach((item,index)=>{
    //         if(item.statue==0){
    //             this.nolist.push(item)
    //         }else if(item.statue==1){
    //             item.statue='已审核'
    //             this.readylist.push(item)
    //         }else if(item.statue==2){
    //             item.statue='未通过'
    //             this.readylist.push(item)
    //         }
    //     })
        
    //     })
    // },
    onLoad(options){
        this.name=options.name
        this.$fly.request({
        method:"post", 
        url:this.$http.state.servicesearch,
        body:{searchname:this.name}
        }).then(res =>{
          this.readylist=res.rows
          this.readylist.forEach((item,index)=>{
          if(item.statue==1){
              item.statueicon='已审核'
          }else if(item.statue==2){
              item.statueicon='未通过'
          }else if(item.statue==0){
              item.statueicon='待审核'
          }
        })
        })
    },
    methods:{
      urlorderapplication(e){
        wx.navigateTo({url: "/pages/serviceinformation/main?pid="+e,})
      },
      urlorderdetail(e){
        wx.navigateTo({url: "/pages/hoservicedetail/main?pid="+e,})
      }
    },
    lower1(){
            this.page=this.page+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.servicesearch,
            body:{searchname:this.searchname,page:this.page}
            }).then(res =>{
            this.newnolist=res.rows
            this.newnolist.forEach((item,index)=>{
                if(item.statue==1){
                item.statue='已审核'
                }else if(item.statue==2){
                    item.statue='未通过'
                }else if(item.statue==0){
                    item.statue='待审核'
                }
            this.readylist.push(item)
            })
            })
        },
}
</script>
<style>
.container{
    width: 750rpx;
    background: white;
}

.floatright{
  width: 650rpx;
  margin: 0 auto
}
</style>