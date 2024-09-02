export function capitalizeFirstLetter(word: string): string {
    if (!word) return '';
    return word.charAt(0).toUpperCase() + word.slice(1);
}

// Converts kilograms to pounds
export function convertKilogramsToPounds(kilograms: number): number {
    const kilogramsToPoundsConversionFactor = 2.20462;
    return kilograms * kilogramsToPoundsConversionFactor;
}

// Converts meters to feet and inches
export function convertMetersToFeetAndInches(meters: number): string {
    const totalInches = meters * 39.3701;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  const formattedInches = inches < 10 ? `0${inches}` : `${inches}`;
  return `${feet}'${formattedInches}"`;
  }
  