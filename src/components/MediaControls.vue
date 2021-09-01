<template>
  <ul class="media-controls" :class="className">
    <li
      class="media-controls__item media-controls__item--video"
      :class="{ 'media-controls__item--off': isVideoEnabled }"
    >
      <button @click="toggleVideo">Video switch</button>
    </li>

    <li
      class="media-controls__item media-controls__item--audio"
      :class="{ 'media-controls__item--off': isAudioEnabled }"
    >
      <button @click="toggleAudio">Audio switch</button>
    </li>

    <li class="media-controls__item media-controls__item--decline">
      <button @click="decline">Decline</button>
    </li>
  </ul>
</template>

<script lang="ts">
import { ACTIONS } from "@/store";
import Vue from "vue";
import { mapActions, mapGetters } from "vuex";

export default Vue.extend({
  name: "MediaControls",

  beforeDestroy() {
    this.killJason();
  },

  computed: {
    ...mapGetters(["isAudioEnabled", "isVideoEnabled"]),
  },

  methods: {
    ...mapActions([
      ACTIONS.TOGGLE_AUDIO,
      ACTIONS.TOGGLE_VIDEO,
      ACTIONS.KILL_JASON,
    ]),

    decline(): void {
      this.$router.push("/");
    },
  },

  props: {
    className: {
      type: String,
    },
  },
});
</script>

<style lang="stylus">
.media-controls
  margin 0
  padding 0
  list-style none
  height 132px
  background linear-gradient(transparent, rgba(0, 0, 0, 0.86))
  display flex
  justify-content center
  align-items flex-start
  gap 35px

.media-controls__item
  margin-top 30px
  border-radius 50%
  overflow hidden

  & button
    font-size 0
    margin 0
    padding 0
    width 55px
    height 55px
    border none
    cursor pointer
    background-color #d9d9d9
    background-position center
    background-repeat no-repeat

  &--video button
    background-image url(../assets/img/video-off.svg)

  &--audio button
    background-image url(../assets/img/mic-off.svg)

  &--decline button
      background-color #990000
      background-image url(../assets/img/end-call.svg)

  &--off button
    background-color #6c6c6c

  &--off&--video button
    background-image url(../assets/img/video-on.svg)

  &--off&--audio button
    background-image url(../assets/img/mic-on.svg)
</style>
