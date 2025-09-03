/// <reference path="./.sst/platform/config.d.ts" />

export default $config({
  app(input) {
    return {
      name: "monorise-test",
      removal: input?.stage === "production" ? "retain" : "remove",
      protect: ["production"].includes(input?.stage),
      home: "aws",
    };
  },
  async run() {
    const { monorise } = await import("@monorise/sst");
    const { bus, api, table, alarmTopic } = new monorise.module.Core('test-app', {
      allowOrigins: ['http://localhost:3000'],
      slackWebhook: 'https://'
    });

    new sst.aws.Nextjs("ui-app", {
      dev: {
        autostart: true,
      },
      environment: {
        API_BASE_URL: api.url,
      },
      link: [table]
    });

    // new monorise.block.QFunction('test-function', {
    //   handler: '/src/test',
    //   alarmTopic,
    //   link: [table],
    // })
  },
});
