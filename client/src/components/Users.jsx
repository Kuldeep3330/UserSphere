import { useEffect, useState } from "react";
import api from "../api";

function Users(){
    const [users, setUsers] = useState([]);
  const [page, setPage] = useState(1);

  const fetchUsers = async (p) => {
    const res = await api.get(`/users?page=${p}&limit=3`);
    setUsers(res.data.data);
  };

  useEffect(() => {
    fetchUsers(page);
  }, [page]);
    return(
        <div>
            <h2>Users</h2>
            {users.map(u=>
                <p key={u._id}>{u.username}</p>
            )}
            <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Prev
      </button>
      <button onClick={() => setPage(page + 1)}>Next</button>
        </div>
    )

}

export default Users