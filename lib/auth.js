import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "better-auth/adapters/mongodb";

// ১. ক্লায়েন্ট এবং ডিবি ইনিশিয়ালাইজেশন
const client = new MongoClient(process.env.MONGODB_URI);
const db = client.db(); // আপনার URI তে ডাটাবেস নাম না থাকলে db("myDatabase") দিতে পারেন

export const auth = betterAuth({
  // ২. শুধুমাত্র এই ডাটাবেস কনফিগারেশনটি রাখুন
  database: mongodbAdapter(db, {
    client: client, // ট্রানজ্যাকশন এনাবেল করার জন্য
  }),

  secret: process.env.BETTER_AUTH_SECRET,
  baseURL: process.env.BETTER_AUTH_URL,

  // --- SQLite এর অংশটি এখান থেকে সরিয়ে ফেলা হয়েছে ---

  emailAndPassword: {
    enabled: true,
  },
  socialProviders: {
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    },
  },
});