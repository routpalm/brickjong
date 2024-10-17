import React, { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./view.css";

import Front from "./front";

const root = createRoot(document.getElementById("root"));
root.render(<StrictMode><Front/></StrictMode>);