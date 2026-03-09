import { useState } from "react";
import { Link } from "react-router-dom";
import { useApp } from "../context/FavoritesContext.jsx";

function Button({ variant = "primary", className = "", ...props }) {
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

export default function Users() {
    const { users, currentUserId, createUser, switchUser } = useApp();
    const [name, setName] = useState("");

    function handleSubmit(e) {
        e.preventDefault();
        createUser(name);
        setName("");
    }

    return (
        <div>
            <Box title="Users">
                <p className="text-[#6b7280] mb-3">
                    Current user: <span className="font-semibold text-[#1f2937]">{currentUserId}</span>
                </p>

                <form onSubmit={handleSubmit} className="flex gap-[10px] items-center flex-wrap">
                    <input
                        className="grow min-w-[250px] bg-white text-[#1f2937] text-[16px] outline-none border border-[#e5e0d6] rounded-full px-4 py-[14px] transition duration-200 focus:border-[#2f5d50] focus:shadow-[0_0_0_4px_rgba(47,93,80,0.12),0_4px_12px_rgba(0,0,0,0.05)]"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="New user name..."
                    />
                    <Button type="submit">Create</Button>
                </form>
            </Box>

            <Box title="User List">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {users.map((u) => (
                        <div
                            key={u.id}
                            className="border border-[#e5e0d6] rounded-[16px] p-[14px] bg-gradient-to-b from-white to-[#fbfaf7] flex justify-between items-center gap-3"
                        >
                            <div>
                                <h3 className="m-0 text-[18px] font-bold">{u.name}</h3>
                                <p className="mt-[6px] text-[#6b7280]">id: {u.id}</p>
                            </div>

                            <div className="flex gap-2">
                                <Link to={`/users/${u.id}`}>
                                    <Button type="button" variant="gray">
                                        View
                                    </Button>
                                </Link>
                                <Button type="button" onClick={() => switchUser(u.id)}>
                                    Switch
                                </Button>
                            </div>
                        </div>
                    ))}
                </div>
            </Box>
        </div>
    );
}