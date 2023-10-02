export interface ConvertTextToAudioBase64 {
  perform: (text: string) => Promise<ConvertTextToAudioBase64.Result>
}

export namespace ConvertTextToAudioBase64 {
  export interface Result {
    audioUrl: string
  }
}
