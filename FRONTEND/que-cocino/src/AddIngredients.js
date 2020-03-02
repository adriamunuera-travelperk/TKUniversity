import React from 'react'
import {Button} from 'react-bootstrap'

import './App.css'


const AddIngredients = (props) => {
  const arrayHook = props.arrayHook
  const addIngredient = () => arrayHook.append('')
  return (<div>
            {arrayHook.array.map((value, index) => {
              return <AddIngredientField
                deleteAtIndex={() => arrayHook.deleteAtIndex(index)}
                modifyAtIndex={(x) => arrayHook.modifyAtIndex(x, index)}
                text={arrayHook.array[index]}/>
            })}
            <Button variant="outline-primary" onClick={() => addIngredient()}>
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
                  value={props.text.name}
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
