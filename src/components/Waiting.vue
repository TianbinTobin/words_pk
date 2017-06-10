<template>
  <div class="wait" v-if="friendPK">
    <div class="w_head">
      <span class="w_head_label">1V1对战</span>
    </div>
    <div class="w_body">
      <div class="w_player_wait">
        <div class="w_player_logo">
          <div class="w_player_pk" :class="{animation_pk_vs: state.animation_pk_vs}"></div>
          <div class="w_player pa" :class="{move_left: state.w_player_move_left}">
            <div class="w_player_a"></div>
            <div class="w_player_b"></div>
            <div class="w_player_c">
              <img src="../assets/player_1_logo.png">
            </div>
          </div>
          <div class="w_player pb" :class="{move_right: state.w_player_move_right}">
            <div class="w_player_a"></div>
            <div class="w_player_b"></div>
            <div class="w_player_c">
              <img src="../assets/player_2_logo.png">
            </div>
          </div>
        </div>
        <div class="w_player_label">
          <span>{{state.label}}</span>
        </div>
      </div>
    </div>
    <div class="w_foot">
      <button v-show="state.btnShow" class="b_cancel" @click="cancelPK()">取消对战</button>
    </div>
  </div>
  <div class="wait bg" v-else>
    <div class="radar_a">
      <div class="radar_cover" v-show="!state.animation_pk_vs">
        <div class="radar_cover_scan"></div>
      </div>
      <div class="radar_b">
        <div class="radar_c">
          <div class="radar_player">
            <div class="radar_player_pk" :class="{animation_pk_vs: state.animation_pk_vs}"></div>
            <div class="radar_player_a" :class="{radar_player_a_move: state.radar_player_b_move}">
              <img :src="user.logo">
            </div>
            <div class="radar_player_b" v-show="state.findRival" :class="{radar_player_b_move: state.radar_player_b_move}">
              <img :src="user.logo">
            </div>
          </div>
          <div class="radar_d"></div>
        </div>
      </div>
    </div>
    <div class="radar_foot">
      <div v-show="state.btnShow" class="b_cancel" @click="cancelPK()">取消对战</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Waiting',
    data () {
      return {
        friendPK: true,
        user: {
          logo: '/static/img/player_1_logo.b342afe.png'
        },
        state: {
          w_player_move_left: false,
          w_player_move_right: false,
          animation_pk_vs: false,
          radar_player_b_move: false,
          btnShow: true,
          label: '等待对方响应号召...',
          findRival: false
        }
      }
    },
    methods: {
      cancelPK () {
//        this.$router.push('/pk')
        this.start()
      },
      start () {
        this.stateChange()
//        let _this = this
//        setTimeout(function () {
//          _this.$router.push('/pk')
//        }, 2000)
      },
      stateChange () {
        this.state.label = '开始对战'
        this.state.w_player_move_left = true
        this.state.w_player_move_right = true
        this.state.animation_pk_vs = true
        this.state.btnShow = false
        this.state.findRival = true
        this.state.radar_player_b_move = true
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .bg {
    background: url(../assets/bj_img_yingzhan.png) no-repeat;
    background-size: cover;
    position: relative;
  }

  .radar_cover {
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    border-radius: 50%;
    transition: all;
    animation: radar_cover_rotate 4s infinite linear;
  }

  .radar_cover_scan {
    position: absolute;
    top: 0;
    right: 0;
    width: 50%;
    height: 50%;
    background-image: linear-gradient(-180deg, rgba(255, 255, 255, 0.00) 0%, rgba(255, 255, 255, 0.10) 100%);
  }

  @keyframes radar_cover_rotate {
    from {
      transform: rotate(0deg)
    }
    to {
      transform: rotate(360deg)
    }
  }

  .radar_a, .radar_b, .radar_c, .radar_d {
    box-sizing: border-box;
    border: 1px solid #ffffff;
    border-radius: 17.5rem;
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    margin: auto;
    width: 35rem;
    height: 35rem;
  }

  .radar_a {
    transform: scale(1.3);
  }

  .radar_b {
    transform: scale(0.75);
  }

  .radar_c {
    transform: scale(0.7);
  }

  .radar_d {
    transform: scale(0.6);
  }

  .radar_player {
    position: absolute;
    width: 100%;
    height: 30%;
    top: 35%;
    left: 0;
  }

  .radar_player_a {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 30%;
    height: 100%;
    border-radius: 50%;
    background-color: #FFFFFF;
    overflow: hidden;
    transition: all 0.8s linear;
    z-index: 5;
  }

  .radar_player_b {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    margin: auto;
    width: 30%;
    height: 100%;
    border-radius: 50%;
    background-color: #FFFFFF;
    overflow: hidden;
    transition: all 0.8s linear;
    z-index: 4;
  }

  .radar_player_a_move {
    animation: radar_player_a_move 0.8s linear;
    animation-fill-mode: forwards;
  }

  .radar_player_b_move {
    animation: radar_player_b_move 0.8s linear;
    animation-fill-mode: forwards;
  }

  @keyframes radar_player_a_move {
    from {right: 0}
    to {right: 46%}
  }

  @keyframes radar_player_b_move {
    from {left: 0}
    to {left: 46%}
  }

  .radar_player_a img, .radar_player_b img {
    max-width: 100%;
    max-height: 100%;
  }

  .radar_player_pk {
    position: absolute;
    z-index: 4;
    left: 0;
    right: 5px;
    top: 0;
    bottom: 0;
    width: 10rem;
    height: 14rem;
    margin: auto;
    opacity: 0;
    background: url(../assets/img_white.png) no-repeat center;
    background-size: cover;
    transition: all 1.2s ease-out;
    transform: scale(1);
    z-index: 6;
  }

  .radar_foot {
    width: 100%;
    flex: 1.5;
    display: flex;
    align-items: flex-end;
  }

  .wait {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 4rem;
    display: flex;
    flex-flow: column;
    overflow: hidden;
  }

  .w_head {
    width: 100%;
    flex: 1.5;
    text-align: center;
  }

  .w_head_label {
    font-size: 3.5rem;
    color: #000000;
  }

  .w_body {
    width: 100%;
    flex: 7;
    display: flex;
    align-items: center;
  }

  .w_player_wait {
    width: 100%;
  }

  .w_player_pk {
    position: absolute;
    z-index: 4;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    width: 7.35rem;
    height: 11.15rem;
    margin: auto;
    opacity: 0;
    background: url(../assets/img_chengse.png) no-repeat center;
    background-size: cover;
    transition: all 1.2s ease-out;
    transform: scale(1)
  }

  .animation_pk_vs {
    animation: animation_pk_vs_action 1.2s ease-out;
    animation-fill-mode: forwards;
  }

  @keyframes animation_pk_vs_action {
    0% {
      transform: scale(1);
      opacity: 0;
    }
    20% {
      opacity: 0.8;
    }
    50% {
      transform: scale(1.5);
      opacity: 1;
    }
    100% {
      transform: scale(1);
      opacity: 1;
    }
  }

  .w_player_logo {
    position: relative;
    width: 26rem;
    height: 18rem;
    margin: 0 auto;
  }

  .w_player_logo .w_player {
    width: 18rem;
    height: 18rem;
    border-radius: 9rem;
    box-sizing: border-box;
    position: relative;
  }

  .w_player_logo .w_player_a {
    width: 18rem;
    height: 18rem;
    border-radius: 9rem;
    box-sizing: border-box;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
    opacity: 0.37;
  }

  .pa .w_player_a {
    background-image: linear-gradient(0deg, #87DD49 0%, #87DD49 100%);
  }

  .pb .w_player_a {
    background-image: linear-gradient(0deg, #FFE100 0%, #FFAA00 100%);
  }

  .w_player_logo .w_player_b {
    width: 14rem;
    height: 14rem;
    border-radius: 7rem;
    box-sizing: border-box;
    margin: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    opacity: 0.37;
  }

  .pa .w_player_b {
    background-image: linear-gradient(0deg, #87DD49 0%, #87DD49 100%);
  }

  .pb .w_player_b {
    background-image: linear-gradient(0deg, #FFE100 0%, #FFAA00 100%);
  }

  .w_player_logo .w_player_c {
    width: 10rem;
    height: 10rem;
    border-radius: 5rem;
    box-sizing: border-box;
    margin: 4rem;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 3;
    overflow: hidden;
    background-color: #ffffff;
  }

  .w_player_c img {
    max-width: 100%;
    max-height: 100%;
  }

  .w_player_logo .pa {
    position: absolute;
    top: 0;
    left: 0;
    transition: all 0.4s linear;
  }

  .w_player_logo .pb {
    position: absolute;
    top: 0;
    right: 0;
    transition: all 0.4s linear;
  }

  .w_player_logo .move_left {
    left: -3.5rem !important;
  }

  .w_player_logo .move_right {
    right: -3.5rem !important;
  }

  .w_player_label {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  .w_player_label span {
    font-size: 20px;
    color: #66C224;
  }

  .w_foot {
    width: 100%;
    flex: 1.5;
    display: flex;
    align-items: flex-end;
  }

  .b_cancel {
    width: 14rem;
    height: 4rem;
    border: 1px solid #747578;
    border-radius: 100px;
    font-size: 1.4rem;
    color: #747578;
    outline: none;
    margin: 0 auto;
    display: block;
    text-align: center;
  }

  .radar_foot .b_cancel {
    width: 14rem;
    height: 4rem;
    border: 1px solid #ffffff;
    border-radius: 100px;
    font-size: 1.4rem;
    color: #ffffff;
    outline: none;
    margin: 0 auto;
    display: block;
    text-align: center;
    line-height: 4rem;
  }
</style>
