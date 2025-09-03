
## Getting Started

First, run the development server:

```bash
npx sst dev
```

This would automatically deploy the entire stack including generating monorise types.

When you deploy the first time, by default these are the secret keys set, it is advised that you replace it:

```bash
sst secret set API_KEYS '["secret1", "secret2"]'
sst secret set X_API_KEY secret1
```

