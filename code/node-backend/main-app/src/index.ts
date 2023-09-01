import { connectToMongoDatabase } from "./database/mongo.database";
import { initServer } from "./server";

// eslint-disable-next-line @typescript-eslint/no-floating-promises
(async (): Promise<void> => {
  await connectToMongoDatabase();
  initServer();
})();
