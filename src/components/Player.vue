<template>
  <div class="header">
    <div class="player_list clearfix">
      <div class="player_score">{{userStudentPkDetail.userStudentPkDetailFrom.score}}/{{userStudentPkDetail.userStudentPkDetailTo.score}}</div>
      <transition
        name="custom-classes-transition"
        enter-active-class="animated slideInLeft"
        leave-active-class="animated fadeOut">
        <div class="player_critical" v-show="criticalShow">
          <span class="player_critical_label">X{{userStudentPkDetail.userStudentPkDetailFrom.criticalNum}}</span>
        </div>
      </transition>
      <div class="player_item_l fl clearfix">
        <div class="player_logo">
          <div class="player_logo_cover">
            <span class="label">{{time}}</span>
          </div>
          <img :src="player.userStudentPkFrom.photo">
        </div>
        <div class="player_label">
          <div class="player_user fl">{{player.userStudentPkFrom.realName}}</div>
        </div>
        <div class="player_progress clearfix">
          <div class="player_progress_score fr" :style="{ width: l_player_width + '%' }"></div>
        </div>
      </div>
      <div class="player_item_r fr clearfix">
        <div class="player_logo">
          <div class="player_logo_cover">
            <span class="label">{{time}}</span>
          </div>
          <img :src="player.userStudentPkTo.photo">
        </div>
        <div class="player_label">
          <div class="player_user fr">{{player.userStudentPkTo.realName}}</div>
        </div>
        <div class="player_progress clearfix">
          <div class="player_progress_score fl" :style="{ width: r_player_width + '%' }"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'player',
    data () {
      return {
        criticalShow: false,
        fullScore: 483,
        l_player_score: 0,
        r_player_score: 0
      }
    },
    computed: {
      l_player_width: function () {
        return this.userStudentPkDetail.userStudentPkDetailFrom.score / this.fullScore * 100
      },
      r_player_width: function () {
        return this.userStudentPkDetail.userStudentPkDetailTo.score / this.fullScore * 100
      },
      criticalNum: function () {
        return this.userStudentPkDetail.userStudentPkDetailFrom.criticalNum
      }
    },
    props: ['player', 'time', 'current', 'userStudentPkDetail'],
    watch: {
      criticalNum: function (val, oldVal) {
        if (val > 0) {
          this.runCritical()
        }
      }
    },
    methods: {
      runCritical () {
        if (this.criticalSetTimeOut) {
          clearTimeout(this.criticalSetTimeOut)
        }
        this.criticalShow = true
        this.criticalSetTimeOut = setTimeout(this.criticalHide, 3000)
      },
      criticalHide () {
        this.criticalShow = false
      }
    }
  }
</script>
<style>
  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 2rem 4rem;
    height: 12rem;
  }

  .player_list {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    border-radius: 3.5rem;
    text-align: center;
    background: #EEEEEE;
    padding: 1rem;
    position: relative;
  }

  .player_score {
    position: absolute;
    margin: auto;
    top: 1rem;
    left: 0;
    right: 0;
    font-size: 2rem;
  }

  .player_critical {
    position: absolute;
    box-sizing: border-box;
    padding-top: 3.5rem;
    top: 6.5rem;
    left: 0;
    min-width: 5rem;
    height: 5rem;
    z-index: 5;
    background: url("../assets/img_dapao.png") no-repeat center;
    background-size: contain;
    text-align: right;
  }

  .player_critical_label {
    font-size: 14px;
    color: #EC7001;
  }

  .player_item_l, .player_item_r {
    position: relative;
    box-sizing: border-box;
    width: 50%;
    height: 100%;
  }

  .player_item_l {
    padding-left: 5rem;
  }

  .player_item_r {
    padding-right: 5rem;
  }

  .player_item_l .player_logo {
    left: 0;
  }

  .player_item_r .player_logo {
    right: 0;
  }

  .player_logo_cover {
    position: absolute;
    display: table;
    top: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.37);
    font-size: 2rem;
    color: #FFFFFF;
    border-radius: 50%;
  }

  .player_logo_cover .label {
    vertical-align: middle;
    display: table-cell;
  }

  .player_logo {
    position: absolute;
    top: 0;
    width: 4rem;
    height: 4rem;
    border-radius: 2rem;
    overflow: hidden;
  }

  .player_logo img {
    max-width: 100%;
    max-height: 100%;
  }

  .player_label {
    width: 100%;
    height: 3rem;
    line-height: 3rem;
    text-overflow: ellipsis;
  }

  .player_item_l .player_label {
    text-align: left;
  }

  .player_item_r .player_label {
    text-align: right;
  }

  .player_user {
    width: 60%;
    height: 100%;
    text-overflow: ellipsis;
    font-size: 1.2rem;
  }

  .player_progress {
    width: 100%;
    height: 1rem;
    background: #CBCBCB;
    box-sizing: border-box;
  }

  .player_item_l .player_progress {
    border-bottom-left-radius: 56px;
    border-top-left-radius: 56px;
    border-right: 1px solid #747578;
  }

  .player_item_r .player_progress {
    border-bottom-right-radius: 56px;
    border-top-right-radius: 56px;
    border-left: 1px solid #747578;
  }

  .player_progress_score {
    height: 1rem;
  }

  .player_item_l .player_progress_score {
    border-bottom-left-radius: 56px;
    border-top-left-radius: 56px;
    background: #68C426;
  }

  .player_item_r .player_progress_score {
    border-bottom-right-radius: 56px;
    border-top-right-radius: 56px;
    background: #FFDF4A;
  }
</style>
