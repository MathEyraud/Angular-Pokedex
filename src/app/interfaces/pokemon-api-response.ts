// Interface définissant la structure de la réponse de l'API Pokémon
export interface IPokemonApiResponse {
    count   : number;                               // Nombre total de Pokémon
    next    : string | null;                        // URL pour la page suivante de résultats
    previous: string | null;                        // URL pour la page précédente de résultats
    results : Array<{ name: string; url: string }>; // Liste des Pokémon avec leur nom et URL
}