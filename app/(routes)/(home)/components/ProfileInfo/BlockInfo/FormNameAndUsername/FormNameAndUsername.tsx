"use client";

import { z } from "zod";
import { FormNameAndUsernameProps } from "./FormNameAndUsername.types";
import { useUserInfo } from "@/hooks/useUser";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Textarea } from "@/components/ui/textarea";
import axios from "axios";
import toast from "react-hot-toast";

const formSchema = z.object({
  username: z.string().min(2).max(100).optional(),
  name: z.string().min(2).max(100).optional(),
  bio: z.string().min(2).max(400).optional(),
});

export function FormNameAndUsername(props: FormNameAndUsernameProps) {
  const { setOpenDialog } = props;
  const { user, reloadUser } = useUserInfo();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: user?.username || "",
      name: user?.name || "",
      bio: user?.bio || "",
    },
  });

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      await axios.patch("/api/update-user", {
        name: values.name,
        username: values.username,
        bio: values.bio,
      });

      setOpenDialog(false);
      reloadUser();
      toast.success("Profile updated");

      form.reset();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name</FormLabel>
                <FormControl>
                  <Input placeholder="Name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="username"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Username</FormLabel>
                <FormControl>
                  <Input placeholder="@Profile" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="bio"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Bio</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us a little bit about yourself"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            type="submit"
            className="bg-purple-600 text-white rounded-full w-full py-6 text-lg hover:bg-purple-800"
          >
            Save
          </Button>
        </form>
      </Form>
    </div>
  );
}
