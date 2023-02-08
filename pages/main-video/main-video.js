// import { JCrequestdata } from "../../service/request"
import {
  getMVList
} from "../../service/video"

Page({
  data: {
    mvlist: [],
    offset: 0,
    hasMore: true
  },
  onLoad() {
    this.fetchMVlist()
  },
  async fetchMVlist() {

    const res = await getMVList(this.data.offset)
    const newList = [...this.data.mvlist, ...res.data]
    // console.log(res.hasMore);
    this.setData({
      mvlist: newList
    })
    this.data.offset = this.data.mvlist.length
    this.data.hasMore = res.hasMore
  },
  // 下拉到底部
  onReachBottom() {
    if (!this.data.hasMore) return
    // console.log('到达底部');
    this.fetchMVlist()
  },
  // 上拉加载更多
  async onPullDownRefresh() {
    // 清空
    this.data.mvlist = []
    this.data.offset = 0
    this.data.hasMore = true
    await this.fetchMVlist()
    wx.stopPullDownRefresh()
  }
})