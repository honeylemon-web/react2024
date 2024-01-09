import * as React from 'react';
import { createRoot } from "react-dom/client";
import * as App from "./App";


createRoot(document.querySelector("#content")).render([<App.default />]);
