$(function () {
  //定义一个变量接收地址
  let BAURL = 'http://www.liulongbin.top:3006/api/'
  //获取新闻列表的函数
  function getNew () {
    template.defaults.imports.formatData = function (data) {
      let date = new Date(data)
      // console.log(data);
      let year = date.getFullYear()
      let month = (date.getMonth() + 1).toString().padStart(2, 0)
      let day = date.getDate().toString().padStart(2, 0)
      let h = date.getHours().toString().padStart(2, 0)
      let m = date.getMinutes().toString().padStart(2, 0)
      let s = date.getSeconds().toString().padStart(2, 0)
      return `${year}-${month}-${day}   ${h}:${m}:${s}`
    }
    //发送ajax请求，获取新闻列表数据
    $.ajax({
      url: BAURL + 'news',
      success: res => {

        if (res.status !== 200) return alert('未获取到新闻列表')
        // console.log(res);

        //先遍历data数组 并且将data里的tags从字符串变为字符串数组
        res.data.forEach(item => item.tags = item.tags.split(',')
        );
        //调用模板引擎的函数，参数1：模板的id 参数2：数据对象
        template('tp-list', res)
        // console.log(res);
        //将数据渲染到页面上
        $('#news-list').html(template('tp-list', res))
      }
    })
  }
  //调用函数
  getNew()
})