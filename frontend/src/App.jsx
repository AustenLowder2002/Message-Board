import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import { MessageConextProvider } from "./context/message-context";


function App() {
  return (
    <MessageConextProvider>
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}>home</Route>
              </Routes>
        </BrowserRouter>
    </MessageConextProvider>
  );
}

export default App;