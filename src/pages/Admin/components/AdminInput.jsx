
import useAdminUserDataStore from "../../../store/AdminUserDataStore";
function AdminInput () {
  const { userSearch, setUserSearch } = useAdminUserDataStore();

  return (
    <input
      className="admin-input"
      type="search"
      value={userSearch}
      onChange={(e) => setUserSearch(e.target.value)}
      placeholder="Search by e-mail..." />
  )
}

export default AdminInput;