<template>
  <div id="content">
    <div class="detail-container">
      <div class="nav">홈 > {{ getNavName }} > {{ detailInfo.title }}</div>
      <div class="detail-top">
        <div class="title"><strong>{{ detailInfo.title }}</strong></div>
        <div class="sigungu">{{ detailInfo.sigungu }} {{ commonsStore.detailType === 2 ? `| ${dateFormat(detailInfo.eventstartdate)} ~ ${dateFormat(detailInfo.eventenddate)}` : '' }}</div>
      </div>
      <div class="detail-body">
        <div class="images">
          <div v-if="detailInfo.firstimage" class="image-wrapper">
            <div v-if="!firstImageLoaded" class="loader"></div>
            <img
              v-show="firstImageLoaded"
              :src="detailInfo.firstimage"
              @load="firstImageLoaded = true"
              alt="first image"
            >
          </div>
          <div v-if="detailInfo.originimgurl" class="image-wrapper">
            <div v-if="!originImageLoaded" class="loader"></div>
            <img
              v-show="originImageLoaded"
              :src="detailInfo.originimgurl"
              @load="originImageLoaded = true"
              alt="origin image"
            >
          </div>
        </div>
        <div class="intro">
          <strong class="semi-title">{{ detailInfo.title }} 소개</strong>
          <div class="intro-des" v-html="detailInfo.overview" />
        </div>
        <div class="detail-info">
          <strong class="semi-title">상세정보</strong>
          <kakao-map :mapx="detailInfo.mapx" :mapy="detailInfo.mapy" :addr="detailInfo.addr1" />
          <info-table :detailInfo="detailInfo" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { reactive, ref, computed } from 'vue'
import { useRoute } from 'vue-router'
import { useCommonsStore } from '@/stores/commons'
import { IDetailInfo, IItemDetail, IItemDetail2 } from '@/types/tour-items'
import { fetchContentDetail, fetchContentDetail2, fetchDetailImage } from '@/api'
import KakaoMap from '@/components/KakaoMap.vue'
import InfoTable from '@/components/InfoTable.vue'
import { dateFormat } from '@/utils/string-utils'

const commonsStore = useCommonsStore();
const route = useRoute()

const getNavName = computed((): string => commonsStore.detailType === 1 ? '여행지' : (commonsStore.detailType === 2 ? '축제/행사' : '여가'));

/**************************** 디테일 페이지 데이터 관련 ***************************/
const detailInfo = reactive<IDetailInfo>({
  title: '',
  sigungucode: '',
  sigungu: '',
  firstimage: '',
  originimgurl: '',
  overview: '',
  homepage: '',
  addr1: '',
  usetime: '',
  restdate: '',
  parking: '',
  infocenter: '',
  eventstartdate: '',
  eventenddate: '',
  mapx: '',
  mapy: '',
  playtime: '',
  bookingplace: '',
  sponsor2: '',
  tel: '',
  usetimefestival: '',
  openperiod: '',
  usetimeleports: '',
})

const getContentDetail = (): void => {
  fetchContentDetail(route.params.id)
    .then((resp) => {
      const item = resp.data.response.body.items.item[0] as IItemDetail;
      
      detailInfo.title = item.title ?? '';
      detailInfo.sigungucode = item.sigungucode ?? '';
      detailInfo.firstimage = item.firstimage ?? '';
      detailInfo.overview = item.overview ?? '';
      detailInfo.addr1 = item.addr1 ?? '';
      detailInfo.homepage = item.homepage ?? '';
      detailInfo.mapx = item.mapx ?? '';
      detailInfo.mapy = item.mapy ?? '';
      detailInfo.tel = item.tel ?? '';

      let addr: string[] = item.addr1?.split(' ');
      detailInfo.sigungu = addr ? `${addr[0]} ${addr[1]}` : item.addr1;
    })
    .catch((err) => {
      console.error(err);
    })

  fetchContentDetail2(route.params.id, route.params.type)
    .then((resp) => {
      const item = resp.data.response.body.items.item[0] as IItemDetail2;
      
      detailInfo.usetime = item.usetime ?? '';
      detailInfo.restdate = item.restdate ?? '';
      detailInfo.parking = item.parking ?? '';
      detailInfo.infocenter = item.infocenter ?? '';
      detailInfo.eventstartdate = item.eventstartdate ?? '';
      detailInfo.eventenddate = item.eventenddate ?? '';
      detailInfo.playtime = item.playtime ?? '';
      detailInfo.bookingplace = item.bookingplace ?? '';
      detailInfo.sponsor2 = item.sponsor2 ?? '';
      detailInfo.usetimefestival = item.usetimefestival ?? '';
      detailInfo.reservation = item.reservation ?? '';
      detailInfo.openperiod = item.openperiod ?? '';
      detailInfo.usetimeleports = item.usetimeleports ?? '';
      detailInfo.restdateleports = item.restdateleports ?? '';
      detailInfo.infocenterleports = item.infocenterleports ?? '';
      detailInfo.parkingleports = item.parkingleports ?? '';
    })
    .catch((err) => {
      console.error(err);
    })

  fetchDetailImage(route.params.id)
    .then((resp) => {
      const item = resp.data.response.body.items.item[0];
      
      detailInfo.originimgurl = item.originimgurl ?? '';
    })
    .catch((err) => {
      console.error(err);
    })
}

/**************************** 이미지 관련 ***************************/
const firstImageLoaded = ref(false);
const originImageLoaded = ref(false);

/**************************** 호출부 ***************************/
getContentDetail()
</script>