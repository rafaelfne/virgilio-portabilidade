import { Entry } from "@napi-rs/keyring";
import { parse } from "yaml";
import os from "node:os";

const service = "virgilio-spike";
const account = "teste";
const value = `valor-${Date.now()}`;
const report: Record<string, unknown> = { platform: `${os.platform()}-${os.arch()}`, runtime: typeof (globalThis as any).Bun !== "undefined" ? "bun" : `node ${process.version}` };
report.yaml = parse("a: 1\nb: [x, y]");
try {
  const e = new Entry(service, account);
  e.setPassword(value);
  report.keyringRead = e.getPassword() === value ? "ok" : "diferente";
  e.deletePassword();
  report.keyringDelete = "ok";
} catch (err) {
  report.keyringError = String((err as Error).message || err).slice(0, 200);
}
console.log(JSON.stringify(report));
