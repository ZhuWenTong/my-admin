import FixedEltableHeader from '../directives/fixed-eltable-header'
import TransferDom from '../directives/transfer-dom'

const directives = {
    install (Vue) {
        Vue.directive('fixed-eltable-header', FixedEltableHeader)
        Vue.directive('transfer-dom', TransferDom)
    }
}
export default directives
