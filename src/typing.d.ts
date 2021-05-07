declare namespace GrapqlType {
    export type LoginResType = {
        accessToken: string
        expiredAt: number
    }
    export type LoginParamsType = {
        username: string
        password: string
    }
}