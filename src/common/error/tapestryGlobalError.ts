class TapestryGlobalError extends Error {
    MODULE: string;
    errorConstant: any;
    httpStatusCode: number;
    data?: any;
    args?: any[];

    constructor(
        MODULE: string,
        err: any,
        httpStatusCode: number,
        errorConstant: any,
        ...args: any[]
    ) {
        const message = err?.message || errorConstant?.message || "Technical Error";
        super(message);

        this.MODULE = MODULE;
        this.errorConstant = errorConstant;
        this.httpStatusCode = httpStatusCode;
        this.data = err?.data ?? undefined;

        if (args?.length) {
            this.args = args;
        }

        this.errorConstant.message = errorConstant?.message;
        this.stack = err?.stack ?? this.stack;
    }
}

export default TapestryGlobalError;
