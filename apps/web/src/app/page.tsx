import { prisma } from "@clarence/database";

export default async function Home() {
  // Directly fetch users from your Docker DB
  const users = await prisma.user.findMany().catch((e) => {
    console.error("Database connection failed:", e);
    return [];
  });

  return (
    <main className="p-10 font-sans">
      <h1 className="text-3xl font-bold">Clarence Project 2025</h1>
      <p className="text-gray-400 mb-6">
        Database Status: {users.length >= 0 ? "Connected" : "Error"}
      </p>

      <div className="bg-black/5 p-6 rounded-lg border border-black/10">
        <h2 className="text-xl font-semibold mb-4">Users:</h2>
        {users.length === 0 ? (
          <p className="text-yellow-600 italic">
            No users found. Open Prisma Studio to add one!
          </p>
        ) : (
          <ul className="space-y-2">
            {users.map((user) => (
              <li key={user.id} className="p-2 bg-gray-100 rounded border">
                {user.name} ({user.email})
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  );
}
