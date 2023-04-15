import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";

import { AxiosRequestConfig, AxiosResponse } from "axios";

export type RequestFn = (
  messages: Array<ChatCompletionRequestMessage>
) => Promise<AxiosResponse<CreateChatCompletionResponse, any>>;

function useApi(organization: string, apiKey: string) {
  const config = new Configuration({ apiKey, organization });
  const api = new OpenAIApi(config);

  const request = (
    messages: Array<ChatCompletionRequestMessage>,
    options?: AxiosRequestConfig<any>
  ) => {
    if (messages && messages.length === 0) {
      messages.push({
        role: "system",
        content: "You are Peiman's Friend. Respond with basic English.",
      });
    }

    return api.createChatCompletion(
      {
        model: "gpt-3.5-turbo",
        messages,
      },
      options
    );
  };

  return { api, request };
}

export { useApi };
