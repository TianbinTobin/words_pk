<template>
  <div class="header">
    <div class="player_list clearfix" @click="nextExam">
      <div class="player_score">33/25</div>
      <div class="player_item_l fl clearfix">
        <div class="player_logo fl">
          <img src="../assets/logo.png">
        </div>
        <div class="player_label">
          <div class="player_user fl">{{user}}</div>
        </div>
        <div class="player_progress clearfix">
          <div class="player_progress_score fr"></div>
        </div>
      </div>
      <div class="player_item_r fr clearfix">
        <div class="player_logo fr">
          <img src="../assets/logo.png">
        </div>
        <div class="player_label">
          <div class="player_user fr">{{user}}</div>
        </div>
        <div class="player_progress clearfix">
          <div class="player_progress_score fl"></div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'player',
    props: ['user'],
    methods: {
      nextExam () {
        this.$emit('next-exam')
      }
    }
  }
</script>
<style scoped>
  .header {
    width: 100%;
    box-sizing: border-box;
    padding: 2rem 2rem;
    height: 10rem;
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
    width: 60%;
  }
  .player_item_r .player_progress_score {
    border-bottom-right-radius: 56px;
    border-top-right-radius: 56px;
    background: #FFDF4A;
    width: 30%;
  }
</style>
