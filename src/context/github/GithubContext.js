import React, { useReducer, createContext } from "react";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(false);

  const initialState = {
    users: [],
    user: {},
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

  //Get Search Results
  const searchUsers = async (text) => {
    setLoading();

    const params = new URLSearchParams({ q: text });

    const response = await fetch(`${GITHUB_URL}/search/users?${params}`, {
      method: "GET",
      //   headers: {
      // Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
    });
    const { items } = await response.json();
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: "GET_USERS",
      payload: items,
    });
  };
  //Get Single User
  const getUser = async (login) => {
    setLoading();

    const response = await fetch(`${GITHUB_URL}/users/${login}`, {
      method: "GET",
      //   headers: {
      // Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
      //   },
    });

    if (response.status === 404) {
      window.location = "/not found";
    } else {
      const data = await response.json();
      // setUsers(data);
      // setLoading(false);
      dispatch({
        type: "GET_USER",
        payload: data,
      });
    }
  };

  //Set loading
  const setLoading = () => {
    dispatch({ type: "SET_LOADING" });
  };

  //clear Users from state

  const clearUsers = () => {
    dispatch({
      type: "CLEAR_USERS",
      payload: [],
    });
  };

  return (
    <GithubContext.Provider
      value={{
        users: state.users,
        loading: state.loading,
        user: state.user,
        searchUsers,
        clearUsers,
        getUser
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
