import Login from "./Components/forms/Login";
import {BrowserRouter,Route, Routes} from "react-router-dom";
import Home from "./pages/home/Home";
import Notfound from "./Notfound";
import CompleteInfo from "./Components/forms/CompleteInfo";
import EditProfile from "./pages/Profile/EditProfile";
import WithGuard from "./Components/Guards/WithGuard";

function App() {
  return (
    <>
  
      <BrowserRouter>
        <Routes>
        
           <Route path="/login" element={<Login />} />
           <Route path="" element={<Home />} />
           <Route path="/completeInfo" element={<WithGuard info={"completeInfo"}> <CompleteInfo /> </WithGuard>} />
           <Route path="/profile" element={ <WithGuard> <EditProfile /></WithGuard> } />
           <Route path="404" element={<Notfound />} />
      
        </Routes>
      </BrowserRouter>
  
    </>
  );
}

export default App;
