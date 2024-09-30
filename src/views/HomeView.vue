<template>
  <div id="home">
    
    <div class="slide-container" :style="setBackgroundImage">
      <div id="banner">
        <div class="info">
          <div class="title">
          TRAVEL <br>
          TO # <span :key="slide.name">{{slide.name}}</span>
          </div>
          <div class="overview">
            <div class="app-description">
              'TRAVEL TO # ?'는 어디론가 여행을 떠나고 싶은 막연한 생각(어디 가지, 뭐 하지 등)들을
              태그(#)로 표현하고 선택함으로써 구체화해나가자는 의미로 정한 이름입니다.<br>
              <strong class="underline">한국관광공사의 '국문 관광정보 서비스' API</strong>를 이용하여 여행정보를 제공합니다.
            </div>
          </div>
        </div>
      </div>
      <div id="content-wrapper">

      </div>
    </div>


    <!-- <div id="banner">
      <transition-group name="fade" mode="out-in" tag="div" class="slides">
        <div class="slideParent" :key="slide.name">
          <div class="slideImage" :style="setBackgroundImage"></div>
        </div>
        <div class="info">
          <div class="title">
          TRAVEL <br>
          TO # <span :key="slide.name">{{slide.name}}</span>
          </div>
          <div class="overview">
            <div class="app-description">
              'TRAVEL TO # ?'는 어디론가 여행을 떠나고 싶은 막연한 생각(어디 가지, 뭐 하지 등)들을
              태그(#)로 표현하고 선택함으로써 구체화해나가자는 의미로 정한 이름입니다.<br>
              <strong class="underline">한국관광공사의 '국문 관광정보 서비스' API</strong>를 이용하여 여행정보를 제공합니다.
            </div>
          </div>
        </div>
      </transition-group>
    </div> -->

    <!-- <div id="content-wrapper">
      <div class="white-box">  
        <img src="@/assets/images/white-box.png"/>
      </div>
      <div class="week-festival">
        <div id='content'>
          <div class="semi-title">{{weekOfMonth}} 축제/행사는? 🎏</div>
          <div class="body">
            <div :class="['arrow-btn lft', {'clicked': lftClicked}]" @click="()=> {
              lftClicked = !lftClicked
              rgtClicked = !rgtClicked
              }"><ion-icon name="chevron-back-outline"></ion-icon>
            </div>

            <div class="cards">
              <b-card-group deck v-for="card in cultureStore.festivalList" :key="card.contentid">
                <b-card
                  :title="card.title"
                  :img-src="card.firstimage"
                  img-alt="Image"
                  img-top
                  tag="article"
                  style="max-width: 13rem;"
                  :class="['mb-2', {'go-lft': lftClicked, 'go-rgt': rgtClicked}]"
                  @click="pageLinkToDetail(card.contentid, card.contenttypeid)"
                >
                  <b-card-text>
                    <div class="date">{{setStEdDateForm(card.eventstartdate, card.eventenddate)}}</div>
                    <div class="addr">{{card.addr1}}</div>
                  </b-card-text>
                </b-card>
              </b-card-group> 
            </div>

            <div class="arrow-btn" :class="['arrow-btn rgt', {'clicked': rgtClicked || cultureStore.festivalList.length < 4}]" @click="()=> {
              lftClicked = !lftClicked
              rgtClicked = !rgtClicked
              }"><ion-icon name="chevron-forward-outline"></ion-icon>
            </div>
          </div>
          <div class="bottom">
              <router-link to="/culture" class="go-culture plus">축제/행사 더보기 +</router-link>
          </div>
        </div>
      </div>

      <div class="area-wrap">
        <div class="content">
          <div class="semi-title"> 
            지역별 여행지 🚗
          </div>
          <div class="plus">
            <router-link to="/culture" class="go-tour plus">지역 더보기 +</router-link>
          </div>

          <div class="area-btns">
            <div v-for="(area, idx) in areaCodes" :key="area.code">
              <button class="btn" @click="pageLinkToTour(area.code)" v-if="idx<10">
                <span>
                  <img :src="area.imgUrl" class="mini-thumb">
                </span>
                <div class="area-info">
                  <div class="area-txt">{{area.text}}</div>
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
    </div> -->
    <!-- <bottom-footer /> -->
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import {computed, ref, watch, onMounted} from 'vue'
import type {Ref} from 'vue'
import { useCultureStore } from '@/stores/culture'
import { useTourStore } from '@/stores/tour'
import moment from 'moment'
import IQuery from '@/types/query'
import { useRouter } from 'vue-router'
import BottomFooter from '@/components/BottomFooter.vue'

