<template>
  <div class="content-card" @click="goToDetail">
    <div class="img-wrapper">
      <img :src="imgUrl" @error="(e:any) => e.target.src='/images/travel-to.png'" alt="card image" class="thumb" />
    </div>
    <div class="texts">
      <div class="card-title">{{ props.title }}</div>
      <div class="card-detail">
        <div class="card-period"><span class="emoji">📅</span>{{ period }}</div>
        <div class="card-addr"><span class="emoji"></span>{{ props.addr }}</div>
      </div>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { computed, defineProps } from 'vue';
import { dateFormat } from '@/utils/string-utils';
import { useRouter } from 'vue-router';

const router = useRouter()

const props = defineProps<{
  title: string;
  imgUrl: string;
  stDate: string;
  edDate: string;
  addr: string;
  link: string;
}>();

const period = computed<string>((): string => {
  if (props.stDate !== props.edDate) {
    const st = dateFormat(props.stDate)
    const et = dateFormat(props.edDate)

    return `${st} ~ ${et}`
  } else {
    return dateFormat(props.stDate)
  }
})

const goToDetail = (): void => {
  router.push(props.link)
}

</script>