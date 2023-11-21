import { createContext, useState, useEffect, useContext } from "react"
import './invers.css'
import { account } from "../appwriteConfig";
import { useNavigate } from "react-router-dom";
import { ID } from "appwrite";
//Authentication
const AuthContext = createContext();
// con

export const AuthProvider = ({children}) => {

  const navigate = useNavigate()
  const [ loading, setLoading ] = useState(true)
  const [ user, setUser ] = useState(null) // user sign in
  
  useEffect(() => {
    // setLoading(false);//See animation true
    getUserOnLoad()
  }, [])

  const getUserOnLoad = async () => { // get user in rofile in load data
    try {
      const accountDetails = await account.get();
      console.log('accountDetails', accountDetails)
      setUser(accountDetails)
    } catch (error) {
      console.error(error);
    }
    setLoading(false)
  }

  const handleUserLogin = async (e, credentials) => { // login
    e.preventDefault()

    try{
      // const promise = account.createEmailSession('email@example.com', 'password')  
      const response = await account.createEmailSession(credentials.email, credentials.password);
      console.log('LOGIN:', response)
      const accountDetails = await account.get();
      setUser(accountDetails)

      navigate('/')
    }
    catch(error){
      console.error(error);
      const errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = 'Login failed. Please check your credentials.';
      errorMessageElement.classList.add('error-message');
    }
  }

  const handleUserLogout = async () => { // logout
    const response = await account.deleteSession('current');
    setUser(null)
  }

  const handleUserRegister = async (e, credentials) => {
    e.preventDefault()
    console.log('Handle Register triggered!', credentials)

    if(credentials.password1 !== credentials.password2){
        alert('Passwords did not match!')
        return 
    }

    try{
        
        let response = await account.create(ID.unique(), credentials.email, credentials.password1, credentials.name);
        console.log('User registered!', response)

        await account.createEmailSession(credentials.email, credentials.password1)
        let accountDetails = await account.get();
        setUser(accountDetails)
        navigate('/')
    }catch(error){
        console.error(error)
    }
}

  const contextData = {
    user,
    handleUserLogin,
    handleUserLogout,
    handleUserRegister,
  }

  return (
    <AuthContext.Provider className="bodyx" value={contextData}>
            {loading ?( 
              <>
              <p className="loading">Loading
              <div className="loading-area">
                  <div className="loader">
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                      <div></div>
                  </div>
              </div>
              </p> 
              <div className="containerr">
                  <span id="item_01"></span>
                  <span id="item_02"></span>
                  <span id="item_03"></span>
                  <span id="item_04"></span>
                  <span id="item_05"></span>
                  <span id="item_06"></span>
                  <span id="item_07"></span>
                  <span id="item_08"></span>
                  <span id="item_09"></span>
                  <span id="item_10"></span>
                  <span id="item_11"></span>
                  <span id="item_12"></span>
              </div>
              </>
            
            ): (
              children
              )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => {return useContext(AuthContext)}

export default AuthContext