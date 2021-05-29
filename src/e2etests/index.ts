import * as rolls from "./rolls";

const test = [rolls];

Hooks.on("quenchReady", (quench: any) => {
  test.forEach((test) => {
    quench.registerBatch(test.name, test.fun, { displayName: test.name });
  });
});
