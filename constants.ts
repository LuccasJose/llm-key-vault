import { ApiKey, Provider } from './types';

export const MOCK_KEYS: ApiKey[] = [
  {
    id: '1',
    provider: Provider.GEMINI,
    key: 'AIzaSy...ExampleKey1',
    label: 'Main Account',
    usagePercent: 45,
    totalLimit: 1500, // requests/min or day
    used: 675,
    status: 'active',
    createdAt: '2023-10-01'
  },
  {
    id: '2',
    provider: Provider.GEMINI,
    key: 'AIzaSy...ExampleKey2',
    label: 'Backup Account A',
    usagePercent: 92,
    totalLimit: 1500,
    used: 1380,
    status: 'active',
    createdAt: '2023-10-05'
  },
  {
    id: '3',
    provider: Provider.OPENAI,
    key: 'sk-proj...ExampleKey3',
    label: 'Test Account',
    usagePercent: 100,
    totalLimit: 500,
    used: 500,
    status: 'depleted',
    createdAt: '2023-09-15'
  }
];

// In a real app, this would be an env var
export const DEMO_PASSWORD = "admin";