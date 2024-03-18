import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute/UserRoute";
import AdmineRoute from "./routes/AdmineRoute/AdmineRoute";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";



function App() {
  return (
    <Routes>
      <Route exact path="/*" element={<UserRoute />} />
      <Route element={<PrivateRoute/>}>
        <Route exact path="/admine/*" element={<AdmineRoute />} />
      </Route>
    </Routes>
  );
}

export default App;
