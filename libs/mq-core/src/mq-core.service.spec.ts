import { Test, TestingModule } from '@nestjs/testing';
import { MqPublisher } from './mq.publisher';

describe('MqPublisher', () => {
  let service: MqPublisher;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MqPublisher],
    }).compile();

    service = module.get<MqPublisher>(MqPublisher);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
