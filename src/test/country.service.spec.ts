import { Test, TestingModule } from '@nestjs/testing';
import { getModelToken } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CountryService } from '../country/country.service';
import { Country } from '../country/schemas/country.schema';

describe('CountryService', () => {
  let service: CountryService;
  let model: Model<Country>;

  const mockSave = jest.fn();

  const mockCountry = {
    _id: 'country123',
    name: 'France',
    isoCode: 'FR',
    isActive: true,
    currencies: [
      { code: 'EUR', name: 'Euro', isActive: true }
    ],
    save: mockSave
  };

  const countryArray = [mockCountry];

  const mockModel = {
    create: jest.fn().mockResolvedValue(mockCountry),
    find: jest.fn().mockResolvedValue(countryArray),
    findByIdAndUpdate: jest.fn().mockResolvedValue(mockCountry),
    findById: jest.fn().mockResolvedValue(mockCountry),
  };

  beforeEach(async () => {
    mockSave.mockResolvedValue(mockCountry);

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CountryService,
        {
          provide: getModelToken(Country.name),
          useValue: mockModel,
        },
      ],
    }).compile();

    service = module.get<CountryService>(CountryService);
    model = module.get<Model<Country>>(getModelToken(Country.name));
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a country', async () => {
    const result = await service.create(mockCountry);
    expect(result).toEqual(mockCountry);
    expect(mockModel.create).toHaveBeenCalled();
  });

  it('should get all countries', async () => {
    const result = await service.findAll();
    expect(result).toEqual(countryArray);
    expect(mockModel.find).toHaveBeenCalled();
  });

  it('should update country status', async () => {
    const result = await service.updateStatus('country123', false);
    expect(result).toEqual(mockCountry);
    expect(mockModel.findByIdAndUpdate).toHaveBeenCalledWith('country123', { isActive: false }, { new: true });
  });

  it('should update currency status', async () => {
    const result = await service.updateCurrencyStatus('country123', 'EUR', false);
    expect(result).toEqual(mockCountry);
    expect(mockModel.findById).toHaveBeenCalled();
    expect(mockSave).toHaveBeenCalled();
  });
});
