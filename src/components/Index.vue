<template>
  <pk ref="pk" v-if="pk" :player="player" :exam-data="exam"></pk>
  <waiting v-else ref="wait" :player="player"></waiting>
</template>

<script>
  import pk from './PK.vue'
  import waiting from './Waiting.vue'
  export default {
    name: 'index',
    components: {
      pk,
      waiting
    },
    data () {
      return {
        pk: false,
        player: {
          l_player: {
            photo: '/static/img/player_1_logo.png'
          },
          r_player: {
            photo: '/static/img/player_0_logo.png'
          }
        },
        exam: {
          data: [],
          total: 0
        },
        param: {
          studentId: this.query.studentId,
          friendId: this.query.friendId,
          roundResult: 0,
          criticalNum: 0,
          challengeTime: new Date(),
          score: 0,
          examNum: 0,
          rightNum: 0,
          wrongNum: 0,
          contentId: null,
          userModel: 1
        }
      }
    },
    beforeCreate () {
      this.query = this.$route.query
    },
    mounted () {
      const _this = this
      if (this.param.studentId) {
        _this.socket = new WebSocket('ws://192.168.0.152:8085/ws?studentId=' + this.param.studentId)
        _this.socket.onopen = function () {
          console.log(_this.socket)
          _this.socket.send(JSON.stringify(_this.param))
          // 监听消息
          _this.socket.onmessage = function (event) {
            console.log('Client received a message', event)
            console.log(JSON.parse(event.data))
            _this.player.l_player = JSON.parse(event.data).userStudentPkFrom
            _this.player.r_player = JSON.parse(event.data).userStudentPkTo
            _this.exam = JSON.parse(JSON.parse(event.data).userStudentPkDetail.text)
          }
          // 监听错误
          _this.socket.onerror = function (event) {
            console.log('Client has a error', event)
          }
          // 监听Socket的关闭
          _this.socket.onclose = function (event) {
            console.log('Client notified socket has closed', event)
          }
        }
      }
    }
  }
</script>
