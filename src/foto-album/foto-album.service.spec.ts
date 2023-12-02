import { Test, TestingModule } from '@nestjs/testing';
import { FotoAlbumService } from '../foto-album/foto-album.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumEntity } from '../album/album.entity';


describe('FotoAlbumService', () => {
  let service: FotoAlbumService;
  let fotoRepository: Repository<FotoEntity>;
  let albumRepository: Repository<AlbumEntity>;


  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoAlbumService],
    }).compile();

    service = module.get<FotoAlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
