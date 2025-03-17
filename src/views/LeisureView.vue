<template>
  <div id='content'>
    <div class="leisure-header">
      <div class="title">⛵뭐하고 놀까?</div>
      <div class="tabs">
        <div v-for="(lei, key) in leisure" :key="key" :class="['tab', {'clicked': lei.type === query.contentTypeId}]">
          <div @click="setTapActive(lei.type)">{{lei.text}}</div>
        </div>
      </div>
    </div>
    
<!--     <div>image & description</div> -->
    <div class="leisure-contents">
      <div class="leisure">
        <!--border bottom-->
        <div class="all-cate">
          <div class="categories">
            <div v-for="tag in nowTabContent.sub" :key="tag.value" class="category">
              <div :class="['tag', {'clicked': tag.value === query.cat2}]" @click="()=>{
                setSubCategories(tag)  
                }"
                >
                #{{tag.text}}</div>
            </div>
          </div>

          <div :class="['sub-categories', {'closed':!query.cat2}]">
            <button v-for="sub_tag in subCategories" :key="sub_tag.value" 
            :class="['subtag', {'clicked': query.cat3 === sub_tag.value}]"
            @click="()=>{ 
              query.cat3 = sub_tag.value
              getLeisureCards()
              }"
            >
              {{sub_tag.text}}
            </button>
          </div>
        </div>
        
        <div class="semi-content">
          <div class="totalCnt">총 <strong class="cnt">{{leisureStore.leisureItemCnt}}</strong>건</div>
          <b-dropdown size="sm" text="지역 분류" class="m-2" variant="outline">
            <div v-for="area in areaCodes" :key="area.code">
              <b-dropdown-item-button @click="()=>{
                query.areaCode = area.code
                leisureStore.getLeisureInfo(query)
                }"
                :class="['', {'clicked' : query.areaCode === area.code}]">
                {{area.text}}
              </b-dropdown-item-button>
            </div>
          </b-dropdown>
        </div>

        <div v-if="leisureStore.leisureList" class="list">
          <b-card-group v-for="card in leisureStore.leisureList" :key="card.contentid">
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
                <div>{{card.addr1}}</div>
              </b-card-text>
            </b-card>
          </b-card-group>
        </div>
        <div v-else-if="!leisureStore.leisureList" class="no-content">내용이 없습니다.</div>
      </div>

      <div class="paging" v-if="leisureStore.leisureItemCnt">
        <paginate
          :page-count="Math.ceil(leisureStore.leisureItemCnt/12)"
          :click-handler="getPageItems"
          :prev-text="'<'"
          :next-text="'>'"
          :container-class="'items-area'"
        >
        </paginate>
      </div>
      <!-- <div v-if-else="tapActive.shopping">지도와 리스트</div>
      <div v-if-else="tapActive.food">지도와 리스트</div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { onMounted, ref, watch } from 'vue'
import type { Ref } from 'vue'
import { Icat1, Icat2, Icat3 } from '@/types/category';
import { useLeisureStore } from '@/stores/leisure'
import { useRouter } from 'vue-router'
import _ from 'lodash'
import { IParam } from '@/types/query';
import Paginate from 'vuejs-paginate-next';

const leisure = require('@/assets/data/catcode.json').LEISURE
const areaCodes = require('@/assets/data/areacode.json').AREA

const leisureStore = useLeisureStore()

const router = useRouter()

let query : Ref<IParam> = ref({
  contentTypeId: '28',
  cat1: "A03",
  cat2: "",
  cat3: "",
  pageNo: '1',
  areaCode: ''
})

const resetQuery = () : void => {
  query.value = {
    cat1: "",
    cat2: "",
    cat3: "",
    pageNo: '1',
    areaCode: ''
  }
}

//최상단 탭
// contentTypeId로 구분
let nowTabContent : Ref<Icat1> = ref({})

const setTapActive = (type: string) : void => {
  resetQuery()
  setNowContent(type)
  
  if (type === '28') {
    query.value.cat1 = 'A03'
  }
  else if(type === '38') {
    query.value.cat1 = 'A04'
    query.value.cat2 = 'A0401'
    subCategories.value = nowTabContent.value.sub[0].sub2
    //setSubCategories(nowTabContent.value.sub[0])
    
  }
  else if(type === '39') {
    query.value.cat1 = 'A05'
    query.value.cat2 = 'A0502'
    subCategories.value = nowTabContent.value.sub[0].sub2
    //setSubCategories(nowTabContent.value.sub[0])
  }
  console.log(query.value)
  leisureStore.getLeisureInfo(query.value)
}

const setNowContent = (type: string) => {
  query.value.contentTypeId = type
  Object.entries(_.cloneDeep(leisure)).forEach((lei : any)=>{
    console.log('query.type:', query.value.contentTypeId)
    if(lei[1].type === query.value.contentTypeId) {
      nowTabContent.value = lei[1]
    }
  })
}

// sub categories
let subCategories : Ref<Array<Icat3>> = ref([])
let isSubTagOpen : Ref<boolean> = ref(false)

const setSubCategories = (tag: Icat2) => {
  query.value.areaCode = ''
  if(query.value.cat2 && tag.value === query.value.cat2) {
    query.value.cat2 = ''
    query.value.cat3 = ''
    subCategories.value = []
    console.log('case1')
  }
  else if (query.value.cat2 && tag.value !== query.value.cat2) {
    query.value.cat2 = tag.value
    subCategories.value = tag.sub2
    console.log('case2')
  }
  else if (!query.value.cat2) {
    query.value.cat2 = tag.value
    subCategories.value = tag.sub2
  }
  //console.log('subcate:', subCategories.value)
  getLeisureCards()
}

const getLeisureCards = () : void => {
  leisureStore.getLeisureInfo(query.value)
}

// detailView로 이동
const pageLink = (contentId : string, contentTypeId: string) => {
  router.push(`/leisure/detail/${contentTypeId}/${contentId}`)
}

//선택한 태그 표시.. 나중에 구현하자
const selectedTag : Ref<Array<Icat2 | Icat3>> = ref({
  text: "",
  value: ""
})

//페이지에 따른 데이터
const getPageItems = (pageNm: number) => {
  query.value.pageNo = pageNm
  leisureStore.getLeisureInfo(query.value)
}

//화면 만들때 실행
leisureStore.getLeisureInfo(query.value)
setNowContent('28')
onMounted(()=>{
  console.log(subCategories.value)
})

</script>
