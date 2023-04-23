import { Service } from 'typedi';
import { Configuration, OpenAIApi } from 'openai';

@Service()
export class GptService {
  public async queryGPT(
    prompt = 'Come installo windows su un mac?',
    model = 'text-davinci-003',
    max_tokens?: number,
    temperature = 0.85,
  ): Promise<string> {
    const apiKey = process.env.GPTAPIKEY;
    const openai = new OpenAIApi(new Configuration({ apiKey }));

    const response = await openai.createCompletion({
      model,
      prompt,
      max_tokens,
      n: 1,
      temperature,
    });
    console.log(`request cost: ${response.data.usage.total_tokens} tokens`);

    return response.data.choices[0].text;
  }
}
