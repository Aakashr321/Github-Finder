const GITHUB_URL = process.env.REACT_APP_GITHUB_URL;

//Get Search Results
export const searchUsers = async (text) => {
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

  return items;
};

//Get Single User
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
};
