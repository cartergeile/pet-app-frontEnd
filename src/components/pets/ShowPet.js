import {useState, useEffect} from 'react'

// use params from react-router-dom allows us to see our route parameters
import {useParams} from 'react-router-dom'

import {Container, Card, Button} from 'react-bootstrap'

import {getOnePet} from '../../api/pets'

import messages from '../shared/AutoDismissAlert/messages'

// we need to get the pet's id from the route parameter
// then we need to make a request to the api
// when we retrieve a pet from the api, well render the data on the screen

const ShowPet = (props) => {
  const [pet, setPet] = useState(null)
  
  const { id } = useParams()

  const { user, msgAlert } = props
  console.log('user in ShowPet props', user)
  console.log('msgAlert in ShowPet props', msgAlert)

  useEffect(() => {
    getOnePet(id)
        .then(res => setPet(res.data.pet))
        .catch(err => {
          msgAlert({
            heading: 'Error getting pets',
            message: 'Could not find any pets',
            variant: 'danger'
          })
        })
  }, [])

  if (!pet) {
    return <p>loading...</p>
  }

  return (
    <>
      <Container>
        <Card>
          <Card.Header>{ pet.fullTitle } </Card.Header>
          <Card.Body>
            <Card.Text>
              <div><small>Age: { pet.age }</small></div>
              <div><small>Type: { pet.type }</small></div>
              <div><small>Adoptable: { pet.adoptable ? 'yes' : 'no' }</small></div>
            </Card.Text>
          </Card.Body>
        </Card>
      </Container>
    </>
  )
}


export default ShowPet