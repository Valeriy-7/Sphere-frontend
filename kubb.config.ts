import { defineConfig } from "@kubb/core";
import { pluginClient } from "@kubb/plugin-client";
import { createReactGenerator, pluginOas } from "@kubb/plugin-oas";
import { pluginReactQuery } from "@kubb/plugin-react-query";
import { pluginTs } from "@kubb/plugin-ts";
import { pluginZod } from "@kubb/plugin-zod";

import { useOperationManager } from "@kubb/plugin-oas/hooks";
const clientOperationGenerator = createReactGenerator({
  name: "client-operation",
  Operation({ operation }) {
    const { getName, getFile } = useOperationManager();

    const client = {
      name: getName(operation, { type: "function" }),
      file: getFile(operation),
    };
    console.log(operation.getOperationId());
    //console.log(operation.method + operation.path);
    //console.log(operation.method);
    return null;
  },
});

export default defineConfig({
  input: {
    path: "http://188.225.18.179:3000/api-json",
  },
  output: {
    path: "./kubb-gen",
    clean: true,
    extension: undefined,
    barrelType: "all",
  },
  hooks: {},
  plugins: [
    pluginOas({
      generators: [],
    }),
    pluginTs({
      transformers: {
        name: (name) => `${name.replace("Controller", "")}Type`,
      },
      group: {
        type: "path",
      },
    }),
    /*    pluginClient({
      transformers: {
        name: (name) => `${name.replace("Controller", "")}Api`,
      },
      importPath: "@/modules/auth/axios-client",

      group: {
        type: "path",
      },
      output: {
        path: "api",
      },
    }),*/
    pluginReactQuery({
      transformers: {
        name: (name) => `${name.replace("Controller", "")}`,
      },
      group: {
        type: "path",
      },
      client: {
        importPath: "@/modules/auth/axios-client",
      },
    }),
    pluginZod({
      //include: [{ type: "path", pattern: /cabinets/ }],
      transformers: {
        name: (name) => `${name.replace("Controller", "")}`,
      },
      group: {
        type: "path",
      },
    }),
  ],
});
