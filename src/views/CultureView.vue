<template>
  <div id='content'>
    <div class="top">
      <div class="festival-title">✨ 축제/행사 찾아보기</div>
      <div class="search-area">
        <div class="calendar">
          <v-date-picker v-model="date" :attributes='attributes' class="date-picker" @click="() => {
            setDateForm()
            cultureStore.getFestivalInfo(query)
            }"/>
        </div>
        <div class="tags">
          <div v-for="area in areaCodes" :key="area.code" :class="['tag', {'clicked':query.areaCode === area.code}]" @click="()=>{
            query.areaCode = area.code
            cultureStore.getFestivalInfo(query)
            }">
            <div class="item">#{{area.text}}</div>
          </div>
        </div>
      </div>
    </div>
    
    <div class="list">
      <div class="semi-title">{{date.getMonth()+1}}월 {{date.getDate()}}일의 행사/축제 🎏</div>
      <div class="totalCnt">총 <strong class="cnt">{{cultureStore.festivalItemCnt}}</strong>개</div>
      <!--border bottom-->
      <div class="festival" v-if="cultureStore.festivalList">
        <b-card-group v-for="card in cultureStore.festivalList" :key="card.contentid">
          <b-card
            :title="card.title"
            :img-src="card.firstimage"
            img-alt="Image"
            img-top
            tag="article"
            style="max-width: 17rem;"
            class="mb-2"
            @click="pageLink(card.contentid, card.contenttypeid)"
          >
            <b-card-text>
              <div class="date">{{setStEdDateForm(card.eventstartdate, card.eventenddate)}}</div>
              <div class="addr">{{card.addr1}}</div>
            </b-card-text>
          </b-card>
        </b-card-group>
      </div>

      <div v-else-if="!cultureStore.festivalList">
        내용이 없습니다.
      </div>
      
    </div>
    <div class="paging" v-if="cultureStore.festivalList">
      <paginate
        :page-count="Math.ceil(cultureStore.festivalItemCnt/12)"
        :click-handler="getPageItems"
        :prev-text="'<'"
        :next-text="'>'"
        :container-class="'items-area'"
      >
      </paginate>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import {reactive, ref, watch} from 'vue'
import type {Ref} from 'vue'
//import CultureCalendar from '@/components/CultureCalendar.vue'
import { useCultureStore } from '@/stores/culture'
import 'v-calendar/dist/style.css';
import Paginate from 'vuejs-paginate-next';
import IParam from '@/types/query'
import {useRouter} from 'vue-router'

const cultureStore = useCultureStore()
const areaCodes = require('@/assets/data/areacode.json').AREA

const router = useRouter()

let query : Ref<IParam> = ref({
  pageNo: '1',
  eventStartDate: '',
  eventEndDate: '',
  numOfRows: 12,
  areaCode: ''
})

//날짜 형식 세팅
const date : Ref<any> = ref(null)
date.value = new Date()

const setDateForm = () : void => {
  const year :number = date.value.getFullYear()
  let month :number|string = date.value.getMonth() + 1
  let day :number|string = date.value.getDate()

  if(month < 10) month = '0' + month
  if(day < 10) day = '0' + day

  query.value.eventStartDate = `${year}${month}${day}`
  query.value.eventEndDate = `${year}${month}${day}`
}

// 카드 날짜 세팅
const setStEdDateForm = (st:string, ed:string) : string => {
  let datearr:Array<string> = [st, ed]
  datearr.forEach((date:string, idx:number)=>{
    let y: string = date.substr(0, 4)
    let m: string = date.substr(4, 2)
    let d: string = date.substr(6, 2)
    datearr[idx] = `${y}.${m}.${d}`
  })
  return `${datearr[0]} ~ ${datearr[1]}`
}

// detailView로 이동
const pageLink = (contentId : string, contentTypeId: string) => {
  router.push(`/culture/detail/${contentTypeId}/${contentId}`)
}

//페이지에 따른 데이터
const getPageItems = (pageNm : number) => {
  query.value.pageNo = pageNm
  cultureStore.getFestivalInfo(query.value)
}

//화면 만들 때 실행
setDateForm()
cultureStore.getFestivalInfo(query.value)

</script>
<style>

</style>