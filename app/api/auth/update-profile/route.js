import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export async function POST(req) {
    try {
        const session = await auth.api.getSession({ headers: await headers() });

        if (!session) {
            return new Response(
                JSON.stringify({ error: { message: "Unauthorized" } }),
                { status: 401, headers: { "Content-Type": "application/json" } }
            );
        }

        const { name, image } = await req.json();

        // Update user in database
        const user = await auth.api.updateUser(
            { headers: await headers() },
            {
                name: name || session.user.name,
                image: image || session.user.image,
            }
        );

        if (!user) {
            return new Response(
                JSON.stringify({ error: { message: "Failed to update user" } }),
                { status: 500, headers: { "Content-Type": "application/json" } }
            );
        }

        return new Response(JSON.stringify(user), {
            status: 200,
            headers: { "Content-Type": "application/json" },
        });
    } catch (error) {
        console.error("Update profile error:", error);
        return new Response(
            JSON.stringify({ error: { message: error.message || "Something went wrong" } }),
            { status: 500, headers: { "Content-Type": "application/json" } }
        );
    }
}
