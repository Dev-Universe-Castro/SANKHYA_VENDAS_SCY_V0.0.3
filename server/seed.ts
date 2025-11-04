import { db } from "./db";
import { users } from "@shared/schema";
import { hashPassword } from "./auth";

async function seed() {
  console.log("🌱 Seeding database...");

  try {
    // Criar usuário admin
    const hashedPassword = await hashPassword("admin123");
    const [adminUser] = await db
      .insert(users)
      .values({
        email: "admin@sistema.com",
        password: hashedPassword,
        nome: "Administrador",
        perfil: "ADM",
      })
      .onConflictDoNothing()
      .returning();

    if (adminUser) {
      console.log("✅ Admin user created: admin@sistema.com / admin123");
    } else {
      console.log("ℹ️  Admin user already exists");
    }

    console.log("✅ Seed completed successfully!");
  } catch (error) {
    console.error("❌ Error seeding database:", error);
    throw error;
  }
}

seed()
  .then(() => process.exit(0))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });