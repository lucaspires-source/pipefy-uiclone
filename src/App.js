import React from "react";
import Header from "./components/Header";
import GlobalStyle from "./styles/global";
import Board from "./components/Board";
const App = () => {
  return (
    <>
      <Header />
      <Board />
      <GlobalStyle />
    </>
  );
};

export default App;
