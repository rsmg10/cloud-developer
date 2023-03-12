/**
 * Interface representing a JSON Web Key (JWK)
 */
 export interface Jwk {
    alg: string
    kty: string
    use: string
    n: string
    x5c: string[]
    e: string
    x5t: string
    kid: string
}