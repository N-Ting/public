var that
//创建一个Tab类
class Tab {
  constructor(id) {
    that = this
    this.main = document.querySelector(id)

    this.add = this.main.querySelector('.tabadd')
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    this.tabscon = this.main.querySelector('.tabscon')
    this.init()
  }
  //初始化操作
  init () {
    this.updata()
    //init 初始化操作 让相关元素绑定事件
    this.add.onclick = this.addTab
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].index = i
      this.lis[i].onclick = this.toggleTab
      this.remove[i].onclick = this.removeTab
      this.spans[i].ondblclick = this.editTab
      this.section[i].ondblclick = this.editTab
    }
  }
  //获取所有的li和section
  updata () {
    this.lis = this.main.querySelectorAll('li')
    this.section = this.main.querySelectorAll('section')
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    this.spans = this.main.querySelectorAll('.fisrstnav li span:first-child')
  }
  //切换功能
  toggleTab () {
    // console.log(this.index);
    // 因为要先清除其他的类名保留自己身上的,因为是实例化对象调用所以用that
    that.clearClass()
    this.className = 'liactive'
    //因为this指向的是li，li里面没有sextion,所以应该定义一个全局变量that
    that.section[this.index].className = 'conactive'
  }
  //清除类名
  clearClass () {
    //因为都要使用来清除类名，所以封装一个函数
    for (var i = 0; i < this.lis.length; i++) {
      this.lis[i].className = ''
      this.section[i].className = ''

    }
  }
  //添加功能
  addTab () {
    that.clearClass()
    var random = Math.random()
    //创建li元素和section元素
    var li = `<li class="liactive"><span>测试</span><span class="iconfont icon-guanbi"></span></li>`
    var section = `<section class="conactive">测试${random}</section>`
    //把这两个元素追加到相应的父元素里面
    that.ul.insertAdjacentHTML('beforeend', li)
    that.tabscon.insertAdjacentHTML('beforeend', section)
    that.init()

  }
  //删除功能
  removeTab (e) {
    //阻止事件冒泡
    e.stopPropagation()
    //因为本身没有索引号，但是它的父亲li有，并且是所需要的
    var index = this.parentNode.index
    // console.log(index);
    // 根据索引号删除指定的li和section
    that.lis[index].remove()
    that.section[index].remove()
    that.init()
    //当我们删除的不是选中的li，原来选中状态的li保持不变
    if (document.querySelector('.liactive')) return
    //当我们删除当前的li时，让它前一个选中
    index--
    //click()手动调用点击事件
    that.lis[index] && that.lis[index].click()
  }
  //修改功能
  editTab () {
    //先获取文本内容
    var str = this.innerHTML
    //双击禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    // alert(11)
    this.innerHTML = `<input type="text"/>`
    var input = this.children[0]
    input.value = str
    //让文本框里的文本处于选中状态
    input.select()
    //当我们鼠标离开，就把输入的值给span标签，取消掉文本框
    input.onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    //按下回车也能把值给span
    input.onkeyup = function (e) {
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }
}
//实例化对象
new Tab('#tab')