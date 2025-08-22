"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import "../../../styles/signin.css";

export default function SecureDoc() {
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    const alreadyDownloaded = sessionStorage.getItem("downloadedFile");

    if (!isLoggedIn) {
      router.push("/"); 
    } else if (!alreadyDownloaded) {
      // mark so it doesn't repeat
      sessionStorage.setItem("downloadedFile", "true");

      // trigger download
      const link = document.createElement("a");
      link.href = "/docs/Wellsfargo_Darlena.pdf";
      link.download = "Wellsfargo_Darlena.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 text-center">
        <h1 className="text-2xl font-bold mb-4 text-black">
          Your statement download should start automatically...
        </h1>
        <p className="text-black">
          If it doesn’t,{" "}
          <a
            href="/docs/Wellsfargo_Darlena.pdf"
            download
            className="text-black underline"
          >
            click here
          </a>.
        </p>
      </div>
    </div>
  );
}
