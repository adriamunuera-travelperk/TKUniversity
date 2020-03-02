import React, {useState} from 'react'
import {Button, Card, Container, Row, ListGroup, InputGroup} from 'react-bootstrap'
import {withRouter} from 'react-router-dom'
import axios from 'axios'

import AddIngredients from './AddIngredients'
import BASE_URL from './constants'
import AlertDismissible from './Alert'

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


const useBoolState = (initialBool) => {
  const [b, setBool] = useState(initialBool)
  return {
    b,
    toggle: () => setBool(!b)
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
  const shouldShowAlert = useBoolState(false)
  const shouldShowAlertMoidfy = useBoolState(false)

  const goBack = () => props.history.goBack()

  const addRecipeAction = () => {
    const formattedIngredients = ingredientsHook.array.map(x => ({'name': x}))
    const payload = {
      'name': nameInputFieldHook.text,
      'description': descriptionInputFieldHook.text,
      'ingredients': formattedIngredients
    }
    axios.post(BASE_URL, payload).then(response => {
      if (response.status === 201) {
        shouldShowAlert.toggle()
      }
    })
  }

  const patchRecipeAction = () => {
    const formattedIngredients = ingredientsHook.array.map(x => ({'name': x}))
    const payload = {
      'name': nameInputFieldHook.text,
      'description': descriptionInputFieldHook.text,
      'ingredients': formattedIngredients
    }
    const URL = BASE_URL +(index).toString() + '/'
    axios.patch(URL, payload).then(response => {
      if (response.status === 200) {
        shouldShowAlertMoidfy.toggle()
      }
    })
  }

  let isPatchingAction = false
  if (index !== '') isPatchingAction = true

  let titleText = (isPatchingAction? 'Actualiza la receta':'Añade una receta')
  let updateText = (isPatchingAction? '¡Actualiza la receta!':'¡Añade la receta!')

  return (<Container>
            {(() => {
              if (shouldShowAlert.b) {
                return <AlertDismissible
                  variant='success'
                  heading='¡Éxito!'
                  text='La receta ha sido añadida.'
                  onCloseAction={() => shouldShowAlert.toggle()}
                />
              }
            })()}
            {(() => {
              if (shouldShowAlertMoidfy.b) {
                return <AlertDismissible
                  variant='warning'
                  heading='¡Éxito!'
                  text='La receta ha sido añadida.'
                  onCloseAction={() => shouldShowAlertMoidfy.toggle()}
                />
              }
            })()}
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
                        <Button variant="secondary" onClick={goBack} className='detailButton'>Atrás</Button>
                        <Button variant="warning" onClick={() => (isPatchingAction? patchRecipeAction():addRecipeAction())} className='detailButton'>{updateText}</Button>
                      </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Container>)
}

export default withRouter(AddRecipe)
