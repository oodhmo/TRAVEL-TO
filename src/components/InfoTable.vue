<template>
  <div>
    <!-- 여행지 정보 -->
    <div v-if="commonsStore.detailType === 1" class="table-area">
      <table>
        <tbody>
          <tr>
            <th>홈페이지</th>
            <td v-if="detailInfo.homepage" v-html="detailInfo.homepage" />
            <td v-else class="no-info">홈페이지 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>상세주소</th>
            <td v-if="detailInfo.addr1" v-html="detailInfo.addr1" />
            <td v-else class="no-info">상세 주소 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>개방시기</th>
            <td v-if="detailInfo.usetime" v-html="detailInfo.usetime" />
            <td v-else class="no-info">개방 시기 정보가 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>쉬는 날</th>
            <td v-if="detailInfo.restdate" v-html="detailInfo.restdate" />
            <td v-else class="no-info">쉬는 날 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>주차장</th>
            <td v-if="detailInfo.parking" v-html="detailInfo.parking" />
            <td v-else class="no-info">주차장 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>문의 및 안내</th>
            <td v-if="detailInfo.infocenter" v-html="detailInfo.infocenter" />
            <td v-else class="no-info">안내 센터 정보가 없습니다</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 축제/행사 정보 -->
    <div v-if="commonsStore.detailType === 2" class="table-area">
      <table>
        <tbody>
          <tr>
            <th>홈페이지</th>
            <td v-if="detailInfo.homepage" v-html="detailInfo.homepage" />
            <td v-else class="no-info">홈페이지 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>상세주소</th>
            <td v-if="detailInfo.addr1" v-html="detailInfo.addr1" />
            <td v-else class="no-info">상세 주소 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>주최기간</th>
            <td v-if="detailInfo.eventstartdate || detailInfo.eventenddate">{{ dateFormat(detailInfo.eventstartdate) }} ~ {{ dateFormat(detailInfo.eventenddate) }}</td>
            <td v-else class="no-info">주최기간 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>행사시간</th>
            <td v-if="detailInfo.playtime" v-html="detailInfo.playtime"/>
            <td v-else class="no-info">행사시간 정보가 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>주관사</th>
            <td v-if="detailInfo.sponsor2" v-html="detailInfo.sponsor2" />
            <td v-else class="no-info">주관사 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>예약페이지</th>
            <td v-if="detailInfo.bookingplace" v-html="detailInfo.bookingplace" />
            <td v-else class="no-info">예약페이지 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td v-if="detailInfo.tel" v-html="detailInfo.tel" />
            <td v-else class="no-info">전화번호 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>이용요금</th>
            <td v-if="detailInfo.usetimefestival" v-html="detailInfo.usetimefestival" />
            <td v-else class="no-info">이용요금 정보가 없습니다</td>
          </tr>
        </tbody>
      </table>
    </div>

    <!-- 여가 정보 -->
    <div v-if="commonsStore.detailType === 3" class="table-area">
      <table>
        <tbody>
          <tr>
            <th>홈페이지</th>
            <td v-if="detailInfo.homepage" v-html="detailInfo.homepage" />
            <td v-else class="no-info">홈페이지 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>상세주소</th>
            <td v-if="detailInfo.addr1" v-html="detailInfo.addr1" />
            <td v-else class="no-info">상세 주소 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>운영기간</th>
            <td v-if="detailInfo.openperiod">{{ detailInfo.openperiod }}</td>
            <td v-else class="no-info">운영기간 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>이용시간</th>
            <td v-if="detailInfo.usetimeleports" v-html="detailInfo.usetimeleports"/>
            <td v-else class="no-info">이용시간 정보가 없습니다.</td>
          </tr>
        </tbody>
      </table>

      <table>
        <tbody>
          <tr>
            <th>예약정보</th>
            <td v-if="detailInfo.reservation" v-html="detailInfo.reservation" />
            <td v-else class="no-info">예약 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>쉬는 날</th>
            <td v-if="detailInfo.restdateleports" v-html="detailInfo.restdateleports" />
            <td v-else class="no-info">쉬는 날 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>주차장이용</th>
            <td v-if="detailInfo.parkingleports" v-html="detailInfo.parkingleports" />
            <td v-else class="no-info">주차장 이용 정보가 없습니다.</td>
          </tr>
          <tr>
            <th>전화번호</th>
            <td v-if="detailInfo.infocenterleports" v-html="detailInfo.infocenterleports" />
            <td v-else class="no-info">전화번호 정보가 없습니다.</td>
          </tr>
        </tbody>
      </table>
    </div>

  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';
import { IDetailInfo } from '@/types/tour-items';
import { useCommonsStore } from '@/stores/commons';
import { dateFormat } from '@/utils/string-utils';

const props = defineProps<{
  detailInfo: IDetailInfo;
}>();

const commonsStore = useCommonsStore();
</script>