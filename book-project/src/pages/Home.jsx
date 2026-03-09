import { useEffect, useState } from "react";
import { useFavorites } from "../context/FavoritesContext";

import Button from "../components/Button";
import Box from "../components/Box";
import BookCard from "../components/BookCard";

const DEFAULT_QUERY = "";
const LIMIT = 12;

export default function Home() {
    const { favorites, toggleFavorite, isFavorite, clearFavorites } =
        useFavorites();

    const [input, setInput] = useState("");
    const [query, setQuery] = useState(DEFAULT_QUERY);

    const [loading, setLoading] = useState(false);
    const [books, setBooks] = useState([]);
    const [statusText, setStatusText] = useState("");

    async function fetchBooks(activeQuery) {
        setLoading(true);
        setStatusText("Loading...");

        const url =
            "https://openlibrary.org/search.json?" +
            new URLSearchParams({
                q: activeQuery,
                limit: String(LIMIT),
                fields: "key,title,author_name,first_publish_year,cover_i",
            });

        try {
            const res = await fetch(url);
            const data = await res.json();

            const mapped = (data.docs || []).map((b) => ({
                key: b.key,
                title: b.title || "Untitled",
                author: b.author_name?.[0] || "Unknown",
                year: b.first_publish_year || "Unknown",
                coverId: b.cover_i || null,
            }));

            setBooks(mapped);
            setStatusText(
                mapped.length ? "" : "No results found. Try another search."
            );
        } catch {
            setBooks([]);
            setStatusText("Something went wrong. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchBooks(query);
    }, [query]);

    function handleSubmit(e) {
        e.preventDefault();
        const cleaned = input.trim();
        setQuery(cleaned.length ? cleaned : DEFAULT_QUERY);
    }

    function clearResults() {
        setBooks([]);
        setStatusText("");
    }

    return (
        <div>
            {/* Search */}
            <Box>
                <form
                    onSubmit={handleSubmit}
                    className="flex gap-[10px] items-center flex-wrap"
                >
                    <div className="relative grow shrink min-w-[250px]">
            <span className="absolute left-[14px] top-1/2 -translate-y-1/2 text-[#6b7280] text-[16px] pointer-events-none">
              🔍
            </span>

                        <input
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            placeholder="Have you ever heard of Brandon Sanderson?"
                            className="w-full bg-white text-[#1f2937] text-[16px] outline-none border border-[#e5e0d6] rounded-full px-4 py-[14px] pl-10 transition duration-200 focus:border-[#2f5d50] focus:shadow-[0_0_0_4px_rgba(47,93,80,0.12),0_4px_12px_rgba(0,0,0,0.05)]"
                            required
                        />
                    </div>

                    <Button type="submit" disabled={loading}>
                        Search
                    </Button>

                    <Button type="button" variant="gray" onClick={clearResults}>
                        Clear Results
                    </Button>
                </form>

                <p className="mt-3 text-[#6b7280]">{statusText}</p>
            </Box>

            {/* Results */}
            <Box title="Results">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {books.map((book) => (
                        <BookCard
                            key={book.key}
                            book={book}
                            isFavorite={isFavorite(book.key)}
                            onSave={toggleFavorite}
                        />
                    ))}
                </div>
            </Box>

            {/* Favorites */}
            <Box
                title="Favorites"
                right={
                    <Button type="button" variant="gray" onClick={clearFavorites}>
                        Clear Favorites
                    </Button>
                }
            >
                <p className="text-[#6b7280] text-sm mb-2">
                    {favorites.length === 0
                        ? "No favorites yet. Save a book to see it here."
                        : `You have ${favorites.length} favorite(s).`}
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {favorites.map((book) => (
                        <BookCard
                            key={book.key}
                            book={book}
                            onRemove={toggleFavorite}
                        />
                    ))}
                </div>
            </Box>
        </div>
    );
}