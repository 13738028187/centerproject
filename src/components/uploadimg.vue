<template>
  <div>
    <view class="picture_list">
      <div class="j-upload-btn" @tap="uploadpic" style="width:160rpx;height:160rpx;">
        <span class="j-upload-add">+</span>
      </div>
      <view v-for="(item,index) in upload_picture_list" class="picture_item" :key="index" @tap="previewImg(index)">
        <image v-if="item.upload_percent < 100" :src="item.path" mode="aspectFill"></image>
        <image v-if="item.upload_percent == 100" :src="item.path_server" mode="aspectFill"></image>
        <view class="upload_progress" v-if="item.upload_percent < 100">{{item.upload_percent}}%</view>
      </view>
    </view>
    <button @tap='uploadimage' :disabled="flag">{{str}}</button>
  </div>
</template>

<script>
  export default {
    props:["width","height","max","srcs","type"],
    data(){
      return {
        urls:[],
        imageList:[],
        dizhi:"",
        upload_picture_list: [],//装image的数组
        str:"确定上传",
        flag:false,
        rearr:[],
        num:0
      }
    },
    onLoad(){
      this.str="确定上传"
      this.flag=false
      this.rearr=[]
      this.num=0
    },
    mounted(){
      this.urls = this.srcs || [];
    },
    methods:{
      //选择图片方法
      uploadpic(e) {
        var that = this//获取上下文
        var upload_picture_list = that.upload_picture_list
        //选择图片
        wx.chooseImage({
          count: this.max || 8, // 默认9，这里显示一次选择相册的图片数量
          sizeType: ['original', 'compressed'],// 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'],// 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {// 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
            res.tempFilePaths.forEach(v=>{
              that.urls.push(v);
            })
            var tempFiles = res.tempFiles
            //把选择的图片 添加到集合里
            for (var i in tempFiles) {
              tempFiles[i]['upload_percent'] = 0
              tempFiles[i]['path_server'] = ''
              upload_picture_list.push(tempFiles[i])
            }
            //显示
            that.upload_picture_list=upload_picture_list
          }
        })
      },
      //点击上传事件
      uploadimage() {
        var page = this
        page.str="开始上传"
        page.flag=true
        wx.showToast({
          title: '正在上传',
          icon: 'loading',
          duration: 3000
        })
        var upload_picture_list = page.upload_picture_list
        //循环把图片上传到服务器 并显示进度
        for (var j in upload_picture_list) {
          if (upload_picture_list[j]['upload_percent'] == 0) {
            page.upload_file_server(page, upload_picture_list, j)
          }
        }
        setTimeout(this.returnmsg,3000)
      },
      returnmsg(){
          console.log(this.rearr)
        this.$emit("getidimg",this.rearr)
      },
      //上传方法
      upload_file_server(that, upload_picture_list, j) {
        var time = new Date()
        console.log("开始上传" + j + "图片到服务器：")
        //上传返回值
        console.log(upload_picture_list,upload_picture_list[j]['path'])
        var upload_task = wx.uploadFile({
          url: 'https://www.ty5m.com:8088/phy/upload.php',//需要用HTTPS，同时在微信公众平台后台添加服务器地址
          filePath: upload_picture_list[j]['path'], //上传的文件本地地址
          name: 'file',
          formData: {
            'type':'1',
            'num': j
          },

          //附近数据，这里为路径
          success: function (res) {
            var data = JSON.parse(res.data) //字符串转化为JSON
            that.rearr.push(data.name)
            if (data.code == '1') {
              var filename = 'https://www.ty5m.com:8088/phy/upload/'+'/'+data.date+'/'+data.name //存储地址 显示
              upload_picture_list[j]['path_server'] = filename
            } else {
              var filename = "https://127.0.0.1:8095/xx.png"//错误图片 显示
              upload_picture_list[j]['path_server'] = filename
            }
            that.upload_picture_list=upload_picture_list
            that.num+=1
            console.log(that.num)
          }
        })
        //上传 进度方法
        upload_task.onProgressUpdate((res) => {
          upload_picture_list[j]['upload_percent'] = res.progress
          //console.log('第' + j + '个图片上传进度：' + upload_picture_list[j]['upload_percent'])
          //console.log(upload_picture_list)
          this.upload_picture_list=upload_picture_list
        })
      },
      previewImg(index){
        let that = this;
        wx.showActionSheet({
          itemList:["预览","删除"],
          success: function(res) {
            if(res.tapIndex === 0){
              wx.previewImage({
                current:that.urls[index],
                urls:that.urls
              });
            } else {
              that.urls.splice(index,1);
              that.$emit("delete",that.urls);
            }
          },
        });
      }
    }
  }
</script>


<style>
  .picture_list {
    padding: 20rpx;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: flex-start;
    align-content: flex-start;
  }

  .picture_item {
    margin: 10rpx;
    position: relative;
    width: 160rpx;
    height: 160rpx;
  }

  .upload_progress {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.7;
    background-color: #000;
    color: #fff;
    width: 160rpx;
    height: 160rpx;
    text-align: center;
    line-height: 160rpx;
    font-size: 12px;
  }

  .picture_item image {
    width: 160rpx;
    height: 160rpx;
  }

  .j-upload-btn{
    margin: 10rpx;
    border: 1px dashed #ddd;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
  }
  .j-upload-add{
    font-size: 80rpx;
    font-weight: 500;
    color:#C9C9C9;
  }

</style>
