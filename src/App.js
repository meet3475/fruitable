import { Route, Routes } from "react-router-dom";
import UserRoute from "./routes/UserRoute/UserRoute";
import AdmineRoute from "./routes/AdmineRoute/AdmineRoute";
import PrivateRoute from "./routes/PrivateRoute/PrivateRoute";
import { Provider } from "react-redux";
import { storeReduce } from "./redux/store";
import { PersistGate } from 'redux-persist/integration/react';
import { ThemeProvider } from "./Context/ThemeContext";



function App() {
  const {store, persistor} = storeReduce();

  return (
    <ThemeProvider>
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Routes>
          <Route exact path="/*" element={<UserRoute />} />
          <Route element={<PrivateRoute />}>
            <Route exact path="/admine/*" element={<AdmineRoute />} />
          </Route>
        </Routes>
      </PersistGate>
    </Provider>
    </ThemeProvider>
  );
}

export default App;
