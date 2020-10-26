//定义一个变量将根路径赋值给这个变量
let BAURL = 'http://www.liulongbin.top:3006/api/'
//获取到评论列表
function getCommentList () {
  //发送ajax请求，获取到评论数据
  $.ajax({
    url: BAURL + 'cmtlist',
    success: res => {
      if (res.status !== 200) return alert('未获取到评论')
      //定义一个空数组
      let rows = []
      //遍历data数组
      res.data.forEach(item => {
        //将数据添加到数组里
        rows.push(`
        <li class="list-group-item">
        <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
        <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
        ${item.content}
      </li>`)
        $('#cmt-list').empty().append(rows)
      })
    }
  })
}
getCommentList()

// 发表评论
$(function () {
  $('#formAddCmt').submit(function () {
    //定义一个变量，获取到表单数据
    let data = $(this).serialize()
    //发送ajax请求，获取发表内容
    $.ajax({
      type: 'POST',
      url: BAURL + 'addcmt',
      data,
      success: res => {
        // console.log(res);
        //判断状态码是否为201
        if (res.status !== 201) return alert('没有发表成功')
        //发表成功后，重新获取到评论列表
        getCommentList()
        //获取到评论列表后，清空表单里的内容
        $('#formAddCmt')[0].reset()

      }
    })
    //阻止默认行为
    return false
  })
})