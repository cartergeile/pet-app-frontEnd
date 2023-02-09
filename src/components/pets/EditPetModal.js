// this modal is rendered by showpet
// the state that controls wether this is open or not live in ShowPet
// the state and the updaterfunction associated with that state is passed here as a prop
import React, { useState } from 'react'
import { Modal } from 'react-bootstrap'
import PetForm from '../shared/PetForm'
import messages from '../shared/AutoDismissAlert/messages'

const EditPetModal = (props) => {
    // destructure our props
    const { user, show, handleClose, updatePet, msgAlert, triggerRefresh } = props

    const [pet, setPet] = useState(props.pet)

    const onChange = (e) => {
      e.persist()
      setPet(prevPet => {
        const updatedName = e.target.name
        let updatedValue = e.target.value 

        if (e.target.type === 'number') {
          updatedValue = parseInt(e.target.value)
        }

        if (updatedName === 'adoptable' && e.target.checked) {
          updatedValue = true
        } else if (updatedName === 'adoptable' && !e.target.checked) {
          updatedValue = false
        }
    
        const updatedPet = {
          [updatedName] : updatedValue
        }
    
        return {
          ...prevPet, ...updatedPet
        }
    
      })
    }

    const onSubmit = (e) => {
      e.preventDefault()
      
      updatePet(user, pet)
        // first well handle closing the modal
        .then(() => handleClose())
        // well also send a success message
        .then(() => {
          msgAlert({
            heading: 'Oh Yeah!',
            message: messages.updatePetSuccess,
            variant: 'success'
          })
        })
        // if everything goes to plan, we need a refresh of the show page
        // well build a function in the ShowPet component that does this and import that here as a prop
        .then(() => triggerRefresh())
        .catch(() => {
          msgAlert({
            heading: 'On No!',
            message: messages.updatePetFailure,
            variant: 'danger'
          })
        })
    }

    return (
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton />
        <Modal.Body>
          <PetForm 
            pet={pet} 
            handleChange={onChange} 
            handleSubmit={onSubmit}
            heading="Update Pet"
            />
        </Modal.Body>
      </Modal>
    )
}

export default EditPetModal