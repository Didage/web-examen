/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { RedSocialService } from '../redsocial/redsocial.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { RedSocialEntity } from '../redsocial/redsocial.entity';


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
  const seedDatabase = async () => {
    repository.clear();
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new redSocial', async () => {
    const redSocial: RedSocialEntity = {
      redSocialId: "RS-ID-01",
      nombre: "facebook",
      slogan: "El mejor slogan del mundo es el escribes tú mismo!!!",
      usuarios: null,
    };

    const newRedSocial: RedSocialEntity = await service.create(redSocial);
    expect(newRedSocial).not.toBeNull();

    const storedRedSocial: RedSocialEntity = await repository.findOne({
      where: { redSocialId: newRedSocial.redSocialId },
    });
    expect(storedRedSocial).not.toBeNull();
    expect(storedRedSocial.nombre).toEqual(newRedSocial.nombre);
    expect(storedRedSocial.redSocialId).toEqual(newRedSocial.redSocialId);
  });
  it('create should fail due to business constraint', async () => {
    const redSocial: RedSocialEntity = {
      redSocialId: "RS-ID-01",
      nombre: "facebook",
      slogan: "Hola",
      usuarios: null,
    };

    await expect(() => service.create(redSocial)).rejects.toHaveProperty("message", "El slogan no puede ser vacío y debe tener al menos 20 caractéres.");
  });
});
