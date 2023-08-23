/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import React from "react";

import { Layout } from "@components/layout";
import { requireAuth } from "@utils/auth";
import { api } from "@/utils/api";
import { Button } from "@components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Avatar, Input, Label, Textarea } from "@components/ui";
import { prisma } from "@server/db";
import { getSession } from "next-auth/react";
import type { inferSSRProps } from "@lib/inferSSRProps";
import { AvatarFallback, AvatarImage } from "@components/ui/avatar";

const OnboardingValues = z.object({
  // firstName: z.string().min(2).max(15),
  // lastName: z.string().min(2).max(15),
  contactEmail: z.string(),
  preferredName: z.string().min(2).max(15),
  bio: z.string().max(1000),
  // graduationClass: z.number(),
});

type SchemaValidation = z.infer<typeof OnboardingValues>;

export default function Account(
  props: { user: User } & inferSSRProps<typeof getServerSideProps>
) {
  const { user } = props;

  // const authProvider = useAuthProvider();
  const updateUser = api.users.updateUser.useMutation();

  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<SchemaValidation>({
    resolver: zodResolver(OnboardingValues),
  });

  const submitSignInFlow: SubmitHandler<SchemaValidation> = async (data) => {
    await updateUser.mutateAsync({
      // firstName: data.firstName,
      // lastName: data.lastName,
      contactEmail: data.contactEmail,
      preferredName: data.preferredName,
      bio: data.bio,
      // graduationClass: data.graduationClass,
    });
  };

  return (
    <Layout className="mt-8">
      <div className="flex justify-center">
        {/* Setting Content */}
        <div className="mt-8 md:w-2/3">
          {/* <div>
            <h3 className="text-2xl font-medium leading-6 text-gray-900">
              Profile
            </h3>
            <p className="">
              Currently authenticated with{" "}
              <span className="font-bold">{authProvider}</span>
            </p> 
          </div> */}
          <div className="flex flex-col justify-center rounded-lg border border-zinc-200 bg-white p-8 shadow-md">
            <form onSubmit={handleSubmit(submitSignInFlow)}>
              <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="flex flex-col p-2 pt-3 sm:col-span-4">
                  <div>
                    <span className="text-base font-normal">
                      Computer Science
                    </span>
                    <div className="text-3xl font-bold">
                      {user.firstName} {user.lastName}
                    </div>
                    {/* eslint-disable-next-line tailwindcss/classnames-order, tailwindcss/no-custom-classname */}
                    <p className="text-sm text-muted-foreground">
                      Class of {user.graduationClass}
                    </p>
                  </div>
                  {/* <span className="text-3xl font-bold">
                    {user.firstName} {user.lastName}
                  </span>
                  <span className=" text-base font-normal">
                    Class of {user.graduationClass}
                  </span> */}
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
                <div className="sm:col-span-3">
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
                      // className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    />
                    {errors.touchedFields.preferredName && (
                      <span className="mt-2 block text-red-800">
                        {errors.touchedFields.preferredName.valueOf()}
                      </span>
                    )}
                  </div>
                </div>
                <div className="sm:col-span-3">
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
                    // className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
              </div>

              <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                <div className="sm:col-span-6">
                  <label
                    htmlFor="bio"
                    className="block text-sm font-medium text-gray-700"
                  >
                    Bio
                  </label>
                  <div className="mt-1">
                    <Textarea
                      id="bio"
                      rows={3}
                      // className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                      defaultValue={user.bio ?? ""}
                      {...register("bio")}
                    />
                  </div>
                  <p className="mt-2 text-sm text-gray-500">
                    Write a few sentences about yourself.
                  </p>
                </div>
              </div>

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
  const session = await getSession(ctx);

  const user = await prisma.user.findUnique({
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    where: { id: session!.user.id },
  });

  return { props: { user } };
});
