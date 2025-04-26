import { BrowserRouter, Route, Routes } from "react-router-dom";
import React from "react";
import Home from "./pages/Home";
import { MessageConextProvider } from "./context/message-context";
import Popup from "./pages/Popup";


function App() {
  return (
    <MessageConextProvider>
        <BrowserRouter>
              <Routes>
                <Route path="/" element={<Home/>}>home</Route>
                <Route path="/popup" element={<Popup/>}>popup</Route>
              </Routes>
        </BrowserRouter>
    </MessageConextProvider>
  );
}

export default App;