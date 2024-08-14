// Classe principale
export class PokemonSprites {

    constructor(
        private back_default        : string | null,
        private back_female         : string | null,
        private back_shiny          : string | null,
        private back_shiny_female   : string | null,
        private front_default       : string | null,
        private front_female        : string | null,
        private front_shiny         : string | null,
        private front_shiny_female  : string | null,
        private other               : OtherSprites,
        private versions            : Versions
    ) {}

    // Getters et setters pour back_default
    get backDefault(): string | null { return this.back_default; }
    set backDefault(value: string | null) { this.back_default = value; }

    // Getters et setters pour back_female
    get backFemale(): string | null { return this.back_female; }
    set backFemale(value: string | null) { this.back_female = value; }

    // Getters et setters pour back_shiny
    get backShiny(): string | null { return this.back_shiny; }
    set backShiny(value: string | null) { this.back_shiny = value; }

    // Getters et setters pour back_shiny_female
    get backShinyFemale(): string | null { return this.back_shiny_female; }
    set backShinyFemale(value: string | null) { this.back_shiny_female = value; }

    // Getters et setters pour front_default
    get frontDefault(): string | null { return this.front_default; }
    set frontDefault(value: string | null) { this.front_default = value; }

    // Getters et setters pour front_female
    get frontFemale(): string | null { return this.front_female; }
    set frontFemale(value: string | null) { this.front_female = value; }

    // Getters et setters pour front_shiny
    get frontShiny(): string | null { return this.front_shiny; }
    set frontShiny(value: string | null) { this.front_shiny = value; }

    // Getters et setters pour front_shiny_female
    get frontShinyFemale(): string | null { return this.front_shiny_female; }
    set frontShinyFemale(value: string | null) { this.front_shiny_female = value; }

    // Getters et setters pour other
    get otherSprites(): OtherSprites { return this.other; }
    set otherSprites(value: OtherSprites) { this.other = value; }

    // Getters et setters pour versions
    get versionSprites(): Versions { return this.versions; }
    set versionSprites(value: Versions) { this.versions = value; }
}

// Classes de base
export class BaseSprites {
    
    constructor(
        private front_default   : string | null,
        private front_shiny     : string | null
    ) {}

    // Getters et setters pour front_default
    get frontDefault(): string | null { return this.front_default; }
    set frontDefault(value: string | null) { this.front_default = value; }

    // Getters et setters pour front_shiny
    get frontShiny(): string | null { return this.front_shiny; }
    set frontShiny(value: string | null) { this.front_shiny = value; }
}

export class ExtendedSprites extends BaseSprites {

    constructor(
        front_default           : string | null,
        front_shiny             : string | null,
        private back_default    : string | null,
        private back_shiny      : string | null
    ) {
        super(front_default, front_shiny);
    }

    // Getters et setters pour back_default
    get backDefault(): string | null { return this.back_default; }
    set backDefault(value: string | null) { this.back_default = value; }

    // Getters et setters pour back_shiny
    get backShiny(): string | null { return this.back_shiny; }
    set backShiny(value: string | null) { this.back_shiny = value; }
}

export class FullSprites extends ExtendedSprites {
    constructor(
        front_default               : string | null,
        front_shiny                 : string | null,
        back_default                : string | null,
        back_shiny                  : string | null,
        private front_female        : string | null,
        private front_shiny_female  : string | null,
        private back_female         : string | null,
        private back_shiny_female   : string | null
    ) {
        super(front_default, front_shiny, back_default, back_shiny);
    }

    // Getters et setters pour front_female
    get frontFemale(): string | null { return this.front_female; }
    set frontFemale(value: string | null) { this.front_female = value; }

    // Getters et setters pour front_shiny_female
    get frontShinyFemale(): string | null { return this.front_shiny_female; }
    set frontShinyFemale(value: string | null) { this.front_shiny_female = value; }

    // Getters et setters pour back_female
    get backFemale(): string | null { return this.back_female; }
    set backFemale(value: string | null) { this.back_female = value; }

    // Getters et setters pour back_shiny_female
    get backShinyFemale(): string | null { return this.back_shiny_female; }
    set backShinyFemale(value: string | null) { this.back_shiny_female = value; }
}

// Classes pour OtherSprites
export class OtherSprites {

    constructor(
        private dream_world: DreamWorldSprites,
        private home: HomeSprites,
        private official_artwork: OfficialArtworkSprites,
        private showdown: ShowdownSprites
    ) {}

    // Getters et setters pour dream_world
    get dreamWorld(): DreamWorldSprites { return this.dream_world; }
    set dreamWorld(value: DreamWorldSprites) { this.dream_world = value; }

    // Getters et setters pour home
    get homeSprites(): HomeSprites { return this.home; }
    set homeSprites(value: HomeSprites) { this.home = value; }

