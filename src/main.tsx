import NiceModal from "@ebay/nice-modal-react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";
import { BrowserRouter } from "react-router-dom";
import persistStore from "redux-persist/es/persistStore";
import { PersistGate } from "redux-persist/integration/react";
import App from "./App";
import "./NiceModalRegistry";
import store from "./redux/Store";
import { ToastContainer } from "react-toastify";
import Loader from "./components/common/Loader/Loader";
import "./index.scss";
const persistor = persistStore(store);

createRoot(document.getElementById("root")!).render(
  <Provider store={store}>
    <PersistGate loading={"loading..."} persistor={persistor}>
      <BrowserRouter>
          <NiceModal.Provider>
            <Loader />
            <ToastContainer />
            <App />
          </NiceModal.Provider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
);
