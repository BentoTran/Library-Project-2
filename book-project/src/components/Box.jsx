export default function Box({ title, right, children }) {
    return (
        <section className="bg-white p-[18px] mb-4 rounded-[16px] border border-[#e5e0d6] shadow-[0_10px_25px_rgba(31,41,55,0.08)]">
            {title ? (
                <div className="flex items-center justify-between">
                    <h2 className="m-0 mb-3 text-[18px] relative pl-[10px] font-bold before:content-[''] before:absolute before:left-0 before:top-[3px] before:w-[4px] before:h-[18px] before:rounded-full before:bg-[#b68d40]">
                        {title}
                    </h2>

                    {right}
                </div>
            ) : null}

            {children}
        </section>
    );
}