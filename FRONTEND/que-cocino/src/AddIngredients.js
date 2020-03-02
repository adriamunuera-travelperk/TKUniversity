import React from 'react'
import {Button} from 'react-bootstrap'

import './App.css'


const AddIngredients = (props) => {
  const ingredientsHook = props.ingredientsHook
  const addIngredientAction = () => ingredientsHook.append('')

  return (<div>
            {ingredientsHook.array.map((value, index) => {
              return <AddIngredientField
                deleteAtIndex={() => ingredientsHook.deleteAtIndex(index)}
                modifyAtIndex={(x) => ingredientsHook.modifyAtIndex(x, index)}
                text={ingredientsHook.array[index]}/>
            })}
            <Button variant="outline-primary" onClick={() => addIngredientAction()}>
              Añadir otro ingrediente
            </Button>
          </div>)
}


const AddIngredientField = (props) => {
  return (<div>
            <form onSubmit={()=>null}>
                <input
                  type='text'
                  name='Ingredients'
                  onChange={(e) => props.modifyAtIndex(e.target.value)}
                  value={props.text}
                  className={'addIngredientField'}
                  placeholder='Ingrediente'
                />
                <Button
                  variant="danger"
                  onClick={() => props.deleteAtIndex()}>
                  X
                </Button>
            </form>
          </div>)
}


export default AddIngredients
