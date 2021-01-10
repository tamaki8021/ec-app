import React from 'react';
import TextFiled from '@material-ui/core/TextField';

const TextInput = (props) => {
    return(
      <TextFiled 
        fullWidth={props.fullWidth}
        label={props.label}
        margin="dense"
        multiline={props.multiline} //複数行の入力を許可
        required={props.required}//必須入力
        rows={props.rows}//マルチラインを何行見せるか
        value={props.value}
        type={props.type}
        onChange={props.onChange}//入力した値が変わったか知らせる
      />
    )
}

export default TextInput;