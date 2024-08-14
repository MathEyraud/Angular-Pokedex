import { IBaseSprites, IBlackWhiteSprites, ICrystalSprites, IDreamWorldSprites, IExtendedSprites, IFrontSprites, IFullSprites, IGenerationIIISprites, IGenerationIISprites, IGenerationISprites, IGenerationIVSprites, IGenerationVIIISprites, IGenerationVIISprites, IGenerationVISprites, IGenerationVSprites, IGoldSprites, IHomeSprites, IIconsSprites, IOfficialArtworkSprites, IOtherSprites, IPokemonSprites, IRedBlueSprites, IShowdownSprites, ISilverSprites, IVersions, IYellowSprites } from "../../../interfaces/pokemon/pokemon-sprites";
import { CrystalSprites, DreamWorldSprites, FrontSprites, GenerationIIISprites, GenerationIISprites, GenerationISprites, GenerationIVSprites, GenerationVIIISprites, GenerationVIISprites, GenerationVISprites, GenerationVSprites, GoldSprites, HomeSprites, IconsSprites, FullSprites, OfficialArtworkSprites, OtherSprites, PokemonSprites, RedBlueSprites, ShowdownSprites, SilverSprites, Versions, YellowSprites, BlackWhiteSprites, BaseSprites, ExtendedSprites } from "../../../models/pokemon/pokemon/pokemon-sprites";

export class PokemonSpritesMapper {

  static mapToPokemonSprites(data: IPokemonSprites): PokemonSprites {

    return new PokemonSprites(
      data.back_default,
      data.back_female,
      data.back_shiny,
      data.back_shiny_female,
      data.front_default,
      data.front_female,
      data.front_shiny,
      data.front_shiny_female,
      PokemonSpritesMapper.mapToOtherSprites(data.other),
      PokemonSpritesMapper.mapToVersions(data.versions)
    );
  }

  static mapToOtherSprites(data: IOtherSprites): OtherSprites {
    return new OtherSprites(
      PokemonSpritesMapper.mapToDreamWorldSprites(data.dream_world),
      PokemonSpritesMapper.mapToHomeSprites(data.home),
      PokemonSpritesMapper.mapToOfficialArtworkSprites(data['official-artwork']),
      PokemonSpritesMapper.mapToShowdownSprites(data.showdown)
    );
  }

  static mapToDreamWorldSprites(data: IDreamWorldSprites): DreamWorldSprites {
    return new DreamWorldSprites(data.front_default, data.front_female);
  }

