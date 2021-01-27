import React, { useEffect } from "react";
import { ProductCard } from "../components/Products";
import { useDispatch, useSelector } from "react-redux";
import { fetchProducts } from "../reducks/products/operation";
import { getProducts } from "../reducks/products/selectors";

const ProductList = () => {
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const products = getProducts(selector);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);


  return (
    <section className="c-section-wrapin">
      <div className="p-grid__row">
        {products.length > 0 &&
          products.map((product) => <ProductCard key={product.key} id={product.id} name={product.name} images={product.images} price={product.price} />)}
      </div>
    </section>
  );
};

export default ProductList;
