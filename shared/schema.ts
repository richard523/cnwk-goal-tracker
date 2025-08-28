import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const goalEntries = pgTable("goal_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  senseiName: text("sensei_name").notNull(),
  ninjaName: text("ninja_name").notNull(),
  currentProject: text("current_project").notNull(),
  goal1: text("goal1").notNull(),
  goal2: text("goal2").notNull(),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGoalEntrySchema = createInsertSchema(goalEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertGoalEntry = z.infer<typeof insertGoalEntrySchema>;
export type GoalEntry = typeof goalEntries.$inferSelect;

// Project status mapping
export const PROJECT_STATUS_MAPPING = {
  "just-started": {
    goal1: "Half of current",
    goal2: "Finish current"
  },
  "half-way": {
    goal1: "Finish current",
    goal2: "Half of next project"
  },
  "finished": {
    goal1: "Finish half of next-project",
    goal2: "Finish next-project"
  }
} as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: "just-started", label: "Just started current project" },
  { value: "half-way", label: "Half-way current project" },
  { value: "finished", label: "Finished current project" }
] as const;
