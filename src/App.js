import { ConfigProvider } from "antd";
import "./App.css";
import Router from "./router/Router";
import { useEffect } from "react";
import { validateToken } from "./configs/apis/authService";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { routerUrlPathConstants } from "./constants";
import { getLookupData } from "./views/dashboard/apiServices";
import { useDispatch } from "react-redux";
import { saveLookupData } from "./redux/slices/lookup";

function App() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  useEffect(() => {
    validateUserToken();
    // window.onbeforeunload = () => true;
    // return () => {
    //   window.onbeforeunload = null;
    // };
  }, []);

  const validateUserToken = async () => {
    let response = await validateToken();
    console.log({response});
    if (response.status == 'success') {
      // toast.error("Tokens Expired, Please LogIn again.");
        let response = await getLookupData();
        if(response?.status == 200){
          dispatch(saveLookupData(response?.data?.lookupData[0]))
        } 
      navigate('/dashboard');
    }else{
      navigate('/login');
    }
  };
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#ff0057",
          borderRadius: 2,
          fontFamily: "Poppins",
        },
      }}
    >
      <ToastContainer />
      <div className="App">
        <Router />
      </div>
    </ConfigProvider>
  );
}

export default App;
