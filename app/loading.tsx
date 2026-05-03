"use client";

import PuffLoader from "react-spinners/PuffLoader";

export default function Loading() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "rgba(255,255,255,0.8)", // напівпрозорий фон
        zIndex: 9999,
      }}
    >
      <PuffLoader
        color="#FFDAE0"
        size={90}
        speedMultiplier={1.2}
      />
    </div>
  );
}