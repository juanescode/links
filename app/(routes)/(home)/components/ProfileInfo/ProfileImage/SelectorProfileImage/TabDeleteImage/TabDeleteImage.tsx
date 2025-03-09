import React from "react";
import { TabDeleteImageProps } from "./TabDeleteImage.types";
import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserInfo } from "@/hooks/useUser";

export function TabDeleteImage(props: TabDeleteImageProps) {
  const { setShowDialog, setShowTab } = props;
  const { reloadUser } = useUserInfo();

  const onRemoveImage = async () => {
    setShowDialog(false);

    await axios.patch("/api/update-user", {
      avatarUrl:
        "https://diumbqc3hc.ufs.sh/f/3auytsCBJDiAatMZ0jeTkxNH5LXIhRWpOcqUP8ajB67sEvgC",
    });
    setShowDialog(false);
    toast.success("Image removed successfully");

    reloadUser();
  };

  return (
    <div>
      <div
        className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg
      "
        onClick={() => setShowTab(null)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </div>

      <div className="flex flex-col gap-2 mt-3">
        <Button
          className="bg-violet-600 text-white rounded-full"
          onClick={onRemoveImage}
        >
          Yes, remove
        </Button>

        <Button
          variant="outline"
          className="rounded-full"
          onClick={() => setShowTab(null)}
        >
          Cancel
        </Button>
      </div>
    </div>
  );
}
