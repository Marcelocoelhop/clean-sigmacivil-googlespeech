export interface TextToSpeech {
  perform: (text: string) => Promise<string>
}