  static mapToHomeSprites(data: IHomeSprites): HomeSprites {
    return new HomeSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.front_female,
      data.front_shiny_female,
      data.back_female,
      data.back_shiny_female
    );
  }

  static mapToOfficialArtworkSprites(data: IOfficialArtworkSprites): OfficialArtworkSprites {
    return new OfficialArtworkSprites(data.front_default, data.front_shiny);
  }

  static mapToShowdownSprites(data: IShowdownSprites): ShowdownSprites {
    return new ShowdownSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.front_female,
      data.front_shiny_female,
      data.back_female,
      data.back_shiny_female
    );
  }

  static mapToVersions(data: IVersions): Versions {
    return new Versions(
      PokemonSpritesMapper.mapToGenerationISprites(data['generation-i']),
      PokemonSpritesMapper.mapToGenerationIISprites(data['generation-ii']),
      PokemonSpritesMapper.mapToGenerationIIISprites(data['generation-iii']),
      PokemonSpritesMapper.mapToGenerationIVSprites(data['generation-iv']),
      PokemonSpritesMapper.mapToGenerationVSprites(data['generation-v']),
      PokemonSpritesMapper.mapToGenerationVISprites(data['generation-vi']),
      PokemonSpritesMapper.mapToGenerationVIISprites(data['generation-vii']),
      PokemonSpritesMapper.mapToGenerationVIIISprites(data['generation-viii'])
    );
  }

  static mapToGenerationISprites(data: IGenerationISprites): GenerationISprites {
    return new GenerationISprites(
      PokemonSpritesMapper.mapToRedBlueSprites(data['red-blue']),
      PokemonSpritesMapper.mapToYellowSprites(data.yellow)
    );
  }

  static mapToRedBlueSprites(data: IRedBlueSprites): RedBlueSprites {
    return new RedBlueSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.back_gray,
      data.back_transparent,
      data.front_gray,
      data.front_transparent
    );
  }

  static mapToYellowSprites(data: IYellowSprites): YellowSprites {
    return new YellowSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.back_gray,
      data.back_transparent,
      data.front_gray,
      data.front_transparent
    );
  }

  static mapToGenerationIISprites(data: IGenerationIISprites): GenerationIISprites {
    return new GenerationIISprites(
      PokemonSpritesMapper.mapToCrystalSprites(data.crystal),
      PokemonSpritesMapper.mapToGoldSprites(data.gold),
      PokemonSpritesMapper.mapToSilverSprites(data.silver)
    );
  }

  static mapToCrystalSprites(data: ICrystalSprites): CrystalSprites {
    return new CrystalSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.back_shiny_transparent,
      data.back_transparent,
      data.front_shiny_transparent,
      data.front_transparent
    );
  }

  static mapToGoldSprites(data: IGoldSprites): GoldSprites {
    return new GoldSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.front_transparent
    );
  }

  static mapToSilverSprites(data: ISilverSprites): SilverSprites {
    return new SilverSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.front_transparent
    );
  }

  static mapToGenerationIIISprites(data: IGenerationIIISprites): GenerationIIISprites {
    return new GenerationIIISprites(
      PokemonSpritesMapper.mapToEmeraldSprites(data.emerald),
      PokemonSpritesMapper.mapToFireredLeafgreenSprites(data['firered-leafgreen']),
      PokemonSpritesMapper.mapToRubySapphireSprites(data['ruby-sapphire'])
    );
  }

  static mapToEmeraldSprites(data: IBaseSprites): BaseSprites {
    return new BaseSprites(data.front_default, data.front_shiny);
  }

  static mapToFireredLeafgreenSprites(data: IExtendedSprites): ExtendedSprites {
    return new ExtendedSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny
    );
  }

  static mapToRubySapphireSprites(data: IExtendedSprites): ExtendedSprites {
    return new ExtendedSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny
    );
  }

  static mapToGenerationIVSprites(data: IGenerationIVSprites): GenerationIVSprites {
    return new GenerationIVSprites(
      PokemonSpritesMapper.mapToFullSprites(data['diamond-pearl']),
      PokemonSpritesMapper.mapToFullSprites(data['heartgold-soulsilver']),
      PokemonSpritesMapper.mapToFullSprites(data.platinum)
    );
  }

  static mapToFullSprites(data: IFullSprites): FullSprites {
    return new FullSprites(
      data.front_default,
      data.front_shiny,
      data.back_default,
      data.back_shiny,
      data.front_female,
      data.front_shiny_female,
      data.back_female,
      data.back_shiny_female
    );
  }

  static mapToGenerationVSprites(data: IGenerationVSprites): GenerationVSprites {
    return new GenerationVSprites(
      PokemonSpritesMapper.mapToBackWhiteSprites(data["black-white"]),
    );
  }

  static mapToBackWhiteSprites(data: IBlackWhiteSprites): BlackWhiteSprites {
    return new BlackWhiteSprites(
      data.front_default,     
      data.front_shiny,       
      data.back_default,      
      data.back_shiny,        
      data.front_female,      
      data.front_shiny_female,
      data.back_female,       
      data.back_shiny_female, 
      PokemonSpritesMapper.mapToFullSprites(data.animated),  
    );
  }

  

  static mapToGenerationVISprites(data: IGenerationVISprites): GenerationVISprites {
    return new GenerationVISprites(
      PokemonSpritesMapper.mapToFrontSprites(data['omegaruby-alphasapphire']),
      PokemonSpritesMapper.mapToFrontSprites(data['x-y'])
    );
  }

  static mapToFrontSprites(data: IFrontSprites): FrontSprites {
    return new FrontSprites(
      data.front_default,
      data.front_female,
      data.front_shiny,
      data.front_shiny_female
    );
  }

  static mapToGenerationVIISprites(data: IGenerationVIISprites): GenerationVIISprites {
    return new GenerationVIISprites(
      PokemonSpritesMapper.mapToIconsSprites(data.icons),
      PokemonSpritesMapper.mapToFrontSprites(data['ultra-sun-ultra-moon'])
    );
  }

  static mapToIconsSprites(data: IIconsSprites): IconsSprites {
    return new IconsSprites(data.front_default, data.front_female);
  }

  static mapToGenerationVIIISprites(data: IGenerationVIIISprites): GenerationVIIISprites {
    return new GenerationVIIISprites(PokemonSpritesMapper.mapToIconsSprites(data.icons));
  }
}
