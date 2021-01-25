import React, {useCallback} from 'react'
import List from '@material-ui/core/List'
import {useSelector, useDispatch} from 'react-redux'
import { getProductInCart } from '../reducks/users/selectors'
import CartListItem from '../components/Products/CartListItem'
import {GreyButton, PrimaryButton} from '../components/UIkit/index'
import {push} from 'connected-react-router'
import {makeStyles} from '@material-ui/styles'

const useStyles = makeStyles({
  root: {
    margin: '0 auto 0',
    maxWidth: 512,
    width: '100%'
  }
})

const CartList = () => {
  const classes = useStyles()
  const selector = useSelector((state) => state)
  const productsInCart = getProductInCart(selector)
  const dispatch = useDispatch()

  const goToOrder = useCallback(() => {
    dispatch(push('/order/confirm'))
  }, [])

  const backToHome = useCallback(() => {
    dispatch(push('/'))
  }, [])

    return(
      <section className="c-section-wrapin">
        <h2 className="u-text__headline">
          ショッピングカート
        </h2>
        <List className={classes.root}>
          {productsInCart.length > 0 && (
            productsInCart.map(product => <CartListItem key={product.cartId} product={product} />)
          )}
        </List>
        <div className="module-spacer--medium" />
        <div className="p-grird__column">
          <PrimaryButton label={"レジへ進む"} onClick={goToOrder} />
          <div className="module-spacer--extra-small" />
          <GreyButton label={"ショッピングを続ける"} onClick={backToHome} />
        </div>
      </section>
    )
}

export default CartList
