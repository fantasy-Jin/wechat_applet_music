// components/video-item/video-item.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    itemdata:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    onVideoItemTap(){
      const itemId=this.properties.itemdata.id
      wx.navigateTo({
        url: `/pages/video-detail/video-detail?id=${itemId}`,
      })
    }
  }
})
