/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { FotoAlbumService } from '../foto-album/foto-album.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { FotoEntity } from '../foto/foto.entity';
import { AlbumEntity } from '../album/album.entity';


describe('FotoAlbumService', () => {
  let service: FotoAlbumService;
  let albumRepository: Repository<AlbumEntity>;
  let fotoRepository: Repository<FotoEntity>;
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  let album: AlbumEntity;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoAlbumService],
    }).compile();

    service = module.get<FotoAlbumService>(FotoAlbumService);
    albumRepository = module.get<Repository<AlbumEntity>>(getRepositoryToken(AlbumEntity));
    fotoRepository = module.get<Repository<FotoEntity>>(getRepositoryToken(FotoEntity));

    await seedDatabase();
  });

  const seedDatabase = async () => {
    fotoRepository.clear();
    albumRepository.clear();

    fotosList = [];
    for(let i = 0; i < 5; i++){
        const foto: FotoEntity = await fotoRepository.save({
          fotoId: "FT_ID-01",
          iso: 1600,
          velObturacion: 200,
          apertura: 30,
          fecha: new Date("30-11-23"),
          usuario: null,
          album: null,
        })
        fotosList.push(foto);
    }

    album = await albumRepository.save({
      albumId: "ALM-ID-01",
      fechaInicio: new Date("01-11-23"),
      fechaFin: new Date("30-12-23"),
      titulo: "Autogol",
      fotos: fotosList
    })
  }

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('addFotoToAlbum should add a foto to a album', async () => {

    const newAlbum: AlbumEntity = await albumRepository.save({
      albumId: "ALM-ID-01",
      fechaInicio: new Date("01-11-23"),
      fechaFin: new Date("30-12-23"),
      titulo: "Autogol",
      fotos: []
    });
    albumRepository.save(newAlbum);
    const newFoto = await fotoRepository.save({
      fotoId: "FT_ID-02",
      iso: 6400,
      velObturacion: 200,
      apertura: 30,
      fecha: new Date("30-11-23"),
      usuario: null,
      album: null,
    });
    fotoRepository.save(newFoto);
    const result: AlbumEntity = await service.addFotoToAlbum(newAlbum.albumId, newFoto.fotoId);

    const storedFoto: FotoEntity = await fotoRepository.findOne({where: {fotoId: newFoto.fotoId}, relations: ['usuario','album']});
    const storedAlbum: AlbumEntity = await albumRepository.findOne({where: {albumId: newAlbum.albumId}, relations: ['fotos']});
    
    expect(result.fotos.length).toBe(1);
    expect(result.fotos[0]).not.toBeNull();
    expect(result.fotos[0].iso).toBe(newFoto.iso);
    expect(result.fotos[0].velObturacion).toBe(newFoto.velObturacion);
    expect(storedFoto.album.albumId).toEqual(storedFoto.album.albumId);
    expect(storedAlbum.fotos[0].fotoId).toEqual(storedFoto.fotoId);
  });

  it('addFotoToAlbum should thrown exception for an invalid foto', async () => {
    const newAlbum: AlbumEntity = await albumRepository.save({
      albumId: "ALM-ID-02",
      fechaInicio: new Date("01-11-23"),
      fechaFin: new Date("30-12-23"),
      titulo: "Autogol",
      fotos: []
    })

    await expect(() => service.addFotoToAlbum(newAlbum.albumId, "0")).rejects.toHaveProperty("message", "La foto especificada no existe.");
  });

  it('addFotoToAlbum should throw an exception for an invalid album', async () => {
    const newFoto = await fotoRepository.save({
      fotoId: "FT_ID-01",
      iso: 1600,
      velObturacion: 200,
      apertura: 30,
      fecha: new Date("30-11-23"),
      usuario: null,
      album: null,
    });
    await expect(() => service.addFotoToAlbum("0", newFoto.fotoId)).rejects.toHaveProperty("message", "El album especificado no existe.");
  });
});