import React, {useState} from 'react'
import {Button, Card, Container, Row, ListGroup, InputGroup} from 'react-bootstrap'
import axios from 'axios'

import AddIngredients from './AddIngredients'
import BASE_URL from './constants'


const useInputFieldHook = (initialText) => {
  const [text, setText]= useState(initialText)
  return {
    text,
    resetText: () => setText(''),
    setText: (t) => setText(t)
  }
}


const useArrayState = (initialArray) => {
  const [array, setArray] = useState(initialArray)
  return {
    array,
    append: (x) => setArray([...array, x]),
    deleteAtIndex: (i) => setArray([...array.slice(0,i), ...array.slice(i+1)]),
    modifyAtIndex: (x, i) => setArray([...array.slice(0,i), x, ...array.slice(i+1)])
  }
}


const AddRecipe = (props) => {
  const index = (props.id? props.id:'')
  const name = (props.name? props.name:'')
  const description = (props.description? props.description:'')
  const ingredients = (props.ingredients? props.ingredients:[])

  const nameInputFieldHook = useInputFieldHook(name)
  const descriptionInputFieldHook = useInputFieldHook(description)
  const ingredientsHook = useArrayState(ingredients)

  const addRecipeAction = () => {
    const formattedIngredients = ingredientsHook.array.map(x => ({'name': x}))
    const payload = {
      'name': nameInputFieldHook.text,
      'description': descriptionInputFieldHook.text,
      'ingredients': formattedIngredients
    }
    axios.post(BASE_URL, payload).then(response => console.log(response))
  }

  const patchRecipeAction = () => {
    const formattedIngredients = ingredientsHook.array.map(x => ({'name': x}))
    const payload = {
      'name': nameInputFieldHook.text,
      'description': descriptionInputFieldHook.text,
      'ingredients': formattedIngredients
    }
    const URL = BASE_URL +(index).toString() + '/'
    console.log(payload)
    console.log(URL)
    axios.patch(URL, payload).then(response => console.log(response))
  }

  let isPatchingAction = false
  if (index !== '') isPatchingAction = true

  let titleText = (isPatchingAction? 'Actualiza la receta':'Añade una receta')
  let updateText = (isPatchingAction? '¡Actualiza la receta!':'¡Añade la receta!')

  return (<Container>
            <Row>
              <Card style={{ width: '30rem', margin: '0 auto', float: 'none', marginTop:'1vh', marginBottom:'5vh'}}>
                <Card.Body>
                  <Card.Title > {titleText} </Card.Title>
                    <ListGroup>
                      <ListGroup.Item>
                        <form onSubmit={()=>null}>
                            <input
                              type='text'
                              name='Nombre de la receta'
                              onChange={(e) => nameInputFieldHook.setText(e.target.value)}
                              value={nameInputFieldHook.text}
                              className={'addNameField'}
                              placeholder='Nombre de la receta'
                            />
                        </form>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <InputGroup className="mb-3">
                          <form onSubmit={()=>null}>
                            <div>
                            <textarea
                              value={descriptionInputFieldHook.text}
                              onChange={(e) => descriptionInputFieldHook.setText(e.target.value)}
                              placeholder="Descripción de la receta"
                              rows="4"
                              cols='40'
                              className={'addDescriptionTextArea'}/>
                            </div>
                          </form>
                        </InputGroup>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <AddIngredients ingredientsHook={ingredientsHook}/>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button variant="secondary" onClick={() => console.log('TODO!')} className='detailButton'>Atrás</Button>
                        <Button variant="warning" onClick={() => (isPatchingAction? patchRecipeAction():addRecipeAction())} className='detailButton'>{updateText}</Button>
                      </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Container>)
}

export default AddRecipe
