import React, {useState} from 'react'
import {Button, Card, Container, Row, Table, ListGroup, InputGroup, FormControl} from 'react-bootstrap'
import AddIngredients from './AddIngredients'

const useInputFieldHook = (initialText) => {
  const [text, setText]= useState(initialText)
  return {
    text,
    resetText: () => setText(''),
    setText: (t) => setText(t)
  }
}


const AddRecipe = (props) => {
  const name = (props.name? props.name:'')
  const description = (props.description? props.description:'')
  const ingredients = (props.ingredients? props.ingredients:'')

  const nameInputFieldHook = useInputFieldHook(name)
  const descriptionInputFieldHook = useInputFieldHook(description)

  const onSubmitFunction = () => null

  return (<Container>
            <Row>
              <Card style={{ width: '30rem', margin: '0 auto', float: 'none', marginTop:'1vh', marginBottom:'5vh'}}>
                <Card.Body>
                  <Card.Title > Añade una receta </Card.Title>
                    <ListGroup>
                      <ListGroup.Item>
                        <form onSubmit={()=>null}>
                            <input
                              type='text'
                              name='Nombre de la receta'
                              onChange={(e) => props.modifyAtIndex(e.target.value)}
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
                              onChange={() => null}
                              placeholder="Descripción de la receta"
                              rows="4"
                              cols='40'
                              className={'addDescriptionTextArea'}/>
                            </div>
                          </form>


                        </InputGroup>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <AddIngredients/>
                      </ListGroup.Item>

                      <ListGroup.Item>
                        <Button variant="secondary" onClick={() => console.log('TODO!')} className='detailButton'>Atrás</Button>
                        <Button variant="warning" onClick={() => console.log('TODO!')} className='detailButton'>¡Añade la receta!</Button>
                      </ListGroup.Item>
                    </ListGroup>
                </Card.Body>
              </Card>
            </Row>
          </Container>)
}

export default AddRecipe