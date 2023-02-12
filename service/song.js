import {
  JCrequestdata
} from "./request";

export function getsongPlay(ids) {
  return JCrequestdata.get({
    url: "/song/detail",
    data: {
      ids
    }
  })
}
export function getLyric(id) {
  return JCrequestdata.get({
    url: '/lyric',
    data: {
      id
    }
  })
}
export function getSongSrc(id,level="standard"){
  return JCrequestdata.get({
    url:'/song/url/v1',
    data:{
      id,
      level
    }
  })
}
export function getComment(id,type=0,sortType=2){
  return JCrequestdata.get({
    url:'/comment/new',
    data:{
      type,
      id,
      sortType
    }
  })
}