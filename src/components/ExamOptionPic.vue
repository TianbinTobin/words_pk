<template>
  <div class="exam_option_pic" :class="{right: right, error: error, animation_scale_pic: meCheck}" @click="optionClick()">
    <transition
      name="left-classes-transition"
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft">
      <div class="exam_option_icon_left_pic" v-show="meCheck"></div>
    </transition>
    <div class="exam_option_text">
      <img :src="examOption.text" alt="选项">
    </div>
    <transition
      name="right-classes-transition"
      enter-active-class="animated slideInRight"
      leave-active-class="animated slideOutRight">
      <div class="exam_option_icon_right_pic" v-show="otherCheckShow"></div>
    </transition>
  </div>
</template>

<script>
  export default {
    name: 'examOptionPic',
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

<style>
  .exam_option_pic {
    width: calc(50% - 6px);
    float: left;
    text-align: center;
    box-sizing: border-box;
    height: 12rem;
    font-size: 18px;
    position: relative;
    margin: 3px;
  }

  .exam_option_pic.right {
    border: 3px solid #27D4D7;
  }

  .exam_option_pic.error {
    border: 3px solid #FF2952;
  }

  .exam_option_icon_left_pic {
    position: absolute;
    height: 3rem;
    left: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 5.5rem;
    background: url("../assets/img_tank_right.png") no-repeat center;
    background-size: contain;
    z-index: 9;
  }

  .exam_option_icon_right_pic {
    position: absolute;
    height: 3rem;
    right: 0;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 5.5rem;
    background: url("../assets/img_tank_left.png") no-repeat center;
    background-size: contain;
    z-index: 9;
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

  .exam_option_text>img {
    width: 100%;
    height: 100%;
  }

  .animation_scale_pic {
    animation: animation_scale_pic_action 0.8s linear;
    animation-fill-mode: forwards;
    transition: all linear 0.8s;
    z-index: 8;
  }

  @keyframes animation_scale_pic_action {
    0% {
      transform: scale(1);
    }
    50% {
      transform: scale(1.05);
    }
    100% {
      transform: scale(1);
    }
  }
</style>
