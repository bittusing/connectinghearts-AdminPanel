// ** React Imports
import { Button } from "antd";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import notFound from "../../src/Assets/Images/notFound.webp";

const NotFoundPage = () => {
  // ** Hooks
  const navigate = useNavigate();

  const goHome = (e) => {
    e.preventDefault();
    navigate("/");
  };
  return (
    <div style={{ textAlign: "center" }}>
      <div>
        <img
          src={notFound}
          alt="404"
          style={{ width: "30rem", height: "25rem" }}
        />
        <h2>Page Not Found 🕵🏻‍♀️</h2>
        <p>
          Oops! 😖 The page you are looking for does not exists. It might have
          been moved or deleted.
        </p>
        <Button tag={Link} type="primary" onClick={goHome}>
          BACK TO HOME
        </Button>
      </div>
    </div>
  );
};
export default NotFoundPage;
