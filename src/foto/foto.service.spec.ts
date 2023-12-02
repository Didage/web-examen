/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';


// import { faker } from '@faker-js/faker';
import { FotoService } from '../foto/foto.service';
import { FotoEntity } from '../foto/foto.entity';
import { UsuarioEntity } from '../usuario/usuario.entity';
import { AlbumEntity } from '../album/album.entity';

describe('FotoService', () => {
  let service: FotoService;
  let repository: Repository<FotoEntity>;
  let fotosList: FotoEntity[];

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [FotoService],
    }).compile();

    service = module.get<FotoService>(FotoService);
    repository = module.get<Repository<FotoEntity>>(
      getRepositoryToken(FotoEntity),
    );
    await seedDatabase();
  });

  const seedDatabase = async () => {
    repository.clear();
    fotosList = [];

    // const album: AlbumEntity = {
    //   albumId: "ALM-ID-01",
    //   fechaInicio: new Date("01-11-23"),
    //   fechaFin: new Date("30-12-23"),
    //   titulo: "Autogol",
    //   fotos:[]
    // }

    const fotoValida: FotoEntity = await repository.save({
      iso: 1600,
      velObturacion: 250,
      apertura: 4,
      fecha: "30-11-23",
      album: null,
    });

    fotosList.push(fotoValida);
    repository.save(fotoValida);
  };

  it('findAll should return all fotos', async () => {
    const fotos: FotoEntity[] = await service.findAll();
    expect(fotos).not.toBeNull();
    expect(fotos).toHaveLength(fotosList.length);
  });

  it('findOne should return a foto by id', async () => {
    const storedFoto: FotoEntity = fotosList[0];
    const foto: FotoEntity = await service.findOne(
      storedFoto.fotoId,
    );
    expect(foto).not.toBeNull();
    expect(foto.iso).toEqual(storedFoto.iso);
    expect(foto.velObturacion).toEqual(storedFoto.velObturacion);
    expect(foto.apertura).toEqual(storedFoto.apertura);
  });


  it('create should return a new foto', async () => {
    const foto: FotoEntity = {
      fotoId: "FT_ID-01",
      iso: 1600,
      velObturacion: 200,
      apertura: 30,
      fecha: new Date("30-11-23"),
      usuario: null,
      album: null,
    };

    const newFoto: FotoEntity = await service.create(foto);
    expect(newFoto).not.toBeNull();

    const storedFoto: FotoEntity = await repository.findOne({
      where: { fotoId: newFoto.fotoId },
    });
    expect(storedFoto).not.toBeNull();
    expect(storedFoto.iso).toEqual(newFoto.iso);
    expect(storedFoto.apertura).toEqual(newFoto.apertura);
    expect(storedFoto.velObturacion).toEqual(newFoto.velObturacion);
  });

  it('create should throw an exception for an invalid foto', async () => {
    const usuario: UsuarioEntity = {
      usuarioId: "USR-ID-01",
      nombre: "Jhon Doe",
      telefono: "+57-3451234567",
      redSocial:null,
      fotos: []
    }

    const album: AlbumEntity = {
      albumId: "ALM-ID-01",
      fechaInicio: new Date("01-11-23"),
      fechaFin: new Date("30-12-23"),
      titulo: "Autogol",
      fotos:[]
    }
    const foto: FotoEntity = {
      fotoId: "FT_ID-02",
      iso: 100,
      velObturacion: 50,
      apertura: 4,
      fecha: new Date("30-11-23"),
      usuario: usuario,
      album: album,
    };
    await expect(() => service.create(foto)).rejects.toHaveProperty(
      'message',
      'Valores de exposición no válidos.',
    );
  });

  it('delete should remove a foto', async () => {
    const foto: FotoEntity = fotosList[0];
    await service.delete(foto.fotoId);
    const deletedFoto: FotoEntity = await repository.findOne({ where: { fotoId: foto.fotoId } })
    expect(deletedFoto).toBeNull();
  });

  it('delete should throw an exception for an invalid foto', async () => {
    await expect(() => service.delete("0")).rejects.toHaveProperty("message", "La foto no fue encontrada.")
  });
});