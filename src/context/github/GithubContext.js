import React, { useReducer, createContext } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(false);

  const initialState = {
    users: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Get Search Results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({q:text})


    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: "GET",
      //   headers: {
      // Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
    });
    const {items} = await response.json();
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };

  //Set loading
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  //clear Users

  const clearUserHandler = ()=>{
    dispatch({
      type: 'CLEAR_USERS',
      payload:[]
    })
  }


  return (
    <GithubContext.Provider
      value={{ users: state.users, loading: state.loading, searchUsers,clearUserHandler}}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
