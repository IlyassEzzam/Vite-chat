import { Client, Account, Databases } from 'appwrite';

export const PROJECT_ID= '654e9ff0148ab16e0c660907'
export const DATABASE_ID= '0907654ea27cce9838c8a5a4'
export const COLLECTION_ID_MESSAGES= '654ea2b1068bd49646b50907'


const client = new Client();

client
    .setEndpoint('https://cloud.appwrite.io/v1')
    .setProject('0907654e9ff0148ab16e0c66');

    export const account = new Account(client);
    export  const databases = new Databases(client);

export default client;