const areaCodes = require('@/assets/data/areacode.json').AREA

const cultureStore = useCultureStore()
const tourStore = useTourStore()

const router = useRouter()

//banner
let slide : Ref<any> = ref({
  url: areaCodes[0].imgUrl,
  name: '?',
})

let current : number = 0 

const showSlide = () => {
  setInterval(()=>{
    current++
    
    if(current >= areaCodes.length) {
      current = 0
    }

    const area = areaCodes[current];

    slide.value = { 
      url: '/images/background/beach.jpg',
      name: area.text === '전체' ? '?' : area.text2,
      // new URL(`../assets/images/background/${area.imgUrl}`, import.meta.url).href,
    };
    console.log('slide.value', slide.value.url)
  }, 4000)
}

const setBackgroundImage = computed(()=>{
  return { 
    backgroundImage: "url('/images/background/beach.jpg')"
  }
})

//지역 바로가기 이벤트
const pageLinkToTour = (code: string) => {
  router.push('/tour')
  tourStore.tourAreaCode = code
}

const pageLinkToDetail = (contentid: string | string[], contenttypeid: string) => {
  router.push(`/culture/detail/${contenttypeid}/${contentid}`)
}

//0월 0주차
let weekOfMonth : Ref<string> = ref("")

const setWeekOfMonth = () => {
  const nowDate = moment().utc(true)
  let week: number
  if (nowDate.month() === 0) week = nowDate.week() - moment(nowDate).startOf('month').week() + 1
  else week = nowDate.isoWeek() - moment(nowDate).startOf('month').isoWeek() + 1

  weekOfMonth.value = `${nowDate.month() + 1}월 ${week}주차`
} 



// 축제 정보
let query : Ref<IQuery> = ref({
  pageNo: '1',
  numOfRows: 5,
  eventStartDate: '',
  eventEndDate: '',
  areaCode: ''
})

const setEventStEdDate = () => {
  const nowDate = new Date()
  let newStDate = new Date(nowDate)
  let newEdDate = new Date(nowDate)
  const day: number = nowDate.getDay() // 일: 0, 월: 1, 화: 2, ... 토: 6

  newStDate.setDate((day === 0 ? newStDate.getDate()-6 : newStDate.getDate()-day+1))
  newEdDate.setDate((day !== 0 ? newEdDate.getDate()-day+7 : newEdDate.getDate()))

  query.value.eventStartDate = `${newStDate.getFullYear()}${newStDate.getMonth() < 9 ? '0'+(newStDate.getMonth()+1) : newStDate.getMonth()+1}${newStDate.getDate()}`
  //query.value.eventEndDate = newEdDate.getMonth() + 1 < 10 ? `${newEdDate.getFullYear()}0${newEdDate.getMonth()+1}0${newEdDate.getDate()}` : `${newEdDate.getFullYear()}${newEdDate.getMonth()+1}${newEdDate.getDate()}`

  console.log(query.value.eventStartDate)
  console.log(query.value.eventEndDate)
}

//축제 카드 날짜 form
const setStEdDateForm = (st:string, ed:string) : string => {
  let datearr:Array<string> = [st, ed]
  datearr.forEach((date:string, idx:number)=>{
    let y: string = date.substring(0, 4)
    let m: string = date.substring(4, 2)
    let d: string = date.substring(6, 2)
    datearr[idx] = `${y}.${m}.${d}`
  })
  return `${datearr[0]} ~ ${datearr[1]}`
}

//축제 정보 화살표
let lftClicked : Ref<boolean> = ref(true)
let rgtClicked : Ref<boolean> = ref(false)


setEventStEdDate();
cultureStore.getFestivalInfo(query.value);
setWeekOfMonth();

onMounted(() => {
  console.log('mounted')
  showSlide();
})

</script>
<style>

</style>