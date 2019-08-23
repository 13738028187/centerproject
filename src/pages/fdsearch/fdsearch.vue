<template>
    <div class="container">
        
                  <div class="container3">
                    <scroll-view scroll-y style="height: 1000rpx;" @scrolltolower="lower1" >
                      <div v-for="(item1,index1) in nolist" :key="index1" class="floatright">  
                        <div class="servlist"  @tap="urlorderapplication(item1.id)">
                            <div class="listright">
                                <van-cell-group>
                                  <van-cell :title="item1.username" value="详情" :label="item1.hosname" />
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
        page:0
      }
    },
    onLoad(options){
        this.page=0
        this.searchValue=options.name
        console.log(this.searchValue)
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.fbsearch,
            body:{page:this.page,searchname:this.searchValue}
            }).then(res =>{
            this.nolist=res.rows
            })
      
    },
    methods:{
      lower1(){
            this.page=this.page+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.fbsearch,
            body:{page:this.page,searchname:this.searchValue}
            }).then(res =>{
            this.newnolist=res.rows
            this.newnolist.forEach((item,index)=>{
            item.dateline=item.dateline.substring(0,16)
            this.nolist.push(item)
            })
            })
        },
      urlorderapplication(e){
        wx.navigateTo({url: "/pages/fddetail/main?id="+e,})
      }
    }
}
</script>
<style>
.container{
    width: 750rpx;
    background: white;
}


</style>