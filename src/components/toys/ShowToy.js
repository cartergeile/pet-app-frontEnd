import { Card, Button } from 'react-bootstrap'
import { deleteToy } from '../../api/toys'

const ShowToy = (props) => {
  const { toy, user, pet, msgAlert, triggerRefresh } = props

  // here, were going to use react styling objects to our advantage
  // this will look at the toys condition, and change the background color
  // well also use this to set a consisitent width for each card
  // well pass the results of this function to a  style prop in our card

  const setBgCondition = (cond) => {
    if (cond === 'new') {
      return({width: '18rem', backgroundColor: '#b5ead7'})
    } else if (cond === 'used') {
      return({width: '18rem', backgroundColor: '#ffdac1'})
    } else {
      return({width: '18rem', backgroundColor: '#ff9aa2'})
    }
  }

  // DELETE, similar to delete pets, all we have to do is ensure that the user is the pets owner, and make the api call passing 
  const destroyToy = () => {
    // this is the api call file function
    // it requires three args, user, petId, toyId
    deleteToy(user, pet.id, toy._id)
    // upon success, we want to send a message
      .then(() => {
        msgAlert({
          heading: 'Toy Deleted',
          message: 'Bye Bye Toy!',
          variant: 'success'
        })
      })
    // then trigger a refresh of the parent component
      .then(() => triggerRefresh())
    // upon failure send appropriate message
      .catch(() => {
        msgAlert({
          heading: 'Oh No!',
          message: 'Something went wrong!',
          variant: 'danger'
        })
      })
  }


  return (
    <>
      <Card className='m-2 text-center' style={setBgCondition(toy.condition)}>
        <Card.Header>{toy.name}</Card.Header>
        <Card.Body>
          <small>{toy.description}</small><br/>
          <small>
            {toy.isSqueaky ? 'squeak squeak' : 'stoic silence'}
          </small>
        </Card.Body>
        <Card.Footer>
          <small>
          Condtition: {toy.condition}
          </small><br/>
          {
            user && pet.owner && user._id === pet.owner._id
            ?
            <>
              <Button onClick={() => destroyToy()} 
                      variant='danger'
                      className='m-2'
                      >
                  Delete Toy
              </Button>
            </>
            :
            null
          }
        </Card.Footer>
      </Card>
    </>
  )
}

export default ShowToy