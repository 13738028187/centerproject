<template>
    <div class="container">
        <van-cell-group>
            <van-field
                :value="name"
                clearable
                label="器械名称"    
                placeholder="暂无数据"
                @change="nameChange"
            />
            <van-field
                :value="type"
                clearable
                label="器械类型"    
                placeholder="暂无数据"
                @change="typeChange"
            />
            <van-field
                :value="price"
                clearable
                label="器械单价"    
                placeholder="暂无数据"
                @change="priceChange"
            />
            <van-field
                :value="manufacturers"
                clearable
                label="生产厂家"    
                placeholder="暂无数据"
                @change="manufacturersChange"
            />
             <van-field
                :value="batch"
                clearable
                label="生产批次"    
                placeholder="暂无数据"
                @change="batchChange"
            />
            <van-field
                :value="effective"
                clearable
                label="有效期"    
                placeholder="暂无数据"
                @change="effectiveChange"
            />
            <van-field
                :value="num"
                clearable
                label="器械数量"    
                placeholder="暂无数据"
                 @change="numChange"
            />
            
            <van-field
                :value="value"
                label="主要用途"
                type="textarea"
                placeholder="暂无数据"
                autosize
                @change="valueChange"
            />
            <!-- <view class="cu-form-group margin-top">
                <view class="title">普通选择</view>
                <picker bindchange="PickerChange" value="{{index}}" range="{{picker}}">
                    <view class="picker">
                        {{index?picker[index]:'禁止换行，超出容器部分会以 ... 方式截断'}}
                    </view>
                </picker>
            </view> -->
        </van-cell-group>
        <button type="primary" class="subut2" @tap="updateinstru">确认修改</button>
    </div>
</template>

<script>
export default {
    data () {
      return{
           mid:'',
           instrument:[],
           name:'',
           price:'',
           manufacturers:'',
           effective:'',
           num:'',
           value:'',
           batch:'',
           type:'',
           typelist:[]
      }
    },
    onLoad(options){
        this.mid=options.mid
        console.log(this.mid)
        this.$fly.request({
        method:"post", 
        url:this.$http.state.instrudetail,
        body:{mid:this.mid}
        }).then(res =>{
            console.log(res)
            this.name=res.rows[0].name
            this.price=res.rows[0].price
            this.manufacturers=res.rows[0].manufacturers
            this.effective=res.rows[0].effective
            this.num=res.rows[0].num
            this.value=res.rows[0].value
            this.batch=res.rows[0].batch
            this.type=res.rows[0].type
        })

        // this.$fly.request({
        // method:"post", 
        // url:"http://192.168.2.27:8080/hi/main?hi=24987F6N21TK",
        // body:{}
        // }).then(res =>{
        //     this.typelist=res.rows
        // })
    },
    methods:{
        urldeplist(guid){
            var url = "../deplist/main"
            wx.navigateTo({url: "/pages/deplist/main?guid="+guid,})
        },
        handleSearchChange (event) {
            this.searchValue= event.mp.detail
        },
        handleSearch () {
            console.log(this.searchValue)
            },
        nameChange (event) {
            this.name= event.mp.detail 
        },
        priceChange (event) {
            this.price= event.mp.detail 
        },
        manufacturersChange (event) {
            this.manufacturers= event.mp.detail 
        },
        effectiveChange (event) {
            this.effective= event.mp.detail 
        },
        numChange (event) {
            this.num= event.mp.detail 
        },
        valueChange (event) {
            this.value= event.mp.detail 
        },
        batchChange (event) {
            this.batch= event.mp.detail 
        },
        typeChange (event) {
            this.type= event.mp.detail 
        },
        updateinstru(){
            this.$fly.request({
            method:"post", 
            url:"http://192.168.2.27:8080/hi/main?hi=24987F6N20HD",
            body:{name:this.name,price:this.price,manufacturers:this.manufacturers,effective:this.effective,num:this.num,mid:this.mid,batch:this.batch,type:this.type,value:this.value,type:this.type,mid:this.mid}
            }).then(res =>{
                wx.showToast({
                title: '修改成功',
                icon: 'success'
                })
            })
        }

    }
}
</script>

<style>
    .container{
        width: 750rpx;
    }
  
    .container .headimage{  
    width: 750rpx;
    text-align: center;
    font-size: 32rpx;
    background: white;
    padding-top: 80rpx;
    padding-bottom: 60rpx;
}

.userimgs{
    width: 120rpx;
    height: 120rpx;
    display:block;
    margin: 15rpx auto;
    border-radius: 50%;
}
.subut2{
    width: 600rpx;
    height: 100rpx;
    margin: 50px auto;
    display: block;
    line-height: 100rpx;
    font-size: 12pt;
}
</style>
