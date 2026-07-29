"use client";

import { Music } from "lucide-react";

import { Heading } from "@/features/shared/components/heading";
import { Button } from "@/features/shared/components/ui/button";
import { Input } from "@/features/shared/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
} from "@/features/shared/components/ui/form";
import { Loader } from "@/features/shared/components/loader";
import { Empty } from "@/features/shared/components/ui/empty";
import { useMusic } from "@/features/music/hooks/useMusic";

export const MusicView = () => {
  const { music, form, isLoading, onSubmit } = useMusic();

  return (
    <div>
      <Heading
        title="Music Generation"
        description="Turn your prompt into music."
        icon={Music}
        iconColor="text-emerald-500"
        bgColor="bg-emerald-500/10"
      />
      <div className="px-4 lg:px-8">
        <Form {...form}>
          <form
            onSubmit={onSubmit}
            className="rounded-lg border w-full p-4 px-3 md:px-6 focus-within:shadow-sm grid grid-cols-12 gap-2"
          >
            <FormField
              name="prompt"
              render={({ field }) => (
                <FormItem className="col-span-12 lg:col-span-10">
                  <FormControl className="m-0 p-0">
                    <Input
                      className="border-0 outline-none focus-visible:ring-0 focus-visible:ring-transparent"
                      disabled={isLoading}
                      placeholder="Piano solo"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button
              className="col-span-12 lg:col-span-2 w-full"
              type="submit"
              disabled={isLoading}
              size="icon"
            >
              Generate
            </Button>
          </form>
        </Form>
        {isLoading && (
          <div className="p-20">
            <Loader />
          </div>
        )}
        {!music && !isLoading && <Empty label="No music generated." />}
        {music && (
          <audio controls className="w-full mt-8">
            <source src={music} />
          </audio>
        )}
      </div>
    </div>
  );
};
