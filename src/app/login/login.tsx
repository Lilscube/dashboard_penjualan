"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/provider/AuthContext";

export default function LoginPage() {
    const [username, setUsername] = useState("");
    const [role, setRole] = useState<"admin" | "pembeli">("admin");
    const [error, setError] = useState("");
    const { setRole: setAuthRole } = useAuth();
    const router = useRouter();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (!username) {
            setError("Username wajib diisi");
            return;
        }
        setAuthRole(role);
        router.push("/dashboard");
    };

    return (
        <div style={{ maxWidth: 400, margin: "100px auto", padding: 24, border: "1px solid #eee", borderRadius: 8 }}>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Username</label>
                    <input
                        style={{ width: "100%", marginBottom: 8 }}
                        type="text"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        placeholder="Masukkan username"
                    />
                </div>
                <div>
                    <label>Role</label>
                    <select
                        style={{ width: "100%", marginBottom: 8 }}
                        value={role}
                        onChange={e => setRole(e.target.value as "admin" | "pembeli")}
                    >
                        <option value="admin">Admin</option>
                        <option value="pembeli">Pembeli</option>
                    </select>
                </div>
                {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}
                <button type="submit" style={{ width: "100%" }}>Login</button>
            </form>
        </div>
    );
}