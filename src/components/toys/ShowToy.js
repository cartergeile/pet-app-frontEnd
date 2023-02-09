import { Card, Button } from 'react-bootstrap'

const ShowToy = (props) => {
  const { toy } = props

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

  return (
    <>
      <Card className='m-2 text-center' style={setBgCondition(toy.condition)}>
        <Card.Header>{toy.name}</Card.Header>
        <Card.Body>
          <small>{toy.description}</small><br/>
          <small>
            {toy.isSkueaky ? 'squeak squeak' : 'stoic silence'}
          </small>
        </Card.Body>
        <Card.Footer>Condtition: {toy.condition}</Card.Footer>
      </Card>
    </>
  )
}

export default ShowToy