import React from 'react'
import { useSelector, useDispatch } from 'react-redux'

const Profile = () => {

    const { name, age, joke } = useSelector((state) => state)
    const dispatch = useDispatch();

    return (
        <div>
            <h2>I am {name}</h2>
            <h2>My age is  {age}</h2>
            <h4>Joke of the day - {joke}</h4>
            {/* <button onClick={() => dispatch({ type: 'UPDATE_NAME', paylod: 'Parth' })}>Update Name</button> */}
            <button onClick={() => dispatch({ type: 'UPDATE_NAME' })}>Update Name</button>
            <button onClick={() => dispatch({ type: 'UPDATE_AGE' })}>Update Age</button>
            <button onClick={() => dispatch({ type: 'GET_JOKE' })}>Fetch Joke</button>
        </div>
    )
}

export default Profile
