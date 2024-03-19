import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "./sass/base.scss";
import "./fonts/Basis-Grotesque-Pro/BasisGrotesquePro-Regular.ttf";
import { GoogleOAuthProvider } from "@react-oauth/google";
import { CLIENT_ID } from "./utils/shared.ts";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <GoogleOAuthProvider
      clientId={
        CLIENT_ID
      }
    >
      <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);
