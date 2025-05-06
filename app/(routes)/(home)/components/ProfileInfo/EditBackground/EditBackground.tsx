import React, { useState } from "react";
import { EditBackgroundProps } from "./EditBackground.types";
import { useUserInfo } from "@/hooks/useUser";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Ellipsis, ImagePlus } from "lucide-react";
import Image from "next/image";
import { UploadButton } from "@/lib/uploadthing";
import { Button } from "@/components/ui/button";
import axios from "axios";
import toast from "react-hot-toast";

export function EditBackground(props: EditBackgroundProps) {
  const { onReload } = props;
  const [showDialog, setShowDialog] = useState(false);
  const [photoUrl, setPhotoUrl] = useState("");
  const { reloadUser } = useUserInfo();

  const onChangeBackground = async () => {
    try {
      await axios.patch("/api/update-user", { backgroundImage: photoUrl });
      reloadUser();
      setShowDialog(false);
      onReload(true);
      setPhotoUrl("");

      toast.success("Background updated successfully");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DropdownMenu>
        <DropdownMenuTrigger>
          <div className="p-2 bg-[#e0e2d9] rounded-full cursor-pointer">
            <Ellipsis fill="black" strokeWidth={1} />
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuItem>
            <DialogTrigger>
              <div className="flex gap-1 items-center">
                <ImagePlus className="h-4 w-4" />
                Edit or add background
              </div>
            </DialogTrigger>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Change background</DialogTitle>
          <div className="my-4">
            {photoUrl ? (
              <div>
                <Image src={photoUrl} alt="profile" width={300} height={200} />
              </div>
            ) : (
              <UploadButton
                className="rounded-md text-slate-800 bg-slate-200 h-full py-10"
                endpoint="profileImage"
                onClientUploadComplete={(res) => {
                  setPhotoUrl(res?.[0].url);
                }}
                onUploadError={(error: Error) => {
                  console.log(error);
                }}
              />
            )}
          </div>
          <Button
            className="w-full rounded-full bg-violet-500"
            disabled={!photoUrl}
            onClick={onChangeBackground}
          >
            Change background
          </Button>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
