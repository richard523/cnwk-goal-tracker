import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertGoalEntrySchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // Get all goal entries
  app.get("/api/goal-entries", async (req, res) => {
    try {
      const entries = await storage.getGoalEntries();
      res.json(entries);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch goal entries" });
    }
  });

  // Create a new goal entry
  app.post("/api/goal-entries", async (req, res) => {
    try {
      const validatedData = insertGoalEntrySchema.parse(req.body);
      const entry = await storage.createGoalEntry(validatedData);
      res.json(entry);
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({ message: "Invalid data", errors: error.errors });
      } else {
        res.status(500).json({ message: "Failed to create goal entry" });
      }
    }
  });

  // Delete a goal entry
  app.delete("/api/goal-entries/:id", async (req, res) => {
    try {
      const { id } = req.params;
      await storage.deleteGoalEntry(id);
      res.json({ message: "Goal entry deleted successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to delete goal entry" });
    }
  });

  // Clear all goal entries
  app.delete("/api/goal-entries", async (req, res) => {
    try {
      await storage.clearAllGoalEntries();
      res.json({ message: "All goal entries cleared successfully" });
    } catch (error) {
      res.status(500).json({ message: "Failed to clear goal entries" });
    }
  });

  const httpServer = createServer(app);
  return httpServer;
}
