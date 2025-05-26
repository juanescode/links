import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Pencil, Trash } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import axios from "axios";
import { useUserInfo } from "@/hooks/useUser";
import { RemoveSocialNetworkProps } from "./RemoveSocialNetwork.types";

export function RemoveSocialNetwork(props: RemoveSocialNetworkProps) {
  const { linkId, onReload } = props;
  const [showDialog, setShowDialog] = useState(false);
  const { reloadUser } = useUserInfo();

  const onDelete = async () => {
    await axios.delete(`/api/social-network/${linkId}`);

    setShowDialog(false);
    onReload(true);
    reloadUser();
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="destructive">
          <Trash className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Delete</DialogTitle>
          <div className="flex flex-col gap-4 mt-4">
            <Button
              className="w-full bg-violet-600 text-white rounded-full"
              onClick={onDelete}
            >
              Delete
            </Button>
          </div>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
