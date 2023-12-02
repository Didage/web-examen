/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { AlbumService } from '../album/album.service';
import { AlbumEntity } from '../album/album.entity';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { Repository } from 'typeorm';
import { FotoEntity } from '../foto/foto.entity';

describe('AlbumService', () => {
  let service: AlbumService;
  let repository: Repository<AlbumEntity>;
  let albumsList: AlbumEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [AlbumService],
    }).compile();

    service = module.get<AlbumService>(AlbumService);
    repository = module.get<Repository<AlbumEntity>>(
      getRepositoryToken(AlbumEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    albumsList = [];
    const foto: FotoEntity = {
      fotoId: "FT_ID-02",
      iso: 100,
      velObturacion: 50,
      apertura: 4,
      fecha: new Date("30-11-23"),
      usuario: null,
      album: null,
    };
    const album: AlbumEntity = await repository.save({
      albumId: "ALM-ID-01",
      fechaInicio: new Date("01-11-23"),
      fechaFin: new Date("30-12-23"),
      titulo: "Autogol",
      fotos:[foto]
    });

    albumsList.push(album);
    repository.save(album);
  };

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('findOne should return a album by id', async () => {
    const storedAlbum: AlbumEntity = albumsList[0];
    const album: AlbumEntity = await service.findOne(
      storedAlbum.albumId,
    );
    expect(album).not.toBeNull();
    expect(album.titulo).toEqual(storedAlbum.titulo);
    expect(album.albumId).toEqual(storedAlbum.albumId);
  });

  it('create should return a new album', async () => {
    const album: AlbumEntity = {
      albumId: "ALM-ID-02",
      fechaInicio: new Date("01-11-23"),
      fechaFin: new Date("30-12-23"),
      titulo: "Autogol",
      fotos:null
    };

    const newAlbum: AlbumEntity = await service.create(album);
    expect(newAlbum).not.toBeNull();

    const storedAlbum: AlbumEntity = await repository.findOne({
      where: { albumId: newAlbum.albumId },
    });
    expect(storedAlbum).not.toBeNull();
    expect(storedAlbum.titulo).toEqual(newAlbum.titulo);
    expect(storedAlbum.albumId).toEqual(newAlbum.albumId);
  });

  it('delete should remove a album', async () => {
    const album: AlbumEntity = albumsList[0];
    await service.delete(album.albumId);
    const deletedAlbum: AlbumEntity = await repository.findOne({ where: { albumId: album.albumId } })
    expect(deletedAlbum).toBeNull();
  });

  it('delete should throw an exception for an invalid album', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "El album no fue encontrado.")
  });
});
