<template>
  <div class="add">
    <div style="display: flex;flex-direction: row;">
      <span>{{title}}：</span>
      <input style="padding-top: 8rpx;border-bottom: 1rpx solid #ccc;width: 80%;" placeholder="张xx" @blur="setdoctor"/>
    </div>
    <div style="display: flex;flex-direction: row;">
      <span>检查时间：</span>
      <picker class="padstyle" mode="date" :value="date" @change="dateChange">
        <div class="picker">
          {{date}}
        </div>
      </picker>
    </div>
    <div>
      <span>病情描述：</span>
      <textarea maxlength="-1" style="width: 98%;height: 250rpx;border: 1rpx solid crimson;border-radius: 10rpx;margin-top: 10rpx;" @blur="contentChange($event)" >
      </textarea>
    </div>
    <div>
      <div @tap="getMessage"></div>
    </div>
  </div>
</template>

<script>
  export default {
    props: ['title', 'shuzu', 'num'],
    data () {
      return {
        date: '2015-09-01',
        name: '',
        small: {
          'doctor': '',
          'dateline': '',
          'content': ''
        },
        arr1: ''
      }
    },
    beforeMount () {
      this.arr1 = this.shuzu ? this.shuzu : []
    },
    methods: {
      setdoctor (e) {
        this.small.doctor = e.mp.detail.value
      },
      dateChange (e) {
        this.small.dateline = this.date = e.mp.detail.value
      },
      getMessage () {
        this.name = 'z真的啊'
        this.$emit('changeName', this.name)
      },
      contentChange (e) {
        this.small.content = e.mp.detail.value
        this.arr1.push(this.small)
        this.$emit('add', this.arr1)
      }
    }
  }
</script>

<style lang="less" scoped>
  .add{
    display: flex;
    flex-direction: column;
    vertical-align: middle;
    border-bottom: 1px solid #ccc;
    padding-bottom: 30rpx;
    div{
      margin-left: 10rpx;
      line-height: 75rpx;
    }
    input{
      margin-left: 10rpx;
      line-height: 75rpx;
    }
  }
</style>
