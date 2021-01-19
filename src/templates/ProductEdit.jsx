import React, { useState, useCallback, useEffect } from "react";
import { TextInput, SelectBox, PrimaryButton } from "../components/UIkit";
import { useDispatch } from "react-redux";
import { saveProduct } from "../reducks/products/operation";
import ImageArea from "../components/Products/ImageArea";
import {db} from "../firebase/index"

const ProductEdit = () => {
  const dispatch = useDispatch();

  let id = window.location.pathname.split('/product/edit')[1];

  if (id !== "") {
      id = id.split('/')[1]
  }

  const [name, setName] = useState(""),
    [description, setDescription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGender] = useState(""),
    [images, setImages] = useState([]),
    [price, setPrice] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDescription = useCallback(
    (event) => {
      setDescription(event.target.value);
    },
    [setDescription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    { id: "tops", name: "トップス" },
    { id: "shirts", name: "シャツ" },
    { id: "pants", name: "パンツ" },
    { id: "accessories", name: "アクセサリー" },
    { id: "underwear", name: "下着" },
  ];

  const genders = [
    { id: "all", name: "すべて" },
    { id: "male", name: "男性" },
    { id: "female", name: "女性" },
  ];
  
  useEffect(()  => {
      if (id !== "") {
        db.collection('products').doc(id).get().then(snapshot => {
          const data = snapshot.data()
          setName(data.name)
          setImages(data.images)
          setGender(data.gender)
          setCategory(data.category)
          setPrice(data.price)
          setDescription(data.description)

        })
      }
  }, [id])

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
        <ImageArea images={images} setImages={setImages} />
        <TextInput
          fullWidth={true}
          label={"商品名"}
          multiline={false}
          required={true}
          onChange={inputName}
          rows={1}
          value={name}
          type={"text"}
        />
        <TextInput
          fullWidth={true}
          label={"商品説明"}
          multiline={true}
          required={true}
          onChange={inputDescription}
          rows={5}
          value={description}
          type={"text"}
        />
        <SelectBox
          label={"カテゴリー"}
          required={true}
          options={categories}
          value={category}
          select={setCategory}
        ></SelectBox>

        <SelectBox
          label={"性別"}
          required={true}
          options={genders}
          value={gender}
          select={setGender}
        ></SelectBox>
        <TextInput
          fullWidth={true}
          label={"価格"}
          multiline={false}
          required={true}
          onChange={inputPrice}
          rows={1}
          value={price}
          type={"number"}
        />
        <div className="module-spacer--medium"></div>
        <div className="center">
          <PrimaryButton
            label={"商品情報を保存"}
            onClick={() =>
              dispatch(saveProduct(id, name, description, category, gender, price, images))
            }
          />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
