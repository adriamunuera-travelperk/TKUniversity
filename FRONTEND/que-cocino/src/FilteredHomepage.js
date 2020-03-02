import React, {useState, useEffect} from 'react'
import {Button, Card, Container, Row, Table} from 'react-bootstrap'
import {NavLink} from 'react-router-dom'
import axios from 'axios'
import {v4 as uuid} from 'uuid'

import './App.css';
import {ListOfIngredientsToString} from './utils'
import BASE_URL from './constants'


const FilteredHomepage = (props) => {
  const [allRecipesFromAPI, setRecipes] = useState([])

  useEffect(() => {
    async function getAllIngredients() {
      const URL = BASE_URL + '?name=' + props.queryHook.text
      await axios.get(URL).then(response => setRecipes(JSON.parse(response.data)))
    }
    getAllIngredients()
  },[props.queryHook.text])

  const deleteRecipeAt_Action = (id, index) => {
    const URL = BASE_URL + id.toString()
    axios.delete(URL).then(response => {
      if (response.status !== 204) return
    }).then(() => {
      setRecipes([
        ...allRecipesFromAPI.slice(0,index),
        ...allRecipesFromAPI.slice(index+1)
      ])
    })
  }

  return (<div>
            <h1>Recetas filtradas</h1>
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
                            return (<tr key={uuid()}>
                                      <td> {index} </td>
                                      <td> {recipe.name} </td>
                                      <td> {ListOfIngredientsToString(recipe.ingredients)} </td>
                                      <td>
                                        <NavLink exact to={"/recipes/"+recipe.id} style={{color:'white'}}>
                                            <Button variant="info">Ver</Button>
                                        </NavLink>
                                      </td>
                                      <td>
                                        <Button onClick={() => deleteRecipeAt_Action(recipe.id, index)} variant="danger">Eliminar</Button>
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

export default FilteredHomepage
