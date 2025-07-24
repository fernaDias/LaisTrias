"use client";

import { useEffect } from "react";

type InstagramEmbedProps = {
  url: string;
};

export default function InstagramEmbed({ url }: InstagramEmbedProps) {
  useEffect(() => {
    const script = document.createElement("script");
    script.setAttribute("src", "https://www.instagram.com/embed.js");
    script.setAttribute("async", "");
    document.body.appendChild(script);
  }, []);

  return (
    <div style={{ maxWidth: "540px", margin: "0 auto" }}>
      <blockquote
        className="instagram-media"
        data-instgrm-permalink={url}
        data-instgrm-version="14"
        style={{
          background: "#FFF",
          border: 0,
          margin: 0,
          padding: 0,
          width: "100%",
        }}
      />
    </div>
  );
}
