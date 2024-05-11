import type { LoaderFunctionArgs, MetaFunction } from "@remix-run/node";
import { useLoaderData } from "@remix-run/react";
import { getUser } from "~/lib/session.server";
import remix from "~/components/remix.svg";
import cn from "classnames";
import ScreenshotForm from "~/components/ScreenshotForm";
import { Accordion } from "flowbite-react";

const logos = Array(14)
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
    <main className="font-poppins grid h-full place-items-center pb-20 w-full max-w-3xl px-10 mx-auto md:px-0">
      <div className="grid place-items-center px-4 py-16">
        <div className="flex max-w-md flex-col items-center text-center">
          <a
            href="/"
            className="animate-slide-top [animation-fill-mode:backwards]"
          ></a>
          <h1
            data-heading
            className="mt-8 animate-slide-top text-4xl font-medium text-foreground [animation-delay:0.3s] [animation-fill-mode:backwards] md:text-5xl"
          >
            <a href="/">Dead simple web screenshots</a>
          </h1>
          <p
            data-paragraph
            className="mt-6 animate-slide-top text-xl/7 text-muted-foreground [animation-delay:0.8s] [animation-fill-mode:backwards]"
          >
            Free service to make screenshots of webpages
          </p>
        </div>
        <ul className="mt-16 flex max-w-3xl flex-wrap justify-center gap-2 sm:gap-4">
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

      <p className="text-2xl text-gray-900 pb-5">Try it yourself</p>
      <ScreenshotForm />

      <p className="text-2xl text-gray-900 pb-5 pt-20">FAQ</p>
      <Accordion className="w-full max-w-2xl" collapseAll>
        <Accordion.Panel>
          <Accordion.Title>
            <p className="font-bold text-lg">Why is it free?</p>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              It's a pet project I had an urge to create 🤷‍♂️
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <p className="font-bold text-lg">
              Should I use it for my super duper critical production
              application?
            </p>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Probably not, but I'm not stopping you
            </p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <p className="font-bold text-lg">
              Should I use it for my own pet projects?
            </p>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">Absolutely</p>
          </Accordion.Content>
        </Accordion.Panel>
        <Accordion.Panel>
          <Accordion.Title>
            <p className="font-bold text-lg">Are there usage limits?</p>
          </Accordion.Title>
          <Accordion.Content>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              You get an api key and can generate one screenshot concurrently
              when you sign up with github (we don't ask for your email)
            </p>
            <p className="mb-2 text-gray-500 dark:text-gray-400">
              Anonymous usage is meant as a demo and is limited to a couple of
              concurrent screenshot generations. That is, if there are many
              users testing screenshot generation you might get throttled
            </p>
          </Accordion.Content>
        </Accordion.Panel>
      </Accordion>
    </main>
  );
}
