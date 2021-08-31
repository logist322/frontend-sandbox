<template>
  <div class="room">
    <div class="room__name">
      <p>Ferris</p>
    </div>

    <audio class="room__remote-audio" autoplay></audio>
    <video class="room__remote-video" autoplay></video>

    <video class="room__local-video" autoplay></video>

    <media-controls :className="'room__controls'" />
  </div>
</template>

<script lang="ts">
import Vue from "vue";
import { mapGetters } from "vuex";
import MediaControls from "./MediaControls.vue";

export default Vue.extend({
  name: "RoomInterface",
  components: { MediaControls },

  async mounted() {
    document.addEventListener("mousemove", this.addMouseMovehandler);

    await this.$store.dispatch("initConnection");

    this.drawVideos();
  },

  beforeDestroy() {
    this.killJason();
  },

  computed: {
    ...mapGetters(["localStream", "remoteStream"]),
  },

  methods: {
    killJason() {
      this.$store.dispatch("killJason");
    },

    drawVideos() {
      const localVideoElements = this.$el.querySelectorAll("video");

      localVideoElements.forEach((element) => {
        if (element.classList.contains("room__local-video")) {
          element.srcObject = this.localStream;
        }

        if (element.classList.contains("room__remote-video")) {
          element.srcObject = this.remoteStream;
        }
      });
    },

    addMouseMovehandler() {
      const roomNameElement = document.querySelector(".room__name");
      const roomControlsElement = document.querySelector(".room__controls");

      if (roomNameElement) {
        roomNameElement.classList.remove("hide-up");
        setTimeout(() => {
          roomNameElement.classList.add("hide-up");
        }, 1000);
      }

      if (roomControlsElement) {
        roomControlsElement.classList.remove("hide-down");
        setTimeout(() => {
          roomControlsElement.classList.add("hide-down");
        }, 1000);
      }
    },
  },
});
</script>

<style lang="stylus">
@import url(../styles/style.css)

@keyframes hideUp {
  0% {
    transform translateY(0)
  }

  100% {
    transform translateY(-100%)
  }
}

@keyframes hideDown {
  0% {
    transform translateY(0)
  }

  100% {
    transform translateY(100%)
  }
}

.hide-up {
  animation-name hideUp
  animation-duration 1s
  animation-delay 1s
  transition-delay 1s
  transform translateY(-100%)
}

.hide-down {
  animation-name hideDown
  animation-duration 1s
  animation-delay 1s
  transition-delay 1s
  transform translateY(100%)
}

.room
  width 100%
  background-color #000000

.room__name
  position fixed
  top 0
  left 0
  width 100%
  display flex
  justify-content center
  align-items flex-start
  height 132px
  background linear-gradient(rgba(0, 0, 0, 0.86), transparent)

  & p
    margin 0
    margin-top 20px
    padding 0
    font-family Roboto, Arial, sans-serif
    font-size 22px
    line-height 1
    color #ffffff

.room__remote-video
  display block
  max-width 100%
  max-height 100%
  height 100%
  margin 0 auto

.room__local-video
  position fixed
  top 43px
  right 27px
  height 230px

  @media(max-width: 767px) {
    top 16px
    right 16px
    height 150px
  }

.room__controls
  position fixed
  bottom 0
  left 0
  width 100%
</style>
