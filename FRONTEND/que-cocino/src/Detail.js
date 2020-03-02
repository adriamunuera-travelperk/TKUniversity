import React, {useState, useEffect} from 'react'
import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import {Redirect, withRouter} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import './App.css'
import axios from 'axios'

import AddRecipe from './AddRecipe'
import ListOfIngredientsToList from './utils'


const useBoolState = (initialBool) => {
  const [b, setBool] = useState(initialBool)
  return {
    b,
    toggle: () => setBool(!b)
  }
}


const Detail = (props) => {

  const boolHook = useBoolState(true)
  const shouldRedirectToHomeHook = useBoolState(false)
  const [recipeObject, setRecipe] = useState({'name': '', 'description': '', 'ingredients':[]})

  const index = props.id
  console.log('INDEX', index)
  useEffect(() => {
    async function getRecipe() {
      const URL = 'http://localhost:8000/api/recipes/'+index.toString()
      console.log(URL)
      await axios.get(URL).then(response => {
        console.log('RESPONSE', response.data)
        setRecipe(response.data)
      })
    }
    getRecipe()
  },[])


  if (!index) return <Redirect to='/recipes/'/>

  console.log('RECIPE!!1', recipeObject)
  if (recipeObject == null) return <Redirect to='/recipes/'/>
  const name = recipeObject.name
  const description = recipeObject.description
  const ingredients = recipeObject.ingredients
  const imgSrc = 'https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg'

  const deleteRecipeAt = () => {
    const URL = 'http://localhost:8000/api/recipes/'+(index).toString()
    axios.delete(URL).then(response => {
      if (response.status == 204) {
        shouldRedirectToHomeHook.toggle()
      }
    })
  }

  if (shouldRedirectToHomeHook.b) {
    return (<Redirect to='/recipes/'/>)
  }

  if (boolHook.b) {
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
                      <Button variant="warning" onClick={() => boolHook.toggle()} className='detailButton'>Editar</Button>
                      <Button variant="danger" onClick={deleteRecipeAt} className='detailButton'>Eliminar</Button>
                    </div>
                  </Card.Body>
                </Card>
              </Row>
            </Container>)
  } else {
    return <AddRecipe name={name} description={description} ingredients={ingredients}/>
  }
}

export default Detail
