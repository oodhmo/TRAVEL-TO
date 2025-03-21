<template>
  <div id="home">
    <div class="slide-container" :style="setBackgroundImage">
      <div class="home-wrapper">
        <div class="banner">
          <div class="info">
            <div class="title">
              TRAVEL <br>
              TO # <span :key="slide.name">{{ slide.name }}</span>
            </div>
            <div class="app-description">
              'TRAVEL TO # ?'는 어디론가 여행을 떠나고 싶은 막연한 생각(어디 가지, 뭐 하지 등)들을
              태그(#)로 표현하고 선택함으로써 구체화해나가자는 의미로 정한 이름입니다.<br>
              <strong class="underline">한국관광공사의 '국문 관광정보 서비스' API</strong>를 이용하여 여행정보를 제공합니다.
            </div>
            <div class="footer" v-if="screenWidth >= 1350">
              © 2024 Oodhmo All Rights Reserved.
            </div>
          </div>
        </div>
        <div class="content">
          <div class="white-box">
            <div class="info-set">
              <div class="week-festival">
                <div class="title-wrapper">
                  <div class="semi-title">{{ weekOfMonth }} 축제/행사는? 🎏</div>
                  <router-link to="/culture" class="plus">축제/행사 더보기 +</router-link>
                </div>

                <div class="fest-content" v-if="cultureStore.festivalList?.length > 0">
                  <div :class="['arrow-btn lft', { 'clicked': lftClicked }]" @click="() => {
                    lftClicked = !lftClicked
                    rgtClicked = !rgtClicked
                    slideLeft()
                  }"><ion-icon name="chevron-back-outline"></ion-icon>
                  </div>
                  <div class="cards-wrapper">
                    <div class="cards" :style="{ transform: `translateX(${translateX}px)` }">
                      <content-card v-for="item in cultureStore.festivalList" 
                        :key="item.contentid" 
                        :title="item.title"
                        :imgUrl="item.firstimage" 
                        :stDate="item.eventstartdate" 
                        :edDate="item.eventenddate"
                        :addr="item.addr1" 
                        :link="`/detail/${item.contenttypeid}/${item.contentid}`"
                        @click="() => commonsStore.detailType = 2" />
                    </div>
                  </div>
                  <div class="arrow-btn"
                    :class="['arrow-btn rgt', { 'clicked': rgtClicked || cultureStore.festivalList.length < 4 }]"
                    @click="() => {
                      lftClicked = !lftClicked
                      rgtClicked = !rgtClicked
                      slideRight()
                    }"><ion-icon name="chevron-forward-outline"></ion-icon>
                  </div>
                </div>
                <div v-else class="fest-content">
                  <div class="no-festival">
                    <span>이번 주에 진행 중인 축제/행사가 없습니다.</span>
                  </div>
                </div>
              </div>
              <div class="areas">
                <div class="title-wrapper">
                  <div class="semi-title">지역별 여행지 🚗</div>
                  <router-link to="/culture" class="plus">지역 더보기 +</router-link>
                </div>
                <div class="area-btns">
                  <div class="btn-list" v-for="(area, idx) in areaCodes" :key="area.code">
                    <button class="btn" @click="pageLinkToTour(area.code)" v-if="idx < 10">
                      <span>
                        <img :src="require(`../../public/images/background/${area.imgUrl}`)" class="mini-thumb">
                      </span>
                      <div class="area-info">
                        <div class="area-txt">{{ area.text }}</div>
                        <div class="baro-sm">
                          <span class="go-area sm10">바로가기</span>
                          <ion-icon name="arrow-forward-circle"></ion-icon>
                        </div>
                      </div>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="footer" v-if="screenWidth < 1350">
            © 2024 Oodhmo All Rights Reserved.
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { computed, ref, onMounted, onUnmounted } from 'vue'
import type { Ref } from 'vue'
import { useCultureStore } from '@/stores/culture'
import { useTourStore } from '@/stores/tour'
import moment from 'moment'
import { IParam } from '@/types/query'
import { useRouter } from 'vue-router'
import BottomFooter from '@/components/BottomFooter.vue'
import ContentCard from '@/components/ContentCard.vue'
import { useCommonsStore } from '@/stores/commons'

