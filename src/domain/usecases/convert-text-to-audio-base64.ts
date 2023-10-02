export interface UseCase {
  perform: (text: string) => Promise<string>
}
