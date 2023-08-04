import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./components/common/Header";
import MainPage from "./pages/mainPage/MainPage";
import NoticePage from "./pages/noticePage/NoticePage";
import MonthMealPage from "./pages/monthMealPage/MonthMealPage";
import { Reset } from "styled-reset";


function App() {
  return (
        <BrowserRouter>
          {/* css 리셋 */}
          <Reset/>
          <Header/>
            <Routes>
              <Route path="/" element={<MainPage/>}/>
              <Route path="/notice" element={<NoticePage/>}/>
              <Route path="/month" element={<MonthMealPage/>}/>
            </Routes>
        </BrowserRouter>
  );
}

export default App;
