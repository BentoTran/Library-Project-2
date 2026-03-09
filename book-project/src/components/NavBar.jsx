export default function Navbar(){

    return (
<header className="bg-gradient-to-br from-[#1f2937] to-[#0f2a24] text-white px-[18px] py-6 border-b-[3px] border-b-[rgba(182,141,64,0.35)]">
    <div className="max-w-[980px] mx-auto flex items-center justify-between gap-4">
        <div className="flex items-center gap-[14px]">
            <div className="w-[100px] h-[100px] rounded-[12px] flex items-center justify-center bg-[rgba(255,255,255,0.12)] border border-[rgba(255,255,255,0.25)]">
                <img
                    src="/images/book-icon.png"
                    alt="Book icon"
                    className="w-[100px] h-[100px] object-contain"
                />
            </div>

            <div>
                <h1 className="m-0 text-[26px] font-bold">Come Find Yo Books</h1>
                <p className="mt-1 italic text-[rgba(255,255,255,0.85)]">
                    A quiet corner for discovering books.
                </p>
                <p className="mt-2">Search books and save your favorites.</p>
            </div>
        </div>
    </div>
</header>
        )
}
