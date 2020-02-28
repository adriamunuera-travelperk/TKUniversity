import React, {useState} from 'react'
import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import {Redirect, withRouter} from 'react-router-dom'
import {v4 as uuid} from 'uuid'
import './App.css'

import {pizzaClassica, pizzaTarradellas, curryBoar, lentejas, allRecipes} from './testData'

const Detail = (props) => {
  const id = props.id
  if (!id) return <Redirect to='/recipes/'/>

  const recipeObject = allRecipes[id]
  if (recipeObject == null) return <Redirect to='/recipes/'/>
  const name = recipeObject.name
  const description = recipeObject.description
  const ingredients = recipeObject.ingredients
  const imgSrc = 'https://www.simplyrecipes.com/wp-content/uploads/2019/09/easy-pepperoni-pizza-lead-4.jpg'

  return (<Container>
            <Row>
              <Card style={{ width: '30rem', margin: '0 auto', float: 'none', marginTop:'5vh'}}>
                <Card.Header>{name}</Card.Header>
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
                    <Button variant="secondary" onClick={() => console.log('TODO!')} className='detailButton'>Go back</Button>
                    <Button variant="warning" onClick={() => console.log('TODO!')} className='detailButton'>Edit</Button>
                    <Button variant="danger" onClick={() => console.log('TODO!')} className='detailButton'>Delete</Button>
                  </div>

                </Card.Body>
              </Card>
            </Row>
          </Container>)
}

export default Detail