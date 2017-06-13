<template>
  <div class="exam_body">
    <div class="exam_title">{{examItem.title}}</div>
    <div class="exam_options">
      <exam-option v-for="item in examItem.options" :key="item" :exam-option="item" :answer="answer" @exam-option-click="optionClick"></exam-option>
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
      optionClick () {
        this.answer = true
      },
      setOtherCheck (id) {
        this.$children.forEach(function (item) {
          item.setOtherCheck(id)
        })
      }
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
    font-size: 24px;
  }

  .exam_options {
    width: 100%;
    min-height: 25rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
</style>
