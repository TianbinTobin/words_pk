<template>
  <div class="exam_option" @click="optionClick()">
    <div class="exam_option_icon_left" v-show="meCheck"></div>
    <div class="exam_option_icon_right" v-show="otherCheck"></div>
    <span class="exam_option_text">{{examOption.content}}</span>
  </div>
</template>

<script>
  export default {
    name: 'examOption',
    data () {
      return {
        meCheck: false,
        otherCheck: false
      }
    },
    props: ['examOption'],
    methods: {
      optionClick () {
        if (this.$parent.answer) {
          return
        }
        this.meCheck = true
        this.$emit('exam-option-click', this.examOption.id)
      }
    }
  }
</script>

<style scoped>
  .exam_option {
    width: 100%;
    text-align: center;
    box-sizing: border-box;
    height: 50px;
    border: 1px solid #CBCBCB;
    border-radius: 100px;
    font-size: 18px;
    position: relative;
  }

  .exam_option_icon_left {
    position: absolute;
    height: 3rem;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 5.5rem;
    background: url("../assets/img_tank_right.png") no-repeat center;
    background-size: contain;
  }

  .exam_option_icon_right {
    position: absolute;
    height: 3rem;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 5.5rem;
    background: url("../assets/img_tank_left.png") no-repeat center;
    background-size: contain;
  }

  .exam_option_text {
    width: 100%;
    height: 100%;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    justify-content: center;
    align-items: center;
    align-content: space-between;
    flex-wrap: wrap;
  }
</style>
