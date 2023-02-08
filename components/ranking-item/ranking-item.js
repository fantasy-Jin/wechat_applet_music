// components/ranking-item/ranking-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    },
    key: {
      type: String,
      value: ""
    }
  },
  methods: {
    rankingTap() {
      // console.log(this.properties.key);
      const key = this.properties.key
      wx.navigateTo({
        url: `/pages/menu-song/menu-song?type=ranking&key=${key}`,
      })
    }
  }
})