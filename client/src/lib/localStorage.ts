import { type GoalEntry, type InsertGoalEntry } from "@shared/schema";
import { nanoid } from "nanoid"; // Using nanoid for ID generation

const LOCAL_STORAGE_KEY = "goal_entries";

export const goalStorageUtility = { // Now uses localStorage
  async getGoalEntries(): Promise<GoalEntry[]> {
    const storedValue = localStorage.getItem(LOCAL_STORAGE_KEY);
    if (storedValue) {
      try {
        const entries = JSON.parse(storedValue) as GoalEntry[];
        // Sort by createdAt descending
        return entries.sort(
          (a, b) => new Date(b.createdAt || 0).getTime() - new Date(a.createdAt || 0).getTime()
        );
      } catch (e) {
        console.error("Failed to parse goal entries from local storage", e);
        return [];
      }
    }
    return [];
  },

  async createGoalEntry(insertEntry: InsertGoalEntry): Promise<GoalEntry> {
    const existingEntries = await this.getGoalEntries();
    const newEntry: GoalEntry = {
      ...insertEntry,
      id: nanoid(), // Generate unique ID
      createdAt: new Date().toISOString(), // Store as ISO string
    };
    const updatedEntries = [newEntry, ...existingEntries];
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
    return newEntry;
  },

  async deleteGoalEntry(id: string): Promise<void> {
    const existingEntries = await this.getGoalEntries();
    const updatedEntries = existingEntries.filter(entry => entry.id !== id);
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(updatedEntries));
  },

  async clearAllGoalEntries(): Promise<void> {
    localStorage.removeItem(LOCAL_STORAGE_KEY);
  },
};
