import { type TextToSpeech } from '@/data/contracts'

import { TextToSpeechClient } from '@google-cloud/text-to-speech'

export class GoogleTextToSpeechAdapter implements TextToSpeech {
  async perform(text: string): Promise<string> {
    const client = new TextToSpeechClient()
    const [response] = await client.synthesizeSpeech({
      input: { text },
      voice: {
        languageCode: 'pt-BR',
        name: 'pt-BR-Wavenet-B',
      },
      audioConfig: {
        audioEncoding: 'MP3',
        effectsProfileId: ['large-home-entertainment-class-device'],
        pitch: -2,
        speakingRate: 1,
      },
    })
    return `data:audio/mp3;base64,${response.audioContent?.toString()}`
  }
}
