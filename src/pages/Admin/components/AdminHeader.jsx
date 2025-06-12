import "../styles/_Admin.scss";
import components from "../../../components/index";

function AdminHeader() {

  return (
    <header className="admin-header">
      <components.Button
        onClick={() => navigate("/adminSurvey")}
        className={"secondary"}>Просмотреть опрос юзера</components.Button>
    </header>
  )
}

export default AdminHeader;