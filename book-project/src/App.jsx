import { Routes, Route, Link } from "react-router-dom";
import { FavoritesProvider } from "./context/FavoritesContext";

import Home from "./pages/Home";
import BookDetails from "./pages/BookDetails";
import Navbar from "./components/NavBar";

export default function App() {
  return (
      <FavoritesProvider>
       <Navbar />
        <main className="max-w-[980px] mx-auto p-[18px]">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/books/:workId" element={<BookDetails />} />
          </Routes>
        </main>
      </FavoritesProvider>
  );
}