import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import React, { useState } from "react";
import { EditSocialNetworkProps } from "./EditSocialNetwork.types";
import { Button } from "@/components/ui/button";
import { Pencil } from "lucide-react";
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
import { set, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useUserInfo } from "@/hooks/useUser";

const formSchema = z.object({
  link: z.string().min(2).max(200),
});

export function EditSocialNetwork(props: EditSocialNetworkProps) {
  const { link, onReload } = props;
  const [showDialog, setShowDialog] = useState(false);
  const {reloadUser} = useUserInfo()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      link: link.link || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    await axios.patch(`/api/social-network/${link.id}`, {
      link: values.link,
    });

    setShowDialog(false);
    onReload(true)
    reloadUser()
  };

  return (
    <Dialog open={showDialog} onOpenChange={setShowDialog}>
      <DialogTrigger asChild>
        <Button variant="outline">
          <Pencil className="w-4 h-4" />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Edit</DialogTitle>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-4"
              >
                <FormField
                  control={form.control}
                  name="link"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Link social network</FormLabel>
                      <FormControl>
                        <Input placeholder="https://domain/@JuanesCode" {...field} />
                      </FormControl>
                      <FormDescription>
                        Example: https://domain/@JuanesCode
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button type="submit" className="w-full rounded-full bg-violet-500">Submit</Button>
              </form>
            </Form>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
