import {
  Configuration,
  OpenAIApi,
  ChatCompletionRequestMessage,
  CreateChatCompletionResponse,
} from "openai";

import { AxiosResponse } from "axios";

import { getFromStore, StoreKeysEnum } from "../utils/store";

export type RequestFn = (
  messages: Array<ChatCompletionRequestMessage>
) => Promise<AxiosResponse<CreateChatCompletionResponse, any>>;

function useApi() {
  return Promise.all([
    getFromStore(StoreKeysEnum.ORGANIZATION_ID),
    getFromStore(StoreKeysEnum.API_KEY),
  ]).then(([organization, apiKey]) => {
    const config = new Configuration({ apiKey, organization });
    const api = new OpenAIApi(config);

    const request = (messages: Array<ChatCompletionRequestMessage>) => {
      if (messages && messages.length === 0) {
        messages.push({
          role: "system",
          content: "You are Peiman's Friend. Respond with basic English.",
        });
      }

      return api.createChatCompletion({
        model: "gpt-3.5-turbo",
        messages,
      });
    };

    return { api, request };
  });
}

export { useApi };

// apiKey: "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",
// organization: "a",
