<template>
  <pk ref="pk" v-if="pk" :player="player" :userStudentPkDetail="userStudentPkDetail" :exam-data="exam"></pk>
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
        finish: false,
        robot: false,
        player: {
          userStudentPkFrom: {
            photo: require('../assets/player_0_logo.png'),
            realName: this.query.name
          },
          userStudentPkTo: {
            photo: require('../assets/player_0_logo.png'),
            realName: ''
          }
        },
        exam: {
          data: [],
          total: 0
        },
        userStudentPkDetail: {
          userStudentPkDetailFrom: {
            code: 0,
            criticalNum: 0,
            examNum: 0,
            optionNum: 0,
            roundResult: 0,
            score: 0,
            useTime: 0,
            userMode: 3
          },
          userStudentPkDetailTo: {
            code: 0,
            criticalNum: 0,
            examNum: 0,
            optionNum: 0,
            roundResult: 0,
            score: 0,
            useTime: 0,
            userMode: 3
          }
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
        },
        socket: null,  // WebSocket实例
        lockReconnect: false, // 避免重复连接
        wsUrl: 'ws://192.168.0.152:8085/ws?unitId=' + this.query.unitId + '&studentId=' + this.query.studentId
      }
    },
    methods: {
      createWebSocket (url) {
        try {
          this.socket = new WebSocket(url)
          this.initEventHandle()
        } catch (e) {
          this.reconnect(url)
        }
      },
      initEventHandle () {
        let _this = this
        this.socket.onclose = function (event) {
          console.log('Client notified socket has closed', event)
          if (!_this.finish) {
            _this.reconnect(_this.wsUrl)
          }
        }
        this.socket.onerror = function (event) {
          console.log('Client has a error', event)
          if (!_this.finish) {
            _this.reconnect(_this.wsUrl)
          }
        }
        this.socket.onopen = function () {
          // 心跳检测重置
          _this.heartCheck.reset().start()
          console.log('socket open', JSON.stringify(_this.param))
          _this.socket.send(JSON.stringify(_this.param))
        }
        this.socket.onmessage = function (event) {
          // 如果获取到消息，心跳检测重置
          // 拿到任何消息都说明当前连接是正常的
          _this.messageHandler(JSON.parse(event.data))
        }
      },
      reconnect (url) {
        let _this = this
        if (this.lockReconnect) {
          return
        }
        this.lockReconnect = true
        // 没连接上会一直重连，设置延迟避免请求过多
        setTimeout(function () {
          _this.createWebSocket(url)
          _this.lockReconnect = false
        }, 3000)
      },
      closeSocket () {
        console.log('socket close')
        this.end()
        this.param.userMode = 7
        this.sendMsg(this.param)
        this.socket.close()
      },
      sendMsg (data) {
        if (this.robot) {
          data.userMode = 6
        }
        data.studentId = this.param.studentId
        data.friendId = this.param.friendId
        this.socket.send(JSON.stringify(data))
        console.log('socket send', JSON.stringify(data))
        if (data.examNum === 19) {
          this.end()
        }
      },
      matchRobot () {
        this.param.userMode = 5
        this.socket.send(JSON.stringify(this.param))
        this.robot = true
      },
      pkStart (data) {
        console.log(data)
        if (data.userStudentPkFrom) {
          console.log(data.userStudentPkFrom)
          this.player.userStudentPkFrom = data.userStudentPkFrom
        }
        if (data.userStudentPkTo) {
          console.log(data.userStudentPkTo)
          this.player.userStudentPkTo = data.userStudentPkTo
        }
        if (data.userStudentPkDetail.text) {
          console.log(JSON.parse(data.userStudentPkDetail.text))
          this.param.studentId = data.userStudentPkDetail.studentId
          this.param.friendId = data.userStudentPkDetail.friendId
          this.exam = JSON.parse(data.userStudentPkDetail.text)
        }
        this.pk = true
      },
      getMyMsg (data) {
        console.log('我的答题信息', JSON.stringify(data.userStudentPkDetail))
        this.userStudentPkDetail.userStudentPkDetailFrom = data.userStudentPkDetail
        this.$refs.pk.setMyMsg(data.userStudentPkDetail)
      },
      getOtherMsg (data) {
        console.log('对方答题信息', JSON.stringify(data.userStudentPkDetail))
        this.userStudentPkDetail.userStudentPkDetailTo = data.userStudentPkDetail
        this.$refs.pk.setOtherMsg(data.userStudentPkDetail)
      },
      messageHandler (data) {
        let _this = this
        if (data.userStudentPkDetail.code === 1) {
          if (this.matchRobotTimeOut) {
            clearTimeout(this.matchRobotTimeOut)
          }
          if (!this.pk) {
            this.$refs.wait.start()
            setTimeout(function () {
              _this.pkStart(data)
            }, 3000)
          }
        } else if (data.userStudentPkDetail.code === 2) {
          this.getMyMsg(data)
        } else if (data.userStudentPkDetail.code === 3) {
          this.getOtherMsg(data)
        } else if (data.userStudentPkDetail.code === 4) {
          this.heartCheck.reset().start()
        }
      },
      end () {
        this.finish = true
        this.heartCheck.reset()
      }
    },
    beforeCreate () {
      this.query = {
        studentId: this.getQueryString('studentId'),
        photo: this.getQueryString('photo'),
        friendId: this.getQueryString('friendId'),
        mode: this.getQueryString('mode'),
        name: this.getQueryString('name'),
        token: this.getQueryString('token'),
        unitId: this.getQueryString('unitId')
      }
    },
    mounted () {
      const _this = this
      this.$root.Bus.$on('send-msg', this.sendMsg)
      if (this.query.photo) {
        this.player.userStudentPkFrom.photo = this.query.photo
      }
      if (this.query.studentId) {
        _this.heartCheck = {
          timeout: 30000,
          timeoutObj: null,
          serverTimeoutObj: null,
          reset: function () {
            clearTimeout(this.timeoutObj)
            clearTimeout(this.serverTimeoutObj)
            return this
          },
          start: function () {
            let self = this
            this.timeoutObj = setTimeout(function () {
              // 这里发送一个心跳，后端收到后，返回一个心跳消息，
              // onmessage拿到返回的心跳就说明连接正常
              _this.socket.send(JSON.stringify({code: 4, userMode: 4, studentId: _this.param.studentId}))
              // 如果超过一定时间还没重置，说明后端主动断开了
              self.serverTimeoutObj = setTimeout(function () {
                // 如果onclose会执行reconnect，我们执行ws.close()就行了.如果直接执行reconnect 会触发onclose导致重连两次
                _this.socket.close()
              }, self.timeout)
            }, this.timeout)
          }
        }
        _this.createWebSocket(_this.wsUrl)
        if (_this.query.mode === '2') {
          _this.matchRobotTimeOut = setTimeout(_this.matchRobot, 15000)
        }
      }
    }
  }
</script>
