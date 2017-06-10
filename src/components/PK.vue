<template>
  <div>
    <div class="app_container">
      <player :user="user" :time="time" @next-exam="nextExam"></player>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated fadeIn"
        leave-active-class="animated fadeOut">
        <div class="body" v-show="examDisplay">
          <div class="exam_title">{{exam.title}}</div>
          <div class="exam_options">
            <div class="exam_option" v-for="item in exam.options" @click="optionClick(item.id, item.answer)">
              <div class="exam_option_icon_left" v-show="item.answer"></div>
              <div class="exam_option_icon_right" v-show="item.answer"></div>
              <span class="exam_option_text">{{item.content}}</span>
            </div>
          </div>
        </div>
      </transition>
    </div>
    <div class="wrapper_container" v-show="warning">
      <span class="wrapper_warning_left"></span>
      <span class="wrapper_warning_right"></span>
    </div>
    <div class="question_num_container" :class="{ question_number_animating: questionNumDisplay }">
      <div class="question_num_label">第 {{index}} 题</div>
    </div>
  </div>
</template>

<script>
  import player from '../components/Player.vue'
  export default {
    name: 'app',
    components: {
      player
    },
    data: function () {
      return {
        user: 'Tianbin',
        exam: {
          id: 1,
          title: '下面哪个单词是你好的意思？',
          options: [
            {
              id: 1,
              answer: true,
              content: 'Hello'
            },
            {
              id: 2,
              answer: false,
              content: 'What'
            },
            {
              id: 3,
              answer: false,
              content: 'How'
            },
            {
              id: 4,
              answer: false,
              content: 'Yeah'
            }
          ]
        },
        examDisplay: false,
        questionNumDisplay: false,
        warning: false,
        index: 0,
        time: 31
      }
    },
    methods: {
      examShow () {
        this.examDisplay = true
      },
      examHide () {
        this.examDisplay = false
      },
      warningShow () {
        this.warning = true
      },
      warningHide () {
        this.warning = false
      },
      questionNumShow () {
        this.questionNumDisplay = true
      },
      questionNumHide () {
        this.questionNumDisplay = false
      },
      nextExam () {
        this.index++
        this.examHide()
        this.questionNumShow()
        this.resetCountDown()
        if (this.setTimeout) {
          clearTimeout(this.setTimeout)
        }
        this.setTimeout = setTimeout(this.changeExam, 2000)
      },
      changeExam () {
        this.examShow()
        this.questionNumHide()
      },
      countDown () {
        if (this.time > 0) {
          if (this.time < 6) {
            this.warningShow()
          } else {
            this.warningHide()
          }
          this.time--
          this.countDownTimeOut = setTimeout(this.countDown, 1000)
        } else {
          clearTimeout(this.countDownTimeOut)
          this.nextExam()
        }
      },
      resetCountDown () {
        this.time = 31
        if (this.countDownTimeOut) {
          clearTimeout(this.countDownTimeOut)
        }
        this.countDown()
      },
      optionClick (id, answer) {
        if (answer === true) {
          for (let i = 0, len = this.exam.options.length; i < len; i++) {
            if (this.exam.options[i].id === id) {
              this.exam.options[i].answer = false
            }
          }
        }
      }
    },
    mounted () {
      this.nextExam()
//      let socket = new WebSocket('ws://localhost:8181?appId=123')
//      socket.onopen = function () {
//        console.log(1)
//      }
    }
  }
</script>
<style scoped>
  .app_container {
    display: flex;
    flex-direction: column;
    width: 100%;
    min-height: 100%;
    overflow: visible;
    overflow-x: hidden;
    position: absolute;
  }

  .body {
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 3rem;
  }

  .exam_title {
    width: 100%;
    min-height: 10rem;
    text-align: center;
    font-size: 24px;
  }

  .exam_options {
    width: 100%;
    min-height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }

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

  .wrapper_warning_left, .wrapper_warning_right {
    width: 4rem;
    height: 100%;
    position: absolute;
    top: 0;
    animation: wrapper_warning_action 1s ease-in-out infinite;
  }

  .wrapper_warning_left {
    left: 0;
    background: linear-gradient(90deg, #ed654b, rgba(237, 101, 75, 0))
  }

  .wrapper_warning_right {
    right: 0;
    background: linear-gradient(270deg, #ed654b, rgba(237, 101, 75, 0))
  }

  @keyframes wrapper_warning_action {
    0% {
      opacity: .01
    }
    50% {
      opacity: 1
    }
    to {
      opacity: .01
    }
  }

  .question_num_container {
    width: 100%;
    height: 100%;
    position: absolute;
    left: 0;
    top: 0;
    display: flex;
    justify-content: center;
    align-items: center;
    transition: all;
    transform: translate3d(100%, 0, 0)
  }

  .question_num_label {
    width: 20rem;
    height: 8rem;
    text-align: center;
    line-height: 8.6rem;
    color: #666;
    font-size: 2rem;
    background: url(../assets/bg-question-label.png) no-repeat 0;
    background-size: 100%
  }

  .question_number_animating {
    animation: question_number_move 1.8s cubic-bezier(0, 1, 1, 0) .1s 1
  }

  @keyframes question_number_move {
    to {
      -webkit-transform: translate3d(-100%, 0, 0);
      transform: translate3d(-100%, 0, 0)
    }
  }
</style>
