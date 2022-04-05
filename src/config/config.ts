export default () => {
  return {
    database: {
      uri: process.env.DB_URI,
    },
    aws: {
      services: {
        sqs: { queueUrl: process.env.AWS_QUEUE_URL },
        s3: { bucketUrl: process.env.AWS_BUCKET_URL },
      },
      config: {
        defaultServiceOptions: {
          region: process.env.AWS_REGION,
          credentials: {
            accessKeyId: process.env.AWS_ID,
            secretAccessKey: process.env.AWS_SECRET,
          },
        },
      },
    },
  };
};
