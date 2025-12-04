export enum Provider {
  GEMINI = 'Gemini',
  OPENAI = 'OpenAI',
  ANTHROPIC = 'Anthropic',
  MISTRAL = 'Mistral'
}

export interface ApiKey {
  id: string;
  provider: Provider;
  key: string;
  label: string; // e.g., "Account 1"
  usagePercent: number; // 0 to 100
  totalLimit: number; // in requests or tokens (abstracted)
  used: number;
  status: 'active' | 'depleted' | 'expired';
  createdAt: string;
}

export interface DashboardStats {
  totalKeys: number;
  activeKeys: number;
  depletedKeys: number;
  totalRequestsServed: number;
}
