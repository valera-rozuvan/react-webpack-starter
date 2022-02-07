import React from "react";
import {render} from "react-dom";
import App from "./App";

console.log(`process.env.REACT_APP_BASE_URL = '${process.env.REACT_APP_BASE_URL}'`);
console.log(`process.env.REACT_APP_API_URL = '${process.env.REACT_APP_API_URL}'`);

const root = document.getElementById("root");
render(<App/>, root);
