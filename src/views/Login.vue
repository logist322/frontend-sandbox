<template>
  <div class="login">
    <form class="login__form">
      <input class="login__input" type="text" placeholder="Room ID" />

      <input class="login__input" type="text" placeholder="Username" />

      <button class="login__button" type="submit">Join</button>
    </form>
  </div>
</template>

<script>
export default {
  name: "Login",
};
</script>

<style lang="stylus">
@import url(../styles/style.css)

.login
  margin 0 auto
  height 100%
  display flex
  align-self center
  background-color #ffffff

.login__form
  width 340px
  display flex
  flex-direction column
  gap 27px

.login__input
  background-color #f2f2f2
  border-radius 8px
  border none
  box-shadow inset 0px 0px 2px #000000
  padding 14px
  font-family Roboto, Arial, sans-serif
  font-size 22px
  line-height 1

.login__button
  background-color #757de8
  border-radius 8px
  border none
  padding 14px
  color #ffffff
  font-family Roboto, Arial, sans-serif
  font-size 16px
  cursor pointer
</style>
