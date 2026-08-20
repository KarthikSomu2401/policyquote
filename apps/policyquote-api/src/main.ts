import { app } from './app';
import { runtimeConfig } from './runtime-config';

app.listen(runtimeConfig.port, () => {
  console.log(`API listening on port ${runtimeConfig.port}`);
});