// components/popup-list/popup-list.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    isShow:{
      type:Boolean,
      value:false
    }
  },
  methods:{
    onClose(){
      this.setData({isShow:false})
    }
  }
})
