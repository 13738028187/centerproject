<template>
    <div class="container">
        <div class="toptitle">请选择科室</div>
        <van-collapse :value="activeName" @change="onChange($event)" custom-class="collapses" v-for="(item,index) in deplist" :key="index" accordion>
            <van-collapse-item :title="item.name" @tap="setdep(item.uuid)" :name="index">
                <div v-for="(item1,index1) in nurlist" :key="index1">
                    <div class="nurse" ><span @tap="urlnurselist(item1.nid)">{{item1.name}}</span>
                        <!-- <div class="right">
                            <span class="toupdate update" @tap="urlupdatenurse(item1.nid)">修改</span>
                            <span class="toupdate delete">删除</span>
                        </div> -->
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
        deplist:[],
        nurlist:[]
      }
    },
    onLoad(options){
        this.guid = options.guid
        this.$fly.request({
        method:"post", //post/get 请求方式
        url:this.$http.state.login,
        body:{guid:this.guid}
      }).then(res =>{
          console.log(res.rows)
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
    height: 40px;
    margin: 0 auto;
    line-height: 40px;
}
.nurse .right{
    float: right;
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
