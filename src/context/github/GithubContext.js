import React, { useReducer, createContext } from "react";
import { createRenderer } from "react-dom/test-utils";
import GithubReducer from "./GithubReducer";

const GithubContext = createContext();

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

export const GithubProvider = ({ children }) => {
  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(false);

  const initialState = {
    users: [],
    user: {},
    repos: [],
    loading: false,
  };

  const [state, dispatch] = useReducer(GithubReducer, initialState);

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

  //Get User Repos
  const getUserRepos = async (login) => {
    setLoading();

    const params = new URLSearchParams({ sort: "created", per_page: 10 });

    const response = await fetch(
      `${GITHUB_URL}/users/${login}/repos?${params}`,
      {
        method: "GET",
        //   headers: {
        // Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
        //   },
      }
    );
    const data = await response.json();
    // setUsers(data);
    // setLoading(false);
    dispatch({
      type: "GET_REPOS",
      payload: data,
    });
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
        ...state,
        dispatch,
        clearUsers,
        getUser,
        getUserRepos,
      }}
    >
      {children}
    </GithubContext.Provider>
  );
};

export default GithubContext;
