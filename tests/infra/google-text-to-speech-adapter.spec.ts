import { type TextToSpeech } from '@/data/contracts'

import { faker } from '@faker-js/faker'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

jest.mock('@google-cloud/text-to-speech')

class GoogleTextToSpeechAdapter implements TextToSpeech {
  async perform(text: string): Promise<string> {
    const client = new TextToSpeechClient()
    await client.synthesizeSpeech({
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
  }
}

describe('GoogleTextToSpeechAdapter', () => {
  it('should call synthesizeSpeech with correct data', async () => {
    const mockSynthesizeSpeech = jest.fn()
    TextToSpeechClient.prototype.synthesizeSpeech = mockSynthesizeSpeech
    const sut = new GoogleTextToSpeechAdapter()
    const text = faker.lorem.words()

    await sut.perform(text)

    expect(mockSynthesizeSpeech).toHaveBeenCalledWith({
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
  })
})
