"use client"

import Script from "next/script";

export default function Home() {
  return (
    <>
      {/* Scripts e CSS do head */}
      <Script id="litespeed-docref" strategy="beforeInteractive">
        {`var litespeed_docref=sessionStorage.getItem("litespeed_docref");litespeed_docref&&(Object.defineProperty(document,"referrer",{get:function(){return litespeed_docref}}),sessionStorage.removeItem("litespeed_docref"));`}
      </Script>

// ... existing code ...
    </>
  );
} 