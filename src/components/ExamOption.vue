<template>
  <div class="exam_option" :class="{right: right, error: error}" @click="optionClick()">
    <transition
      name="left-classes-transition"
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft">
      <div class="exam_option_icon_left" v-show="meCheck"></div>
    </transition>
    <span class="exam_option_text">{{examOption.text}}</span>
    <transition
      name="right-classes-transition"
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight">
      <div class="exam_option_icon_right" v-show="otherCheckShow"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'examOption',
    data () {
      return {
        right: false,
        error: false,
        meCheck: false,
        otherCheck: false,
        otherCheckShow: false,
        param: {
          roundResult: 0,
          criticalNum: 0,
          score: 0,
          examNum: 0,
          optionNum: 0,
          useTime: 0,
          userMode: 3
        }
      }
    },
    props: ['examOption', 'answer', 'optionIndex'],
    methods: {
      optionClick () {
        if (this.answer) {
          return
        }
        this.meCheck = true
        this.param.roundResult = this.examOption.answer ? 1 : 0
        this.param.optionNum = this.optionIndex
        this.$emit('exam-option-click', this.param)
      },
      setChecked () {
        this.otherCheck = true
      },
      setCheckShow () {
        this.otherCheckShow = true
      },
      show () {
        if (this.examOption.answer) {
          this.right = true
        } else {
          if (this.meCheck) {
            this.error = true
          }
        }
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

  .exam_option.right {
    border: 0;
    background: #27D4D7;
    color: #ffffff
  }

  .exam_option.error {
    border: 0;
    background: #FF2952;
    color: #ffffff;
  }

  .exam_option_icon_left {
    position: absolute;
    height: 3rem;
    left: -30px;
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
    right: -30px;
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
