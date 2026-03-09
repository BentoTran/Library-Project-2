import { Link, useNavigate, useParams } from "react-router-dom";
import { useApp } from "../context/FavoritesContext.jsx";

function Box({ title, children }) {
    return (
        <section className="bg-white p-[18px] mb-4 rounded-[16px] border border-[#e5e0d6] shadow-[0_10px_25px_rgba(31,41,55,0.08)]">
            <h2 className="m-0 mb-3 text-[18px] relative pl-[10px] font-bold before:content-[''] before:absolute before:left-0 before:top-[3px] before:w-[4px] before:h-[18px] before:rounded-full before:bg-[#b68d40]">
                {title}
            </h2>
            {children}
        </section>
    );
}

export default function UserProfile() {
    const { userId } = useParams();
    const navigate = useNavigate();
    const { users, favoritesByUser } = useApp();

    const user = users.find((u) => u.id === userId);
    const favs = favoritesByUser[userId] || [];

    if (!user) {
        return (
            <Box title="User Profile">
                <p className="text-[#6b7280]">User not found.</p>
                <Link className="underline" to="/users">
                    Back to Users
                </Link>
            </Box>
        );
    }

    return (
        <div>
            <Box title={`${user.name}'s Profile`}>
                <p className="text-[#6b7280]">
                    Favorites: <span className="font-semibold text-[#1f2937]">{favs.length}</span>
                </p>
                <Link className="underline text-[#2f5d50]" to="/users">
                    Back to Users
                </Link>
            </Box>

            <Box title="Favorites">
                {favs.length === 0 ? (
                    <p className="text-[#6b7280]">No favorites yet.</p>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {favs.map((book) => (
                            <div
                                key={book.key}
                                className="border border-[#e5e0d6] rounded-[16px] p-[14px] bg-gradient-to-b from-white to-[#fbfaf7] flex justify-between items-center gap-3"
                            >
                                <button
                                    type="button"
                                    className="flex items-center gap-[14px] text-left"
                                    onClick={() => navigate(`/books/${book.key.split("/").pop()}`)}
                                >
                                    <div className="w-[72px] h-[104px] rounded-[12px] border border-[#e5e0d6] shadow-[0_8px_18px_rgba(31,41,55,0.1)] bg-[#efe9de] overflow-hidden" />
                                    <div>
                                        <h3 className="m-0 text-[18px] font-bold">{book.title}</h3>
                                        <p className="mt-[6px] text-[#6b7280]">
                                            Author: {book.author} | Year: {book.year}
                                        </p>
                                    </div>
                                </button>

                                <Link className="underline text-[#2f5d50]" to="/">
                                    Go
                                </Link>
                            </div>
                        ))}
                    </div>
                )}
            </Box>
        </div>
    );
}