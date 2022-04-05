import { Module } from '@nestjs/common';
import { AwsSQSService } from './aws-sqs.service';
import { UserModule } from 'src/core/user/user.module';

@Module({
  imports: [UserModule],
  providers: [AwsSQSService],
  exports: [AwsSQSService],
})
export class AwsModule {}
