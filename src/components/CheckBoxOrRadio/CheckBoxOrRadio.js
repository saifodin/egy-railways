import React from 'react';
import css from './CheckBoxOrRadio.module.scss'


const CheckBoxOrRadio = (props) => {
  // <CheckBoxOrRadio isCheckBoxNotRadio={true} wordsInLabel={array} shapeOfStyles="basic" />
  // or
  // <CheckBoxOrRadio isCheckBoxNotRadio={false} wordsInLabel={array} nameOfRadio="gender" shapeOfStyles="basic" />




  //#region generate <li> with dynamic data, with radio or checkbox 
  let typeName = "radio"
  let radioName = props.nameOfRadio
  let isCheckbox = "";

  if (props.isCheckBoxNotRadio) {
    typeName = "checkbox"
    isCheckbox = css.checkbox
  }

  let items = []
  for (let i = 0; i < props.wordsInLabel.length; i++) {

    let word = props.wordsInLabel[i]

    // in radio all name are equal, in checkBox name is unique
    if (props.isCheckBoxNotRadio) {
      radioName = word;
    }

    items.push(
      <li key={i}>
        {/*input => disable none */}
        <input type={typeName} id={word} name={radioName} />
        {/*label => the word */}
        <label onClick={_ => props.clickOnWhichLi(word)} className={isCheckbox} htmlFor={word}>{word}</label>
        {/*div => the circle or rectangle  */}
        <div className={isCheckbox}></div>
      </li>
    );
  }
  //#endregion

  //#region change some styles in different pages
  let extraStyle = ""
  if (props.shapeOfStyles === "basic") {
    extraStyle = css.basicStyles
  }
  //#endregion

  return (
    <div className={`${css.CheckBoxOrRadioContainer} ${extraStyle}`}>
      <ul>
        {items}
        {/*
        <li>
          <input type={typeName} id={word} name={radioName} />
          <label className={isCheckbox} htmlFor={word}>{word}</label>
          <div className={css.isCheckbox}></div>
        </li> 
      */}
      </ul>
    </div>
  );
}

export default CheckBoxOrRadio;
