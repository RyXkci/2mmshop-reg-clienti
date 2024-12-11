import { useState } from "react"

export default function ClothingPicker({clothesOptions, clothesType, handleClick}) {

console.log("TYPE IN BUTTON COMP IS:", clothesType)
console.log("Options are:", clothesOptions)

const [categories, setCategories] = useState(clothesOptions[clothesType].categories)
console.log(categories)

const testFunc = (param, category) => {
    console.log(param)
    console.log(category)
}
    return (
        <div className="accessory-picker">
            {categories.map((category) => {
                return <button onClick={()=> handleClick(clothesType, category)} key={category}>{category}</button>
            })}
        
        {/* {clothesType.categories.map((clothing) => {
          return <button onClick={() => handleClick(clothing, clothesType)} key={clothing}>{clothing}</button>
        })} */}
      </div>
    )
}
{/* <button onClick={() => handleToggle('accessory', accessory)} */}