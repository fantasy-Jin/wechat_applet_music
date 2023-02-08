import { JCrequestdata } from "./request";

// top 推荐视频
export function getMVList(offset=0,limit = 20){
  return JCrequestdata.get({
    url:'/top/mv',
    data:{
      limit,
      offset
    }
  })
}

// 视频详情
export function getMvDetail(mvid){
  return JCrequestdata.get({
      url:'/mv/detail',
      data:{
        mvid
      }
  })
}

// 视频播放连接
export function getMvUrl(id){
  return JCrequestdata.get({
    url:'/mv/url',
    data:{
      id
    }
  })
}

// 推荐视频列表
export function getrecommendList(id){
  return JCrequestdata.get({
    url:'/related/allvideo',
    data:{
      id
    }
  })
}