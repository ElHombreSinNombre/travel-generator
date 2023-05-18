import { Configuration, OpenAIApi } from "openai";

class openaiInstance {
  private static instance: OpenAIApi;

  public static async getInstance(key: string): Promise<OpenAIApi> {
    if (!openaiInstance.instance) {
      const configuration = new Configuration({ apiKey: key });
      openaiInstance.instance = new OpenAIApi(configuration);
    }
    return openaiInstance.instance;
  }
}

export default openaiInstance;
