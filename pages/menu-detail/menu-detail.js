// pages/menu-detail/menu-detail.js
import {
  getHotList,
  getTags
} from "../../service/music"
Page({

  data: {
    menuList: []
  },
  onLoad() {
    if (!this.data.menuList.length) {
      wx.showLoading({
        title: '疯狂敲代码中',
        mask: true
      })
    }
    this.fetchTags()
  },
  async fetchTags() {
    const res = await getTgs()
    const tags = res.tags
    //定义数组存储请求回来的 promise
    const allPromises = [];
    for (const item of tags) {
      const promiseItem = await getHotList(item.name)
      // push进数组
      allPromises.push(promiseItem)
    }
    // 全部加载完才写入重新渲染页面 
    Promise.all(allPromises).then(res => {
      this.setData({
        menuList: res
      })
      wx.hideLoading()
    })
  }
})