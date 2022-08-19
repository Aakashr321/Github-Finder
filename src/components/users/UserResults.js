import React, { useContext } from "react";
import Spinner from "../layout/Spinner";
import UserItem from "./UserItem";
import GithubContext from "../../context/github/GithubContext";

function UserResults() {
  const { users, loading,  } = useContext(GithubContext);

  //   const [users, setUsers] = useState([]);
  //   const [loading, setLoading] = useState(false);

  //   const fetchUsers = async () => {
  //     setLoading(true);
  //     const response = await fetch(`${process.env.REACT_APP_GITHUB_URL}/users`, {
  //       method: "GET",
  //     //   headers: {
  //     //     Authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
  //     //   },
  //     });
  //     const data = await response.json();
  //     setUsers(data);
  //     setLoading(false);
  //   };

  // useEffect(() => {
  //   // fetchUsers();
  // }, []);

  if (loading === true) {
    return <Spinner />;
  } else
    return (
      <div className="grid grid-cols-1 gap-8 xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2">
        {users &&
          users.map((user) => {
            return <UserItem key={user.id} user={user} />;
          })}
      </div>
    );
}

export default UserResults;
