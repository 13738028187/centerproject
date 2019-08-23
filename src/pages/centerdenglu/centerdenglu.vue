<template>
    <div class="container">
        <!-- <div class="toper">
        <van-cell-group>
                    <van-field
                        v-bind:username="username"
                        required
                        clearable
                        label="用户名"
                        icon="question-o"
                        placeholder="请输入用户名"
                        bind:click-icon="onClickIcon"
                        @change="usernameChange"
                    />
                    
                    <van-field
                        v-bind:psssword="password"
                        type="password"
                        label="密码"
                        placeholder="请输入密码"
                        required
                        v-bind:border="false"
                        @change="passwordChange"
                    />
        </van-cell-group>
        </div>
        <button type="primary" class="subut2" @tap="denglu">登录</button> -->
        <!-- <image src="../../static/images/aaabbcc.jpg"/>
        <image src="../../static/images/serv1.png"/> -->
        <image src="https://www.ty5m.com:8088/phy/upload/background.jpg"/>
        <div class="top">
            <!-- <h1>前往</h1> -->
        </div> 
        <div class="main">
            <div class="denglu">登录</div>
            <div class="username">账号</div>
            <input type="text" v-model="username" class="user">
            <div class="password">密码</div>
            <input type="password" v-model="password" class="pwd">
            <button @tap="denglu">登录</button>
        </div>
        
    </div>
</template>
<script>
export default {
    data () {
      return{
          username:'',
          password:''
      }
    },
     methods:{
        usernameChange (event) {
            this.username= event.mp.detail
        },
        passwordChange (event) {
            this.password= event.mp.detail
        },
        denglu(){
            // this.$fly.request({
            // method:"post", //post/get 已审核请求
            // url:this.$http.state.login,
            // body:{value1:this.username,value2:this.password}
            // }).then(res =>{
            //     if(res.rows){
            //          wx.reLaunch({url: "/pages/index/main"})
            //     }else{
            //         wx.showModal({
            //         title: '提示',
            //         content: res,
            //         success(res) {
            //             if (res.confirm) {
            //             console.log('用户点击确定')
            //             } else if (res.cancel) {
            //             console.log('用户点击取消')
            //             }
            //         }
            //         })
            //     }
            // })


            // this.$fly.request({
            // method:"post", //post/get 已审核请求
            // url:'http://192.168.2.27:8080/hi/main?hi=13MC0NFI4FQE',
            // body:{username:'ZX001',password:'123456'},
            // header: {
            //             'content-type': 'application/x-www-form-urlencoded' // 默认值
            //         }
            // }).then(res =>{
            //      wx.setStorageSync('passcode',res.header['Set-Cookie'])
            // })
            
            this.$fly.request({
            method:"post", //post/get 已审核请求
            url:this.$http.state.login,
            body:{value1:this.username,value2:this.password}
            }).then(res =>{
                if(res.rows){
                wx.request({
                    url: this.$http.state.qxapp, 
                    data: {
                        username:this.username,
                        password:this.password
                    },
                    method:'post',
                    header: {
                        'content-type': 'application/x-www-form-urlencoded' // 默认值
                    },
                    success (res) {
                        wx.setStorageSync('passcode',res.header['Set-Cookie'])
                    }
                })
                wx.reLaunch({url: "/pages/index/main"})
                }else{
                    wx.showModal({
                    title: '提示',
                    content: res,
                    success(res) {
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
        }
}
</script>

<style>
body,html{height:100%}
.container{
    width: 100%;
    height: 100%;
    background: white;
    position: relative;
}
image{
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: 1;
}
.top{
    height: 70px;
    width: 100%;
    position: absolute;
    z-index: 2
}
.top h1{
    font-size: 35pt
}
.main{
    width: 325px;
    height: 395px;
    background: white;
    position: absolute;
    z-index: 2;
    bottom: 70px;
    left: 25px;
    border-radius: 10px;
    opacity: 0.9;
}
.denglu{
    font-size: 23pt;
    margin-top: 50px;
    margin-left: 50px
}
input{
    width: 225px;
    margin-left: 50px;
    border-bottom: 2px solid black;
    height: 35px;
}
.username{
    font-size: 13pt;
    margin-top: 20px;
    margin-left: 50px
}
.password{
    font-size: 13pt;
    margin-left: 50px;
    margin-top:20px
}
button{
    width: 180px;
    height: 45px;
    margin: 0 auto;
    font-size: 13pt;
    line-height: 45px;
    background: black;
    color: white;
    margin-top: 35px;
    opacity: 0.8;
}
</style>
