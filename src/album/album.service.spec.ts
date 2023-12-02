import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/album.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';

describe('AlbumServiceService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
