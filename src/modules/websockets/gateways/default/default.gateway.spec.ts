import { Test, TestingModule } from '@nestjs/testing';
import { DefaultGateway } from './default.gateway';

describe('DefaultGateway', () => {
  let gateway: DefaultGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DefaultGateway],
    }).compile();

    gateway = module.get<DefaultGateway>(DefaultGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