    // Getters et setters pour official_artwork
    get officialArtwork(): OfficialArtworkSprites { return this.official_artwork; }
    set officialArtwork(value: OfficialArtworkSprites) { this.official_artwork = value; }

    // Getters et setters pour showdown
    get showdownSprites(): ShowdownSprites { return this.showdown; }
    set showdownSprites(value: ShowdownSprites) { this.showdown = value; }
}

export class DreamWorldSprites {

    constructor(
        private front_default   : string | null,
        private front_female    : string | null
    ) {}

    // Getters et setters pour front_default
    get frontDefault(): string | null { return this.front_default; }
    set frontDefault(value: string | null) { this.front_default = value; }

    // Getters et setters pour front_female
    get frontFemale(): string | null { return this.front_female; }
    set frontFemale(value: string | null) { this.front_female = value; }
}

export class HomeSprites extends FullSprites {

    constructor(
        front_default       : string | null,
        front_shiny         : string | null,
        back_default        : string | null,
        back_shiny          : string | null,
        front_female        : string | null,
        front_shiny_female  : string | null,
        back_female         : string | null,
        back_shiny_female   : string | null
    ) {
        super(front_default, front_shiny, back_default, back_shiny, front_female, front_shiny_female, back_female, back_shiny_female);
    }
}

export class OfficialArtworkSprites extends BaseSprites {

    constructor(
        front_default   : string | null,
        front_shiny     : string | null
    ) {
        super(front_default, front_shiny);
    }
}

export class ShowdownSprites extends FullSprites {

    constructor(
        front_default       : string | null,
        front_shiny         : string | null,
        back_default        : string | null,
        back_shiny          : string | null,
        front_female        : string | null,
        front_shiny_female  : string | null,
        back_female         : string | null,
        back_shiny_female   : string | null
    ) {
        super(front_default, front_shiny, back_default, back_shiny, front_female, front_shiny_female, back_female, back_shiny_female);
    }
}

// Classes pour les versions
export class Versions {

    constructor(
        private generation_i: GenerationISprites,
        private generation_ii: GenerationIISprites,
        private generation_iii: GenerationIIISprites,
        private generation_iv: GenerationIVSprites,
        private generation_v: GenerationVSprites,
        private generation_vi: GenerationVISprites,
        private generation_vii: GenerationVIISprites,
        private generation_viii: GenerationVIIISprites
    ) {}

    // Getters et setters pour generation_i
    get generationI(): GenerationISprites { return this.generation_i; }
    set generationI(value: GenerationISprites) { this.generation_i = value; }

    // Getters et setters pour generation_ii
    get generationII(): GenerationIISprites { return this.generation_ii; }
    set generationII(value: GenerationIISprites) { this.generation_ii = value; }

    // Getters et setters pour generation_iii
    get generationIII(): GenerationIIISprites { return this.generation_iii; }
    set generationIII(value: GenerationIIISprites) { this.generation_iii = value; }

    // Getters et setters pour generation_iv
    get generationIV(): GenerationIVSprites { return this.generation_iv; }
    set generationIV(value: GenerationIVSprites) { this.generation_iv = value; }

    // Getters et setters pour generation_v
    get generationV(): GenerationVSprites { return this.generation_v; }
    set generationV(value: GenerationVSprites) { this.generation_v = value; }

    // Getters et setters pour generation_vi
    get generationVI(): GenerationVISprites { return this.generation_vi; }
    set generationVI(value: GenerationVISprites) { this.generation_vi = value; }

    // Getters et setters pour generation_vii
    get generationVII(): GenerationVIISprites { return this.generation_vii; }
    set generationVII(value: GenerationVIISprites) { this.generation_vii = value; }

    // Getters et setters pour generation_viii
    get generationVIII(): GenerationVIIISprites { return this.generation_viii; }
    set generationVIII(value: GenerationVIIISprites) { this.generation_viii = value; }
}





export class GenerationISprites {

    constructor(
        private red_blue    : RedBlueSprites,
        private yellow      : YellowSprites
    ) {}

    // Getters et setters pour red_blue
    get redBlue(): RedBlueSprites { return this.red_blue; }
    set redBlue(value: RedBlueSprites) { this.red_blue = value; }

    // Getters et setters pour yellow
    get yellowSprites(): YellowSprites { return this.yellow; }
    set yellowSprites(value: YellowSprites) { this.yellow = value; }
}

export class RedBlueSprites extends ExtendedSprites {

    constructor(
        front_default:              string | null,
        front_shiny:                string | null,
        back_default:               string | null,
        back_shiny:                 string | null,
        private back_gray:          string | null,
        private back_transparent:   string | null,
        private front_gray:         string | null,
        private front_transparent:  string | null,
    ) {
        super(front_default, front_shiny, back_default, back_shiny);
    }

