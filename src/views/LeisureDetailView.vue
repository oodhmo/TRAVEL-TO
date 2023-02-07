<template>
  <div id="content">
    <div class="detail-container">
      <!-- <ion-icon name="arrow-back-outline" class="back"></ion-icon> -->
      <div class="nav">홈 > 여가 > {{commonsStore.contentDetail.title}}</div>
      <div class="detail-top">
        <div class="title"><strong>{{commonsStore.contentDetail.title}}</strong></div>
        <div class="sigungu">{{commonsStore.sigungu}} 
          <span v-if="commonsStore.contentDetail.firstmenu">| {{commonsStore.contentDetail2.firstmenu}}</span>
        </div>
      </div>
      <div class="detail-body">
        <div class="images">
          <img :src="commonsStore.contentDetail.firstimage">
          <img :src="commonsStore.detailImage.originimgurl">
        </div>
        <div class="intro">
          <div class="intro-des pd10" v-html="commonsStore.contentDetail.overview" />
        </div>
        <div class="detail-info" v-if="commonsStore.contentDetail2.shopguide">
          <strong class="semi-title">쇼핑 가이드</strong>
          <div v-html="commonsStore.contentDetail2.shopguide" class="pd10"/>
        </div>
        <div class="detail-info" v-if="commonsStore.contentDetail2.treatmenu">
          <strong class="semi-title">주요메뉴</strong>
          <div v-html="commonsStore.contentDetail2.treatmenu" class="pd10"/>
        </div>
        <div class="detail-info">
          <strong class="semi-title">상세정보</strong>
          <div id="map"></div>
          <div class="table-area" v-if="commonsStore.contentDetail.contenttypeid === '28'">
            <table>
              <tbody>
                <tr>
                  <th>홈페이지</th>
                  <td v-html="commonsStore.contentDetail.homepage"></td>
                </tr>
                <tr>
                  <th>예약정보</th>
                  <td v-html="commonsStore.contentDetail2.reservation"></td>
                </tr>
                <tr>
                  <th>문의및안내</th>
                  <td>{{commonsStore.contentDetail2.infocenterleports}}</td>
                </tr>
                <tr>
                  <th>주차장이용</th>
                  <td v-html="commonsStore.contentDetail2.parkingleports"></td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <th>상세주소</th>
                  <td>{{commonsStore.contentDetail.addr1}}({{commonsStore.contentDetail.zipcode}})</td>
                </tr>
                <tr>
                  <th>개장기간</th>
                  <td>{{commonsStore.contentDetail2.openperiod}}</td>
                </tr>
                <tr>
                  <th>이용시간</th>
                  <td>{{commonsStore.contentDetail2.usetimeleports}}</td>
                </tr>
                
                <tr>
                  <th>반려동물</th>
                  <td>{{commonsStore.contentDetail2.chkpetleports}}</td>
                </tr>
              </tbody>
            </table>
          </div>
          

          <div class="table-area" v-if="commonsStore.contentDetail.contenttypeid === '38'">
            <table>
              <tbody>
                <tr>
                  <th>홈페이지</th>
                  <td v-html="commonsStore.contentDetail.homepage"></td>
                </tr>
                <tr>
                  <th>개장일</th>
                  <td v-html="commonsStore.contentDetail2.opendateshopping"></td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{{commonsStore.contentDetail.tel}}</td>
                </tr>
                <tr>
                  <th>주차장이용</th>
                  <td v-html="commonsStore.contentDetail2.parkingshopping"></td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <th>상세주소</th>
                  <td>{{commonsStore.contentDetail.addr1}}({{commonsStore.contentDetail.zipcode}})</td>
                </tr>
                <tr>
                  <th>쉬는날</th>
                  <td>{{commonsStore.contentDetail2.restdateshopping}}</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>{{commonsStore.contentDetail2.opentime}}</td>
                </tr>
                <tr>
                  <th>판매품목</th>
                  <td>{{commonsStore.contentDetail2.saleitem}}</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="table-area" v-if="commonsStore.contentDetail.contenttypeid === '39'">
            <table>
              <tbody>
                <tr>
                  <th>홈페이지</th>
                  <td v-html="commonsStore.contentDetail.homepage"></td>
                </tr>
                <tr>
                  <th>예약</th>
                  <td v-html="commonsStore.contentDetail2.reservationfood"></td>
                </tr>
                <tr>
                  <th>전화번호</th>
                  <td>{{commonsStore.contentDetail2.infocenterfood}}</td>
                </tr>
                <tr>
                  <th>주차장이용</th>
                  <td v-html="commonsStore.contentDetail2.parkingfood"></td>
                </tr>
              </tbody>
            </table>

            <table>
              <tbody>
                <tr>
                  <th>상세주소</th>
                  <td>{{commonsStore.contentDetail.addr1}}({{commonsStore.contentDetail.zipcode}})</td>
                </tr>
                <tr>
                  <th>쉬는날</th>
                  <td>{{commonsStore.contentDetail2.restdatefood}}</td>
                </tr>
                <tr>
                  <th>영업시간</th>
                  <td>{{commonsStore.contentDetail2.opentimefood}}</td>
                </tr>
                <tr>
                  <th>포장</th>
                  <td>{{commonsStore.contentDetail2.packing}}</td>
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
import { ref, watch } from 'vue'
import type {Ref} from 'vue'
import { useTourStore } from '@/stores/tour'
import { useCommonsStore } from '@/stores/commons'
import { useRoute } from 'vue-router'
import _ from 'lodash'

const tourStore = useTourStore()
const commonsStore = useCommonsStore()

const route = useRoute()

const cateCodes = require('@/assets/data/catcode.json')

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