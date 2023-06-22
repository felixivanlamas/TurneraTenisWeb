<script setup>
import { RouterView } from "vue-router";
import Menu from "./components/Menu.vue";
import Footer from "./components/Footer.vue";
</script>

<template>
  <Menu></Menu>
  <RouterView />
  <Footer></Footer>
</template>
