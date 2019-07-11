export class User {
    constructor(
        public IDUSER: number,
        public NAME: string,
        public EMAIL: string,
        public PASSWORD: string,
        public IDROLE: number,
        public IS_RISK_EXPERT?: string,
        public IS_ACTIVITY_EXPERT?: string,
        public SCORE?: number,
        public ORGANIZATION?: string,
        public IDCOUNTRY?: number,
        public POSITION_NAME?: string,
        public EE_NUMBER?: string,
        public IS_ACTIVE?: string,
        public TOKEN?: string,
        public IMAGE?: string,
        public APIKEY?: string,
        public AUTH?: number,
        public LANG?: string,

    ){

    }
}