<template>
  <div class="exam_body">
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
  export default {
    name: 'examItem',
    data () {
      return {
        answer: false
      }
    },
    components: {
      examOption
    },
    props: ['examItem', 'examIndex'],
    methods: {
      optionClick (param) {
        this.answer = true
        param.examNum = this.examIndex
        this.$emit('send-msg', param)
      },
      setOtherCheck (id) {
        if (this.$children.length > 0) {
          this.$children.forEach(function (item) {
            item.setOtherCheck(id)
          })
        }
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
</style>
