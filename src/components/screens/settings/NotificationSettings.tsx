import { Button } from "@/components/new-ui/Button";

/* eslint-disable react/no-unescaped-entities */
export default function NotificationSettings() {
  return (
    <div className="">
      <div>
        <h3 className="text-lg font-medium leading-6 text-gray-900">
          Notifications
        </h3>
        <p className="mt-1 text-sm text-gray-500">
          We'll always let you know about important changes, but you pick what
          else you want to hear about.
        </p>
      </div>
      <div className="mt-6">
        <fieldset>
          <legend className="text-base font-medium text-gray-900">
            By Email
          </legend>
          <div className="mt-4 space-y-4">
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="comments"
                  name="comments"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="comments" className="font-medium text-gray-700">
                  Comments
                </label>
                <p className="text-gray-500">
                  Get notified when someones posts a comment on a posting.
                </p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="candidates"
                  name="candidates"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label
                  htmlFor="candidates"
                  className="font-medium text-gray-700"
                >
                  Candidates
                </label>
                <p className="text-gray-500">
                  Get notified when a candidate applies for a job.
                </p>
              </div>
            </div>
            <div className="relative flex items-start">
              <div className="flex h-5 items-center">
                <input
                  id="offers"
                  name="offers"
                  type="checkbox"
                  className="h-4 w-4 rounded border-gray-300 text-violet-600 focus:ring-violet-500"
                />
              </div>
              <div className="ml-3 text-sm">
                <label htmlFor="offers" className="font-medium text-gray-700">
                  Offers
                </label>
                <p className="text-gray-500">
                  Get notified when a candidate accepts or rejects an offer.
                </p>
              </div>
            </div>
          </div>
        </fieldset>
        <fieldset className="mt-6">
          <div>
            <legend className="text-base font-medium text-gray-900">
              Push Notifications
            </legend>
            <p className="text-sm text-gray-500">
              These are delivered via SMS to your mobile phone.
            </p>
          </div>
          <div className="mt-4 space-y-4">
            <div className="flex items-center">
              <input
                id="push-everything"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              <label
                htmlFor="push-everything"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Everything
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-email"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              <label
                htmlFor="push-email"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                Same as email
              </label>
            </div>
            <div className="flex items-center">
              <input
                id="push-nothing"
                name="push-notifications"
                type="radio"
                className="h-4 w-4 border-gray-300 text-violet-600 focus:ring-violet-500"
              />
              <label
                htmlFor="push-nothing"
                className="ml-3 block text-sm font-medium text-gray-700"
              >
                No push notifications
              </label>
            </div>
          </div>
        </fieldset>
      </div>
      <div className="pt-5">
        <div className="flex justify-end gap-6">
          <Button intent="tertiary">Cancel</Button>
          <Button>Save</Button>
        </div>
      </div>
    </div>
  );
}
