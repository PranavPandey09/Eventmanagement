// import { Client, Account, Databases } from 'appwrite';

// const client = new Client();
// client
//     .setEndpoint('https://cloud.appwrite.io/v1') // Appwrite endpoint
//     .setProject('event');      // Replace with your project ID

// const account = new Account(client);
// const database = new Databases(client);

// export { account, database };

import { Client, Databases } from 'appwrite';

const client = new Client();

client
    .setEndpoint(process.env.REACT_APP_APPWRITE_ENDPOINT) // Your Appwrite endpoint from .env
    .setProject(process.env.REACT_APP_APPWRITE_PROJECT_ID); // Your Appwrite project ID from .env

const databases = new Databases(client);

export { databases };

