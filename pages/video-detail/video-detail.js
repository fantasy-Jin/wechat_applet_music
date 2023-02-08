import { getMvDetail, getMvUrl, getrecommendList } from "../../service/video"

// pages/video-detail/video-detail.js
Page({
  data:{
    mvId:'',
    mvDetail:'',
    mvUrl:'',
    recommendList:[],
    danmuList: [{
      text: '第 1s 出现的弹幕',
      color: '#ff0000',
      time: 1
    }, {
      text: '第 3s 出现的弹幕',
      color: '#ff00ff',
      time: 3
    }]
  },
 onLoad(options){
    this.setData({mvId:options.id})
    this.fetchMvUrl()
    this.fetchMvDetail()
    this.fetchRecommendList()
 },
 // 请求mv数据
 async fetchMvUrl(){
  const {data:res} =await getMvUrl(this.data.mvId)
  this.setData({mvUrl:res})
 },
 async fetchMvDetail(){
  const {data:res} =await getMvDetail(this.data.mvId)
  this.setData({mvDetail:res})
 },
 async fetchRecommendList(){
   const {data:res}=await getrecommendList(this.data.mvId)
   this.setData({recommendList:res})
 }
})