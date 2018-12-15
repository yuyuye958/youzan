import Foot from 'components/Foot'

let mixin = {
  components: {
    Foot
  },
  filters: {
    formatPrice(price) {
      let newPrice = price + ''
      if (newPrice.indexOf('.') !== -1) {
        let arr = newPrice.split('.')
        return arr[0] + '.' + (arr[1] + '0').substring(0, 2)
      } else {
        return price + '.00'
      }
    }
  }
}

export default mixin
