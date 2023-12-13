import React from 'react'
import Form from './Form'

const DynamicDecisionPrompter = ({promptMessage, template, onSubmit, onCancel, className}) => {
  return (
    <div className={className}>
      <h3>{promptMessage}</h3>
      <Form template={template} onSubmit={onSubmit} onCancel={onCancel}/>
    </div>
  )
}

export default DynamicDecisionPrompter
 