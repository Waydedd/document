'use client'

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SecureDoc() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (!isLoggedIn) {
      router.push("/"); // kick user back if not signed in
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-white p-6 shadow-md">
        <h1 className="text-2xl font-bold mb-4">Secure Document</h1>
        <a href="../../../docs/secret.pdf" target="_blank" className="text-blue-600 underline">
          Open Secret PDF
        </a>
      </div>
    </div>
  );
}
