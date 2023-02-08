// components/area-menu/area-menu.js
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    menuTitle:{
      type:String,
      value:""
    },
    menuList: {
      type: Array,
      value: []
    }
  },

  data: {
    screenWidth:375
  },
  lifetimes:{
    attached(){
      this.setData({screenWidth:app.globalData.screenWidth})
    }
  },
  methods:{
    onMoreTap(){
     wx.navigateTo({
       url: '/pages/menu-detail/menu-detail',
     })
    }
  }
})