    // Getters et setters pour back_gray
    get backGray(): string | null { return this.back_gray; }
    set backGray(value: string | null) { this.back_gray = value; }

    // Getters et setters pour back_transparent
    get backTransparent(): string | null { return this.back_transparent; }
    set backTransparent(value: string | null) { this.back_transparent = value; }

    // Getters et setters pour front_gray
    get frontGray(): string | null { return this.front_gray; }
    set frontGray(value: string | null) { this.front_gray = value; }

    // Getters et setters pour front_transparent
    get frontTransparent(): string | null { return this.front_transparent; }
    set frontTransparent(value: string | null) { this.front_transparent = value; }
}

export class YellowSprites extends RedBlueSprites {

    constructor(
        front_default       : string | null,
        front_shiny         : string | null,
        back_default        : string | null,
        back_shiny          : string | null,
        back_gray           : string | null,
        back_transparent    : string | null,
        front_gray          : string | null,
        front_transparent   : string | null,
    ) {
        super(front_default, front_shiny, back_default, back_shiny, back_gray, back_transparent, front_gray, front_transparent);
    }
}





export class GenerationIISprites {

    constructor(
        private crystal : CrystalSprites,
        private gold    : GoldSprites,
        private silver  : SilverSprites
    ) {}

    // Getters et setters pour crystal
    get crystalSprites(): CrystalSprites { return this.crystal; }
    set crystalSprites(value: CrystalSprites) { this.crystal = value; }

    // Getters et setters pour gold
    get goldSprites(): GoldSprites { return this.gold; }
    set goldSprites(value: GoldSprites) { this.gold = value; }

    // Getters et setters pour silver
    get silverSprites(): SilverSprites { return this.silver; }
    set silverSprites(value: SilverSprites) { this.silver = value; }
}

export class CrystalSprites extends ExtendedSprites {

    constructor(
        front_default                   : string | null,
        front_shiny                     : string | null,
        back_default                    : string | null,
        back_shiny                      : string | null,
        private back_shiny_transparent  : string | null,
        private back_transparent        : string | null,
        private front_shiny_transparent : string | null,
        private front_transparent       : string | null,
    ) {
        super(front_default, front_shiny, back_default, back_shiny);
    }

    // Getters et setters pour back_shiny_transparent
    get backShinyTransparent(): string | null { return this.back_shiny_transparent; }
    set backShinyTransparent(value: string | null) { this.back_shiny_transparent = value; }

    // Getters et setters pour back_transparent
    get backTransparent(): string | null { return this.back_transparent; }
    set backTransparent(value: string | null) { this.back_transparent = value; }

    // Getters et setters pour front_shiny_transparent
    get frontShinyTransparent(): string | null { return this.front_shiny_transparent; }
    set frontShinyTransparent(value: string | null) { this.front_shiny_transparent = value; }

    // Getters et setters pour front_transparent
    get frontTransparent(): string | null { return this.front_transparent; }
    set frontTransparent(value: string | null) { this.front_transparent = value; }
}

export class GoldSilverSprites extends ExtendedSprites {

    constructor(
        front_default               : string | null,
        front_shiny                 : string | null,
        back_default                : string | null,
        back_shiny                  : string | null,
        private front_transparent   : string | null,
    ) {
        super(front_default, front_shiny, back_default, back_shiny);
    }

    // Getters et setters pour front_transparent
    get frontTransparent(): string | null { return this.front_transparent; }
    set frontTransparent(value: string | null) { this.front_transparent = value; }
}

export class GoldSprites extends GoldSilverSprites {
    
    constructor(
        front_default       : string | null,
        front_shiny         : string | null,
        back_default        : string | null,
        back_shiny          : string | null,
        front_transparent   : string | null,
    ) {
        super(front_default, front_shiny, back_default, back_shiny, front_transparent);
    }
}

export class SilverSprites extends GoldSilverSprites {

    constructor(
        front_default       : string | null,
        front_shiny         : string | null,
        back_default        : string | null,
        back_shiny          : string | null,
        front_transparent   : string | null
    ) {
        super(front_default, front_shiny, back_default, back_shiny, front_transparent);
    }
}





export class GenerationIIISprites {

    constructor(
        private emerald             : BaseSprites,
        private firered_leafgreen   : ExtendedSprites,
        private ruby_sapphire       : ExtendedSprites
    ) {}

    // Getters et setters pour emerald
    get emeraldSprites(): BaseSprites { return this.emerald; }
    set emeraldSprites(value: BaseSprites) { this.emerald = value; }

    // Getters et setters pour firered_leafgreen
    get fireredLeafgreenSprites(): ExtendedSprites { return this.firered_leafgreen; }
    set fireredLeafgreenSprites(value: ExtendedSprites) { this.firered_leafgreen = value; }

