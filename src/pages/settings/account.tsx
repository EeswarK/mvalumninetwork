/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Layout } from "@components/layout";
import { requireAuth } from "@utils/auth";
import { api } from "@/utils/api";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { Approved, User } from "@prisma/client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, Input, Label, Textarea } from "@components/ui";
import { prisma } from "@server/db";
import type { inferSSRProps } from "@lib/inferSSRProps";
import { AvatarFallback, AvatarImage } from "@components/ui/avatar";
import { getServerAuthSession } from "@server/auth";
import { useToast } from "@components/ui/use-toast";

const OnboardingValues = z.object({
  // firstName: z.string().min(2).max(15),
  // lastName: z.string().min(2).max(15),
  contactEmail: z.string().optional(),
  preferredName: z.string().max(15).optional(),
  bio: z.string().max(1000),
  tagLine: z.string().max(100),
  // graduationClass: z.number(),
});

type SchemaValidation = z.infer<typeof OnboardingValues>;

export default function Account(
  props: { user: User } & inferSSRProps<typeof getServerSideProps>
) {
  const { user } = props;

  const { toast } = useToast();

  // const authProvider = useAuthProvider();
  const updateUser = api.users.updateUser.useMutation();

  const {
    register,
    handleSubmit,
    // formState: errors,
  } = useForm<SchemaValidation>({
    resolver: zodResolver(OnboardingValues),
  });

  const submitSignInFlow: SubmitHandler<SchemaValidation> = async (data) => {
    await updateUser
      .mutateAsync({
        contactEmail: data.contactEmail,
        preferredName: data.preferredName,
        bio: data.bio,
        image: user.image ?? "",
        tagLine: data.tagLine,
        approved: user.approved as Approved,
      })
      .then(() => {
        toast({
          title: "Success!",
          description: "Your profile has been updated.",
        });
      })
      .catch(() => {
        toast({
          variant: "destructive",
          title: "Oops! Something went wrong.",
          description: "Please try again in a few minutes.",
        });
      });
  };

  return (
    <Layout className="mt-8">
      <div className="flex justify-center">
        {/* Setting Content */}
        <div className="mt-8 md:w-2/3">
          <div className="flex flex-col justify-center rounded-lg border border-zinc-200 bg-white p-8 shadow-md">
            <form onSubmit={handleSubmit(submitSignInFlow)}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="flex flex-col p-2 pt-3 sm:col-span-4">
                  <div>
                    <span className="text-base font-normal">
                      {user.tagLine}
                    </span>
                    <div className="text-3xl font-bold">
                      {user.firstName} {user.lastName}
                    </div>
                    {/* eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname */}
                    <p className="text-sm text-muted-foreground">
                      Class of {user.graduationClass}
                    </p>
                  </div>
                </div>

                <div className="pl-12 sm:col-span-2">
                  <div className="mt-1 flex items-center">
                    <Avatar className="h-24 w-24">
                      <AvatarImage src={user.image ?? ""} />
                      <AvatarFallback>
                        <span className="overflow-hidden rounded-full bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      </AvatarFallback>
                    </Avatar>
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Label
                    htmlFor="last-name"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Preferred First name
                  </Label>
                  <div className="mt-1">
                    <Input
                      type="text"
                      id="preferred-name"
                      autoComplete="given-name"
                      defaultValue={user.preferredName ?? ""}
                      {...register("preferredName")}
                    />
                    {/* {errors.touchedFields.preferredName && (
                      <span className="mt-2 block text-red-800">
                        {errors.touchedFields.preferredName.valueOf()}
                      </span>
                    )} */}
                  </div>
                </div>
                <div className="col-span-6 sm:col-span-3">
                  <Label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Contact Email address
                  </Label>
                  <Input
                    id="email"
                    type="email"
                    autoComplete="email"
                    required
                    defaultValue={user.contactEmail ?? user.email}
                    {...register("contactEmail")}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-6">
                  <Label
                    htmlFor="tag-line"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Tag line
                  </Label>
                  <Input
                    id="tag-line"
                    type="text"
                    defaultValue={user.tagLine ?? ""}
                    {...register("tagLine")}
                    className="mt-1"
                  />
                </div>
                <div className="col-span-6">
                  <Label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </Label>
                  <div className="mt-1">
                    <Textarea
                      id="bio"
                      rows={3}
                      defaultValue={user.bio ?? ""}
                      {...register("bio")}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6"></div>

              <div className="pt-5">
                <div className="flex justify-end gap-6">
                  {/* <Button variant="outline">Cancel</Button> */}
                  <Button type="submit" variant="default">
                    Save
                  </Button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </Layout>
  );
}

export const getServerSideProps = requireAuth(async (ctx) => {
  const session = await getServerAuthSession(ctx);

  const user = await prisma.user.findUnique({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    where: { id: session!.user.id },
  });

  return { props: { user } };
});
