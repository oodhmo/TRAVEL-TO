export declare interface IItems {
  addr1: string
  addr2: string
  areacode: string | number
  booktour: string
  cat1: string | number
  cat2: string | number
  cat3: string | number 
  contentid: string
  contenttypeid: string
  createdtime: string
  firstimage: string
  firstimage2: string
  mapx: string
  mapy: string
  mlevel: string
  modifiedtime: string
  readcount: number
  sigungucode: string | number
  tel: string
  title: string
  zipcode: string | number
}

export declare interface IItemDetail {
  addr1: string
  addr2: string
  areacode: string | number
  booktour: string
  cat1: string | number
  cat2: string | number
  cat3: string | number 
  contentid: string
  contenttypeid: string
  createdtime: string
  firstimage: string
  firstimage2: string
  homepage: string
  mapx: string
  mapy: string
  mlevel: string
  modifiedtime: string
  overview: string
  sigungucode: string | number
  tel: string
  title: string
  zipcode: string | number
}

export declare interface IItemDetail2 {
  agelimit: string,
  bookingplace: string,
  contentid: string,
  contenttypeid: string,
  discountinfofestival: string,
  eventstartdate: string,
  eventenddate: string,
  eventhomepage: string,
  eventplace: string,
  festivalgrade: string,
  placeinfo: string,
  playtime: string,
  program: string,
  spendtimefestival: string,
  sponsor1: string,
  sponsor1tel: string,
  sponsor2: string,
  sponsor2tel: string,
  subevent: string,
  usetimefestival: string,
  parkingleports: string,
  reservation: string,
  restdateleports: string,
  parkinglodging: string,
  pickup: string,
  roomcount: string,
  reservationlodging: string,
  reservationurl: string,
  roomtype: string,
  scalelodging: string,
  subfacility: string,
  barbecue: string,
  beauty: string,
  beverage: string,
  bicycle: string,
  campfire: string,
  fitness: string,
  karaoke: string,
  publicbath: string,
  opendate: string,
  parking: string,
  restdate: string,
  useseason: string,
  usetime: string,
  accomcountculture: string,
  distance: string,
  infocentertourcourse: string,
  schedule: string,
  publicpc: string,
  sauna: string,
  seminar: string,
  sports: string,
  refundregulation: string,
  chkbabycarriageshopping: string,
  chkcreditcardshopping: string,
  chkpetshopping: string,
  culturecenter: string,
  fairday: string,
  infocentershopping: string,
  opendateshopping: string,
  opentime: string,
  parkingshopping: string,
  restdateshopping: string,
  restroom: string,
  saleitem: string,
  saleitemcost: string,
  scaleshopping: string,
  shopguide: string,
  chkcreditcardfood: string,
  discountinfofood: string,
  firstmenu: string,
  infocenterfood: string,
  kidsfacility: string,
  opendatefood: string,
  opentimefood: string,
  packing: string,
  parkingfood: string,
  reservationfood: string,
  restdatefood: string,
  scalefood: string,
  seat: string,
  smoking: string,
  treatmenu: string,
  lcnsno: string,
  accomcount: string,
  chkbabycarriage: string,
  chkcreditcard: string,
  chkpet: string,
  expagerange: string,
  expguide: string,
  heritage1: string,
  heritage2: string,
  heritage3: string,
  infocenter: string,
  taketime: string,
  theme: string,
  accomcountleports: string,
  chkbabycarriageleports: string,
  chkcreditcardleports: string,
  chkpetleports: string,
  expagerangeleports: string,
  infocenterleports: string,
  openperiod: string,
  parkingfeeleports: string,
  chkpetculture: string,
  discountinfo: string,
  infocenterculture: string,
  parkingculture: string,
  parkingfee: string,
  restdateculture: string,
  usefee: string,
  usetimeculture: string,
  scale: string,
  spendtime: string,
  usetimeleports: string,
  accomcountlodging: string,
  benikia: string,
  checkintime: string,
  checkouttime: string,
  chkcooking: string,
  foodplace: string,
  goodstay: string,
  hanok: string,
  infocenterlodging: string,
  chkbabycarriageculture: string,
  chkcreditcardculture: string,
  scaleleports: string,
  usefeeleports: string,
}

export declare interface IDetailInfo extends Pick<IItemDetail, 
  'title' | 'sigungucode' | 'firstimage' | 'overview' | 'homepage' | 'addr1' | 'mapx' | 'mapy' | 'tel'>, 
  Pick<IItemDetail2, 'usetime' | 'restdate' | 'parking' | 'infocenter' | 'eventstartdate' | 'eventenddate' | 'playtime' | 'bookingplace' | 'sponsor2' | 'usetimefestival' | 'openperiod' | 'usetimeleports' | 'parkingleports' | 'reservation' | 'infocenterleports' | 'restdateleports'> {
    originimgurl: string,
    sigungu?: string
}

export interface IDetailImage {
  contentid: string;
  cpyrhtDivCd: string;
  imgname: string;
  originimgurl: string;
  serialnum: string;
  smallimageurl: string;
}

/*********************Content 응답 타입********************* */

export declare interface IDetailResponse {
  data: {
    response: {
      body: {
        items: {
          item: IItemDetail[];
        };
      };
    };
  };
}

export declare interface IDetail2Response {
  data: {
    response: {
      body: {
        items: {
          item: IItemDetail2[];
        };
      };
    };
  };
}

export declare interface IDetailImageResponse {
  data: {
    response: {
      body: {
        items: {
          item: IDetailImage[];
        };
      };
    };
  };
}