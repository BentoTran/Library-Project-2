import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useFavorites } from "../context/FavoritesContext";

import Button from "../components/Button";
import Box from "../components/Box";

export default function BookDetails() {
    const { workId } = useParams();
    const { toggleFavorite, isFavorite } = useFavorites();

    const [loading, setLoading] = useState(false);
    const [work, setWork] = useState(null);

    useEffect(() => {
        async function loadWork() {
            setLoading(true);
            const res = await fetch(`https://openlibrary.org/works/${workId}.json`);
            const data = await res.json();
            setWork(data);
            setLoading(false);
        }

        loadWork();
    }, [workId]);

    if (loading || !work) {
        return <p className="text-[#6b7280]">Loading...</p>;
    }

    const coverId = work.covers?.[0] || null;

    const desc =
        typeof work.description === "string"
            ? work.description
            : work.description?.value;

    const favObj = {
        key: work.key,
        title: work.title,
        author: "Unknown",
        year: "Unknown",
        coverId,
    };

    return (
        <div>
            <Link className="underline text-[#2f5d50]" to="/">
                ← Back
            </Link>

            <Box title="Book Details">
                <div className="grid gap-5 md:grid-cols-[240px_1fr]">
                    <div className="w-[240px] max-w-full">
                        <div className="w-full aspect-[2/3] rounded-[12px] border border-[#e5e0d6] shadow-[0_8px_18px_rgba(31,41,55,0.1)] bg-[#efe9de] overflow-hidden">
                            {coverId ? (
                                <img
                                    className="w-full h-full object-cover"
                                    src={`https://covers.openlibrary.org/b/id/${coverId}-L.jpg`}
                                    alt={`Cover of ${work.title}`}
                                />
                            ) : null}
                        </div>
                    </div>

                    <div className="space-y-3">
                        <h1 className="m-0 text-[26px] font-bold">{work.title}</h1>

                        <Button type="button" onClick={() => toggleFavorite(favObj)}>
                            {isFavorite(work.key) ? "Saved" : "Save"}
                        </Button>

                        <p className="text-[#6b7280]">
                            {desc ? desc : "No description available."}
                        </p>

                        {work.subjects?.length ? (
                            <div className="flex flex-wrap gap-2 pt-2">
                                {work.subjects.slice(0, 12).map((s) => (
                                    <span
                                        key={s}
                                        className="text-xs px-2 py-1 rounded-full border border-[#e5e0d6] text-[#374151] bg-[#fbfaf7]"
                                    >
                    {s}
                  </span>
                                ))}
                            </div>
                        ) : null}
                    </div>
                </div>
            </Box>
        </div>
    );
}