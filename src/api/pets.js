// this is where our api calls for the pets resource will live
import apiUrl from '../apiConfig'
import axios from 'axios'

// READ -> Index
export const getAllPets = () => {
  return axios(`${apiUrl}/pets`)
}

// Read -> Show
export const getOnePet = (id) => {
  return axios(`${apiUrl}/pets/${id}`)
}

// Create (create a pet)
export const createPet = (user, newPet) => {
  return axios({
    url: `${apiUrl}/pets`,
    method: 'POST',
    headers: {
      Authorization: `Token token=${user.token}`
    },
    data: { pet: newPet }
  })
}

// Update (update a pet)


// Delete (delete a pet)
export const removePet = (user, petId) => {
  return axios({
    url: `${apiUrl}/pets/${petId}`,
    method: 'DELETE',
    headers: {
      Authorization: `Token token=${user.token}`
    }
  })
}