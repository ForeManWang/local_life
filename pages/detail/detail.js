const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    shop: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch(`/shops/${options.item}`)
      .then(res => {
        this.setData({ shop: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })
      })
  },

  previewHandle (e) {
    wx.previewImage({
      current: e.target.dataset.src,
      urls: this.data.shop.images
    })
  }
})
