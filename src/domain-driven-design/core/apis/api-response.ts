export abstract class ApiResponse {
  /**
   *
   * ---
   *
   * Transforma a classe em um objeto Literal que pode ser serializado
   *
   * ---
   *
   */
  abstract toObject(...props: unknown[]): unknown

  /**
   *
   * ---
   *
   * Transforma a Classe um formato Json
   *
   * ---
   *
   * @param replacer Um array de strings e números que atua como uma lista aprovada para selecionar as propriedades do objeto que serão convertidas em string.
   * @param space Adiciona indentação, espaços em branco e caracteres de quebra de linha ao texto JSON retornado para torná-lo mais fácil de ler.
   * @returns `string`
   */
  toJson(
    replacer?: Parameters<typeof JSON.stringify>[1],
    space?: Parameters<typeof JSON.stringify>[2],
  ) {
    return JSON.stringify(this.toObject(), replacer, space)
  }
}
