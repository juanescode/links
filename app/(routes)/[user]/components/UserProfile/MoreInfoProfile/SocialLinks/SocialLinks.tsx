import React from "react";
import { SocialLinksProps } from "./SocialLinks.types";
import Image from "next/image";

export function SocialLinks(props: SocialLinksProps) {
  const { userName } = props;

  const copyToClipboard = () => {
    const url = `${window.location.origin}/${userName}`;

    navigator.clipboard
      .writeText(url)
      .then(() => {
        alert("Link copied to clipboard!");
      })
      .catch((error) => {
        console.error("Failed to copy link: ", error);
      });
  };
  return (
    <div className="overflow-auto">
      <div className="flex gap-6 py-4">
        <div className="flex flex-col items-center gap-2 cursor-pointer" onClick={copyToClipboard}>
          <Image
            src="/social-networks/link.webp"
            alt="Icon"
            width={40}
            height={40}
            className="hover:scale-110 transition-all duration-200"
          />
          <span className="text-xs font-semibold">Copy</span>
        </div>
      </div>
    </div>
  );
}
