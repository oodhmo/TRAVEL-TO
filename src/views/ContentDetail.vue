<template>
  <div id="content">
    <div class="detail-container">
      <div class="nav">홈 > {{ getNavName }} > </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive, watch, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonsStore } from '@/stores/commons'
import { IDetailInfo, IItemDetail } from '@/types/tour-items'
import { fetchContentDetail, fetchContentDetail2, fetchDetailImage, fetchSearchResult } from '@/api'

const commonsStore = useCommonsStore();
const route = useRoute()

const getNavName = computed((): string => commonsStore.detailType === 1 ? '여행지' : (commonsStore.detailType === 2 ? '축제/행사' : '여가'));

const detailInfo = reactive<IDetailInfo>({
  title: '',
  sigungucode: '',
  firstimage: '',
  originimgurl: '',
  overview: '',
  homepage: '',
  addr1: '',
  usetime: '',
  restdate: '',
  parking: '',
  infocenter: '',
})

const getContentDetail = (): void => {
  fetchContentDetail(route.params.id)
    .then((resp) => {
      const item = resp.response.body.items.item[0] as IItemDetail
      
      detailInfo.title = item.title
      detailInfo.sigungucode = item.sigungucode
      detailInfo.firstimage = item.firstimage
      detailInfo.overview = item.overview
      detailInfo.addr1 = item.addr1
      detailInfo.homepage = item.homepage
    })

  /* switch (commonsStore.detailType) {
    // 여행지
    case 1:
      break;
  } */
}
</script>