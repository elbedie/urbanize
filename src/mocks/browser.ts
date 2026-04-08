// In MSW v2+ the browser worker factory lives in the dedicated entry point
// to avoid bundling server/node-specific code.
import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);
