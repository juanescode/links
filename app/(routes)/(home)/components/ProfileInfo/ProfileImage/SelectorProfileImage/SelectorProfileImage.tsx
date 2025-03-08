import { useState } from "react";
import { SelectorProfileImageProps } from "./SelectorProfileImages.types";
import { TabSelector } from "./TabSelector";

export function SelectorProfileImage(props: SelectorProfileImageProps) {
  const { setShowDialog } = props;
  const [showTab, setShowTab] = useState<"upload" | "delete" | null>(null);
  return (
    <div className="pt-6 ">
      {!showTab && <TabSelector setShowTab={setShowTab} />}
      {showTab === "upload" && <p>Tab upload image</p>}

      {showTab === "delete" && <p>Tab delete image</p>}
    </div>
  );
}
