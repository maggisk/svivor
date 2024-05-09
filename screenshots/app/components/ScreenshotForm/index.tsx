import { Button, Select, TextField } from "@radix-ui/themes";

export default function ScreenshotForm() {
  return (
    <form method="get" action="/screenshot" target="_blank">
      <TextField.Root type="url" name="url" placeholder="url" />

      <Select.Root name="format" size="2">
        <Select.Content>
          {["png", "webp", "jpeg"].map((format) => (
            <Select.Item key={format} value={format}>
              {format}
            </Select.Item>
          ))}
        </Select.Content>
      </Select.Root>

      <TextField.Root type="number" name="width" />
      <TextField.Root type="number" name="height" />

      <Select.Root name="wait">
        <Select.Content>
          {["load", "domcontentloaded", "networkidle0", "networkidle2"].map(
            (wait) => (
              <Select.Item key={wait} value={wait}>
                {wait}
              </Select.Item>
            )
          )}
        </Select.Content>
      </Select.Root>

      <Button type="submit">Submit</Button>
    </form>
  );
}
