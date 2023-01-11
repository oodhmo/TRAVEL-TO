/* eslint-disable */ 
import _, { join } from 'lodash'
import { defineStore } from 'pinia'
import { Icat1, Icat2, Icat3 } from '@/types/category'
import { IItemDetail, IItemDetail2 } from '@/types/tour-items'
import { fetchContentDetail, fetchContentDetail2, fetchDetailImage, fetchSearchResult } from '@/api'
import { IQuery } from '@/types/query'

export const useCommonsStore = defineStore('commonsStore', {
  state: () => ({
    //content detail
    contentDetail: [] as Array<IItemDetail>,
    contentDetail2: [] as Array<IItemDetail2>,
    detailImage: [] as Array<any>,
    contentCategory: [] as Array<Icat1 | Icat2 | Icat3>,
    sigungu: '' as string,

    //search
    searchResult: [] as Array<any>,
    searchTotalCnt: 0 as number
  }), 
  actions: {
    getContentDetail(contentId: string | string[], contentTypeId: string) {
      fetchContentDetail(contentId)
        .then((resp:any) => {
          this.contentDetail = resp.data.response.body.items.item[0]
          let addr:Array<string> = resp.data.response.body.items.item[0].addr1.split(' ')
          this.sigungu = `${addr[0]} ${addr[1]}`
        })
      
      fetchContentDetail2(contentId, contentTypeId)
        .then((resp:any) => {
          this.contentDetail2 = resp.data.response.body.items.item[0]
        })
      
      fetchDetailImage(contentId)
        .then((resp:any) => {
          this.detailImage = resp.data.response.body.items.item[0]
        })
    },

    getSearchResult(query: IQuery) {
      fetchSearchResult(query)
        .then((resp:any) => {
          console.log(resp.data)
          console.log(query)
          this.searchResult = resp.data.response.body.items.item
          this.searchTotalCnt = resp.data.response.body.totalCount
        })
    },
  }
})
