import { config } from "dotenv";
config({ path: ".env.local" });

import { getDb } from "./lib/db";
import { user } from "./lib/auth-schema";
import { eq } from "drizzle-orm";

async function main() {
    const db = getDb();

    // Log all users to see who to promote
    const users = await db.select().from(user);
    console.log("Current users:", users.map(u => ({ id: u.id, email: u.email, isAdmin: u.isAdmin })));

    if (users.length > 0) {
        // Update the first user to be admin if specific email not found
        // We look for any user since the test might have created one with random name or just the one session user
        const targetUser = users[0];

        await db
            .update(user)
            .set({ isAdmin: true })
            .where(eq(user.id, targetUser.id));

        console.log(`User ${targetUser.email} (${targetUser.id}) promoted to admin`);
    } else {
        console.log("No users found to promote");
    }
}

main().catch(console.error);
