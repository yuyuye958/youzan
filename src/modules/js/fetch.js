import axios from 'axios'

function fetch(url, data) {
  return new Promise((resolve, reject) => {
    axios.post(url, data).then((res) => {
      if (res.data.status === 200) {
        resolve(res)
      }
      // 根据业务状态码来处理
      if (res.data.status === 300) {
        location.href = 'login.html'
        resolve(res)
      }
      reject(res)
    }).catch((error) => {
      reject(error)
    })
  })
}

export default fetch
