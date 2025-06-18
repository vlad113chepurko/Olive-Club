import "../styles/_Admin.scss";
import axios from "axios";
export default function DownloadUsersButton() {
  const handleDownload = async () => {
    try {
      const res = await axios.get("https://www.familyoliveclub.com/api/admin/export-users", {
        responseType: 'blob',
      })
      const url = window.URL.createObjectURL(res.data);
      const a = document.createElement('a');
      a.href = url;
      a.download = 'users.pdf';
      document.body.appendChild(a);
      a.click();
      a.remove();
      console.log(res)
    } catch(err) {
      console.error(err);
    }
  };

  return <button className="admin-download-btn" onClick={handleDownload}>Скачать пользователей в PDF</button>;
}
