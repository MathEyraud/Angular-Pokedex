export class MovePokemon {

    constructor(
        public name: string,
        public url: string,
        public version_group_details: VersionGroupDetail[]
    ) {}
}

export class VersionGroupDetail {

    constructor(
      public level_learned_at       : number,
      public move_learn_method      : string,
      public move_learn_method_url  : string,
      public version_group          : string,
      public version_group_url      : string
    ) {}
}