    // Getters et setters pour ruby_sapphire
    get rubySapphireSprites(): ExtendedSprites { return this.ruby_sapphire; }
    set rubySapphireSprites(value: ExtendedSprites) { this.ruby_sapphire = value; }
}





export class GenerationIVSprites {

    constructor(
        private diamond_pearl           : FullSprites,
        private heartgold_soulsilver    : FullSprites,
        private platinum                : FullSprites
    ) {}

    // Getters et setters pour diamond_pearl
    get diamondPearl(): FullSprites { return this.diamond_pearl; }
    set diamondPearl(value: FullSprites) { this.diamond_pearl = value; }

    // Getters et setters pour heartgold_soulsilver
    get heartgoldSoulsilver(): FullSprites { return this.heartgold_soulsilver; }
    set heartgoldSoulsilver(value: FullSprites) { this.heartgold_soulsilver = value; }

    // Getters et setters pour platinum
    get platinumSprites(): FullSprites { return this.platinum; }
    set platinumSprites(value: FullSprites) { this.platinum = value; }
}





export class GenerationVSprites {

    constructor(
        private black_white: BlackWhiteSprites
    ) {}

    // Getters et setters pour black_white
    get blackWhiteSprites(): BlackWhiteSprites { return this.black_white; }
    set blackWhiteSprites(value: BlackWhiteSprites) { this.black_white = value; }
}

export class BlackWhiteSprites extends FullSprites {

    constructor(
        front_default       : string | null,
        front_shiny         : string | null,
        back_default        : string | null,
        back_shiny          : string | null,
        front_female        : string | null,
        front_shiny_female  : string | null,
        back_female         : string | null,
        back_shiny_female   : string | null,
        private animated    : FullSprites,
    ) {
        super(front_default, front_shiny, back_default, back_shiny, front_female, front_shiny_female, back_female, back_shiny_female);
    }

    // Getters et setters pour animated
    get animatedSprites(): FullSprites { return this.animated; }
    set animatedSprites(value: FullSprites) { this.animated = value; }
}





export class GenerationVISprites {

    constructor(
        private omegaruby_alphasapphire: FrontSprites,
        private xy: FrontSprites
    ) {}

    // Getters et setters pour omegaruby_alphasapphire
    get omegarubyAlphasapphire(): FrontSprites { return this.omegaruby_alphasapphire; }
    set omegarubyAlphasapphire(value: FrontSprites) { this.omegaruby_alphasapphire = value; }

    // Getters et setters pour xy
    get xySprites(): FrontSprites { return this.xy; }
    set xySprites(value: FrontSprites) { this.xy = value; }
}

export class FrontSprites {

    constructor(
        private front_default: string | null,
        private front_female: string | null,
        private front_shiny: string | null,
        private front_shiny_female: string | null
    ) {}

    // Getters et setters pour front_default
    get frontDefault(): string | null { return this.front_default; }
    set frontDefault(value: string | null) { this.front_default = value; }

    // Getters et setters pour front_female
    get frontFemale(): string | null { return this.front_female; }
    set frontFemale(value: string | null) { this.front_female = value; }

    // Getters et setters pour front_shiny
    get frontShiny(): string | null { return this.front_shiny; }
    set frontShiny(value: string | null) { this.front_shiny = value; }

    // Getters et setters pour front_shiny_female
    get frontShinyFemale(): string | null { return this.front_shiny_female; }
    set frontShinyFemale(value: string | null) { this.front_shiny_female = value; }
}





export class GenerationVIISprites {

    constructor(
        private icons: IconsSprites,
        private ultra_sun_ultra_moon: FrontSprites
    ) {}

    // Getters et setters pour icons
    get iconsSprites(): IconsSprites { return this.icons; }
    set iconsSprites(value: IconsSprites) { this.icons = value; }

    // Getters et setters pour ultra_sun_ultra_moon
    get ultraSunUltraMoon(): FrontSprites { return this.ultra_sun_ultra_moon; }
    set ultraSunUltraMoon(value: FrontSprites) { this.ultra_sun_ultra_moon = value; }
}

export class IconsSprites {

    constructor(
        private front_default: string | null,
        private front_female: string | null,
    ) {}

    // Getters et setters pour front_default
    get frontDefault(): string | null { return this.front_default; }
    set frontDefault(value: string | null) { this.front_default = value; }

    // Getters et setters pour front_female
    get frontFemale(): string | null { return this.front_female; }
    set frontFemale(value: string | null) { this.front_female = value; }
}





export class GenerationVIIISprites {

    constructor(
        private icons: IconsSprites
    ) {}

    // Getters et setters pour icons
    get iconsSprites(): IconsSprites { return this.icons; }
    set iconsSprites(value: IconsSprites) { this.icons = value; }
}