const {
  GOOGLE_API_KEY: googleKey = '',
  OPENAI_API_KEY: openaiKey = '',
  PEXELS_API_KEY: pexelsKey = ''
} = process.env

if (!googleKey || !openaiKey || !pexelsKey) {
  throw new Error('Missing environment variables')
}

export const EnvConfig = () => ({
  openaiKey,
  googleKey,
  pexelsKey
})
