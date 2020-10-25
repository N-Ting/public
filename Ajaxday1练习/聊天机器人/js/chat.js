
$(function () {
  // 初始化右侧滚动条
  // 这个方法定义在scroll.js中
  resetui()

  //为发送按钮绑定点击事件
  $("#btnSend").on('click', function () {
    //获取到文本框里的内容,并且清除两端的空格
    let text = $('#inp').val().trim()
    //判断文本框的内容是否为空，
    if (text.length <= 0) {
      //如果为空就返回，并且将文本框的内容清空
      return $('#inp').val("")
    }
    //如果用户输入了内容，就将内容追加到页面中
    $('#talk_list').append(`<li class="right_word">
    <img src="img/person02.png" /> <span>${text}</span>
  </li>`)
    //内容追加到页面后，将文本框清空
    $('#inp').val("")
    //重置滚动条的位置，调用函数
    resetui()
    getData(text)

  })

  //发送请求获取聊天内容
  function getData (text) {
    $.ajax({
      url: 'http://www.liulongbin.top:3006/api/robot',
      data: {
        spoken: text
      },
      success (res) {
        // console.log(res);
        //判断返回的message是否为success
        if (res.message === 'success') {
          //定义一个msg的变量拿到机器人发送回来的消息
          let msg = res.data.info.text
          //将机器人发送回来的消息追加到页面上
          $('#talk_list').append(`
          <li class="left_word">
          <img src="img/person01.png" /> 
          <span>${msg}</span>
        </li>`
          )
          //重置滚动条的位置，调用函数
          resetui()
          getVoice(msg)
        }
      }
    })
  }
  //把文字转化为音频
  function getVoice (text) {
    $.ajax({
      url: 'http://www.liulongbin.top:3006/api/synthesize',
      data: {
        text: text
      },
      success (res) {
        // console.log(res);
        if (res.status != 200) return
        $('#voice').attr('src', res.voiceUrl)

      }
    })
  }
  //回车发送
  $('#inp').on('keyup', function (e) {
    if (e.keyCode === 13) {
      $("#btnSend").click()
    }
  })
})