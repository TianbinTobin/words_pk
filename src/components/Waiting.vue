<template>
  <div class="wait">
    <div class="w_head">
      <span class="w_head_label">1V1对战</span>
    </div>
    <div class="w_body">
      <div class="w_player_wait">
        <div class="w_player_logo">
          <div class="w_player pa">
            <div class="w_player_a"></div>
            <div class="w_player_b"></div>
            <div class="w_player_c">
              <img src="../assets/player_1_logo.png">
            </div>
          </div>
          <div class="w_player pb">
            <div class="w_player_a"></div>
            <div class="w_player_b"></div>
            <div class="w_player_c">
              <img src="../assets/player_2_logo.png">
            </div>
          </div>
        </div>
        <div class="w_player_label">
          <span>等待对方响应号召...</span>
        </div>
      </div>
    </div>
    <div class="w_foot">
      <button class="b_cancel" @click="cancelPK()">取消对战</button>
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Waiting',
    data () {
      return {
        msg: 'Welcome to Your Vue.js App'
      }
    },
    methods: {
      cancelPK () {
        this.$router.push('/pk')
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .wait {
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 4rem;
    display: flex;
    flex-flow: column;
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
  }

  .w_player_logo .pb {
    position: absolute;
    top: 0;
    right: 0;
  }

  .w_player_label {
    width: 100%;
    text-align: center;
    margin-top: 20px;
  }

  .w_player_label span{
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
    width: 18rem;
    height: 5rem;
    border: 1px solid #747578;
    border-radius: 100px;
    background-color: #ffffff;
    font-size: 1.4rem;
    color: #747578;
    outline: none;
    margin: 0 auto;
    display: block;
  }
</style>
