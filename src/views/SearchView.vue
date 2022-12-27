<template>
  <div id="search">
    <div id="content">
      <div class="top">
        검색어 "{{route.query.keyword}}"
      </div>
      <div class="result-area">
        <div class="search-content">
          <div class="result">
            <div class="info">
              <div class="total-cnt">총 <span class="cnt">{{commonsStore.searchTotalCnt}}</span>개</div>
              <div class="classify">
                <span @click="()=>{
                  query.contentTypeId='12'
                  commonsStore.getSearchResult(query)
                  }" :class="['item', {'clicked' : query.contentTyppId === '12'}]">여행지</span> |
                <span @click="()=>{
                  query.contentTypeId='15'
                  commonsStore.getSearchResult(query)
                  }" :class="['item', {'clicked' : query.contentTyppId === '15'}]">축제/행사</span> |
                <span @click="()=>{
                  query.contentTypeId='28'
                  commonsStore.getSearchResult(query)
                  }" :class="['item', {'clicked' : query.contentTyppId === '28'}]">여가활동</span>
              </div>
            </div>

            <div v-if="commonsStore.searchResult" class="list">
              <div v-for="re in commonsStore.searchResult" :key="re.contentid">
                <b-card :img-src="re.firstimage" img-alt="Card image" img-left class="mb-3" @click="pageLink(re.contentid, re.contenttypeid)">
                  <b-card-text>
                    <strong class="result-title">{{re.title}}</strong>
                    <div class="addr">{{re.addr1}}</div>
                  </b-card-text>
                </b-card>
              </div>
            </div>
            
            <div v-else-if="!commonsStore.searchResult" class="no-content">내용이 없습니다.</div>

            <div class="paging" v-if="commonsStore.searchResult">
                <paginate
                  :page-count="Math.ceil(commonsStore.searchTotalCnt/10)"
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
              <div class="items">
                <div v-for="area in areaCodes" :key="area.code" class="area-item">
                  <div :class="['area', {'clicked': query.areaCode === area.code}]" @click="()=>{
                    query.areaCode = area.code
                    commonsStore.getSearchResult(query)
                    }">#{{area.text}}</div>
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
import { useCommonsStore } from '@/stores/commons'
import { onMounted, reactive, ref } from 'vue'
import type { Ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import Paginate from 'vuejs-paginate-next'
import { IQuery } from '@/types/query'

const commonsStore = useCommonsStore()

const route = useRoute()
const router = useRouter()

const areaCodes = require('@/assets/data/areacode.json').AREA

let query : IQuery = reactive({
  keyword: route.query.keyword,
  contentTypeId: '12',
  areaCode: '',
  pageNo: '1',
})

const goToSearch = () => {
  router.push({ name: 'search', query: { 
    keyword: route.query.keyword, 
    contentTypeId: route.query.contentTypeId, 
    areaCode: route.query.areaCode,
    pageNo: route.query.pageNo }})
}

// 디테일 페이지로 이동 
const pageLink = (contentId : string, contentTypeId: string) => {
  if(contentTypeId === '12') {
    router.push(`/tour/detail/${contentTypeId}/${contentId}`)
  }
  else if(contentTypeId === '15') {
    router.push(`/culture/detail/${contentTypeId}/${contentId}`)
  }
  else if(contentTypeId === '28') {
    router.push(`/leisure/detail/${contentTypeId}/${contentId}`)
  }
  
}

//페이징
const getPageItems = (pageNm :number) => {
  query.pageNo = `${pageNm}`
  commonsStore.getSearchResult(query)
}

onMounted(()=>{
  const keyword = String(route.query.keyword)
  commonsStore.getSearchResult(query)
})
</script>
<style>

</style>