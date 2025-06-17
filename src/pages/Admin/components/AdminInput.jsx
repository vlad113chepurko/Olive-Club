
import useAdminUserDataStore from "../../../store/AdminUserDataStore";
function AdminInput () {
  const { userSearch, setUserSearch } = useAdminUserDataStore();

  return (
    <input
      className="admin-input"
      type="search"
      value={userSearch}
      onChange={(e) => setUserSearch(e.target.value)}
      placeholder="Search by e-mail, name, last name and phone number..." />
  )
}

export default AdminInput;