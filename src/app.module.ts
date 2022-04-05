import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import config from './config/config';
import { UserModule } from './core/user/user.module';
import { VoteModule } from './core/vote/vote.module';
import { AwsModule } from './providers/aws/aws.module';
import { AwsSdkModule } from 'nest-aws-sdk';
import { SQS } from 'aws-sdk';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongooseModule.forRoot(config().database.uri),
    UserModule,
    VoteModule,
    AwsModule,
    AwsSdkModule.forRootAsync({
      defaultServiceOptions: {
        useValue: {
          ...config().aws.config.defaultServiceOptions,
        },
      },
      services: [SQS],
    }),
  ],
})
export class AppModule {}
