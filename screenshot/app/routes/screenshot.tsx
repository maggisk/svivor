import { LoaderFunctionArgs, json } from "@remix-run/node";
import { z } from "zod";
import puppeteer from "puppeteer-core";
import chromium from "@sparticuz/chromium";

const cookie = z
  .object({
    name: z.string(),
    value: z.string(),
    url: z.string().optional(),
    domain: z.string().optional(),
    path: z.string().optional(),
    secure: z.boolean().optional(),
    httpOnly: z.boolean().optional(),
    sameSite: z.enum(["Strict", "Lax", "None"]).optional(),
    expires: z.number().optional(),
    priority: z.enum(["Low", "Medium", "High"]).optional(),
    sameParty: z.boolean().optional(),
    sourceScheme: z.enum(["Unset", "NonSecure", "Secure"]),
    partitionKey: z.string().optional(),
  })
  .strict();

const schema = z
  .object({
    "api-key": z.string(),
    url: z.string().url(),
    format: z.enum(["png", "jpeg", "webp"]),
    width: z.coerce.number().min(10).max(2048),
    height: z.coerce.number().min(10).max(2048),
    dpr: z.coerce.number().min(1).max(2).optional().default(1),
    wait: z
      .enum(["load", "domcontentloaded", "networkidle0", "networkidle2"])
      .optional()
      .default("load"),
    timeout: z.coerce.number().min(1).max(30).optional().default(20),
    quality: z.coerce.number().min(1).max(100).optional().default(80),
    headers: z.array(z.tuple([z.string(), z.string()])).optional(),
    cookies: z.array(cookie).optional(),
    //accept: z.array(z.string().length(3)).optional(),
  })
  .strict();

export const loader = async ({ request }: LoaderFunctionArgs) => {
  const url = new URL(request.url);
  const result = schema.safeParse(
    Object.fromEntries(url.searchParams.entries())
  );

  if (!result.success) {
    return json(
      {
        errors: Object.fromEntries(
          result.error.issues.map(
            ({ path, message }) => [path.join("."), message] as const
          )
        ),
      },
      {
        status: 400,
      }
    );
  }

  const browser = await puppeteer.launch({
    executablePath:
      process.env.CHROMIUM_PATH || (await chromium.executablePath()),
    args: chromium.args,
    defaultViewport: {
      width: result.data.width,
      height: result.data.height,
      deviceScaleFactor: result.data.dpr,
    },
    headless: chromium.headless,
  });

  const page = await browser.newPage();

  if (result.data.cookies) {
    page.setCookie(...result.data.cookies);
  }

  const response = await Promise.race([
    page.goto(result.data.url, {
      waitUntil: result.data.wait,
    }),
    new Promise<false>((resolve) => {
      setTimeout(() => {
        resolve(false); // false is expected below
      }, result.data.timeout * 1000);
    }),
  ]);

  if (response === false) {
    // timed out
    await page.evaluate(() => window.stop());
  }

  // if (response && !response.ok()) {
  //   return json({
  //     url: response.url(),
  //     status: response.status(),
  //     headers: response.headers(),
  //   }, {
  //     status: 403
  //   })
  // }
  // if (!response || !response?.ok()) {
  //   if (response) {
  //     console.log(response.status(), response.headers())
  //   }
  //   return null;
  // }

  const screenshot = await page.screenshot({
    optimizeForSpeed: true,
    type: result.data.format,
    quality: result.data.quality,
    encoding: "binary",
    fullPage: false,
    captureBeyondViewport: false,
    clip: {
      x: 0,
      y: 0,
      width: result.data.width,
      height: result.data.height,
    },
  });

  await browser.close();

  return new Response(screenshot, {
    status: 200,
    headers: {
      "content-type": "image/" + result.data.format,
    },
  });
};
