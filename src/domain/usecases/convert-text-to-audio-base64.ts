export interface UseCase {
  perform: (text: string) => Promise<UseCase.Result>
}

export namespace UseCase {
  export interface Result {
    audioUrl: string
  }
}
