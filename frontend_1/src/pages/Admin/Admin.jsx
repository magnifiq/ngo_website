import{ Link } from 'react-router-dom';

const Admin = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <Link to="/admin/news">News</Link>
          </li>
          <li>
            <Link to="/admin/others">Others</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Admin;
