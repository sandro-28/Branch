// Re-export auth schema
export * from "./auth-schema";

// Projects schema
import { pgTable, text, timestamp, varchar, pgEnum, uuid } from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
import { user } from "./auth-schema";

// Enum pour le status des projets
export const projectStatusEnum = pgEnum("project_status", [
    "online",
    "offline",
    "provisioning",
]);

// Table Projects
export const projects = pgTable("projects", {
    id: uuid("id").primaryKey().defaultRandom(),
    name: varchar("name", { length: 255 }).notNull(),
    slug: varchar("slug", { length: 255 }).unique().notNull(),
    status: projectStatusEnum("status").default("offline").notNull(),
    userId: text("user_id")
        .notNull()
        .references(() => user.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Relations
export const projectsRelations = relations(projects, ({ one }) => ({
    user: one(user, {
        fields: [projects.userId],
        references: [user.id],
    }),
}));

// Types inférés
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type ProjectStatus = "online" | "offline" | "provisioning";
