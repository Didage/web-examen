import { Test, TestingModule } from '@nestjs/testing';
import { RedSocial } from '../redsocial/redsocial.service';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';


describe('RedsocialService', () => {
  let service: RedSocialService;
  let repository: Repository<RedSocialEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [RedSocialService],
    }).compile();

    service = module.get<RedSocialService>(RedSocialService);
    repository = module.get<Repository<RedSocialEntity>>(
      getRepositoryToken(RedSocialEntity),
    );
    await seedDatabase();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
