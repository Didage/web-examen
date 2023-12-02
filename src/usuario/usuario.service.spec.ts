/* eslint-disable prettier/prettier */
import { Test, TestingModule } from '@nestjs/testing';
import { UsuarioService } from '../usuario/usuario.service';
import { Repository } from 'typeorm';
import { getRepositoryToken } from '@nestjs/typeorm';
import { TypeOrmTestingConfig } from '../shared/testing-utils/typeorm-testing-config';
import { UsuarioEntity } from '../usuario/usuario.entity';


describe('RedSocialService', () => {
  let service: UsuarioService;
  let repository: Repository<UsuarioEntity>;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [...TypeOrmTestingConfig()],
      providers: [UsuarioService],
    }).compile();

    service = module.get<UsuarioService>(UsuarioService);
    repository = module.get<Repository<UsuarioEntity>>(
      getRepositoryToken(UsuarioEntity),
    );
    await seedDatabase();
  });
  const seedDatabase = async () => {
    repository.clear();
  };
  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('create should return a new usuario', async () => {
    const usuario: UsuarioEntity = {
      usuarioId: "USR-ID-01",
      nombre: "Camilo",
      telefono: "3555644442",
      redSocial: null,
      fotos: []
    };

    const newUsuario: UsuarioEntity = await service.create(usuario);
    expect(newUsuario).not.toBeNull();

    const storedUsuario: UsuarioEntity = await repository.findOne({
      where: { usuarioId: newUsuario.usuarioId },
    });
    expect(storedUsuario).not.toBeNull();
    expect(storedUsuario.nombre).toEqual(newUsuario.nombre);
    expect(storedUsuario.usuarioId).toEqual(newUsuario.usuarioId);
  });
  it('create should fail due to business constraint', async () => {
    const usuario: UsuarioEntity = {
      usuarioId: "USR-ID-01",
      nombre: "Camilo",
      telefono: "+57-11113555644442",
      redSocial: null,
      fotos: []
    };

    await expect(() => service.create(usuario)).rejects.toHaveProperty("message", "El teléfono debe tener 10 números.");
  });
});
