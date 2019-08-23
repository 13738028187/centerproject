<template>
    <div class="container">
        <van-search
          :value="searchValue"
          placeholder="请输入搜索关键词"
          use-action-slot
          @change="handleSearchChange"
          bind:search="onSearch"
        >
          <view slot="action" @tap="handleSearch">搜索</view>
        </van-search>
        
                  <div class="container3">
                    <scroll-view scroll-y style="height: 1000rpx;" >
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
        page1:0
      }
    },
    onLoad(){
        this.page=0
        this.$fly.request({
        method:"post", 
        url:this.$http.state.fblist,
        body:{}
        }).then(res =>{
          this.nolist=res.rows
        })

    },
    methods:{
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      },
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:this.$http.state.fbsearch,
          body:{searchname:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/fdsearch/main?name="+this.searchValue})
            }else{
              wx.showModal({
                title: '提示',
                content: '未查询到服务反馈',
                success (res) {
                    if (res.confirm) {
                    console.log('用户点击确定')
                    } else if (res.cancel) {
                    console.log('用户点击取消')
                    }
                }
              })
            }
          })
          
        }
      },
      lower1(){
            this.page1=this.page1+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.fblist,
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

.floatright{
  width: 650rpx;
  margin: 0 auto
}
</style>