var that
// 创建tab类
class Tab {
  //构造函数,传入参数
  constructor(id) {
    //让that等于实例化对象
    that = this
    //获取到实例化对象
    this.main = document.querySelector(id)
    // 获取到tabadd
    this.tabadd = this.main.querySelector('.tabadd')
    // 获取到ul
    this.ul = this.main.querySelector('.fisrstnav ul:first-child')
    // 获取到tabscon
    this.tabscon = this.main.querySelector('.tabscon')
    // 实例化对象 调用初始化函数
    this.init()
  }
  updata () {
    //获取到所有的li
    this.lis = this.main.querySelectorAll('li')
    // 获取到所有的section
    this.sections = this.main.querySelectorAll('section')
    // 获取到所有的icon-guanbi
    this.remove = this.main.querySelectorAll('.icon-guanbi')
    // 获取到所有的span
    this.span = this.main.querySelectorAll('.fisrstnav ul li span:first-child')
  }
  //初始化函数
  init () {
    //给元素绑定事件

    //调用更新li和section函数
    this.updata()
    //给tabadd绑定点击事件
    this.tabadd.onclick = this.addTab
    //遍历所有的li
    for (var i = 0; i < this.lis.length; i++) {
      //因为点击li要拿到当前li的下标,所以让当前的li的下标等于i
      this.lis[i].index = i
      //给所有的li绑定点击事件并且调用切换函数
      this.lis[i].onclick = this.toggleTab
      // 给remove绑定点击事件并且调用删除函数
      this.remove[i].onclick = this.removeTab
      // 给所有的span绑定双击事件
      this.span[i].ondblclick = this.editTab


    }
  }
  // 切换功能
  toggleTab () {
    //调用清除样式的函数
    that.clearClass()
    // console.log(this.index);
    // 点击当前的li让它添加上liactive这个类
    this.className = 'liactive'
    //因为点击当前li是下面的section也要切换
    that.sections[this.index].className = 'conactive'
  }
  // 清除所有的li和section样式
  clearClass () {
    //因为点击了当前的li要让其他li和sections移除liactive和conactive这两个类 所以要做排它思想
    //因为这里的this指向的是调用该函数的对象，所以要用that
    for (var i = 0; i < that.lis.length; i++) {
      that.lis[i].className = ''
      that.sections[i].className = ''
    }
  }
  // 添加功能
  addTab () {
    that.clearClass()
    // 生成随机数
    var random = Math.random()
    // 当点击tabadd是添加新的li
    var li = ' <li class="liactive"><span>测试1</span><span class="iconfont icon-guanbi"></span></li>'
    //添加新的section
    var section = `<section class="conactive">测试${random}</section>`
    //把心添加的li追加到ul里面
    that.ul.insertAdjacentHTML('beforeend', li)
    // 把section追加到tabscon里面
    that.tabscon.insertAdjacentHTML('beforeend', section)
    //重新获取li的绑定事件
    that.init()
  }
  //删除功能
  removeTab (e) {
    // console.log(11);
    // 阻止冒泡事件，防止触发li
    e.stopPropagation()
    // 获取到li的下标
    var index = this.parentNode.index
    // console.log(index);
    //点击删除时，让li和section删掉
    that.lis[index].remove()
    that.sections[index].remove()
    //删除后需要重新获取到li和点击事件
    that.init()
    // 如果删除的不是选中状态的li就让选中的li保持不变
    if (document.querySelector('.liactive')) return
    //让删除掉当前的li后让它的前一个li被选中,因为删除第一个li后没有index了
    index--
    that.lis[index] && that.lis[index].click()

  }
  // 修改功能
  editTab () {
    // console.log(11);
    // 将span里的文本赋值给str
    var str = this.innerHTML
    //双击禁止选中文字
    window.getSelection ? window.getSelection().removeAllRanges() : document.selection.empty();
    //双击时，span标签里添加input文本框
    this.innerHTML = '<input type="text">'
    // 将文本内容赋值给input文本框
    this.children[0].value = str
    //文本框里的内容处于被选定状态
    this.children[0].select()
    // 鼠标移开，将input文本框里的内容赋值给span
    this.children[0].onblur = function () {
      this.parentNode.innerHTML = this.value
    }
    // 按下回车键时也将值赋值给span
    this.children[0].onkeyup = function (e) {
      // 判断是否按下的13
      if (e.keyCode === 13) {
        this.blur()
      }
    }
  }
}
// 实例化对象
new Tab('#tab')