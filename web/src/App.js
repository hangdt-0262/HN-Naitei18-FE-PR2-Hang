import { BrowserRouter, Routes, Route } from "react-router-dom";
import DefaultLayout from "./layouts/DefaultLayout";
import HomePage from "./pages/HomePage";
import { Provider } from "react-redux";
import store from "./redux/store";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import UncomingMovies from "./pages/UncomingMovies";

const theme = createTheme({
  palette: {
    primary: {
      hoverText: "#FF6000",
      main: "#454545",
      contrastText: "#FFF",
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <BrowserRouter>
          <Routes>
            <Route element={<DefaultLayout />}>
              <Route element={<HomePage />} path="/" />
              <Route element={<UncomingMovies />} path="/uncoming-movies" />
            </Route>
          </Routes>
        </BrowserRouter>
      </Provider>
    </ThemeProvider>
  );
}

export default App;
