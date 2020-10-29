//封装一个函数用来处理data参数，需要把data对象，转化成查询字符串的格式，从而提交给服务器，因此提前定义resolveData函数
function resolveData (data) {
  // 定义一个空的数组
  let arr = []
  // 遍历data里面的数据
  for (var k in data) {
    // 定义一个变量用来接收键值对的拼接字符串
    var str = k + '=' + data[k]
    // 将获取到的键值对推进数组里
    arr.push(str)

  }
  // 用&来分隔每一个键值对
  return arr.join('&')
}
// 封装一个函数，传入对象参数
function itheima (options) {
  // 创建xhr对象
  let xhr = new XMLHttpRequest()
  // 把外界传递过来的参数对象转换为查询字符串
  let qs = resolveData(options.data)
  // 判断发送的请求是否为GET
  if (options.type.toUpperCase() === 'GET') {
    // 调用open函数并且往里面传入查询字符串
    xhr.open(options.type, options.url + '?' + qs)
    xhr.send()
  } else if (options.type.toUpperCase() === 'POST') {
    xhr.open(options.type, options.url)
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
    xhr.send(qs)
  }
  // 监听请求状态改变的事件
  xhr.onreadystatechange = function () {
    if (xhr.readyState === 4 && xhr.status === 200) {
      // 成功后调用options里面的回调函数
      options.success(JSON.parse(xhr.responseText))
    }
  }
}