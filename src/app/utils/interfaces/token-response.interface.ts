export interface ITokenResponse {
  token_type: string;
  access_token: string;
  refresh_token: string;
  expires_in: number;
  scope: string;
}
