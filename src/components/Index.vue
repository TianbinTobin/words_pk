<template>
  <pk ref="pk" v-if="pk" :player="player" :exam-data="exam"></pk>
  <waiting v-else ref="wait" :player="player" @close-socket="closeSocket"></waiting>
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
        studentId: this.query.studentId,
        friendId: this.query.friendId,
        player: {
          l_player: {
            photo: this.query.photo,
            realName: 'Tianbin'
          },
          r_player: {
            photo: require('../assets/player_0_logo.png'),
            realName: ''
          }
        },
        exam: {
          data: [
            {
              stems: {
                wordName: 'Hello',
                wordConvertPath: 'http://192.168.0.203/media/audio/201705/54cd57d15a4f4288898694421b569442.mp3'
              },
              options: [
                {
                  answer: true,
                  text: 'Hello'
                },
                {
                  answer: false,
                  text: 'Hello'
                },
                {
                  answer: false,
                  text: 'Hello'
                },
                {
                  answer: false,
                  text: 'Hello'
                }
              ]
            }
          ],
          total: 1
        },
        param: {
          studentId: this.query.studentId,
          friendId: this.query.friendId,
          roundResult: 0,
          criticalNum: 0,
          challengeTime: new Date().getTime(),
          score: 0,
          examNum: 0,
          optionNum: 0,
          rightNum: 0,
          wrongNum: 0,
          contentId: null,
          userMode: this.query.mode,
          useTime: 0
        }
      }
    },
    methods: {
      closeSocket () {
        this.socket.close()
      },
      sendMsg (msg) {
        console.log(msg)
//        this.socket.send(JSON.stringify(msg))
      },
      pkStart (data) {
        console.log(data)
        if (data.userStudentPkFrom) {
          console.log(data.userStudentPkFrom)
          this.player.l_player = data.userStudentPkFrom
        }
        if (data.userStudentPkTo) {
          console.log(data.userStudentPkTo)
          this.player.r_player = data.userStudentPkTo
        }
        if (data.userStudentPkDetail.text) {
          console.log(JSON.parse(data.userStudentPkDetail.text))
          this.exam = JSON.parse(data.userStudentPkDetail.text)
        }
        this.pk = true
      },
      getMyMsg (data) {
        this.$refs.pk.setMyMsg(data)
      },
      getOtherMsg (data) {
        this.$refs.pk.setOtherMsg(data)
      },
      messageHandler (data) {
        if (data.userStudentPkDetail.code === 2) {
          this.pkStart(data)
        } else if (data.userStudentPkDetail.code === 1) {
          this.getMyMsg(data)
        } else if (data.userStudentPkDetail.code === 3) {
          this.getOtherMsg(data)
        }
      }
    },
    beforeCreate () {
      this.query = this.$route.query
    },
    mounted () {
      const _this = this
      this.$root.Bus.$on('send-msg', this.sendMsg)
      if (this.query.studentId) {
        _this.socket = new WebSocket('ws://192.168.0.152:8085/ws?unitId=1&studentId=' + this.query.studentId)
        _this.socket.onopen = function () {
          console.log(_this.socket)
          _this.socket.send(JSON.stringify(_this.param))
          // 监听消息
          _this.socket.onmessage = function (event) {
            console.log('Client received a message', event)
            _this.messageHandler(JSON.parse(event.data))
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
