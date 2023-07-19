import { Test, TestingModule } from '@nestjs/testing';
import { DiscussionsGateway } from './discussions.gateway';

describe('DiscussionsGateway', () => {
  let gateway: DiscussionsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DiscussionsGateway],
    }).compile();

    gateway = module.get<DiscussionsGateway>(DiscussionsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
