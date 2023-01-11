import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.js';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import ErrorPage from "./routes/ErrorPage.js";
import CreatePlayer from "./routes/CreatePlayer.js";
import Scores from "./routes/Scores.js"


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
  },
  {
    path: "/create-player",
    element: <CreatePlayer />,
  },
  {
    path: "/scores",
    element: <Scores />,
  },
  {
    path: "/create-player/success",
    element: <CreatePlayer />,
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);