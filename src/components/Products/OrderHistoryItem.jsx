import React from 'react'
import Divider from '@material-ui/core/Divider'
import {TextDetail} from '../UIkit'
import {OrderedProduct} from './index'

const datetimaeToString = (date) => {
  return date.getFullYear() + '_' 
        + ('00' + (date.getMonth()+1)).slice(-2) + ""
        + ('00' + (date.getDate()+1)).slice(-2) + ""
        + ('00' + (date.getHours()+1)).slice(-2) + ":"
        + ('00' + (date.getMinutes()+1)).slice(-2) + ":"
        + ('00' + (date.getSeconds()+1)).slice(-2) 
}

const dateToString = (date) => {
  return date.getFullYear() + '_' 
  + ('00' + (date.getMonth()+1)).slice(-2) + ""
  + ('00' + (date.getDate()+1)).slice(-2) + "" 
}

const OrderHistoryItem = (props) => {
    const order = props.order
    const orderedDatetime = datetimaeToString(order.updated_at.toDate())
    const shippingDate = dateToString(order.shipping_date.toDate())
    const price = "¥" + order.amount.toLocaleString()

    return(
      <div>
        <div className="module-spacer--small"></div>

        <TextDetail label={"注文ID"} value={order.id} />
        <TextDetail label={"注文日時"} value={orderedDatetime} />
        <TextDetail label={"発送予定日"} value={shippingDate} />
        <TextDetail label={"注文金額"} value={price} />
        {order.products.length > 0 && (
          <OrderedProduct products={order.products} />
        )}
        <div className="module-spacer--extra-small"></div>
        <Divider />
      </div>
    )
}

export default OrderHistoryItem