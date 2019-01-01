import fetch from 'js/fetch.js'
import url from 'js/api.js'

let Cart = {
  add(id) {
    return fetch(url.cartAdd, {
      id,
      number: 1
    })
  },
  reduce(id) {
    return fetch(url.cartReduce, {
      id,
      number: 1
    })
  }
}

export default Cart