interface AreaCode {
  code: string;
  text: string;
  text2: string;
  imgUrl: string;
};

const areaCodes: AreaCode[] = require('@/assets/data/areacode.json').AREA;

const cultureStore = useCultureStore();
const commonsStore = useCommonsStore();
const tourStore = useTourStore();

const router = useRouter();

/*******  배경화면 슬라이드 *******/
let slide: Ref<{ url: string; name: string; }> = ref({
  url: `images/background/${areaCodes[0].imgUrl}`,
  name: '?',
});

let current: number = 0;
let intervalId: ReturnType<typeof setInterval> | null = null;

const preloadImage = (url: string): Promise<HTMLImageElement> => {
  // 이미지 변경 시 깜빡임 문제 -> 미리 다음 이미지 불러오기
  return new Promise((resolve) => {
    const img = new Image();

    img.src = url;
    img.onload = () => resolve(img);
  });
};

const showSlide = async (): Promise<void> => {
  await preloadImage(`/images/background/${areaCodes[1].imgUrl}`);

  intervalId = setInterval(async () => {
    current++;

    if (current >= areaCodes.length) {
      current = 0;
    }

    const area: AreaCode = areaCodes[current];
    const url: string = `images/background/${area.imgUrl}`;

    await preloadImage(url);

    slide.value = {
      url: url,
      name: area.text === '전체' ? '?' : area.text2,
    };
  }, 4000)
}

const setBackgroundImage: Ref<{ backgroundImage: string }> = computed(() => {
  return {
    backgroundImage: `url("${slide.value.url}")`
  }
})

/******* 지역 바로 가기 이벤트 *******/
const pageLinkToTour = (code: string): void => {
  router.push('/tour')
  tourStore.tourAreaCode = code
};

//00월 0주차
let weekOfMonth: Ref<string> = ref("");

const setWeekOfMonth = (): void => {
  const nowDate = moment().utc(true);
  let week: number;
  if (nowDate.month() === 0) week = nowDate.week() - moment(nowDate).startOf('month').week() + 1;
  else week = nowDate.isoWeek() - moment(nowDate).startOf('month').isoWeek() + 1;

  weekOfMonth.value = `${nowDate.month() + 1}월 ${week}주차`;
};

/******* 축제 정보 *******/
let query: Ref<IParam> = ref({
  pageNo: '1',
  numOfRows: 5,
  eventStartDate: '',
  eventEndDate: '',
  areaCode: ''
});

const setEventStEdDate = (): void => {
  const nowDate = new Date();
  let newStDate = new Date(nowDate);
  let newEdDate = new Date(nowDate);
  const day = nowDate.getDay(); // 일: 0, 월: 1, 화: 2, ... 토: 6

  newStDate.setDate(day === 0 ? newStDate.getDate() - 6 : newStDate.getDate() - day + 1);
  newEdDate.setDate(day !== 0 ? newEdDate.getDate() - day + 7 : newEdDate.getDate());

  const formatDate = (date: Date) =>
    `${date.getFullYear()}${String(date.getMonth() + 1).padStart(2, '0')}${String(date.getDate()).padStart(2, '0')}`;

  query.value.eventStartDate = formatDate(newStDate);
  query.value.eventEndDate = formatDate(newEdDate);
};


/******* 축제 정보 화살표 *******/
let lftClicked: Ref<boolean> = ref(true);
let rgtClicked: Ref<boolean> = ref(false);

const translateX: Ref<number> = ref(0);
const wrapperWidth: number = 680;
const cardListWidth: number = 1100;

const slideRight = (): void => {
  translateX.value = -(cardListWidth - wrapperWidth);
};

const slideLeft = (): void => {
  translateX.value = 0;
}

/******* 반응형 관련 이벤트 *******/
const screenWidth: Ref<number> = ref(window.innerWidth);

const updateScreenWidth = (): void => {
  screenWidth.value = window.innerWidth;
};

setEventStEdDate();
cultureStore.getFestivalInfo(query.value);
setWeekOfMonth();

onMounted(() => {
  showSlide();
  window.addEventListener('resize', updateScreenWidth);
});

onUnmounted(() => {
  if(intervalId) {
    clearInterval(intervalId);
    intervalId = null;
  }
  window.removeEventListener('resize', updateScreenWidth);
});
</script>