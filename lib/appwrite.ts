import { Client } from 'appwrite';

const client = new Client();

console.log(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT)
console.log(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID)


client
    .setEndpoint(process.env.NEXT_PUBLIC_APPWRITE_ENDPOINT!)
    .setProject(process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID!)


    export default client;