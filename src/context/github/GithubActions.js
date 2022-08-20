import axios from "axios";

const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

const github = axios.create({
  baseURL: GITHUB_URL,
});

//Get Search Results
export const searchUsers = async (text) => {
  const params = new URLSearchParams({ q: text });

  const response = await github.get(`/search/users?${params}`);
  return response.data.items;
};

/* //Get Single User
export const getUser = async (login) => {
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
  
    return data
  
  }
};

//Get User Repos
export const getUserRepos = async (login) => {
  const params = new URLSearchParams({ sort: "created", per_page: 10 });

  const response = await fetch(`${GITHUB_URL}/users/${login}/repos?${params}`, {
    method: "GET",
    //   headers: {
    // Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
    //   },
  });
  const data = await response.json();
 
  return data
}; */

//Updated Get user and repos

export const getUserAndRepos = async (login) => {
  const [user, repos] = await Promise.all([
    github.get(`/users/${login}`),
    github.get(`/users/${login}/repos`),
  ]);

  return { user: user.data, repos: repos.data };
};
