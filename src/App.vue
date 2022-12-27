<template>
  <div id="layout">
    <nav-bar id="navbar"/>
  </div>
  <router-view/>
</template>

<script>
/* eslint-disable */
import NavBar from '@/components/NavBar.vue'
import {defineComponent} from 'vue'

export default defineComponent({
  components: {
    NavBar,
  }
})

</script>

<style lang="scss">
@import "@/assets/scss/default.scss";
@import "@/assets/scss/commons.scss";
</style>
