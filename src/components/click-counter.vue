<template>
    <div class="click-counter">
        <div class="counter-num">{{na}}：{{num}}</div>
        <button class="counter-btn" @click="handleClick">点我</button>
        <button class="counter-reset-btn" @click="handleResetClick">清零</button>
    </div>
</template>
<script>
export default {
  props: {
    number: {
      type: Number,
      default: 0
    },
    myMessage: String
  },
  data () {
    return {
      num: this.number,
      na: this.myMessage
    }
  },
  methods: {
    handleClick () {
      this.num += 1
      this.notifyNum()
    },
    handleResetClick () {
      this.num = 0
      this.notifyNum()
    },
    notifyNum () {
      this.$emit('clicknum', {
        num: this.num
      })
    }
  }
}
</script>
<style>
.click-counter{
    display:  flex;
    align-items: center;
    justify-content: center;
    border: 1px solid #ccc;
    background-color: #ffffff;
    padding: 10px;
}
.counter-num,
.counter-btn,
.counter-reset-btn {
  flex: 1;
  margin: 3px;
}
</style>

