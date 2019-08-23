<template>
    <div class="container">
        
        <div class="toptitle">请选择科室</div>
        <van-collapse :value="activeName" @change="onChange($event)" custom-class="collapses" v-for="(item,index) in deplist" :key="index" accordion>
            <van-collapse-item :title="item.name" @tap="setdep(item.uuid)" :name="index">
                <div v-for="(item1,index1) in nurlist" :key="index1">
                    <div class="nurse" ><span @tap="urlnurselist(item1.nid)">{{item1.name}}</span>
                        <div class="right">
                            <span class="toupdate update" @tap="urlupdatenurse(item1.nid)">修改</span>
                            <!-- <span class="toupdate delete">删除</span> -->
                        </div>
                    </div>
                </div>
            </van-collapse-item>
            
        </van-collapse>
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
        nurlist:[]
      }
    },
    onLoad(options){
        this.guid = options.guid
        console.log(this.guid)
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.keshilist,
        body:{guid:this.guid}
      }).then(res =>{
        this.deplist=res.rows
      })
    },
    methods:{
        onChange(event) {
         this.activeName = event.mp.detail
      },
        urlnurselist(nid){
        wx.navigateTo({ url:  "/pages/nurse/main?nid="+nid,})
        },
        setdep(e){
            this.$fly.request({
            method:"post", //post/get 请求方式
            url:this.$http.state.nurselist,
            body:{depid:e}
                }).then(res =>{
                    this.nurlist=res.rows
                })
        },
        urlupdatenurse(nid){
            wx.navigateTo({ url: "/pages/nurseupdate/main?nid="+nid,})
        },
        handleSearchChange (event) {
        this.searchValue= event.mp.detail
      },
      handleSearch () {
        if(this.searchValue!=''){
          this.$fly.request({
          method:"post", //post/get 
          url:this.$http.state.nursesearch,
          body:{name:this.searchValue}
          }).then(res =>{
            if(res.rows.length>0){
              wx.navigateTo({url: "/pages/findorders/main?name="+this.searchValue+"&page=0"})
            }else{
              console.log('无结果')
            }
            
          })
          
        }
      },
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
