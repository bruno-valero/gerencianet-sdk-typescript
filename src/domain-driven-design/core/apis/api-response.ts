export abstract class ApiResponse {
  abstract toObject(...props: unknown[]): unknown
}
