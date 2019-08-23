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
                    <scroll-view scroll-y style="height: 1200rpx;" @scrolltolower="lower1">
                      <div v-for="(item1,index1) in nolist" :key="index1" class="floatright">  
                        <div class="servlist"  @tap="urlorderdetail(item1.nid)">
                            <div class="listright">
                                <van-cell-group>
                                  <van-cell :title="item1.name" value="详情" :label="item1.hosname"/>
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
        page1:0,
        page2:0
      }
    },
    onLoad(){
        this.page1=0;
        this.$fly.request({
        method:"post", 
        // url:"https://www.ty5m.com:8443/hi/main?hi=249KZN6KTZ7O",
        url:this.$http.state.nurselist2,
        body:{}
        }).then(res =>{
          this.nolist=res.rows
        })

        // this.$fly.request({
        // method:"post", 
        // url:"http://192.168.2.27:8080/hi/main?hi=249GTBY2RQEI",
        // body:{}
        // }).then(res =>{
        //   this.readylist=res.rows
        //   this.readylist.forEach((item,index)=>{
        //   item.statue=item.statue
        //   if(item.statue==1){
        //       item.statue='已审核'
        //   }else if(item.statue==2){
        //       item.statue='未通过'
        //   }
        // })
        // })
    },
    methods:{
      handleSearchChange (event) {
        this.searchValue= event.mp.detail
      
      },
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 已审核请求
          url:this.$http.state.nursesearch,
          body:{name:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/findnurses/main?name="+this.searchValue})
            }else{
              wx.showModal({
                title: '提示',
                content: '未查询到护士',
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
            url:this.$http.state.nurselist2,
            body:{page:this.page1}
            }).then(res =>{
            this.newnolist=res.rows
            this.newnolist.forEach((item,index)=>{
            // if(item.imgdate!=null&&item.imgdate!=''){
            //     item.imgroute="https://www.ty5m.com:8088/phy/upload/"+item.imgdate.split(' ')[0] + '/' +item.imgroute
            // }else{
            // }
            this.nolist.push(item)
            })
            })
        },
      urlorderapplication(e){
        wx.navigateTo({url: "/pages/nurseapplication/main?nid="+e,})
      },
      urlorderdetail(e){
        wx.navigateTo({url: "/pages/nursedetail/main?nid="+e,})
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