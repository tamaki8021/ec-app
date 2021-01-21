import React, { useState, useEffect, useCallback } from "react";
import { useSelector } from "react-redux";
import { db } from "../firebase/index";
import { makeStyles } from "@material-ui/core/styles";
import HTMLReactParser from 'html-react-parser'
import {ImageSwiper} from '../components/Products/index'

const useStyle = makeStyles((theme) => ({
    sliderBox: {
      [theme.breakpoints.down('sm')]: {
          margin: '0 auto 24px auto',
          height: 320,
          width: 320
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 400,
        width: 400
      }
    },
    detail: {
      textAlign: 'left',
      [theme.breakpoints.down('sm')]: {
        margin: '0 auto 16px auto',
        height: 'auto',
        width: 320
      },
      [theme.breakpoints.up('sm')]: {
        margin: '0 auto',
        height: 'auto',
        width: 400
      }
    },
    price: {
      fontSize: 36
    }
}))

//改行コードをReactの中で表示させるための処理
const returnCodeToBr = (text) => {
  if(text === "") {
    return text
  } else {
    // /\r?\n/gは改行コードを表している 
    return HTMLReactParser(text.replace(/\r?\n/g, '<br>'))
  }
}

const ProductDetail = () => {
  const classes = useStyle()
  const selector = useSelector((state) => state);
  const path = selector.router.location.pathname;
  const id = path.split("/product/")[1];

  const [product, setProduct] = useState(null);

  useEffect(() => {
    db.collection("products")
      .doc(id)
      .get()
      .then((doc) => {
        const data = doc.data();
        setProduct(data);
      });
  }, []);

  return (
    <section className="c-section-wrapin">
        {product && (
            <div className="p-grid__row">
                <div className={classes.sliderBox}>
                    <ImageSwiper images={product.images} />
                </div>
                <div className={classes.detail}>
                    <h2 className="u-text__headline">{product.name}</h2>
                    <p className={classes.price}>{product.price.toLocaleString()}</p>
                    <div className="module-spacer--small"></div>
                    <div className="module-spacer--small"></div>
                    <p>{returnCodeToBr(product.description)}</p>
                </div>
            </div>
        )}
    </section>
  )
};

export default ProductDetail;
