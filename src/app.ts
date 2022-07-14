import Server from './server/server';

const StoreApi = new Server(parseInt(process.env.port as unknown as string));
StoreApi.startListening();