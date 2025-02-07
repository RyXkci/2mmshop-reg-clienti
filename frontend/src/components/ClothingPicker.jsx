import { useState } from "react";

import '../stylesheets/clothing-picker.css'

export default function ClothingPicker({clothesOptions, clothesType, handleClick}) {

// console.log("TYPE IN BUTTON COMP IS:", clothesType)
// console.log("Options are:", clothesOptions)

const [categories, setCategories] = useState(clothesOptions[clothesType].categories)
// console.log(categories)

const testFunc = (param, category) => {
    console.log(param)
    console.log(category)
}
    return (
        <div className="clothing-picker-container">
        <div className="clothing-picker">
            <p className="clothing-picker__title">Seleziona il tipo di {clothesType}!</p>
            <div className="clothing-picker__btns">
            {categories.map((category) => {
                return <button className="clothing-picker__btn" onClick={()=> handleClick(clothesType, category)} key={category}>{category}</button>
            })}
            </div>
          
        
        {/* {clothesType.categories.map((clothing) => {
          return <button onClick={() => handleClick(clothing, clothesType)} key={clothing}>{clothing}</button>
        })} */}
      </div>
      </div>
    )
}
{/* <button onClick={() => handleToggle('accessory', accessory)} */}