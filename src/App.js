import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute/UserRoute";
import AdmineRoute from "./routes/AdmineRoute/AdmineRoute";



function App() {
  return (
    <Routes>
      <Route exact path="/*" element={<UserRoute />} />
      <Route exact path="/admine/*" element={<AdmineRoute />} />
    </Routes>
  );
}

export default App;
