<template>
  <transition-group
    tag="div"
    name="custom-classes-transition"
    enter-active-class="animated slideInRight"
    leave-active-class="animated slideOutLeft">
    <exam-item v-for="(exam, index) in examList" :key="exam" :exam-item="exam" :exam-index="index" v-show="(index === current)"></exam-item>
  </transition-group>
</template>

<script>
  import examItem from './ExamItem.vue'
  export default {
    name: 'exam',
    data () {
      return {
        current: 0
      }
    },
    components: {
      examItem
    },
    props: ['examList'],
    methods: {
      nextExam () {
        this.current++
      }
    }
  }
</script>
