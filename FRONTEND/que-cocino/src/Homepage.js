import React, {useState} from 'react'
import {pizzaClassica, pizzaTarradellas, curryBoar, lentejas, allRecipes} from './testData'
import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import {Switch, Route, NavLink, Redirect} from 'react-router-dom'


const ListOfIngredientsToString = (list) => {
  let result = ''
  for (let i=0; i < list.length; i++) result = result + list[i].name + ' '
  return result
}

const Homepage = () => {
  const allRecipesFromAPI = allRecipes //TODO: GET

  return (<div>
      <h1>QUÉ COCINO</h1>
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
      </div>)
}

export default Homepage
