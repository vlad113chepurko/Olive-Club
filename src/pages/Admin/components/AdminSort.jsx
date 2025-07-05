import useGetUsers from "../../../hooks/useGetUsers";
import {useEffect} from "react";
function AdminSort({ sortOrder, setSortOrder }) {
  const getUsers = useGetUsers();

  useEffect(() => {
    getUsers(sortOrder);
  }, [sortOrder]);
  return (
    <div>
      <select className="sort" name="sort" id="sort"
      onChange={ (e) => setSortOrder(e.target.value) }
      >
        <option value="old">Сортировать от старых к новым</option>
        <option value="new">Сортировать от новых к старым</option>
      </select>
    </div>
  )
}

export default AdminSort;