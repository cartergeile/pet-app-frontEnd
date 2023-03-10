import { useState, useEffect } from 'react'
import Card from 'react-bootstrap/Card'
import { Link } from 'react-router-dom'
import LoadingScreen from '../shared/LoadingScreen'
// api function from our api file
import { getAllPets } from '../../api/pets'

// need our messages from our aotodismissalert director
import messages from '../shared/AutoDismissAlert/messages'

// this is a styling object. quick easy way to add css properties to our react components
const cardContainerStyle = {
  display: 'flex',
  flexFlow: 'row wrap',
  justifyContent: 'center'
}

// PetsIndex will make a request to the API for all pets
// once it recieves a response, display a card for each pet
const PetsIndex = (props) => {
  const [pets, setPets] = useState(null)
  const [error, setError] = useState(false)

  // pull the message alert (msgAlert) from props
  const { msgAlert } = props

  // get our pets from the api when the component mounts
  useEffect(() => {
    getAllPets()
      .then(res => setPets(res.data.pets))
      .catch(err => {
        msgAlert({
          heading: 'Error getting pets',
          message: 'Could not find any pets',
          variant: 'danger'
        })
        setError(true)
      })
  }, [])

  // if error, display an error
  if (error) {
    return <p>Error</p>
  }
  // if no pets loaded yet, display laoding
  if (!pets) {
    return <LoadingScreen />
  } else if (pets.length === 0) {
    // otherwise if there are no pets, display that message
    return <p>No pets yet, go add some!</p>
  }
  
  // once we have an array of pets, loop over them
  // produce one card for every pet
  const petCards = pets.map(pet => (
    <Card key={pet.id} style={{ width: '30%', margin: 5 }}>
      <Card.Header>{ pet.fullTitle }</Card.Header>
      <Card.Body>
        <Card.Text>
          <Link to={`/pets/${pet.id}`} className="btn btn-secondary">View { pet.name }</Link>
        </Card.Text>
        { pet.owner ?
        <Card.Footer>
          Owner: {pet.owner.email} 
        </Card.Footer>
        : null }
      </Card.Body>
    </Card>
  ))

  // return some jsx, a container with all the pet cards
  return (
    <div className="container-md" style={ cardContainerStyle }>
      { petCards }
    </div>
  )
}

// export our component
export default PetsIndex