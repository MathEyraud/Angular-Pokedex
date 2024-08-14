// Interface principale
export interface IPokemonSprites {
  back_default        : string | null;
  back_female         : string | null;
  back_shiny          : string | null;
  back_shiny_female   : string | null;
  front_default       : string | null;
  front_female        : string | null;
  front_shiny         : string | null;
  front_shiny_female  : string | null;
  other               : IOtherSprites;
  versions            : IVersions;
}

// Interfaces de base
export interface IBaseSprites {
  front_default : string | null;
  front_shiny   : string | null;
}

export interface IExtendedSprites extends IBaseSprites {
  back_default  : string | null;
  back_shiny    : string | null;
}

export interface IFullSprites extends IExtendedSprites {
  front_female        : string | null;
  front_shiny_female  : string | null;
  back_female         : string | null;
  back_shiny_female   : string | null;
}

export interface IOtherSprites {
  dream_world: IDreamWorldSprites;
  home: IHomeSprites;
  'official-artwork': IOfficialArtworkSprites;
  showdown: IShowdownSprites;
}

export interface IDreamWorldSprites{
  front_default : string | null;
  front_female  : string | null;
}

export interface IHomeSprites extends IFullSprites {}
export interface IOfficialArtworkSprites extends IBaseSprites {}
export interface IShowdownSprites extends IFullSprites {}

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





export interface IGenerationISprites{
  'red-blue': IRedBlueSprites;
  yellow: IYellowSprites;
}

export interface IRedBlueSprites extends IExtendedSprites {
  back_gray           : string | null;
  back_transparent    : string | null;
  front_gray          : string | null;
  front_transparent   : string | null;
}

export interface IYellowSprites extends IRedBlueSprites {}





export interface IGenerationIISprites {
  crystal : ICrystalSprites;
  gold    : IGoldSprites;
  silver  : ISilverSprites;
}

export interface ICrystalSprites extends IExtendedSprites {
  back_shiny_transparent    : string | null;
  back_transparent          : string | null;
  front_shiny_transparent   : string | null;
  front_transparent         : string | null;
}

export interface IGoldSilverSprites extends IExtendedSprites {
  front_transparent: string | null;
}

export interface IGoldSprites extends IGoldSilverSprites {}
export interface ISilverSprites extends IGoldSilverSprites {}





export interface IGenerationIIISprites {
  emerald             : IBaseSprites;
  'firered-leafgreen' : IExtendedSprites;
  'ruby-sapphire'     : IExtendedSprites;
}





export interface IGenerationIVSprites {
  'diamond-pearl'       : IFullSprites;
  'heartgold-soulsilver': IFullSprites;
  platinum              : IFullSprites;
}





export interface IGenerationVSprites {
  'black-white': IBlackWhiteSprites;
}

export interface IBlackWhiteSprites extends IFullSprites {
  animated: IFullSprites;
}





export interface IGenerationVISprites {
  'omegaruby-alphasapphire': IFrontSprites;
  'x-y': IFrontSprites;
}

export interface IFrontSprites {
  front_default       : string | null;
  front_female        : string | null;
  front_shiny         : string | null;
  front_shiny_female  : string | null;
}





export interface IGenerationVIISprites {
  icons: IIconsSprites;
  'ultra-sun-ultra-moon': IFrontSprites;
}

export interface IIconsSprites {
  front_default : string | null;
  front_female  : string | null;
}





export interface IGenerationVIIISprites {
  icons: IIconsSprites;
}