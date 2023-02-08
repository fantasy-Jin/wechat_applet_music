// components/hotlist-item/hotlist-item.js
Component({
  properties: {
    itemData: {
      type: Object,
      value: {}
    }
  },
  methods: {
    onMenuItem() {
      // console.log(this.properties.itemData.id);
      const id = this.properties.itemData.id
      wx.navigateTo({
        url: `/pages/menu-song/menu-song?type=menu&id=${id}`
      })
    }
  }
})