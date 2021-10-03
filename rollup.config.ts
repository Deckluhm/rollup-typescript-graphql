import { defineConfig } from "rollup";
import pkg from "./package.json";
import runPlugin from "@rollup/plugin-run";
import commonJSPlugin from "@rollup/plugin-commonjs";
import nodeResolvePlugin from "@rollup/plugin-node-resolve";
import jsonPlugin from "@rollup/plugin-json";
import graphQLPlugin from "@rollup/plugin-graphql";
import typescriptPlugin from "@rollup/plugin-typescript";

export default defineConfig({
  input: "main.ts",
  output: {
    file: pkg.module,
    format: "esm",
    sourcemap: true,
  },
  plugins: [
    commonJSPlugin(),
    nodeResolvePlugin({ preferBuiltins: true }),
    jsonPlugin(),
    graphQLPlugin(),
    typescriptPlugin(),
    runPlugin({ execArgv: ["-r", "source-map-support/register"] }),
  ],
  onwarn(warning, warn) {
    if (warning.code && ["EVAL", "CIRCULAR_DEPENDENCY"].includes(warning.code))
      return;
    warn(warning);
  },
});
