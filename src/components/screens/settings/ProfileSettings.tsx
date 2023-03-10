/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import type { userContextType } from "@/server/api/trpc";
import { api } from "@/utils/api";
import { ErrorMessage } from "@hookform/error-message";
import { zodResolver } from "@hookform/resolvers/zod";
import type { User } from "@prisma/client";
import { Button } from "@ui/Button";
import { useEffect, useRef } from "react";
import type { SubmitHandler } from "react-hook-form";
import { useForm } from "react-hook-form";
import { z } from "zod";

const OnboardingValues = z.object({
  firstName: z.string().min(2).max(15),
  lastName: z.string().min(2).max(15),
  contactEmail: z.string(),
  preferredName: z.string().min(2).max(15),
  bio: z.string().max(1000),
  graduationYear: z.number(),
});

type SchemaValidation = z.infer<typeof OnboardingValues>;

type sanitizedUserContextType = {
  user: {
    id: string;
    role: string;
    firstName: string;
    lastName: string;
    preferredName: string;
    email: string;
    contactEmail: string;
    image: string;
    bio: string;
    approved: boolean;
    graduationClass: number;
  };
};

export default function ProfileSettings() {
  const { data: authProvider } = api.users.getAuthProvider.useQuery();
  const updateUser = api.users.updateUser.useMutation();
  const { data: user } = api.users.getCurrentUser.useQuery();
  const sanitizedUserRef = useRef<sanitizedUserContextType>();

  function sanitizeUser(user: User): sanitizedUserContextType {
    if (!user) {
      return {
        user: {
          id: "",
          role: "",
          firstName: "",
          lastName: "",
          graduationClass: 0,
          preferredName: "",
          email: "",
          contactEmail: "",
          image: "",
          bio: "",
          approved: false,
        },
      };
    }

    return {
      user: {
        id: user?.id || "",
        role: user?.role || "",
        firstName: user?.firstName || "",
        lastName: user?.lastName || "",
        graduationClass: user?.graduationClass || 0,
        preferredName: user?.preferredName || "",
        email: user?.email || "",
        contactEmail: user?.contactEmail || "",
        image: user?.image || "",
        bio: user?.bio || "",
        approved: user?.approved || false,
      },
    };
  }

  useEffect(() => {
    if (user) {
      sanitizedUserRef.current = sanitizeUser(user);
    }
  }, [user]);

  const {
    register,
    handleSubmit,
    formState: errors,
  } = useForm<SchemaValidation>({
    resolver: zodResolver(OnboardingValues),
  });

  let firstAuthProvider;
  if (authProvider) {
    firstAuthProvider = authProvider[0]?.provider;
  } else {
    firstAuthProvider = "loading...";
  }

  const submitSignInFlow: SubmitHandler<SchemaValidation> = async (data) => {
    await updateUser.mutateAsync({
      firstName: data.firstName,
      lastName: data.lastName,
      contactEmail: data.contactEmail,
      preferredName: data.preferredName,
      bio: data.bio,
      graduationClass: data.graduationYear,
    });
  };

  return (
    <>
      <div className="">
        <div>
          <h3 className="text-lg font-medium leading-6 text-gray-900">
            Profile
          </h3>
          <p className="mt-1 text-sm text-gray-500">
            This information will be displayed publicly so be careful what you
            share.
          </p>
        </div>

        <form onSubmit={void handleSubmit(submitSignInFlow)}>
          <div className="mt-6">
            <div>
              <p className="">
                Currently authenticated with{" "}
                <span className="font-bold">{firstAuthProvider}</span>
              </p>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                {/* <label
                htmlFor="photo"
                className="block text-sm font-medium text-gray-700"
              >
                Photo
              </label>
              <div className="mt-1 flex items-center">
                <span className="h-12 w-12 overflow-hidden rounded-full bg-gray-100">
                  <svg
                    className="h-full w-full text-gray-300"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </span>
                <button
                  type="button"
                  className="ml-5 rounded-md border border-gray-300 bg-white py-2 px-3 text-sm font-medium leading-4 text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                >
                  Change
                </button>
              </div> */}
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Legal First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="first-name"
                    autoComplete="given-name"
                    defaultValue={sanitizedUserRef.current?.user.firstName}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    {...register("firstName", { required: true })}
                  />
                  <ErrorMessage errors={errors} name="firstName" />
                </div>
              </div>

              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Legal Last name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="last-name"
                    autoComplete="family-name"
                    required
                    defaultValue={sanitizedUserRef.current?.user.lastName}
                    {...register("lastName")}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  <ErrorMessage errors={errors} name="lastName" />
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Preferred First name
                </label>
                <div className="mt-1">
                  <input
                    type="text"
                    id="preferred-name"
                    autoComplete="given-name"
                    defaultValue={sanitizedUserRef.current?.user.preferredName}
                    {...register("preferredName")}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                  {errors.touchedFields.preferredName && (
                    <span className="mt-2 block text-red-800">
                      {errors.touchedFields.preferredName.valueOf()}
                    </span>
                  )}
                </div>
              </div>
              <div className="sm:col-span-3">
                <label
                  htmlFor="last-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Graduation Year
                </label>
                <div className="mt-1">
                  <input
                    type="number"
                    id="graduation-year"
                    required
                    defaultValue={
                      sanitizedUserRef.current?.user.graduationClass
                    }
                    {...register("graduationYear", {
                      valueAsNumber: true,
                      min: 1969,
                      max: 2026,
                    })}
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                  />
                </div>
                <ErrorMessage errors={errors} name="graduationYear" />
              </div>
              <div className="sm:col-span-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Contact Email address
                </label>
                <input
                  id="email"
                  type="email"
                  autoComplete="email"
                  required
                  defaultValue={sanitizedUserRef.current?.user.contactEmail}
                  {...register("contactEmail")}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                />
                <ErrorMessage errors={errors} name="contactEmail" />
              </div>
            </div>

            <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
              <div className="sm:col-span-6">
                <label
                  htmlFor="about"
                  className="block text-sm font-medium text-gray-700"
                >
                  About
                </label>
                <div className="mt-1">
                  <textarea
                    id="about"
                    rows={3}
                    className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                    defaultValue={sanitizedUserRef.current?.user.bio}
                    {...register("bio")}
                  />
                </div>
                <ErrorMessage errors={errors} name="bio" />
                <p className="mt-2 text-sm text-gray-500">
                  Write a few sentences about yourself.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-5">
            <div className="flex justify-end gap-6">
              <Button type="submit">Submit</Button>
            </div>
          </div>
        </form>

        <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
          <div className="sm:col-span-6">
            <label
              htmlFor="about"
              className="block text-sm font-medium text-gray-700"
            >
              About
            </label>
            <div className="mt-1">
              <textarea
                id="about"
                name="about"
                rows={3}
                className="block w-full rounded-md border border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
                defaultValue={""}
              />
            </div>
            <p className="mt-2 text-sm text-gray-500">
              Write a few sentences about yourself.
            </p>
          </div>
        </div>
      </div>

      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button intent="tertiary">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </>
  );
}
