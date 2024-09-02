import { trigger, transition, style, animate, query, group } from '@angular/animations';

export const tabAnimations = {
  tabTransition: 

    trigger('tabAnimation', [

      transition('* => *', [
        
        // Style initial pour le conteneur parent
        style({ position: 'relative' }),

        // Sélectionne les éléments entrants et sortants
        query(':enter, :leave', [
          style({
            position: 'absolute',  // Positionnement absolu pour superposer les éléments
            top: 0,
            left: 0,
            width: '100%',
          })
        ], { optional: true }),

        // Style initial pour l'élément entrant
        query(':enter', [
          style({ 
            transform: 'translateX(calc({{direction}} * 100%))', // Positionne l'élément entrant hors de l'écran
            opacity: 0,
          })
        ], { optional: true }),

        // Style initial pour l'élément sortant
        query(':leave', [
          style({ 
            transform: 'translateX(0)',  // L'élément sortant commence à sa position normale
            opacity: 1,
          })
        ], { optional: true }),

        // Groupe les animations pour qu'elles se produisent simultanément
        group([

          // Animation de l'élément sortant
          query(':leave', [
            animate('500ms ease-out', 
              style({ 
                transform: 'translateX(calc({{direction}} * -100%))', // Déplace l'élément sortant hors de l'écran
                opacity: 0,
              })
            )
          ], { optional: true }),

          // Animation de l'élément entrant
          query(':enter', [
            animate('500ms ease-out', 
              style({ 
                transform: 'translateX(0)',  // Déplace l'élément entrant à sa position finale
                opacity: 1,
              })
            )
          ], { optional: true }),

        ])
      ], { params: { direction: '1' } })  // Paramètre de direction par défaut
    ])
};