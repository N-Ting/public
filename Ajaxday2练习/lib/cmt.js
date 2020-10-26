//将地址赋值给BAURL变量
let BAURL = 'http://www.liulongbin.top:3006/api/'
//获取到评论数据
getCommentList()
function getCommentList () {
  //发送ajax请求，获取评论列表
  $.ajax({
    url: BAURL + 'cmtlist',
    //表示获取成功
    success: res => {
      if (res.status !== 200) return alert('获取列表失败')
      //定义一个空的数组
      let rows = []
      res.data.forEach(item => {
        rows.push(` <li class="list-group-item">
       <span class="badge" style="background-color: #F0AD4E;">评论时间：${item.time}</span>
       <span class="badge" style="background-color: #5BC0DE;">评论人：${item.username}</span>
       ${item.content}
     </li>`
        )
        $('#cmt-list').empty().append(rows)
      })

    }
  })
}

// 发表评论
$(function () {
  $('#formAddCmt').on('submit', function () {
    let data = $(this).serialize()
    $.ajax({
      type: 'POST',
      url: BAURL + 'addcmt',
      data,
      success: res => {
        console.log(res);
        //判断状态码是否等于201
        if (res.status !== 201) return alert('发表评论失败')
        //等于就终于调用获得评论数据的函数
        getCommentList()
        //发表后清空内容，jq对象要转换为DOM对象,reset()清空内容
        $('#formAddCmt')[0].reset()
      }
    })
    //阻止默认行为 不提交数据
    return false
  })
})