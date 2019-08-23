<template>
    <div class="container">
                  <div class="container3">
                    <scroll-view scroll-y style="height: 1200rpx;" @scrolltolower="lower1">
                      <div v-for="(item1,index1) in readylist" :key="index1" class="floatright">  
                        <div class="servlist"  @tap="urlorderapplication(item1.pid)">
                            <div class="listright">
                                <van-cell-group>
                                  <van-cell :title="item1.name" :value="item1.statue" :label="item1.hosname"/>
                                </van-cell-group>
                            </div>
                        </div>
                      </div>
                    </scroll-view>
                  </div>
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
        newnolist:[],
        newreadylist:[],
        name:'',
        page1:0,
        page2:0
      }
    },
    onLoad(options){
        this.searchValue=options.searchValue,
        this.$fly.request({
        method:"post", 
        url:this.$http.state.servicesearch,
        body:{}
        }).then(res =>{
          this.readylist=res.rows
          this.readylist.forEach((item,index)=>{
          item.statue=item.statue
          if(item.statue==1){
              item.statue='已审核'
          }else if(item.statue==2){
              item.statue='未通过'
          }else if(item.statue==0){
              item.statue='待审核'
          }
        })
        })
    },
    methods:{
      // handleSearchChange (event) {
      //   this.searchValue= event.mp.detail
      // },
      // handleSearch () {
      //   if(this.searchValue!=''){
      //     this.$fly.request({
      //     method:"post", //post/get 已审核请求
      //     url:"http://192.168.2.27:8080/hi/main?hi=24987F6N1XTZ",
      //     body:{name:this.searchValue}
      //     }).then(res =>{
      //       if(res.rows.length>0){
      //         wx.navigateTo({url: "/pages/serviceitemsearch/main?name="+this.searchValue})
      //       }else{
      //         console.log('无结果')
      //       }
      //     })
      //   }
      // },
      lower1(){
            this.page1=this.page1+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.servicenolist,
            body:{page:this.page1}
            }).then(res =>{
            this.newnolist=res.rows
            this.newnolist.forEach((item,index)=>{
            item.dateline=item.dateline.substring(0,16)
            // if(item.imgdate!=null&&item.imgdate!=''){
            //     item.imgroute="https://www.ty5m.com:8088/phy/upload/"+item.imgdate.split(' ')[0] + '/' +item.imgroute
            // }else{
            // }
            this.nolist.push(item)
            })
            })
        },
      urlorderapplication(e){
        wx.navigateTo({url: "/pages/serviceinformation/main?pid="+e,})
      },
      urlorderdetail(e){
        wx.navigateTo({url: "/pages/hoservicedetail/main?pid="+e,})
      }
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