interface RegionInfo {
    name: string;
    generation: number;
    hasRegionalForms: boolean;
    introduced: string; // Jeu(s) qui ont introduit la région
  }
  
  export const POKEMON_REGIONS: { [key: string]: RegionInfo } = {
    KANTO: { 
      name: 'Kanto', 
      generation: 1, 
      hasRegionalForms: false, 
      introduced: 'Red & Green (Japan) / Red & Blue (International)'
    },
    JOHTO: { 
      name: 'Johto', 
      generation: 2, 
      hasRegionalForms: false, 
      introduced: 'Gold & Silver'
    },
    HOENN: { 
      name: 'Hoenn', 
      generation: 3, 
      hasRegionalForms: false, 
      introduced: 'Ruby & Sapphire'
    },
    SINNOH: { 
      name: 'Sinnoh', 
      generation: 4, 
      hasRegionalForms: false, 
      introduced: 'Diamond & Pearl'
    },
    UNOVA: { 
      name: 'Unova', 
      generation: 5, 
      hasRegionalForms: false, 
      introduced: 'Black & White'
    },
    KALOS: { 
      name: 'Kalos', 
      generation: 6, 
      hasRegionalForms: false, 
      introduced: 'X & Y'
    },
    ALOLA: { 
      name: 'Alola', 
      generation: 7, 
      hasRegionalForms: true, 
      introduced: 'Sun & Moon'
    },
    GALAR: { 
      name: 'Galar', 
      generation: 8, 
      hasRegionalForms: true, 
      introduced: 'Sword & Shield'
    },
    HISUI: { 
      name: 'Hisui', 
      generation: 8, 
      hasRegionalForms: true, 
      introduced: 'Legends: Arceus'
    },
    PALDEA: { 
      name: 'Paldea', 
      generation: 9, 
      hasRegionalForms: true, 
      introduced: 'Scarlet & Violet'
    }
  };
  
  export const REGIONAL_FORMS = Object.fromEntries(
    Object.entries(POKEMON_REGIONS)
      .filter(([_, info]) => info.hasRegionalForms)
      .map(([key, info]) => [key, { ...info, formName: info.name.toLowerCase() }])
  );
  
  export const REGIONAL_FORM_NAMES = Object.values(REGIONAL_FORMS).map(form => form.formName);