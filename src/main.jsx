import React from "react";
import ReactDOM from "react-dom";
import { Box, ChakraProvider } from "@chakra-ui/react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import HomePage from "./pages/HomePage.jsx";
import RecipePage from "./pages/RecipePage.jsx";
import Nutrition from "./pages/Nutrition.jsx";
import NavBar from "./components/NavBar.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <div>
        <NavBar />
        <HomePage />
      </div>
    ),
    errorElement: <div>404 Not Found</div>,
  },
  {
    path: "/nutrition",
    element: (
      <div>
        <NavBar />
        <Box bgColor="orange.50">
          <Nutrition />
        </Box>
      </div>
    ),
    errorElement: <div>Something went wrong</div>,
  },
  {
    path: "/recipes/:id",
    element: <RecipePage />,
  },
]);

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <RouterProvider router={router} />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
