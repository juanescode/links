import { Lock } from "lucide-react";
import React from "react";
import { ButtonHeader } from "./ButtonHeader";
import { BtnCopyProfile } from "./BtnCopyProfile";
import { PhonePreview } from "./PhonePreview";

export function ProfilePreview() {
  return (
    <div className="border-l-[#e0e2d9] border-[1px] border-transparent px-2">
     <ButtonHeader />

      <BtnCopyProfile />

      <PhonePreview />

      <div className="flex items-center justify-center mt-20">
        <p className="flex gap-1 items-center font-semibold cursor-pointer">
          hide juanesTree logo
        </p>
        <Lock className="h-4 w-4" />
      </div>
    </div>
  );
}
