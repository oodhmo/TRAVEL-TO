import { IQuery } from '@/types/query';
import axios from 'axios';

const config = {
  baseUrl: "http://apis.data.go.kr/B551011/KorService"
}

//지역에 따른 검색
//검색조건에 따라 parameter 바꾸도록 인자를 받아와야 함.
const fetchTourInfo = (query: IQuery) => {
  return axios.get(config.baseUrl + `/areaBasedList?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&numOfRows=10&pageNo=${query.pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=${query.listYN}&arrange=Q&contentTypeId=12&cat1=${query.cat1}&cat2=${query.cat2}&cat3=${query.cat3}&areaCode=${query.areaCode}`)
}

//listYN = N : 결과 개수 가져옴
const fetchTourItemsCount = (query: IQuery) => {
  return axios.get(config.baseUrl + `/areaBasedList?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&numOfRows=&pageNo=&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=N&arrange=Q&cat1=${query.cat1}&cat2=${query.cat2}&cat3=${query.cat3}&areaCode=${query.areaCode}`)
}

//축제 행사 정보
const fetchFestivalInfo = (query : IQuery) => {
  return axios.get(config.baseUrl + `/searchFestival?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&numOfRows=${query.numOfRows}&pageNo=${query.pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&eventStartDate=${query.eventStartDate}&eventEndDate=${query.eventEndDate}&areaCode=${query.areaCode}`)
}

//레포츠 정보
const fetchLeisureInfo = (query:IQuery) => {
  return axios.get(config.baseUrl + `/areaBasedList?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&numOfRows=12&pageNo=${query.pageNo}&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=Q&contentTypeId=${query.contentTypeId}&cat1=${query.cat1}&cat2=${query.cat2}&cat3=${query.cat3}&areaCode=${query.areaCode}`)
}

//상세정보
const fetchContentDetail = (contentId: string | string[]) => {
  return axios.get(config.baseUrl + `/detailCommon?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&defaultYN=Y&firstImageYN=Y&areacodeYN=Y&catcodeYN=Y&addrinfoYN=Y&mapinfoYN=Y&overviewYN=Y`)
}

//개장시간 등 더 상세한 정보
const fetchContentDetail2 = (contentId: string | string[], contentTypeId: string) => {
  return axios.get(config.baseUrl + `/detailIntro?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&contentId=${contentId}&contentTypeId=${contentTypeId}`)
}

// 디테일 페이지 이미지
const fetchDetailImage = (contentId: string | string[]) => {
  return axios.get(config.baseUrl + `/detailImage?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&imageYN=Y&subImageYN=Y&contentId=${contentId}`)
}

//검색
const fetchSearchResult = (query: IQuery) => {
  return axios.get(config.baseUrl + `/searchKeyword?serviceKey=KKy4JYP3JPiVeChrH81y3eUEjqbGKtDuhioahcg0DGTOo4Ixw%2B8UJsmOSNFSLdFQ1DqHkB%2BVK1Ig9Sf648%2F93g%3D%3D&MobileOS=ETC&MobileApp=AppTest&_type=json&listYN=Y&arrange=D&numOfRows=10&pageNo=${query.pageNo}&contentTypeId=${query.contentTypeId}&areaCode=${query.areaCode}&keyword=${query.keyword}`)
}

export {
  fetchTourInfo, fetchTourItemsCount, fetchFestivalInfo, fetchLeisureInfo, fetchContentDetail, fetchContentDetail2, fetchDetailImage, fetchSearchResult
}