import React, { useState } from "react";
import { TabUploadImageProps } from "./TabUploadImage.types";
import { ChevronLeft } from "lucide-react";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";
import { useUserInfo } from "@/hooks/useUser";

export function TabUploadImage(props: TabUploadImageProps) {
  const { setShowDialog, setShowTab } = props;
  const [photo, setPhoto] = useState("");
  const { reloadUser } = useUserInfo();

  const onUploadPhoto = async () => {
    await axios.patch("/api/update-user", {
      avatarUrl: photo,
    });

    setShowDialog(false);
    toast.success("Photo updated successfully");

    reloadUser();
  };
  return (
    <div>
      <div
        className="flex gap-1 items-center text-sm cursor-pointer hover:bg-slate-100 p-1 w-fit rounded-lg"
        onClick={() => setShowTab(null)}
      >
        <ChevronLeft className="h-4 w-4" />
        Back
      </div>

      <div className="my-4 ">
        <UploadButton
          className="rounded-md text-slate-800 bg-slate-200 h-full w-full p-4"
          endpoint="profileImage"
          onClientUploadComplete={(res) => {
            setPhoto(res?.[0].url);
          }}
          onUploadError={(error: Error) => {
            console.log(error);
          }}
        />
      </div>

      <div>
        <Button
          className="w-full bg-purple-600 text-white rounded-full"
          onClick={onUploadPhoto}
          disabled={!photo}
        >
          Upload
        </Button>
      </div>
    </div>
  );
}
