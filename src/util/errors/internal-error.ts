export class InternalError extends Error { 

    constructor(
        public message: string,
        protected code: number = 500, 
        protected desc?: string) 
    {
        super(message);
        this.name = this.constructor.name; // Show classname in debug
        Error.captureStackTrace(this, this.constructor);
    }

}