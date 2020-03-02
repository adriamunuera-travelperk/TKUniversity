import React, {useState} from 'react'
import {Alert} from 'react-bootstrap'

const AlertDismissible = (props) => {
  const alertVariant = props.variant
  const heading = props.heading
  const text = props.text
  const onCloseAction = props.onCloseAction

  return (
    <div>
      <Alert variant={alertVariant} onClose={() => onCloseAction()} dismissible>
        <Alert.Heading>{heading}</Alert.Heading>
        <p> {text} </p>
      </Alert>
    </div>
  );

}

export default AlertDismissible
