import { type GoalEntry, type InsertGoalEntry } from "@shared/schema";
import { randomUUID } from "crypto";

export interface IStorage {
  getGoalEntries(): Promise<GoalEntry[]>;
  createGoalEntry(entry: InsertGoalEntry): Promise<GoalEntry>;
  deleteGoalEntry(id: string): Promise<void>;
  clearAllGoalEntries(): Promise<void>;
}

export class MemStorage implements IStorage {
  private goalEntries: Map<string, GoalEntry>;

  constructor() {
    this.goalEntries = new Map();
  }

  async getGoalEntries(): Promise<GoalEntry[]> {
    return Array.from(this.goalEntries.values()).sort(
      (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
    );
  }

  async createGoalEntry(insertEntry: InsertGoalEntry): Promise<GoalEntry> {
    const id = randomUUID();
    const entry: GoalEntry = {
      ...insertEntry,
      id,
      createdAt: new Date(),
    };
    this.goalEntries.set(id, entry);
    return entry;
  }

  async deleteGoalEntry(id: string): Promise<void> {
    this.goalEntries.delete(id);
  }

  async clearAllGoalEntries(): Promise<void> {
    this.goalEntries.clear();
  }
}

export const storage = new MemStorage();
