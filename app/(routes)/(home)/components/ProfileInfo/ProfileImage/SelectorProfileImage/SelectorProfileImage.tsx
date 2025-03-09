import { useState } from "react";
import { SelectorProfileImageProps } from "./SelectorProfileImages.types";
import { TabSelector } from "./TabSelector";
import { TabUploadImage } from "./TabUploadImage";
import { TabDeleteImage } from "./TabDeleteImage";

export function SelectorProfileImage(props: SelectorProfileImageProps) {
  const { setShowDialog } = props;
  const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null);
  return (
    <div className="pt-6 ">
      {!showTab && <TabSelector setShowTab={setShowTab} />}
      {showTab === "upload" && (
        <TabUploadImage setShowDialog={setShowDialog} setShowTab={setShowTab} />
      )}

      {showTab === "delete" && (
        <TabDeleteImage setShowDialog={setShowDialog} setShowTab={setShowTab} />
      )}
    </div>
  );
}
