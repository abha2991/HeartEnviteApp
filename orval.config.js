const path = require("path");
module.exports = {
  "heart-envite": {
    input: "http://localhost:3001/api-json",
    output: {
      mode: "tags-split",
      workspace: "api",
      target: "generated.ts",
      schemas: "types",
      client: "react-query",
      mock: false,
      // clean: true,
      prettier: false,
      tslint: false,
      override: {
        mutator: {
          path: "./axios-instance.ts",
          name: "customInstance",
        },
      },
    },
    // hooks: {
    //   afterAllFilesWrite: ["eslint --fix --max-warnings=0", "prettier --write"],
    // },
  },
};
