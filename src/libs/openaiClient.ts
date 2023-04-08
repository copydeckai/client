import { API_URL } from "@copydeck/config";
import {
  CreateCompletionRequest,
  CreateCompletionResponse,
  CreateEditRequest,
  CreateEditResponse,
  CreateEmbeddingRequest,
  CreateEmbeddingResponse
} from "openai";

async function getCompletion(
  request: CreateCompletionRequest
): Promise<CreateCompletionResponse> {
  return fetch(`${API_URL}/writing/completion`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  }).then(response => response.json() as Promise<CreateCompletionResponse>);
}

async function getEdit(
  request: CreateEditRequest
): Promise<CreateEditResponse> {
  return fetch(`${API_URL}/writing/edit`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  }).then(response => response.json() as Promise<CreateEditResponse>);
}

async function getEmbedding(
  request: CreateEmbeddingRequest
): Promise<CreateEmbeddingResponse> {
  return fetch(`${API_URL}/writing/embedding`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(request)
  }).then(response => response.json() as Promise<CreateEmbeddingResponse>);
}

export { getCompletion, getEdit, getEmbedding };
