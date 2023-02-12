import {
  JCrequestdata
} from "./request";

export function getBanner(type = 0) {
  return JCrequestdata.get({
    url: '/banner',
    data: {
      type
    }
  })
}

export function getPlaylist(id) {
  return JCrequestdata.get({
    url: "/playlist/detail",
    data: {
      id
    }
  })
}

export function getHotList(cat = "全部", limit = 6, offset = 0) {
  return JCrequestdata.get({
    url: '/top/playlist',
    data: {
      cat,
      limit,
      offset
    }
  })
}
export function getTags() {
  return JCrequestdata.get({
    url: "/playlist/hot",
  })
}
export function getSearchHot(){
  return JCrequestdata.get({
    url:'/search/hot'
  })
}
export function getSearchSuggest(keywords){
  return JCrequestdata.get({
    url:'/search/suggest',
    data:{
      keywords,
      type:'mobile'
    }
  })
}
export function getSearchResult(keywords){
  return JCrequestdata.get({
    url:'/search',
    data:{
      keywords
    }
  })
}