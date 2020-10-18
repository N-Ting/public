var that
//创建Tab类
class Tab {
  constructor(id) {
    that = this
    // 获取到嘴歪面的盒子
    this.main = document.querySelector('#tab')

    // 获取到tabadd
    this.tabadd = this.main.querySelector('.tabadd')
    // 获取到ul
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    // 获取到tabscon
    this.tabscon = this.main.querySelector('.tabscon')
    //调用初始化
    this.init()
  }
  updata () {
    //获取到所有的li
    this.lis = this.main.querySelectorAll('li')
    // 获取到所有的section
    this.sections = this.main.querySelectorAll('section')
    //获取到所有的icon-guanbi
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    // 获取到span标签
    this.span = this.main.querySelectorAll(".fisrstnav ul li span:first-child")
  }
  init () {
    this.updata()
    //初始化函数 绑定事件
    // 给tabadd绑定点击事件
    this.tabadd.onclick = this.addTab
    // 遍历li
    for (var i = 0; i < this.lis.length; i++) {
      //获取到li的下标
      this.lis[i].index = i
      //给所有的li绑定点击事件
      this.lis[i].onclick = this.toggleTab
      this.remove[i].onclick = this.removeTab
      // 双击事件
      this.span[i].ondblclick = this.editTab
      this.sections[i].ondblclick = this.editTab

    }
  }
  //切换功能
  toggleTab () {
    that.clearClass()
    //点击当前的li给它添加上liactive这个类
    this.className = 'liactive'
    that.sections[this.index].className = 'conactive'
  }
  // 清除样式
  clearClass () {
    for (let i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      // console.log(this);
      this.sections[i].className = ''

    }
  }
  //添加功能
  addTab () {
    that.clearClass()
    var random = Math.random()
    // 点击tabadd时往里面添加新的li
    var li = ' <li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
    var section = `<section class="conactive">测试${random}</section>`
    //将新添加的li追加到ul里
    that.ul.insertAdjacentHTML('beforeend', li)
    that.tabscon.insertAdjacentHTML('beforeend', section)
    that.init()
  }
  //删除功能
  removeTab (e) {
    // 阻止冒泡事件，防止触发li
    e.stopPropagation()
    var index = this.parentNode.index
    that.lis[index].remove()
    that.sections[index].remove()
    that.init()
    if (document.querySelector('.liactive')) return
    index--
    that.lis[index] && that.lis[index].click()
  }
  //修改功能
  editTab () {
    var str = this.innerHTML
    // 双击将span标签里添加input框
    this.innerHTML = "<input  type=text>"
    this.children[0].value = str
    this.children[0].select()
    this.children[0].onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    this.children[0].onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }
}
//实例化对象
new Tab('#tab')