"use client";
import { Button } from "@/components/ui/button";
import { useUserInfo } from "@/hooks/useUser";
import { useState } from "react";

export function LinkProfile() {
  const [isCopiedLink, setIsCopiedLink] = useState(false);
  const {user} = useUserInfo()

  if (!user) return null;

  const copylink = () => {
    const url = `${window.location.origin}/${user.username}`;

    navigator.clipboard.writeText(url);

    setIsCopiedLink(true);
  };

  return (
    <div className="bg-indigo-100 rounded-3xl">
      <div className="flex flex-col justify-center text-center py-4 px-4 items-center gap-2 md:flex-row md:justify-between md:text-left">
        <span className="text-sm">
          <span>🔥 Your LinkTree is live: </span>
          {window.location.origin} / @{user.username}
        </span>

        <Button
          variant="outline"
          className="rounded-full px-4 bg-white font-semibold text-xs md:text-[16px]"
          onClick={copylink}
        >
          {isCopiedLink ? "Copied!" : "Copy your JuanesCode Url"}
        </Button>
      </div>
    </div>
  );
}
