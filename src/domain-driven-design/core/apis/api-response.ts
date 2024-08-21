export abstract class ApiResponse {
  abstract toObject(...props: unknown[]): unknown
  toJson(
    replacer?: Parameters<typeof JSON.stringify>[1],
    space?: Parameters<typeof JSON.stringify>[2],
  ) {
    return JSON.stringify(this.toObject(), replacer, space)
  }
}
