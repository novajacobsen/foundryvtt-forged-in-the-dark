Hooks.on("quenchReady", (quench: any) => {
    quench.registerBatch("quench.examples.basic-pass", (context: any) => {
        const { describe, it, assert } = context;

        describe("Passing Suite", () => {
            it("Passing Test", () => {
                assert.equal(2, 3)
            });
        });
    }, { displayName: "QUENCH: Basic Passing Test" });
})