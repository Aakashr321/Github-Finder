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
    
    return items
  };

