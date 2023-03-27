// export default function Footer() {
//   return (
//     <footer className="mt-auto pt-12">
//       <div className="mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8">
//         <nav
//           className="-mx-5 -my-2 flex flex-wrap justify-center"
//           aria-label="Footer"
//         >
//           {navigation.main.map((item) => (
//             <div key={item.name} className="px-5 py-2">
//               <a
//                 href={item.href}
//                 className="text-base text-gray-500 hover:text-gray-900"
//               >
//                 {item.name}
//               </a>
//             </div>
//           ))}
//         </nav>
//         <p className="mt-8 text-center text-base text-gray-400">
//           Site Content &copy; MV Network
//         </p>
//       </div>
//     </footer>
//   );
// }

import { siteConfig } from "@config/site";
import { Layout } from "./layout";

export default function Footer() {
  return (
    <Layout className="container">
      <div className="flex flex-col items-center justify-between gap-4 border-t border-t-slate-200 py-10 dark:border-t-slate-700 md:h-24 md:flex-row md:py-0">
        <div className="flex flex-col items-center gap-4 px-8 md:flex-row md:gap-2 md:px-0">
          {/* <Icons.logo className="h-6 w-6" /> */}
          <p className="text-center text-sm leading-loose text-slate-600 dark:text-slate-400 md:text-left">
            Built by{" "}
            <a
              href={siteConfig.links.linkedin}
              target="_blank"
              rel="noreferrer"
              className="font-medium underline underline-offset-4"
            >
              Eeswar Kurli
            </a>
            .
          </p>
        </div>
      </div>
    </Layout>
  );
}

const navigation = {
  main: [{ name: "Contact Us", href: "mailto:eeswarkartikeya@gmail.com" }],
};
