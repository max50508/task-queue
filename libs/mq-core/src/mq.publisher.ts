import { AmqpConnection } from '@golevelup/nestjs-rabbitmq';
import { Injectable } from '@nestjs/common';
import { Options } from 'amqplib';

@Injectable()
export class MqPublisher {
  constructor(private readonly amqp: AmqpConnection) {}

  async mqPublish<T>(
    exchanges: string,
    routingKey: string,
    message: T,
    options?: Options.Publish,
  ): Promise<boolean> {
    return this.amqp.publish(exchanges, routingKey, message, options);
  }
}
