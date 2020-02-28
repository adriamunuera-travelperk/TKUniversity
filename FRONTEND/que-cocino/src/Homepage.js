import React, {useState} from 'react'
import {pizzaClassica, pizzaTarradellas, curryBoar, lentejas, allRecipes} from './testData'
import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'
import './App.css';
import {ListOfIngredientsToString} from './utils'

const Homepage = () => {
  const allRecipesFromAPI = allRecipes //TODO: GET

  return (<div>
            <Container>
              <Row>
                <Card style={{ width: '90%', margin: '0 auto', float: 'none', marginTop:'1vh', borderWidth: '1px', marginBottom: '5vh'}}>
                    <Card.Body>
                    <Table responsive>
                      <thead>
                        <tr>
                          {}
                          <th>#</th>
                          <th>Nombre</th>
                          <th>Ingredientes</th>
                          <th>Ver receta </th>
                          <th>Eliminar recete </th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          allRecipesFromAPI.map((recipe, index) => {
                            return (<tr>
                                      <td> {index} </td>
                                      <td> {recipe.name} </td>
                                      <td> {ListOfIngredientsToString(recipe.ingredients)} </td>
                                      <td>
                                        <Button variant="info">
                                          <NavLink exact to={"/recipes/"+index} style={{color:'white'}}>Ver</NavLink>
                                        </Button>
                                      </td>
                                      <td>
                                        <Button onClick={() => console.log('TODO!')} variant="danger">Eliminar</Button>
                                      </td>
                                    </tr>)
                          })
                        }
                      </tbody>
                    </Table>
                    <Button variant="primary" size="lg">
                      <NavLink exact to={"/recipes/add"} style={{color:'white'}}>
                        Añadir receta
                      </NavLink>
                    </Button>
                  </Card.Body>
                </Card>
              </Row>
            </Container>
      </div>)
}

export default Homepage
