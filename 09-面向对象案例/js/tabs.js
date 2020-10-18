var that
//创建Tab类
class Tab {
  constructor(id) {
    that = this
    // 获取到嘴歪面的盒子
    this.main = document.querySelector('#tab')
    //获取到所有的li
    this.lis = this.main.querySelectorAll('li')
    // 获取到所有的section
    this.sections = this.main.querySelectorAll('section')
    //调用初始化
    this.init()
  }
  init () {
    //初始化函数 绑定事件
    // 遍历li
    for (var i = 0; i < this.lis.length; i++) {
      //获取到li的下标
      this.lis[i].index = i
      //给所有的li绑定点击事件
      this.lis[i].onclick = this.toggleTab

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
  addTab () { }
  //删除功能
  removeTab () { }
  //修改功能
  editTab () { }
}
//实例化对象
new Tab('#tab')