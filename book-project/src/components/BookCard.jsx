import { useNavigate } from "react-router-dom";
import Button from "./Button";

export default function BookCard({
                                     book,
                                     isFavorite,
                                     onSave,
                                     onRemove,
                                 }) {
    const navigate = useNavigate();

    const workId = book.key.split("/").pop();

    return (
        <div className="border border-[#e5e0d6] rounded-[16px] p-[14px] mt-3 bg-gradient-to-b from-white to-[#fbfaf7] flex justify-between items-center gap-3">

            <button
                type="button"
                className="flex items-center gap-[14px] text-left"
                onClick={() => navigate(`/books/${workId}`)}
            >
                <div className="w-[72px] h-[104px] rounded-[12px] border border-[#e5e0d6] shadow-[0_8px_18px_rgba(31,41,55,0.1)] bg-[#efe9de] overflow-hidden">
                    {book.coverId ? (
                        <img
                            className="w-full h-full object-cover"
                            src={`https://covers.openlibrary.org/b/id/${book.coverId}-M.jpg`}
                            alt={`Cover of ${book.title}`}
                            loading="lazy"
                        />
                    ) : null}
                </div>

                <div>
                    <h3 className="m-0 text-[18px] font-bold">
                        {book.title}
                    </h3>

                    <p className="mt-[6px] text-[#6b7280]">
                        Author: {book.author} | Year: {book.year}
                    </p>
                </div>
            </button>

            {onSave && (
                <Button
                    type="button"
                    onClick={() => onSave(book)}
                    disabled={isFavorite}
                >
                    {isFavorite ? "Saved" : "Save"}
                </Button>
            )}

            {onRemove && (
                <Button
                    type="button"
                    variant="gray"
                    onClick={() => onRemove(book)}
                >
                    Remove
                </Button>
            )}
        </div>
    );
}