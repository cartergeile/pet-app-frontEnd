import { useState } from 'react'
import { Modal } from 'react-bootstrap'
import ToyForm from '../shared/ToyForm'
import { createToy } from '../../api/toys'
import messages from '../shared/AutoDismissAlert/messages'

const NewToyModal = (props) => {
  const { user, pet, show, handleClose, msgAlert, triggerRefresh } = props

  const[toy, setToy] = useState({})

  const onChange = (e) => {
    e.persist()
    setToy(prevToy => {
      const updatedName = e.target.name
      let updatedValue = e.target.value 

      // to handle a checkbox, we can check the name, and change the value that is output. Checkboxes only know if they are checked or not
      if (updatedName === 'isSqueaky' && e.target.checked) {
        updatedValue = true
      } else if (updatedName === 'isSqueaky' && !e.target.checked) {
        updatedValue = false
      }
  
      const updatedToy = {
        [updatedName] : updatedValue
      }
  
      return {
        ...prevToy, ...updatedToy
      }
  
    })
  }

  const onSubmit = (e) => {
    e.preventDefault()

    createToy(pet.id, toy)
    // first well close the modal
    .then(() => handleClose())
    // well also send a success message
    .then(() => {
      msgAlert({
        heading: 'Oh Yeah!',
        message: messages.createToySuccess,
        variant: 'success'
      })
    })
    .then(() => triggerRefresh())
    // if error, tell user
    .catch(() => {
      msgAlert({
        heading: 'On No!',
        message: messages.createToyFailure,
        variant: 'danger'
      })
    })
  }

  return(
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton />
      <Modal.Body>
        <ToyForm 
          toy={toy}
          handleChange={onChange}
          handleSubmit={onSubmit}
          heading={`Give ${pet.name} a toy!`}
        />
      </Modal.Body>
    </Modal>
  )
}

export default NewToyModal