import { useEffect } from 'react';

import { useAppDispatch, useAppSelector } from './redux/hooks';
import { fetchAll } from './redux/reducers/products';
import Login from './pages/Login';
import { authenticate, logOut } from './redux/reducers/users';
import axios from 'axios';

const App = () => {
  const dispatch = useAppDispatch()
  const token = localStorage.getItem("token")
  const user = useAppSelector(state => state.userReducer.currentUser)
  const onLogout = () => {
    dispatch(logOut())
  }
  useEffect(() => {
    dispatch(fetchAll())
    if (token) { dispatch(authenticate(token)) }
  }, [])
  const addUser = async () => {
    try {
      const response = await axios.post("http://localhost:8080/users", {
        id: 15,
        name: "Hettu",
        role: "seller"
      })
      console.log(response.data)
    } catch (e) {
      console.log(e)
    }

  }
  return (
    <div className="App">
      {/*  <Products /> */}
      <button onClick={addUser}>add new user</button>
      <Login />
      <button onClick={onLogout}>Log out</button>
      <button disabled={user ? false : true}>Add to cart</button>
    </div>
  );
}

export default App;
