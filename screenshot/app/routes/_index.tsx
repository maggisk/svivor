import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/lib/session.server";
import remix from "~/components/remix.svg";
import cn from "classnames";
import ScreenshotForm from "~/components/ScreenshotForm";

const logos = Array(20)
  .fill(0)
  .map((j, i) => ({
    src: remix,
    alt: "Remix",
  }));

export const meta: MetaFunction = () => {
  return [
    { title: "New Remix App" },
    { name: "description", content: "Welcome to Remix!" },
  ];
};

export const loader = async ({ request }: LoaderFunctionArgs) => {
  return {
    user: await getUser(request),
  };
};

export default function Index() {
  const { user } = useLoaderData<typeof loader>();

  return (
    <main className="font-poppins grid h-full place-items-center">
      <div className="grid place-items-center px-4 py-16 xl:grid-cols-2 xl:gap-24">
        <div className="flex max-w-md flex-col items-center text-center xl:order-2 xl:items-start xl:text-left">
          <a
            href="/"
            className="animate-slide-top [animation-fill-mode:backwards] xl:animate-slide-left xl:[animation-delay:0.5s] xl:[animation-fill-mode:backwards]"
          ></a>
          <h1
            data-heading
            className="mt-8 animate-slide-top text-4xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl xl:mt-4 xl:animate-slide-left xl:text-6xl xl:[animation-delay:0.8s] xl:[animation-fill-mode:backwards]"
          >
            <a href="/">Dead simple web screenshots</a>
          </h1>
          <p
            data-paragraph
            className="mt-6 animate-slide-top text-xl/7 text-muted-foreground [animation-delay:0.8s] [animation-fill-mode:backwards] xl:mt-8 xl:animate-slide-left xl:text-xl/6 xl:leading-10 xl:[animation-delay:1s] xl:[animation-fill-mode:backwards]"
          >
            Free service to make screenshots of webpages
          </p>
        </div>
        <ul className="mt-16 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-4 xl:mt-0 xl:grid xl:grid-flow-col xl:grid-cols-5 xl:grid-rows-6">
          {logos.map((logo, i) => (
            <li
              key={i}
              className={cn(
                "flex flex-wrap animate-roll-reveal [animation-fill-mode:backwards]"
              )}
              style={{ animationDelay: `${i * 0.07}s` }}
            >
              <span className="grid size-20 place-items-center rounded-2xl bg-violet-600/10 p-4 transition hover:-rotate-6 hover:bg-violet-600/15 dark:bg-violet-200 dark:hover:bg-violet-100 sm:size-24">
                <img src={logo.src} alt="" />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <ScreenshotForm />
    </main>
  );
}
