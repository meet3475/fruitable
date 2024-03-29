import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute/UserRoute";
import AdmineRoute from "./routes/AdmineRoute/AdmineRoute";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import { Provider } from "react-redux";
import { storeReduce } from "./redux/store";



function App() {
  const store = storeReduce();
  return (
    <Provider store={store}>
      <Routes>
        <Route exact path="/*" element={<UserRoute />} />
        <Route element={<PrivateRoute />}>
          <Route exact path="/admine/*" element={<AdmineRoute />} />
        </Route>
      </Routes>
    </Provider>
  );
}

export default App;
