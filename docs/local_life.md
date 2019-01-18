# Local_life

基于微信小程序的本地生活项目，目的是锻炼微信小程序页面布局、相关`API`的使用，接口数据请求、数据绑定逻辑等

## 基本面目录结构

> ├─local_life-------------------------------------------------------------------------------------------------------本地生活项目根目录
> │  ├─assets-------------------------------------------------------------------------------------------------------图片文件夹
> │  ├─includes----------------------------------------------------------------------------------------------------公共组件
> │  ├─pages--------------------------------------------------------------------------------------------------------页面文件夹
> │  │  ├─index-----------------------------------------------------------------------------------------------------项目主页
> │  │  ├─list---------------------------------------------------------------------------------------------------------分类列表页面
> │  │  ├─detail-----------------------------------------------------------------------------------------------------商品详情页面
> │  │  ├─messages-----------------------------------------------------------------------------------------------商品信息页面
> │  │  ├─profile----------------------------------------------------------------------------------------------------个人中心页面
> │  │  └─settings--------------------------------------------------------------------------------------------------设置页面
> │  ├─utils-----------------------------------------------------------------------------------------------------------项目公共函数
> │  ├─venders------------------------------------------------------------------------------------------------------依赖文件
> │  ├─app.js---------------------------------------------------------------------------------------------------------项目逻辑
> │  ├─app.json-----------------------------------------------------------------------------------------------------项目公共设置文件
> │  ├─app.wxss----------------------------------------------------------------------------------------------------项目公共样式
> │  └─project.config.json---------------------------------------------------------------------------------------项目配置文件

## app.json 项目基本配置

```json
{
  "pages": [
    "pages/index/index",
    "pages/list/list",
    "pages/detail/detail",
    "pages/messages/messages",
    "pages/profile/profile",
    "pages/settings/settings"
  ],
  "window": {
    "navigationBarBackgroundColor": "#3a4861",
    "navigationBarTextStyle": "white",
    "navigationBarTitleText": "本地生活",
    "backgroundColor": "#bcc0c9",
    "backgroundTextStyle": "light",
    "enablePullDownRefresh": false,
    "onReachBottomDistance": 50
  },
  "tabBar": {
    "color": "#999",
    "selectedColor": "#444",
    "backgroundColor": "#fff",
    "borderStyle": "black",
    "list": [
      {
        "pagePath": "pages/index/index",
        "text": "首页",
        "iconPath": "assets/home.png",
        "selectedIconPath": "assets/home-active.png"
      },
      {
        "pagePath": "pages/messages/messages",
        "text": "消息",
        "iconPath": "assets/message.png",
        "selectedIconPath": "assets/message-active.png"
      },
      {
        "pagePath": "pages/profile/profile",
        "text": "我的",
        "iconPath": "assets/profile.png",
        "selectedIconPath": "assets/profile-active.png"
      }
    ],
    "position": "bottom"
  }
}

```

## app.wxss页面公共样式

```css
//local_life/app.wxss
@import 'venders/weui';

.searchbar-result {
  margin-top: 0;
  font-size: 28rpx;
}

.searchbar-result::before {
  display: none;
}

page {
  background-color: #f0f0f0;
}
```

## index首页

从静态页面到动态数据渲染的流程和`vue`和`angular`等都差不多，先静态页面再假数据测试再从接口拿数据进行绑定

**注意：**这里学了个骚骚的操作，`sublime`中按序号排序生成页面结构,`$`表示序号标识

先

```xml
view.item*9>image[src="/assets/icons/grid-0$.png"]+text
```

再 `tab`

然后就可以声称这样一大串代码，挺好用

```xml
<view class="item">
	<image src="/assets/icons/grid-01.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-02.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-03.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-04.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-05.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-06.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-07.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-08.png"></image>
	<text></text>
</view>
<view class="item">
	<image src="/assets/icons/grid-09.png"></image>
	<text></text>
</view>
```

### 静态页面

