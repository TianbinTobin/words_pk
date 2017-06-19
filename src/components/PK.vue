<template>
  <div>
    <div class="app_container">
      <player ref="player" :player="player" :time="time" :current="currentExam" :total="examData.total"
              :PkDetailFrom="PkDetailFrom" :PkDetailTo="PkDetailTo" @next-exam="nextExam"></player>
      <div class="body">
        <transition-group
          tag="div"
          name="custom-classes-transition"
          enter-active-class="animated slideInRight"
          leave-active-class="animated slideOutLeft">
          <exam-item ref="exam" @send-msg="setMsg" v-for="(exam, index) in examData.data" :key="exam" :exam-item="exam"
                     :exam-index="index" v-show="(index === currentExam)"></exam-item>
        </transition-group>
      </div>
    </div>
    <div class="wrapper_container" v-show="warning">
      <span class="wrapper_warning_left"></span>
      <span class="wrapper_warning_right"></span>
    </div>
  </div>
</template>

<script>
  import player from '../components/Player.vue'
  import examItem from './Exam.vue'
  export default {
    name: 'pk',
    components: {
      player,
      examItem
    },
    props: ['player', 'examData', 'PkDetailFrom', 'PkDetailTo'],
    data: function () {
      return {
        currentExam: 0,
        examDisplay: false,
        questionNumDisplay: false,
        warning: false,
        time: 20,
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
    watch: {
      time: function (val, oldVal) {
        if (val === 0) {
          if (this.$refs.exam[this.currentExam].answer === false) {
            this.$refs.exam[this.currentExam].answer = true
            this.param.examNum = this.currentExam
            this.param.optionNum = null
            this.param.useTime = 20
            this.$root.Bus.$emit('send-msg', this.param)
          }
        }
      }
    },
    methods: {
      warningShow () {
        this.warning = true
      },
      warningHide () {
        this.warning = false
      },
      nextExam () {
        this.setOtherCheck(1, 2)
        if (this.countDownTimeOut) {
          clearTimeout(this.countDownTimeOut)
        }
        if (this.setTimeout) {
          clearTimeout(this.setTimeout)
        }
        this.setTimeout = setTimeout(this.changeExam, 1000)
      },
      changeExam () {
        if (this.currentExam < this.examData.total - 1) {
          this.currentExam++
          this.resetCountDown()
        }
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
        this.time = 20
        if (this.countDownTimeOut) {
          clearTimeout(this.countDownTimeOut)
        }
        this.countDown()
      },
      setMyMsg (data) {
        console.log(data)
      },
      setOtherMsg (data) {
        if (data.optionNum !== null) {
          this.setOtherCheck(data.examNum, data.optionNum)
        }
      },
      setMsg (param) {
        param.useTime = 20 - this.time
        this.$root.Bus.$emit('send-msg', param)
      },
      setOtherCheck (examNum, optionNum) {
        if (this.$refs.exam.length > 0) {
          this.$refs.exam[examNum].setOtherCheck(optionNum)
        }
      }
    },
    mounted () {
      this.resetCountDown()
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
    min-height: 100%;
    box-sizing: border-box;
    position: relative;
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
