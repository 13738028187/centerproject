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

        <scroll-view scroll-y style="height: 800rpx;" @scrolltolower="lower1">
        <van-collapse :value="activeName" @change="onChange($event)" custom-class="collapses" v-for="(item,index) in deplist" :key="index" accordion>
            <van-collapse-item :title="item.nickname?item.nickname:' '" @tap="setdep(item.uid)" :name="index">
                <div v-for="(item1,index1) in nurlist" :key="index1">
                    <div class="nurse" @tap="urlnurselist(item1.uid)"><span>{{item1.name}}</span>
                        <div class="right">
                            <!-- <span class="toupdate update" @tap="urlupdatenurse(item1.nid)">修改</span>
                            <span class="toupdate delete">删除</span> -->
                        </div>
                    </div>
                </div>
            </van-collapse-item>
        </van-collapse>
        </scroll-view>
    </div>
</template>

<script>
export default {
    data () {
      return{
        activeName: '0',
        guid:'',
        searchValue:'',
        deplist:[],
        nurlist:[],
        page1:0
      }
    },
    onLoad(options){
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.muserlist,
        body:{}
      }).then(res =>{
        this.deplist=res.rows
      })
    },
    methods:{
        onChange(event) {
         this.activeName = event.mp.detail
      },
        urlnurselist(uid){
        wx.navigateTo({ url:  "/pages/userdetail/main?uid="+uid,})
        },
        setdep(e){
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$http.state.patientlist,
            body:{uid:e}
                }).then(res =>{
                    this.nurlist=res.rows
                })
        },
        handleSearchChange (event) {
        this.searchValue= event.mp.detail
      },
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
            this.deplist.push(item)
            })
            })
        },
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 
          url:this.$http.state.findusers,
          body:{searchname:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/findusers/main?name="+this.searchValue+"&page=0"})
            }else{
              console.log('无结果')
            }
            
          })
          
        }
      }
    }
}
</script>

<style>
.container{
    width: 750rpx;
}
.toptitle{
    width: 100%;
    height: 40px;
    padding-left: 20px;
    font-size: 32rpx;
    line-height: 40px;
    background: white;
    margin-top: 20px;
    margin-bottom: 20px;
}
.nurse{
    width: 90%;
    margin: 0 auto;
    height: 40px;
    line-height: 40px;
    position: relative;
}
.nurse span{
    width: 100%
}
.nurse .right{
    position: absolute;
    right: 0;
    top: 0;
}
.nurse .right .toupdate{
    margin-left: 15px;
    font-size: 31rpx;
}
.look{
    color: black!important;
}
.update{
    color: green!important;
}
.delete{
    color: red!important;
} 
</style>
