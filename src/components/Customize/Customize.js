import React, { useState } from 'react'
import { useNavigate} from "react-router-dom"
import axios from "axios"

import "./Customize.css"

export default function Customize() 
{
    const [burgerName, setBurgerName] = useState('')
    const [ingredients, setIngredients] = useState([])
    const navigate = useNavigate()
    const URL = 'http://localhost:3001/customize'

    function handleBurgerNameChange (event) 
    {
        setBurgerName(event.target.value)
    }

    function handleIngredientChange (event, ingredient) 
    {
        const isChecked = event.target.checked
        if (isChecked) 
        {
            setIngredients([...ingredients, ingredient])
        } 
        else 
        {
            setIngredients(ingredients.filter(item => item !== ingredient))
        }
    }

    function handleSubmit (e) 
    {
        e.preventDefault()
        axios.post(URL ,
          {
              burgerName, 
              ingredients
          })
        .then(response => 
          {
              navigate('/orders')
          })
        .catch(error => {
              console.log(error)
          });
    }

    return (
        <div className="customize1">
            <div className="burger-customizer">
                <h2>
                    Customize Your Own Burger
                  </h2>
                
                <form onSubmit={(e) => handleSubmit}>
                    <label>
                        Burger Name:
                        <input
                            type="text"
                            value={burgerName}
                            onChange={handleBurgerNameChange}
                            required
                        />
                    </label>

                    <h3>
                        Choose Ingredients:
                      </h3>
                    
                    <div className="ingredients">
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleIngredientChange(e, 'Cheese')}
                            />
                            Cheese
                        </label>                
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleIngredientChange(e, 'Bacon')}
                            />
                              Bacon
                        </label>
                        <br />
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleIngredientChange(e, 'Lettuce')}
                            />
                            Lettuce
                        </label>
                         <br />
                        <label>
                            <input
                                type="checkbox"
                                onChange={(e) => handleIngredientChange(e, 'Tomato')}
                            />
                            Tomato
                        </label>
                    </div>
                    
                    <p>
                        Burger Name: {burgerName}
                    </p>
        
                    <p>
                        Ingredients: {ingredients.join(', ')}
                    </p>
                    
                    <button>
                        Let's Brrrgrrr!
                    </button>
                </form>
            </div>
        </div>
  )
}
