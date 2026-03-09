import { createContext, useContext, useEffect, useState } from "react";

const FavoritesContext = createContext(null);
const LS_KEY = "simple_book_finder_favorites";

function safeLoad() {
    try {
        const favs = localStorage.getItem(LS_KEY);
        return favs ? JSON.parse(favs) : [];
    } catch {
        return [];
    }
}

export function FavoritesProvider({ children }) {
    const [favorites, setFavorites] = useState(safeLoad);

    useEffect(() => {
        localStorage.setItem(LS_KEY, JSON.stringify(favorites));
    }, [favorites]);

    function isFavorite(bookKey) {
        return favorites.some((b) => b.key === bookKey);
    }

    function toggleFavorite(book) {
        setFavorites((saved) => {
            const exists = saved.some((b) => b.key === book.key);
            return exists ? saved.filter((b) => b.key !== book.key) : [book, ...saved];
        });
    }

    function clearFavorites() {
        setFavorites([]);
    }

    return (
        <FavoritesContext.Provider
            value={{ favorites, isFavorite, toggleFavorite, clearFavorites }}
        >
            {children}
        </FavoritesContext.Provider>
    );
}

export function useFavorites() {
    return useContext(FavoritesContext);
}