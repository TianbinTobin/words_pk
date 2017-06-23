<template>
  <div class="exam_body" v-if="examItem.examWordType === 'SYRC'">
    <div class="exam_title">
      <div>{{examItem.stems.wordAttribute}}{{examItem.stems.wordTranslate}}</div>
      <div class="exam_title_voice">
        <button class="btn_voice" @click="playAudio">
          <span class="btn_voice_label">朗读</span>
          <i class="btn_voice_icon"></i>
        </button>
      </div>
    </div>
    <div class="exam_options">
      <exam-option v-for="(item, index) in examItem.options" :key="item" :option-index="index" :exam-option="item" :answer="answer" @exam-option-click="optionClick"></exam-option>
    </div>
  </div>
  <div class="exam_body" v-else-if="examItem.examWordType === 'TYXJ'">
    <div class="exam_title">
      <div>{{examItem.stems.wordName}}</div>
      <div class="exam_title_voice">
        <button class="btn_voice" @click="playAudio">
          <span class="btn_voice_label">朗读</span>
          <i class="btn_voice_icon"></i>
        </button>
      </div>
    </div>
    <div class="exam_options">
      <exam-option v-for="(item, index) in examItem.options" :key="item" :option-index="index" :exam-option="item" :answer="answer" @exam-option-click="optionClick"></exam-option>
    </div>
  </div>
  <div class="exam_body" v-else-if="examItem.examWordType === 'KCBT'">
    <div class="exam_title">
      <div>{{examItem.stems.wordName}}</div>
      <div class="exam_title_voice">
        <button class="btn_voice" @click="playAudio">
          <span class="btn_voice_label">朗读</span>
          <i class="btn_voice_icon"></i>
        </button>
      </div>
    </div>
    <div class="exam_options_pic">
      <exam-option-pic v-for="(item, index) in examItem.options" :key="item" :option-index="index" :exam-option="item" :answer="answer" @exam-option-click="optionClick"></exam-option-pic>
    </div>
  </div>
  <div class="exam_body" v-else-if="examItem.examWordType">
    <div class="exam_title">
      <div>{{examItem.stems.wordName}}</div>
      <div class="exam_title_voice">
        <button class="btn_voice" @click="playAudio">
          <span class="btn_voice_label">朗读</span>
          <i class="btn_voice_icon"></i>
        </button>
      </div>
    </div>
    <div class="exam_options">
      <exam-option v-for="(item, index) in examItem.options" :key="item" :option-index="index" :exam-option="item" :answer="answer" @exam-option-click="optionClick"></exam-option>
    </div>
  </div>
</template>

<script>
  import examOption from './ExamOption.vue'
  import examOptionPic from './ExamOptionPic.vue'
  export default {
    name: 'examItem',
    data () {
      return {
        answer: false,
        otherAnswer: false
      }
    },
    components: {
      examOption,
      examOptionPic
    },
    props: ['examItem', 'examIndex'],
    methods: {
      optionClick (param) {
        this.answer = true
        param.examNum = this.examIndex
        param.wordId = this.examItem.word.id
        this.$emit('send-msg', param)
      },
      setOtherCheck (optionNum) {
        this.otherAnswer = true
        if (optionNum !== -1) {
          if (this.$children.length > 0) {
            this.$children[optionNum].setChecked()
          }
        }
      },
      setCheckShow (optionNum) {
        if (optionNum !== -1) {
          if (this.$children.length > 0) {
            this.$children[optionNum].setCheckShow()
          }
        }
      },
      show () {
        this.$children.forEach(function (item) {
          item.show()
        })
      },
      playAudio () {
        this.audio.play()
      }
    },
    mounted () {
      this.audio = document.createElement('audio')
      this.audio.controls = false
      this.audio.src = this.examItem.stems.wordConvertPath
    }
  }
</script>

<style scoped>
  .exam_body {
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 4rem;
    position: absolute;
    top: 0;
    left: 0;

  }

  .exam_title {
    width: 100%;
    min-height: 10rem;
    text-align: center;
    font-size: 28px;
  }

  .exam_title_voice {
    width: 100%;
  }

  .btn_voice {
    background-color: #ffffff;
    border: 0;
    width: 9rem;
    height: 2.8rem;
    font-size: 18px;
    color: #747578;
    outline: none;
  }

  .btn_voice_label {
    font-size: 18px;
    color: #747578;
    vertical-align: middle;
  }

  .btn_voice_icon {
    background: url("../assets/icon_yuyin.png") no-repeat;
    background-size: contain;
    width: 18px;
    height: 18px;
    display: inline-block;
    vertical-align: middle;
  }

  .exam_options {
    width: 100%;
    min-height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  .exam_options_pic {
    width: 100%;
    min-height: 25rem;
  }
</style>
