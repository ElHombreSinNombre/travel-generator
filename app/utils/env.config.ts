const {
  NEXT_PUBLIC_GOOGLE_API_KEY: google_api_key = '',
  NEXT_PUBLIC_OPENAI_API_KEY: gpt_api_key = '',
  NEXT_PUBLIC_PEXELS_API_KEY: pexels_api_key = ''
} = process.env

export const EnvConfig = () => ({
  gpt_api_key,
  google_api_key,
  pexels_api_key
})
