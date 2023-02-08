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