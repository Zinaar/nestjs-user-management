import { OnModuleInit, Injectable } from '@nestjs/common';
import { InjectAwsService } from 'nest-aws-sdk';
import { SQS } from 'aws-sdk';
import config from 'src/config/config';
import { UserService } from 'src/core/user/user.service';

@Injectable()
export class AwsSQSService implements OnModuleInit {
  queueUrl: string;
  bucketUrl: string;
  constructor(
    @InjectAwsService(SQS) private readonly sqs: SQS,
    private readonly userService: UserService,
  ) {
    this.queueUrl = config().aws.services.sqs.queueUrl;
    this.bucketUrl = config().aws.services.s3.bucketUrl;
  }
  async awsQueue() {
    const response = await this.sqs
      .receiveMessage({
        WaitTimeSeconds: 5,
        QueueUrl: this.queueUrl,
      })
      .promise();
    if (response.Messages) {
      response.Messages.map(async (msg) => {
        const body = JSON.parse(msg.Body);
        if (body.Records) {
          const username = body.Records[0].s3.object.key;
          const url = this.bucketUrl + username;

          await Promise.all([
            this.userService.addAvatarImage(username, url),
            this.sqs
              .deleteMessage({
                QueueUrl: this.queueUrl,
                ReceiptHandle: msg.ReceiptHandle,
              })
              .promise(),
          ]);
        }
      });
    }
  }

  onModuleInit() {
    setInterval(async () => {
      await this.awsQueue();
    }, 5000);
  }
}