1. 页面基本结构搭建
2. 页面样式，flex布局
3. 遇到问题查文档
4. 小问题
   1. 小程序图片渲染自动填充，在小程序中是不支持宽度固定，高度自动调整或者高度固定宽度自动调整的
   2. 查看文档[https://developers.weixin.qq.com/miniprogram/dev/component/image.html](https://developers.weixin.qq.com/miniprogram/dev/component/image.html)所以给`image`元素专门设置`mode="aspectFill"`,可以搞定
   3. `mode="aspectFill"`可以理解为：保持纵横比缩放图片，只保证图片的短边能完全显示出来。也就是说，图片通常只在水平或垂直方向是完整的，另一个方向将会发生截取
   4. 边框处理`box-sizing: border-box`

### 数据渲染

**小程序发送`HTTP`请求，拿到接口数据，且小程序中不存在跨域**

1. 小程序中没有`Ajax`，翻文档[https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html](https://developers.weixin.qq.com/miniprogram/dev/api/wx.request.html)，`wx.request(Object object)`这个API可以发起`HTTP`网络请求
2. 请求时机：生命周期函数--监听页面加载`onLoad`的时候

示例代码：

```javascript
wx.request({
  url: 'test.php', // 仅为示例，并非真实的接口地址
  data: {
    x: '',
    y: ''
  },
  header: {
    'content-type': 'application/json' // 默认值
  },
  success(res) {
    console.log(res.data)
  }
})
```

3. 请求接口：
   1. 域名备案
   2. 接口是写好的
   3. 在小程序的域名设置中有配置
   4. https协议
   5. 请求头、请求体格式
   6. 请求体内容等
4. 注意：需要this的时候，尽量使用箭头函数，防止this指向改变造成的错误
5. 这里把`wx.request`请求封装成一个工具函数`utils/fetch.js`，导入进来，方便后面的请求直接使用
6. 页面渲染`{{  }}`

### 相关代码

```xml
// local_life/pages/index/index.wxml
<swiper class="slides" autoplay="{{slides.length > 1}}" indicator-dots="{{slides.length > 1}}" indicator-color="#bcc0c9" indicator-active-color="#3a4861">
  <swiper-item wx:for="{{slides}}" wx:key="id">
    <view>
      <image src="{{item.image}}" mode="aspectFill"/>
    </view>
    <image wx:else src="{{item.image}}" mode="aspectFill"/>
  </swiper-item>
</swiper>

<view class="grids">
  <view class="item" wx:for="{{categories}}" wx:key="id">
    <image src="{{item.icon}}"/>
    <text>{{item.name}}</text>
  </view>
</view>

<view class="links">
  <view>
    <image src="/assets/link-01.png"/>
  </view>
  <view url="/pages/forum/forum">
    <image src="/assets/link-02.png"/>
  </view>
</view>

```

```css
// local_life/pages/index/index.wxss
.slides {
  height: 380rpx;
}

.slides navigator,
.slides image {
  min-width: 100%;
  height: 100%;
}

.grids {
  display: flex;
  flex-wrap: wrap;
  border-top: 1rpx solid #eee;
  border-left: 1rpx solid #eee;
  background-color: #fff;
}

.grids .item {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 33.3333333333%;
  height: 250rpx;
  border-right: 1rpx solid #eee;
  border-bottom: 1rpx solid #eee;
  box-sizing: border-box;
}

.grids .item image {
  width: 70rpx;
  height: 70rpx;
}

.grids .item text {
  margin-top: 20rpx;
  color: #999;
  font-size: 28rpx;
}

.links {
  display: flex;
  justify-content: space-between;
  margin: 10rpx 0;
  padding: 30rpx;
  background-color: #fff;
}

.links image {
  width: 330rpx;
  height: 185rpx;
}

```

```json
// local_life/pages/index/index.json
{
  "usingComponents": {}
}
```

```javascript
// local_life/utils/fetch.js
const app = getApp()

module.exports = (url, data, method = 'GET', header = {}) => {
  wx.showLoading({ title: 'Loading...' })
  return new Promise((resolve, reject) => {
    wx.request({
      url: app.config.apiBase + url,
      data,
      header,
      method,
      dataType: 'json',
      success: resolve,
      fail: reject,
      complete: wx.hideLoading
    })
  })
}

```

```javascript
// local_life/pages/index/index.js
const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    slides: [],
    categories: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch('/slides')
      .then(res => {
        this.setData({ slides: res.data })
      })

    fetch('/categories')
      .then(res => {
        this.setData({ categories: res.data })
      })
  }
})

```

### 页面跳转

[navigator组件文档](https://developers.weixin.qq.com/miniprogram/dev/component/navigator.html)

1. `navigator`标签实现页面跳转，哪个元素想实现页面跳转，就把标签改为`navigator`，同时添加`url`属性为跳转链接

2. **注意：**主界面例如导航栏上的页面不允许这样，可以加上`open-type`属性，具体还是看官方文档
3. 导航到不同的列表页面通过`?`传参的方式，让页面知道应该呈现哪个页面列表
4. 图片的跳转，包裹一层`navigator`,设置链接为`{{ item.link }}`，`{{ item.link }}`来源于接口

```xml
<swiper class="slides" autoplay="{{slides.length > 1}}" indicator-dots="{{slides.length > 1}}" indicator-color="#bcc0c9" indicator-active-color="#3a4861">
  <swiper-item wx:for="{{slides}}" wx:key="id">
    <navigator wx:if="{{item.link}}" url="{{item.link}}">
      <image src="{{item.image}}" mode="aspectFill"/>
    </navigator>
    <image wx:else src="{{item.image}}" mode="aspectFill"/>
  </swiper-item>
</swiper>

<view class="grids">
  <navigator class="item" wx:for="{{categories}}" wx:key="id" url="/pages/list/list?cat={{item.id}}">
    <image src="{{item.icon}}"/>
    <text>{{item.name}}</text>
  </navigator>
</view>

<view class="links">
  <navigator url="/pages/list/list?type=recommend">
    <image src="/assets/link-01.png"/>
  </navigator>
  <navigator url="/pages/forum/forum">
    <image src="/assets/link-02.png"/>
  </navigator>
</view>

```

## list页面

列表页分类信息加载

### 静态页面

列表分类信息页面主要也是`flex`布局

### 数据渲染

一：列表渲染和商铺信息渲染逻辑

1. 抽象数据模型，将需要改变的数据抽象到`data`中，方便保存和调用
2. 调用前面封装好的`fetch`函数去请求接口数据，所以首先依然要先导入`const fetch = require('../../utils/fetch')`
3. **注意：**当请求`/categories/${options.cat}`的时候，不能确定一定是在`onReady`之后执行，所以做一个双保险，拿到数据之后，将数据设置到`data`数据模型当中去
4. **商铺信息的加载**
   1. 加载完分类信息之后再去加载商铺信息，所以应该在`wx.setNavigationBarTitle({ title: res.data.name })`之后加载
   2. 根据id加载对应商铺信息`this.data.category.id`来获取
5. 可借助`postman`工具拿到格式化之后的接口数据，方便查看和使用

二：**上拉加载更多逻辑`onReachBottom（）`**

1. 抽象数据模型

2. **接口：**页面上拉触底事件的处理函数`onReachBottom（）`

3. **时机：**距离底部有特定距离的时候会触发，默认是50，也可以自己调整，可以在页面`list.json`中加一个配置`{ "onReachBottomDistance": 5 }`，这样就离页面5rpx的时候刷新，即在生命周期的钩子函数`onReachBottom（）`中加载数据
4. 书写`loadMore`函数
   1. 拿到数值，解构赋值`let { pageIndex, pageSize, searchText } = this.data`
   2. 当下拉的时候`pageIndex`的值需要刷新到下一页并和`pageSize`都放到一个新的对象`params`中去`const params = { _page: ++pageIndex, _limit: pageSize }`
   3. 请求数据`return fetch(`/categories/${this.data.category.id}/shops`, params).then(res => {})`
   4. 加载商铺信息`const shops = this.data.shops.concat(res.data)`
   5. 控制页码：假如一共65条数据，当一页20条数据的时候，就最多只能有四页，所以要加一个页数的逻辑判断
   6. 所以在`data`中抽象数据模型`totalCount: 0, hasMore: true`
   7. 求总条数：`const totalCount = parseInt(res.header['X-Total-Count'])`
   8. 判断是否有更多数据：`const hasMore = this.data.pageIndex * this.data.pageSize < totalCount`
   9. 将所有数据设置回页面`this.setData({ shops, totalCount, pageIndex, hasMore })`

**三：下拉刷新`"enablePullDownRefresh": true`**

[下拉刷新官方文档](https://developers.weixin.qq.com/miniprogram/dev/api/wx.startPullDownRefresh.html)

1. 在`list.json`文件中开启下拉刷新`"enablePullDownRefresh": true,`
2. **时机：生命周期为`onPullDownRefresh`**的时候去加载
3. 在此之前还要先清空之前加载的数据，防止直接加载下一页了`this.setData({ shops: [], pageIndex: 0, hasMore: true })`
4. 当加载结束之后，借助`wx.stopPullDownRefresh()`去停止页面下拉刷新`this.loadMore().then(() => wx.stopPullDownRefresh())`

### 相关代码

```xml
// local_life/pages/list/list.wxml
<include src="/includes/search-bar.wxml"/>

<view class="cells">
  <navigator class="item" wx:for="{{shops}}" wx:key="id" url="/pages/detail/detail?item={{item.id}}">
    <image src="{{item.images[0]}}" mode="aspectFill"/>
    <view class="meta">
      <text class="name">{{item.name}}</text>
      <text class="phone">电话：{{item.phone || 'none'}}</text>
      <text class="address">地址：{{item.address}}</text>
      <text class="hours">营业时间：{{item.businessHours}}</text>
    </view>
    <view class="score">{{item.score || 'none'}}</view>
  </navigator>
</view>

<view wx:if="{{hasMore}}" class="loadmore loading">正在加载...</view>
<view wx:else class="loadmore">没有更多内容了</view>

```

```css
// local_life/pages/list/list.wxss
.cells {
  background-color: #fff;
}

.cells .item {
  display: flex;
  align-items: flex-start;
  border-bottom: 1rpx solid #eee;
}

.cells .item image {
  width: 160rpx;
  height: 160rpx;
  margin: 20rpx;
}

.cells .item .meta {
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 10rpx 0;
  font-size: 30rpx;
}

.cells .item .meta .name {
  color: #234;
  font-size: 28rpx;
}

.cells .item .meta .phone,
.cells .item .meta .address {
  color: #678;
  font-size: 24rpx;
}

.cells .item .meta .hours {
  /*color: #ff69b4;*/
  color: #456;
  font-size: 22rpx;
}

.cells .item .score {
  margin: 20rpx 20rpx 0 -40rpx;
  padding: 0 10rpx;
  background-color: #ee523d;
  border-radius: 30rpx;
  color: #fff;
  font-size: 24rpx;
  text-align: center;
}

.loadmore {
  color: #888;
  font-size: 30rpx;
  line-height: 100rpx;
  text-align: center;
}

.loadmore.loading::before {
  content: '';
  width: 40rpx;
  height: 40rpx;
  margin-top: -10rpx;
  margin-right: 10rpx;
  display: inline-block;
  vertical-align: middle;
  animation: loading 1s steps(12) infinite;
  background: transparent url(data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMjAiIGhlaWdodD0iMTIwIiB2aWV3Qm94PSIwIDAgMTAwIDEwMCI+PHBhdGggZmlsbD0ibm9uZSIgZD0iTTAgMGgxMDB2MTAwSDB6Ii8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTlFOUU5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDAgLTMwKSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iIzk4OTY5NyIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgzMCAxMDUuOTggNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjOUI5OTlBIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDYwIDc1Ljk4IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0EzQTFBMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSg5MCA2NSA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNBQkE5QUEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoMTIwIDU4LjY2IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0IyQjJCMiIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgxNTAgNTQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjQkFCOEI5IiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKDE4MCA1MCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDMkMwQzEiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTE1MCA0NS45OCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNDQkNCQ0IiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTEyMCA0MS4zNCA2NSkiLz48cmVjdCB3aWR0aD0iNyIgaGVpZ2h0PSIyMCIgeD0iNDYuNSIgeT0iNDAiIGZpbGw9IiNEMkQyRDIiIHJ4PSI1IiByeT0iNSIgdHJhbnNmb3JtPSJyb3RhdGUoLTkwIDM1IDY1KSIvPjxyZWN0IHdpZHRoPSI3IiBoZWlnaHQ9IjIwIiB4PSI0Ni41IiB5PSI0MCIgZmlsbD0iI0RBREFEQSIgcng9IjUiIHJ5PSI1IiB0cmFuc2Zvcm09InJvdGF0ZSgtNjAgMjQuMDIgNjUpIi8+PHJlY3Qgd2lkdGg9IjciIGhlaWdodD0iMjAiIHg9IjQ2LjUiIHk9IjQwIiBmaWxsPSIjRTJFMkUyIiByeD0iNSIgcnk9IjUiIHRyYW5zZm9ybT0icm90YXRlKC0zMCAtNS45OCA2NSkiLz48L3N2Zz4=) no-repeat;
  background-size: 100%
}

@keyframes loading {
  from {
    transform: rotate(0deg)
  }
  to {
    transform: rotate(-360deg)
  }
}

```



```javascript
// local_life/pages/list/list.js
const fetch = require('../../utils/fetch')

Page({
  /**
   * 页面的初始数据
   */
  data: {
    category: null,
    shops: [],
    pageIndex: 0,
    pageSize: 20,
    totalCount: 0,
    hasMore: true
  },

  // 下拉加载更多
  loadMore () {
    let { pageIndex, pageSize, searchText } = this.data
    const params = { _page: ++pageIndex, _limit: pageSize }
    if (searchText) params.q = searchText
    // shops 商铺信息  取数据  绑定数据
    return fetch(`/categories/${this.data.category.id}/shops`, params)
      .then(res => {
        const totalCount = parseInt(res.header['X-Total-Count'])
        const hasMore = this.data.pageIndex * this.data.pageSize < totalCount
        const shops = this.data.shops.concat(res.data)
        this.setData({ shops, totalCount, pageIndex, hasMore })
      })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad (options) {
    fetch(`/categories/${options.cat}`)
    // 这里不能确定一定是在`onReady`之后执行
    // 所以做一个双保险，拿到数据之后，将数据设置到`data`数据模型当中去
      .then(res => {
        this.setData({ category: res.data })
        wx.setNavigationBarTitle({ title: res.data.name })
        // 加载完分类信息之后再去加载商铺信息
        this.loadMore()
      })
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh () {
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore().then(() => wx.stopPullDownRefresh())
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom () {
    // TODO：节流
    this.loadMore()
  },

  searchHandle () {
    // console.log(this.data.searchText)
    this.setData({ shops: [], pageIndex: 0, hasMore: true })
    this.loadMore()
  },

  showSearchHandle () {
    this.setData({ searchShowed: true })
  },
  hideSearchHandle () {
    this.setData({ searchText: '', searchShowed: false })
  },
  clearSearchHandle () {
    this.setData({ searchText: '' })
  },
  searchChangeHandle (e) {
    this.setData({ searchText: e.detail.value })
  }
})

```

## detail商品详情

### 静态页面

其他套路都和前面的一样

### 数据渲染

**小问题一：商品详情页面图片渲染出来，尺寸有问题，看起来很难看**

**解决方案：在页面定义一个（行内脚本）模块，在该模块内可以直接写`script`脚本，但此脚本不支持`es6等新特性`**

```javascript
<wxs module="utils">
  module.exports = {
    size: function (input) {
      return input.replace('w.h', '100.100')
    }
  }
</wxs>
```

**小问题二：点击图片大图预览**

[wx.previewImage(Object object)文档](https://developers.weixin.qq.com/miniprogram/dev/api/wx.previewImage.html)

> 在新页面中全屏预览图片。预览的过程中用户可以进行保存图片、发送给朋友等操作。

**解决方案：在小程序中有一个特定的`API`是`wx.previewImage(Object object)`可以去处理**

1. 绑定事件`<image src="{{item}}" mode="aspectFill" bindtap="previewHandle" data-src="{{item}}"/>`

```xml
<swiper class="slides" indicator-dots="{{shop.images.length > 1}}" indicator-color="#bcc0c9" indicator-active-color="#3a4861">
  <swiper-item wx:for="{{shop.images}}" wx:key="id">
    <image src="{{item}}" mode="aspectFill" bindtap="previewHandle" data-src="{{item}}"/>
  </swiper-item>
</swiper>
```

2. 书写`previewHandle`函数
   1. 调用微信小程序提供的`api`，`wx.previewImage`,它有一个必填的参数`urls`，四个选填的参数`current`,`success`,`fail`,`complete`,这里用到了两个`urls图片链接集合`和`currnet当前显示图片链接`
   2. 通过自定义属性拿到当前图片`src`，`data-src="{{item}}"`,`current: e.target.dataset.src,`
   3. 拿到`urls`，`urls: this.data.shop.images`
   4. 这时候相当于`wx.previewImage`的两个参数加进去，就可以实现放大图片预览的需求了

### 相关代码

```xml
// local_life/pages/detail/detail.xml
<swiper class="slides" indicator-dots="{{shop.images.length > 1}}" indicator-color="#bcc0c9" indicator-active-color="#3a4861">
  <swiper-item wx:for="{{shop.images}}" wx:key="id">
    <image src="{{item}}" mode="aspectFill" bindtap="previewHandle" data-src="{{item}}"/>
  </swiper-item>
</swiper>

<view class="heading" wx:if="{{shop.name}}">
  <text class="name">{{shop.name}}</text>
  <text class="phone">电话：{{shop.phone || 'none'}}</text>
  <text class="address">地址：{{shop.address}}</text>
  <text class="hours">营业时间：{{shop.businessHours}}</text>
  <view class="score" wx:if="{{item.score}}">{{item.score}}</view>
</view>

<view class="introduction" wx:if="{{shop.introduction}}">
  <text>{{shop.introduction}}</text>
</view>

<view class="comments" wx:if="{{shop.comments.length}}">
  <view class="item" wx:for="{{shop.comments}}" wx:key="*this">
    <text class="name">{{item.name}}</text>
    <text class="date">{{item.date}}</text>
    <text class="rating">{{item.rating}}</text>
    <text class="content">{{item.content}}</text>
    <view class="images">
      <image wx:for="{{item.images}}" wx:key="*this" src="{{utils.size(item)}}"/>
    </view>
  </view>
</view>

<wxs module="utils">
  module.exports = {
    size: function (input) {
      return input.replace('w.h', '100.100')
    }
  }
</wxs>

```

```css
// local_life/pages/detail/detail.wxss
.slides {
  height: 580rpx;
}

.slides image {
  min-width: 100%;
  height: 100%;
}

.heading {
  display: flex;
  flex-direction: column;
  padding: 20rpx 30rpx;
  background-color: #fff;
  color: #567;
  font-size: 24rpx;
}

.heading .name {
  font-size: 40rpx;
  color: #234;
}

.heading .score {
  position: absolute;
  top: 20rpx;
  right: 20rpx;
  padding: 0 10rpx;
  background-color: #ee523d;
  border-radius: 30rpx;
  color: #fff;
  font-size: 24rpx;
  text-align: center;
}

.introduction {
  margin-top: 20rpx;
  padding: 30rpx;
  background-color: #fff;
  color: #456;
  font-size: 24rpx;
  line-height: 2;
}

.comments {
  margin-top: 20rpx;
  padding: 20rpx;
  background-color: #fff;
  color: #345;
  font-size: 24rpx;
}

.comments .item {
  display: flex;
  position: relative;
  flex-direction: column;
  padding: 20rpx;
  border-bottom: 1rpx solid #eee;
}

.comments .item .name {
  margin-top: 20rpx;
  font-size: 36rpx;
}

.comments .item .date {
  align-self: flex-end;
  margin: -40rpx 0 20rpx;
  color: #567;
}

.comments .item .rating {
  position: absolute;
  top: 20rpx;
  right: 10rpx;
  color: #ee523d;
}

.comments .item image {
  width: 110rpx;
  height: 110rpx;
  margin: 10rpx;
}

```

```javascript
// local_life/pages/detail/detail.js
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

```


