 <template>
    <div class="container">

                  <div class="container3">
                    <scroll-view scroll-y style="height: 1000rpx;" @scrolltolower="lower1">
                      <div v-for="(item1,index1) in nolist" :key="index1" class="floatright">  
                        <div class="servlist"  @tap="urlorderdetail(item1.uid)">
                            <div class="listright">
                                <van-cell-group>
                                  <van-cell :title="item1.name" value="详情"/>
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
        name:'',
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
    onLoad(options){
        this.page1=0
        this.name=options.name
        this.$fly.request({
        method:"post", 
        url:this.$http.state.findusers,
        body:{searchname:this.name}
        }).then(res =>{
          console.log(res)
          this.nolist=res.rows
          console.log(this.nolist)
         
        })
    },
    methods:{
    //   handleSearchChange (event) {
    //     this.searchValue= event.mp.detail
    //   },
    //   handleSearch () {
    //     if(this.searchValue!=''){
    //       this.$fly.request({
    //       method:"post", //post/get 已审核请求
    //       url:"http://192.168.2.27:8080/hi/main?hi=24987F6N1XTZ",
    //       body:{name:this.searchValue}
    //       }).then(res =>{
    //         if(res.rows.length>0){
    //           wx.navigateTo({url: "/pages/serviceitemsearch/main?name="+this.searchValue})
    //         }else{
    //           console.log('无结果')
    //         }
    //       })
          
    //     }
    //   },
      lower1(){
            this.page1=this.page1+1
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.findusers,
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
      urlorderdetail(e){
        wx.navigateTo({url: "/pages/userdetail/main?uid="+e,})
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