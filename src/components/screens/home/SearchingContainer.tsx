/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
/* eslint-disable @typescript-eslint/consistent-type-imports */

import { Check, ChevronsUpDown } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@ui/popover";
import { useState } from "react";

const schools = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

const majors = [
  {
    value: "next.js",
    label: "Next.js",
  },
  {
    value: "sveltekit",
    label: "SvelteKit",
  },
  {
    value: "nuxt.js",
    label: "Nuxt.js",
  },
  {
    value: "remix",
    label: "Remix",
  },
  {
    value: "astro",
    label: "Astro",
  },
];

/**
 * Need to be able to filter for school, major, graduation year,
 *
 */

export default UserContainer;
function UserContainer() {
  const [openSchool, setOpenSchool] = useState(false);
  const [valueSchool, setValueSchool] = useState("");

  const [openMajor, setOpenMajor] = useState(false);
  const [valueMajor, setValueMajor] = useState("");

  // const roleToQueryFor =
  //   session?.user.role === Role.STUDENT ? Role.ALUMNI : Role.STUDENT;
  // const getUsers = api.users.getAllUsers.useQuery({
  //   role: roleToQueryFor,
  // });

  return (
    <div className="flex w-2/3 flex-row justify-around">
      <Popover open={openSchool} onOpenChange={setOpenSchool}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openSchool}
            className="w-[200px] justify-between"
          >
            {valueSchool
              ? schools.find((school) => school.value === valueSchool)?.label
              : "Select school..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search school..." />
            <CommandEmpty>No school found.</CommandEmpty>
            <CommandGroup>
              {schools.map((school) => (
                <CommandItem
                  key={school.value}
                  onSelect={(currentValue) => {
                    setValueSchool(
                      currentValue === valueSchool ? "" : currentValue
                    );
                    setOpenSchool(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      valueSchool === school.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {school.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      <Popover open={openMajor} onOpenChange={setOpenMajor}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={openMajor}
            className="w-[200px] justify-between"
          >
            {valueMajor
              ? majors.find((major) => major.value === valueMajor)?.label
              : "Select major..."}
            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search major..." />
            <CommandEmpty>No major found.</CommandEmpty>
            <CommandGroup>
              {majors.map((major) => (
                <CommandItem
                  key={major.value}
                  onSelect={(currentValue) => {
                    setValueMajor(
                      currentValue === valueMajor ? "" : currentValue
                    );
                    setOpenMajor(false);
                  }}
                >
                  <Check
                    className={cn(
                      "mr-2 h-4 w-4",
                      valueMajor === major.value ? "opacity-100" : "opacity-0"
                    )}
                  />
                  {major.label}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
}
