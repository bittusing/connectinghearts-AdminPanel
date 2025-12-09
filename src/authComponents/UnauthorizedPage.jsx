// ** React Imports
import { Button } from "antd";
import { Link, useNavigate } from "react-router-dom";
import forbidden from "../../src/Assets/Images/forbidden.webp";
const UnauthorizedPage = () => {
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
          src={forbidden}
          alt="403"
          style={{ width: "30rem", height: "25rem" }}
        />
        <h2>You are not authorized! 🔐</h2>
        <p>
          You are forbidden to choose this path, Please press back button to
          navigate Home screen.
        </p>
        <div>
          <Button tag={Link} type="primary" onClick={goHome}>
            BACK TO HOME
          </Button>
        </div>
      </div>
    </div>
  );
};
export default UnauthorizedPage;
