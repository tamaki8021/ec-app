import React, { useState, useCallback } from "react";
import {TextInput, SelectBox, PrimaryButton} from "../components/UIkit";

const ProductEdit = () => {
  const [name, setName] = useState(""),
    [description, setDiscription] = useState(""),
    [category, setCategory] = useState(""),
    [gender, setGendr] = useState(""),
    [price, setPrice] = useState("");

  const inputName = useCallback(
    (event) => {
      setName(event.target.value);
    },
    [setName]
  );

  const inputDiscription = useCallback(
    (event) => {
      setDiscription(event.target.value);
    },
    [setDiscription]
  );

  const inputPrice = useCallback(
    (event) => {
      setPrice(event.target.value);
    },
    [setPrice]
  );

  const categories = [
    {id: 'tops' , name:'トップス'},
    {id: 'shirts' , name:'シャツ'},
    {id: 'pants' , name:'パンツ'},
    {id: 'accessories' , name:'アクセサリー'},
    {id: 'underwear' , name:'下着'},
  ];

  const genders = [
    {id: 'all' , name:'すべて'},
    {id: 'male' , name:'男性'},
    {id: 'female' , name:'女性'},
  ];

  return (
    <section>
      <h2 className="u-text__headline u-text-center">商品の登録・編集</h2>
      <div className="c-section-container">
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
          onChange={inputDiscription}
          rows={5}
          value={description}
          type={"text"}
        />
        <SelectBox label={"カテゴリー"} required={true} options={categories} value={category} select={setCategory}></SelectBox>

        <SelectBox label={"性別"} required={true} options={genders} value={gender} select={setGendr}></SelectBox>
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
              
            />
        </div>
      </div>
    </section>
  );
};

export default ProductEdit;
