export default function Button({ variant = "primary", className = "", ...props }) {
    const base =
        "px-[14px] py-[10px] rounded-[12px] font-semibold cursor-pointer transition duration-150 hover:opacity-95 hover:-translate-y-[1px] disabled:opacity-60 disabled:cursor-not-allowed";

    const primary =
        "bg-[#2f5d50] text-white border border-[rgba(47,93,80,0.25)]";

    const gray =
        "bg-transparent text-[#1f2937] border border-[#e5e0d6] hover:bg-[rgba(0,0,0,0.05)]";

    return (
        <button
            className={`${base} ${variant === "gray" ? gray : primary} ${className}`}
            {...props}
        />
    );
}