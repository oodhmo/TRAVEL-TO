<template>
  <div id="content">
    <div class="detail-container">
      <div class="nav">홈 > 여행지 > {{commonsStore.contentDetail.title}}</div>
      <div class="detail-top">
        <div class="title"><strong>{{commonsStore.contentDetail.title}}</strong></div>
        <div class="sigungu">{{commonsStore.sigungu}}</div>
      </div>
      <div class="detail-body">
        <div class="images">
          <img :src="commonsStore.contentDetail.firstimage">
          <img :src="commonsStore.detailImage.originimgurl">
        </div>
        <div class="intro">
          <div class="intro-des" v-html="commonsStore.contentDetail.overview" />
        </div>
        <div class="detail-info">
          <strong class="semi-title">상세정보</strong>
          <div id="map"></div>
          <div class="table-area">
            <table>
              <tbody v-if="route.params.type === '12'">
                <tr>
                  <th>홈페이지</th>
                  <td v-html="commonsStore.contentDetail.homepage"></td>
                </tr>
                <tr>
                  <th>상세주소</th>
                  <td>{{commonsStore.contentDetail.addr1}}</td>
                </tr>
                <tr>
                  <th>개방시기</th>
                  <td v-html="commonsStore.contentDetail2.usetime"></td>
                </tr>
                
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <th>쉬는 날</th>
                  <td>{{commonsStore.contentDetail2.restdate}}</td>
                </tr>
                <tr>
                  <th>주차장</th>
                  <td>{{commonsStore.contentDetail2.parking}}</td>
                </tr>
                <tr>
                  <th>문의및안내</th>
                  <td>{{commonsStore.contentDetail2.infocenter}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          
        </div>
        
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
/* eslint-disable */
import { ref, watch, computed } from 'vue'
import type {Ref} from 'vue'
import { useTourStore } from '@/stores/tour'
import { useCommonsStore } from '@/stores/commons'
import { useRoute } from 'vue-router'
import _ from 'lodash'

const tourStore = useTourStore()
const commonsStore = useCommonsStore()

const route = useRoute()

const cateCodes = require('@/assets/data/catcode.json')

const setSiGunGu = computed(() :string => {
  const sigungu :Array<string> = tourStore.contentDetail.addr1.split(' ')
  return `${sigungu[0]} ${sigungu[1]}`
})


commonsStore.getContentDetail(route.params.id, route.params.type)

//kakao map
let map: Ref<any> = ref(null) 

const loadScript = () => {
  const script = document.createElement("script");
  script.src=`//dapi.kakao.com/v2/maps/sdk.js?autoload=false&appkey=${process.env.VUE_APP_KAKAOMAP_KEY}`
  script.onload = () => window.kakao.maps.load(loadMap)

  document.head.appendChild(script)
}

const loadMap = () => {
  console.log(parseFloat(commonsStore.contentDetail.mapx), parseFloat(commonsStore.contentDetail.mapy))
  const container = document.getElementById("map")
  const options = {
    center: new window.kakao.maps.LatLng(commonsStore.contentDetail.mapy, commonsStore.contentDetail.mapx),
    level: 3,
  }
  map = new window.kakao.maps.Map(container, options)
  loadMarker()
}

const loadMarker = () => {
  const markerPosition = new window.kakao.maps.LatLng(commonsStore.contentDetail.mapy, commonsStore.contentDetail.mapx)
  const marker = new window.kakao.maps.Marker({
    position: markerPosition
  })

  marker.setMap(map)
}

//commonsStore.setContentCategories(tourStore.contentDetail.cat1, tourStore.contentDetail.cat2, tourStore.contentDetail.cat3, tourStore.contentDetail.contenttypeid)
watch(()=>commonsStore.contentDetail, ()=>{
  if(window.kakao && window.kakao.maps) {
    loadMap()
  }
  else {
    loadScript()
  }
})

// 화면 만들고 실행

</script>