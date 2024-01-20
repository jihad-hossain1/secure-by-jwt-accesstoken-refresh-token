import { useEffect } from "react";
import { useState } from "react";
import useAxiosPrivate from "../hooks/useAxiosPrivate";
import useRefreshToken from "../hooks/useRefreshToken";

const Users = () => {
  const [users, setUsers] = useState();
  const refresh = useRefreshToken();
  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    let isMounted = true;
    const controller = new AbortController();

    const getUsers = async () => {
      try {
        const response = await axiosPrivate.get("/users", {
          signal: controller.signal,
        });
        console.log(response.data);
        isMounted && setUsers(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    getUsers();

    return () => {
      isMounted = false;
      controller.abort();
    };
  }, [axiosPrivate]);
  return (
    <article>
      <h4>user list</h4>
      <button className="border p-2" onClick={() => refresh()}>
        refresh
      </button>
      <ul>
        {users?.length ? (
          users?.map((user, _in) => <li key={_in}>{user?.username}</li>)
        ) : (
          <div>No users here....</div>
        )}
      </ul>
    </article>
  );
};

export default Users;
