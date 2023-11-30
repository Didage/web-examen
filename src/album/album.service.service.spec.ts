import { Test, TestingModule } from '@nestjs/testing';
import { AlbumServiceService } from './album.service.service';

describe('AlbumServiceService', () => {
  let service: AlbumServiceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [AlbumServiceService],
    }).compile();

    service = module.get<AlbumServiceService>(AlbumServiceService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
