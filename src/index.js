import "react-app-polyfill/ie11";
import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import "./index.css";

import "core-js/fn/array/find";
import "core-js/fn/array/find-index";
import "core-js/fn/array/from";
import "core-js/fn/array/includes";
import "core-js/fn/object/values";
import "core-js/fn/object/entries";
import "core-js/fn/symbol/iterator.js";
import "core-js/fn/number/is-nan";
import "core-js/fn/string/ends-with";
import "core-js/fn/string/code-point-at";
import "core-js/es6/symbol.js";

import Routes from "./Routes.js";
import registerServiceWorker from "./registerServiceWorker";

ReactDOM.render(
  <BrowserRouter>
    <Routes />
  </BrowserRouter>,
  document.getElementById("root")
);
registerServiceWorker();
