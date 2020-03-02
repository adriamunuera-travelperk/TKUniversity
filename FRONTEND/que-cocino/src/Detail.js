import React, {useState, useEffect} from 'react'
import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import {Redirect} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import axios from 'axios'

import './App.css'
import AddRecipe from './AddRecipe'
import {ListOfIngredientsToList} from './utils'
import BASE_URL from './constants'


const useBoolState = (initialBool) => {
  const [b, setBool] = useState(initialBool)
  return {
    b,
    toggle: () => setBool(!b)
  }
}


const Detail = (props) => {
  const shouldDisplayEditHook = useBoolState(true)
  const shouldRedirectToHomeHook = useBoolState(false)
  const [recipeObject, setRecipe] = useState({'name': '', 'description': '', 'ingredients':[]})
  const index = props.id

  useEffect(() => {
    async function getRecipe() {
      const URL = BASE_URL +index.toString()
      await axios.get(URL).then(response => {
        setRecipe(response.data)
      })
    }
    getRecipe()
  },[])

  const deleteRecipeAction = () => {
    const URL = BASE_URL +(index).toString()
    axios.delete(URL).then(response => {
      if (response.status === 204) {
        shouldRedirectToHomeHook.toggle()
      }
    })
  }

  if (recipeObject == null) return <Redirect to='/recipes/'/>
  const name = recipeObject.name
  const description = recipeObject.description
  const ingredients = recipeObject.ingredients
  const imgSrc = 'https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg'

  if (shouldRedirectToHomeHook.b) {
    return (<Redirect to='/recipes/'/>)
  }
  if (shouldDisplayEditHook.b) {
    return (<Container>
              <Row>
                <Card style={{ width: '30rem', margin: '0 auto', float: 'none', marginTop:'1vh', marginBottom:'5vh'}}>
                  <Card.Img variant="top" src={imgSrc} className='RecipeImage' />
                  <Card.Body>
                    <Card.Title > {name} </Card.Title>
                    <p>{description}</p>
                    <Table responsive>
                      <thead>
                        <tr>
                          <th>Ingredients</th>
                        </tr>
                      </thead>
                      <tbody>
                      {ingredients.map(ingredient => {
                        return <tr key={uuid()}> {ingredient.name} </tr>
                      })}
                      </tbody>
                    </Table>
                    <div>
                      <Button variant="secondary" onClick={() => console.log('TODO!')} className='detailButton'>Atrás</Button>
                      <Button variant="warning" onClick={() => shouldDisplayEditHook.toggle()} className='detailButton'>Editar</Button>
                      <Button variant="danger" onClick={deleteRecipeAction} className='detailButton'>Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Container>)
  } else {
    return <AddRecipe name={name} description={description} ingredients={ListOfIngredientsToList(ingredients)} id={index}/>
  }
}

export default Detail
