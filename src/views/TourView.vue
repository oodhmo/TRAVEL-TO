<template>
  <div>
    <div id="content">
      <div class="search">
        <span class="title">🚗 어디로 놀러갈까?</span>
        <div class="btn-set">
          <button v-for="area in areaCodes" :key="area.code" :class="['', {'clicked': query.areaCode === area.code}]" @click="()=>{
                query.areaCode = area.code
                getAreaItems(query)
                tourStore.getAreaCode(query.areaCode)
                }">
            <strong>{{area.text2}}</strong>
          </button>
        </div>            
            <!-- <button class="cate-btn">카테고리<ion-icon name="add-circle" class="plus"/></button> -->
      </div>

      <div class="now-area">
        <div class="title"><strong >#{{nowArea.text}}</strong></div>
        <div class="tour-content">
          <div class="items">
            <div id="items-area">
              <div class="list-info">
                <span class="item-cnt">총 
                  <strong class="cnt">{{tourStore.tourItemsCount}}</strong>
                  개
                </span>
              </div>
              
              <div v-if="tourStore.tourList.item" class="wrapper">
                <div class="mt-4 spots"
                  v-for="des in tourStore.tourList.item" :key="des.contentid">
                  <b-card :img-src="des.firstimage" img-alt="Card image" img-left class="mb-3"
                    @click="pageLink(des.contentid, des.contenttypeid)">
                    <b-card-text>
                      <strong class="spot-title">{{des.title}}</strong>
                      <div>{{des.addr1}}</div>
                    </b-card-text>
                  </b-card>
                </div>
              </div>
              
              <div v-else class="no-content">내용이 없습니다.</div>
            </div>

            <div class="paging" v-if="tourStore.tourList">
              <paginate
                :page-count="Math.ceil(tourStore.tourItemsCount/10)"
                :click-handler="getPageItems"
                :prev-text="'<'"
                :next-text="'>'"
                :container-class="'items-area'"
              >
              </paginate>
            </div>
          </div>
          <div>
            <div class="sidebar">
            <div class="category">
              <!-- <div class="sigungu-area ptb10">
                <span v-for="sigungu in tourStore.sigunguCode" :key="sigungu.code" @click="()=>{
                  query.areaCode = sigungu.code
                  getAreaItems(query)
                  }">
                  <span class="item">#{{sigungu.name}}</span>
                </span>
              </div> -->
              <div class="cat1-area ptb10">
                <div v-for="(cat1, key) in categories" :key="key" class="cat-wrapper">
                  <span :class="['cat1', {'clicked': query.cat1 === cat1.value}]" @click="()=>{ 
                      setCatQueries(query.cat1, cat1.value)
                      getAreaItems(query)
                      setCat2()
                      }">
                      <span class="item">#{{cat1.text}}</span>
                  </span>
                </div>
              </div>

              <div class="cat2-area ptb10" v-if="query.cat1">
                <div v-for="cat2 in cat2List" :key="cat2.value" class="cat-wrapper">
                  <span :class="['cat2', {'clicked': query.cat2 === cat2.value}]" @click="()=>{ 
                      setCatQueries(query.cat2, cat2.value)
                      //cat1.openYN = !cat1.openYN
                      //resetQuery(cat1)
                      getAreaItems(query)
                      setCat3()
                  }">
                  <span class="item">#{{cat2.text}}</span>
                  </span>
                </div>
              </div>

              <div class="cat3-area ptb10" v-if="query.cat2">
                <div v-for="cat3 in cat3List" :key="cat3.value" class="cat-wrapper">
                  <span :class="['cat3', {'clicked': query.cat3 === cat3.value}]" @click="()=>{ 
                      setCatQueries(query.cat3, cat3.value)
                      getAreaItems(query)
                  }">
                  <span class="item">#{{cat3.text}}</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { defineComponent, ref, reactive, onMounted } from 'vue'
import type { Ref } from 'vue'
import { useTourStore } from '@/stores/tour'
import _ from 'lodash'
import { IQuery } from '@/types/query'
import { Icat1, Icat2, Icat3 } from '@/types/category'
import Paginate from 'vuejs-paginate-next';
import { useRouter } from 'vue-router'

const tourStore = useTourStore()
const router = useRouter()

const areaCodes = require('@/assets/data/areacode.json').AREA
const cateCodes = require('@/assets/data/catcode.json').TOUR_SPOT

//url query methods
let query : IQuery = reactive({
  listYN: "Y",
  areaCode: tourStore.tourAreaCode,
  cat1: "",
  cat2: "",
  cat3: "",
  pageNo: "1"
})

// 관광지 items 가져옴, 현재 지역 표시
let nowArea : Ref<string> = ref("전체")

const setNowArea = (code?:string) : void => {
  nowArea.value = _.find(areaCodes, {code: code})
}

const getAreaItems = (query : IQuery) : void => {
  resetPage()
  tourStore.getTourList(query)
  tourStore.getTourItemsCount(query)
  setNowArea(query.areaCode)
}

// sidebar 카테고리 관련
const categories = _.cloneDeep(cateCodes)

const setCatQueries = (queryCat: string, catValue: string) => {
  if(catValue.length === 3) {
    if(query.cat1 && (query.cat1===catValue)) {
      query.cat1 = ''
      query.cat2 = ''
      query.cat3 = ''
    }
    else if (query.cat1 && (query.cat1 !== catValue)) {
      query.cat1 = catValue
      query.cat2 = ''
      query.cat3 = ''
    }
    else if (!query.cat1) {
      query.cat1 = catValue
    }
  }
  else if(catValue.length === 5) {
    if(query.cat2 && (query.cat2===catValue)) {
      query.cat2 = ''
      query.cat3 = ''
    }
    else if (query.cat2 && (query.cat2 !== catValue)) {
      query.cat2 = catValue
      query.cat3 = ''
    }
    else if (!query.cat2) {
      query.cat2 = catValue
    }
  }
  else if(catValue.length === 9) {
    if(query.cat3 && (query.cat3===catValue)) {
      query.cat3 = ''
    }
    else if (query.cat3 && (query.cat3 !== catValue)) {
      query.cat3 = catValue
    }
    else if (!query.cat3) {
      query.cat3 = catValue
    }
  }
}

let cat2List : Ref<Array<Icat2>> = ref([])
let cat3List : Ref<Array<Icat3>> = ref([])
const setCat2 = () => {
  cat2List.value = _.find(categories, {value : query.cat1}).sub
}
const setCat3 = () => {
  cat3List.value = _.find(cat2List.value, {value : query.cat2}).sub2
}

//페이징
const getPageItems = (pageNm :number) => {
  query.pageNo = `${pageNm}`
  tourStore.getTourList(query)
}

const resetPage = () => {
  query.pageNo="1"
}

// detailView로 이동
const pageLink = (contentId : string, contentTypeId: string) => {
  router.push(`/tour/detail/${contentTypeId}/${contentId}`)
}


tourStore.getTourList(query) // 페이지 로드 시 전체 
tourStore.getTourItemsCount(query) // 데이터 총 개수
setNowArea(tourStore.tourAreaCode)
tourStore.resetAreaCode()
//tourStore.getAreaCode(query.areaCode)

onMounted(()=>{
  //console.log(tourStore.sigunguCode)
})

</script>

<style lang="css">
@import "https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css";
</style>



