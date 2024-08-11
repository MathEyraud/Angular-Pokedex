// src/app/models/sprites.interface.ts
export interface IPokemonSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
  other: IOtherSprites;
  versions: IVersions;
}

export interface IOtherSprites {
  dream_world: IDreamWorldSprites;
  home: IHomeSprites;
  'official-artwork': IOfficialArtworkSprites;
  showdown: IShowdownSprites;
}

export interface IDreamWorldSprites {
  front_default: string;
  front_female: string | null;
}

export interface IHomeSprites {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IOfficialArtworkSprites {
  front_default: string;
  front_shiny: string;
}

export interface IShowdownSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IVersions {
  'generation-i': IGenerationISprites;
  'generation-ii': IGenerationIISprites;
  'generation-iii': IGenerationIIISprites;
  'generation-iv': IGenerationIVSprites;
  'generation-v': IGenerationVSprites;
  'generation-vi': IGenerationVISprites;
  'generation-vii': IGenerationVIISprites;
  'generation-viii': IGenerationVIIISprites;
}

export interface IGenerationISprites {
  'red-blue': IRedBlueSprites;
  yellow: IYellowSprites;
}

export interface IRedBlueSprites {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface IYellowSprites {
  back_default: string;
  back_gray: string;
  back_transparent: string;
  front_default: string;
  front_gray: string;
  front_transparent: string;
}

export interface IGenerationIISprites {
  crystal: ICrystalSprites;
  gold: IGoldSprites;
  silver: ISilverSprites;
}

export interface ICrystalSprites {
  back_default: string;
  back_shiny: string;
  back_shiny_transparent: string;
  back_transparent: string;
  front_default: string;
  front_shiny: string;
  front_shiny_transparent: string;
  front_transparent: string;
}

export interface IGoldSprites {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface ISilverSprites {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
  front_transparent: string;
}

export interface IGenerationIIISprites {
  emerald: IEmeraldSprites;
  'firered-leafgreen': IFireredLeafgreenSprites;
  'ruby-sapphire': IRubySapphireSprites;
}

export interface IEmeraldSprites {
  front_default: string;
  front_shiny: string;
}

export interface IFireredLeafgreenSprites {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface IRubySapphireSprites {
  back_default: string;
  back_shiny: string;
  front_default: string;
  front_shiny: string;
}

export interface IGenerationIVSprites {
  'diamond-pearl': IDiamondPearlSprites;
  'heartgold-soulsilver': IHeartgoldSoulsilverSprites;
  platinum: IPlatinumSprites;
}

export interface IDiamondPearlSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IHeartgoldSoulsilverSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IPlatinumSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IGenerationVSprites {
  animated: IAnimatedSprites;
  'black-white': IBlackWhiteSprites;
}

export interface IAnimatedSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IBlackWhiteSprites {
  back_default: string;
  back_female: string | null;
  back_shiny: string;
  back_shiny_female: string | null;
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IGenerationVISprites {
  'omegaruby-alphasapphire': IOmegarubyAlphasapphireSprites;
  'x-y': IXYSprites;
}

export interface IOmegarubyAlphasapphireSprites {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IXYSprites {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IGenerationVIISprites {
  icons: IIconsSprites;
  'ultra-sun-ultra-moon': IUltraSunUltraMoonSprites;
}

export interface IIconsSprites {
  front_default: string;
  front_female: string | null;
}

export interface IUltraSunUltraMoonSprites {
  front_default: string;
  front_female: string | null;
  front_shiny: string;
  front_shiny_female: string | null;
}

export interface IGenerationVIIISprites {
  icons: IIconsSprites;
}