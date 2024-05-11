import { Button, Label, Select, TextInput } from "flowbite-react";
import { useState } from "react";
import { MdOutlineKeyboardArrowRight } from "react-icons/md";
import cn from "classnames";

const Field = ({
  label,
  caption,
  children,
}: {
  label: string | null;
  caption?: React.ReactNode;
  children: React.ReactNode;
}) => {
  return (
    <div className="flex flex-col space-y-2">
      <div className="flex items-center uppercase">
        {label ? <Label>{label}</Label> : null}
      </div>
      <div className="flex flex-1">{children}</div>
      {caption ? <p className="text-gray-500 text-sm">{caption}</p> : null}
    </div>
  );
};

export default function ScreenshotForm() {
  const [advanced, setAdvanced] = useState(false);

  return (
    <form
      method="get"
      action="/screenshot"
      target="_blank"
      className="w-full max-w-lg space-y-5"
    >
      <input type="hidden" name="api-key" value="anonymous" />

      <Field label="Url">
        <TextInput
          type="url"
          name="url"
          placeholder="url"
          defaultValue="https://www.svivor.net"
          className="w-full"
        />
      </Field>

      <Field label="Image format">
        <Select name="format" className="w-full">
          {["jpeg", "webp", "png"].map((format) => (
            <option key={format} value={format}>
              {format}
            </option>
          ))}
        </Select>
      </Field>

      <Field label="Width">
        <TextInput
          type="number"
          name="width"
          defaultValue={1000}
          className="w-full"
        />
      </Field>

      <Field label="Height">
        <TextInput
          type="number"
          name="height"
          defaultValue={1000}
          className="w-full"
        />
      </Field>

      <Field
        label="Wait strategy"
        caption={
          <>
            as documented by{" "}
            <a
              href="https://cloudlayer.io/blog/puppeteer-waituntil-options/#dealingwithcontentloadingchallenges"
              target="_blank"
              rel="noreferrer"
              className="underline"
            >
              puppeteer
            </a>
          </>
        }
      >
        <Select name="wait" defaultValue="networkidle0" className="w-full">
          {["load", "domcontentloaded", "networkidle0", "networkidle2"].map(
            (wait) => (
              <option key={wait} value={wait}>
                {wait}
              </option>
            )
          )}
        </Select>
      </Field>

      <button
        type="button"
        className="flex items-center underline max-w-min"
        onClick={() => setAdvanced(!advanced)}
      >
        <MdOutlineKeyboardArrowRight
          className={cn("h-5 w-5 transition-all", advanced && "rotate-90")}
        />
        Advanced
      </button>

      <div className={cn(!advanced && "hidden space-y-5")}>
        <Field label="Timeout" caption="maximum of 30 seconds">
          <TextInput
            defaultValue={20}
            type="number"
            name="timeout"
            placeholder="Timeout"
            className="w-full"
          />
        </Field>
      </div>

      <Field label={null}>
        <Button type="submit" fullSized>
          Submit
        </Button>
      </Field>
    </form>
  );
}
