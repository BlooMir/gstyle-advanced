import { BrowserRouter, Route, Routes } from "react-router-dom";
import { RecoilRoot } from "recoil";
import MainPage from "./pages/mainPage/MainPage";


function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainPage/>}/>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
