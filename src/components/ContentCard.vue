<template>
  <div class="content-card">
    <img :src="props.imgUrl" alt="card image" class="thumb"/>
    <div class="texts">
      <div class="card-title">{{ props.title }}</div>
    </div>
    
  </div>
</template>

<script setup lang='ts'>
import { defineProps } from 'vue';
import { useRouter } from 'vue-router';

const props = defineProps<{
  title: string;
  imgUrl: string;
  stDate: string;
  edDate: string;
  addr: string;
  link: string;
}>();


</script>