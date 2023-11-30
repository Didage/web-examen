/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';

import { faker } from '@faker-js/faker';
import { FotoService } from './foto.service';
import { FotoEntity } from './foto.entity';

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
    const fotoValida: FotoEntity = await repository.save({
      iso: 1600,
      velObturacion: 250,
      apertura: 4,
      fecha: "30-11-23",
    });

    fotosList.push(fotoValida);

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
      fotoId: faker.lorem.sentence(),
      iso: 1600,
      velObturacion: 250,
      apertura: 4,
      fecha: "30-11-23",
      usuario: faker.lorem.sentence(),
      album: faker.lorem.sentence(),
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

  it('update should throw an exception for an invalid foto', async () => {
    const foto: FotoEntity = {
      fotoId: faker.lorem.sentence(),
      iso: 100,
      velObturacion: 50,
      apertura: 4,
      fecha: "30-11-23",
      usuario: faker.lorem.sentence(),
      album: faker.lorem.sentence(),
    };
    await expect(() => service.create(foto)).rejects.toHaveProperty(
      'message',
      'Valores de exposición no válidos.',
    );
  });
});