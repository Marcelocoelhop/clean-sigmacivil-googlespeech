import { type TextToSpeech } from '@/data/contracts'

import { faker } from '@faker-js/faker'
import { TextToSpeechClient } from '@google-cloud/text-to-speech'

jest.mock('@google-cloud/text-to-speech')

class GoogleTextToSpeechAdapter implements TextToSpeech {
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

describe('GoogleTextToSpeechAdapter', () => {
  it('should call synthesizeSpeech with correct data', async () => {
    const sut = new GoogleTextToSpeechAdapter()
    const text = faker.lorem.words()
    const mockResponse = {
      audioContent: faker.string.uuid(),
    }
    const mockSynthesizeSpeech = jest.fn().mockReturnValueOnce([mockResponse])
    TextToSpeechClient.prototype.synthesizeSpeech = mockSynthesizeSpeech

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

  it('should return a correct audio url on success', async () => {
    const sut = new GoogleTextToSpeechAdapter()
    const mockResponse = {
      audioContent: faker.string.uuid(),
    }
    const mockSynthesizeSpeech = jest.fn().mockReturnValueOnce([mockResponse])
    TextToSpeechClient.prototype.synthesizeSpeech = mockSynthesizeSpeech

    const audioUrl = await sut.perform(faker.lorem.words())

    expect(audioUrl).toEqual(
      `data:audio/mp3;base64,${mockResponse.audioContent.toString()}`
    )
  })
})
