import React, {useState} from 'react'
import {Button, ListGroup, InputGroup, FormControl} from 'react-bootstrap'
import './App.css'




const AddIngredients = (props) => {
  const ingredients = (props.ingredients? props.ingredients:[])
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
              Añadir ingrediente
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
