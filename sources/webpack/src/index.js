import React from "react";
import ReactDOM from "react-dom";

import "bootstrap/dist/css/bootstrap.css";

import App from "./components/App";
import "./index.scss";

// Config needs to be in src for create-react-app. Could eject, but have not done so, slight grievance:
// See: https://stackoverflow.com/questions/44114436/the-create-react-app-imports-restriction-outside-of-src-directory
import config from "./config/config.json";

ReactDOM.render(
    <App
        config={{
            ...config,
            HOST : window.location.host.split( ":" )[0]
        }}
    />
    , document.getElementById( "root" )
);