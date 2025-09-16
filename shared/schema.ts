import { sql } from "drizzle-orm";
import { pgTable, text, varchar, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const goalEntries = pgTable("goal_entries", {
  id: varchar("id").primaryKey().default(sql`gen_random_uuid()`),
  date: text("date").notNull(),
  senseiName: text("sensei_name").notNull(),
  ninjaName: text("ninja_name").notNull(),
  currentProject: text("current_project").notNull(),
  description: text("description").notNull(),
  goal1: text("goal1").notNull(),
  goal2: text("goal2").notNull(),
  cnwKoin: integer("cnw_koin").notNull().default(0),
  createdAt: timestamp("created_at").defaultNow(),
});

export const insertGoalEntrySchema = createInsertSchema(goalEntries).omit({
  id: true,
  createdAt: true,
});

export type InsertGoalEntry = z.infer<typeof insertGoalEntrySchema>;
export type GoalEntry = typeof goalEntries.$inferSelect;

// Project status mapping - Build and Adventures only
export const PROJECT_STATUS_MAPPING = {
  "Completed White Belt: Level 1 | Your First Sprite": {
    goal1: "Progress on build White lvl1 Spooky Effects",
    goal2: "Completed build White lvl1 Spooky Effects",
  },
  "Progress on White Belt: Level 1 | Your First Sprite": {
    goal1: "Completed build White lvl1 Your First Sprite",
    goal2: "Progress on build White lvl1 Spooky Effects",
  },
  "Completed White Belt: Level 1 | Spooky Effects": {
    goal1: "Progress on Adventure White lvl1 My First Coding Project",
    goal2: "Completed Adventure White lvl1 My First Coding Project",
  },
  "Progress on White Belt: Level 1 | Spooky Effects": {
    goal1: "Completed build White lvl1 Spooky Effects",
    goal2: "Progress on Adventure White lvl1 My First Coding Project",
  },
  "Completed White Belt: Level 1 | Adventure My First Coding Project": {
    goal1: "Progress on build White lvl2 Meet New Friends!",
    goal2: "Completed build White lvl2 Meet New Friends!",
  },
  "Progress on White Belt: Level 1 | Adventure My First Coding Project": {
    goal1: "Completed Adventure White lvl1 My First Coding Project",
    goal2: "Progress on build White lvl2 Meet New Friends!",
  },
  "Completed White Belt: Level 2 | Meet New Friends!": {
    goal1: "Progress on build White lvl2 Where's My Puppy?",
    goal2: "Completed build White lvl2 Where's My Puppy?",
  },
  "Progress on White Belt: Level 2 | Meet New Friends!": {
    goal1: "Completed build White lvl2 Meet New Friends!",
    goal2: "Progress on build White lvl2 Where's My Puppy?",
  },
  "Completed White Belt: Level 2 | Where's My Puppy?": {
    goal1: "Progress on Adventure White lvl2 Creating with",
    goal2: "Completed Adventure White lvl2 Creating with",
  },
  "Progress on White Belt: Level 2 | Where's My Puppy?": {
    goal1: "Completed build White lvl2 Where's My Puppy?",
    goal2: "Progress on Adventure White lvl2 Creating with",
  },
  "Completed White Belt: Level 2 | Adventure Creating with": {
    goal1: "Progress on build White lvl3 Fly Me to the Moon!",
    goal2: "Completed build White lvl3 Fly Me to the Moon!",
  },
  "Progress on White Belt: Level 2 | Adventure Creating with": {
    goal1: "Completed Adventure White lvl2 Creating with",
    goal2: "Progress on build White lvl3 Fly Me to the Moon!",
  },
  "Completed White Belt: Level 3 | Fly Me to the Moon!": {
    goal1: "Progress on build White lvl3 Dinner Time!",
    goal2: "Completed build White lvl3 Dinner Time!",
  },
  "Progress on White Belt: Level 3 | Fly Me to the Moon!": {
    goal1: "Completed build White lvl3 Fly Me to the Moon!",
    goal2: "Progress on build White lvl3 Dinner Time!",
  },
  "Completed White Belt: Level 3 | Dinner Time!": {
    goal1: "Progress on Adventure White lvl3 Creating with Events!",
    goal2: "Completed Adventure White lvl3 Creating with Events!",
  },
  "Progress on White Belt: Level 3 | Dinner Time!": {
    goal1: "Completed build White lvl3 Dinner Time!",
    goal2: "Progress on Adventure White lvl3 Creating with Events!",
  },
  "Completed White Belt: Level 3 | Adventure Creating with Events!": {
    goal1: "Progress on build White lvl4 A Piece of Cake",
    goal2: "Completed build White lvl4 A Piece of Cake",
  },
  "Progress on White Belt: Level 3 | Adventure Creating with Events!": {
    goal1: "Completed Adventure White lvl3 Creating with Events!",
    goal2: "Progress on build White lvl4 A Piece of Cake",
  },
  "Completed White Belt: Level 4 | A Piece of Cake": {
    goal1: "Progress on build White lvl4 Underwater Food Chain",
    goal2: "Completed build White lvl4 Underwater Food Chain",
  },
  "Progress on White Belt: Level 4 | A Piece of Cake": {
    goal1: "Completed build White lvl4 A Piece of Cake",
    goal2: "Progress on build White lvl4 Underwater Food Chain",
  },
  "Completed White Belt: Level 4 | Underwater Food Chain": {
    goal1: "Progress on Adventure White lvl4 Creating with Functions",
    goal2: "Completed Adventure White lvl4 Creating with Functions",
  },
  "Progress on White Belt: Level 4 | Underwater Food Chain": {
    goal1: "Completed build White lvl4 Underwater Food Chain",
    goal2: "Progress on Adventure White lvl4 Creating with Functions",
  },
  "Completed White Belt: Level 4 | Adventure Creating with Functions": {
    goal1: "Progress on build White lvl5 Munchy Munchy Monkey",
    goal2: "Completed build White lvl5 Munchy Munchy Monkey",
  },
  "Progress on White Belt: Level 4 | Adventure Creating with Functions": {
    goal1: "Completed Adventure White lvl4 Creating with Functions",
    goal2: "Progress on build White lvl5 Munchy Munchy Monkey",
  },
  "Completed White Belt: Level 5 | Munchy Munchy Monkey": {
    goal1: "Progress on build White lvl5 Pearl Collector",
    goal2: "Completed build White lvl5 Pearl Collector",
  },
  "Progress on White Belt: Level 5 | Munchy Munchy Monkey": {
    goal1: "Completed build White lvl5 Munchy Munchy Monkey",
    goal2: "Progress on build White lvl5 Pearl Collector",
  },
  "Completed White Belt: Level 5 | Pearl Collector": {
    goal1: "Progress on Adventure White lvl5 Creating with Variables!",
    goal2: "Completed Adventure White lvl5 Creating with Variables!",
  },
  "Progress on White Belt: Level 5 | Pearl Collector": {
    goal1: "Completed build White lvl5 Pearl Collector",
    goal2: "Progress on Adventure White lvl5 Creating with Variables!",
  },
  "Completed White Belt: Level 5 | Adventure Creating with Variables!": {
    goal1: "Progress on build White lvl6 Avoid the Asteroids!",
    goal2: "Completed build White lvl6 Avoid the Asteroids!",
  },
  "Progress on White Belt: Level 5 | Adventure Creating with Variables!": {
    goal1: "Completed Adventure White lvl5 Creating with Variables!",
    goal2: "Progress on build White lvl6 Avoid the Asteroids!",
  },
  "Completed White Belt: Level 6 | Avoid the Asteroids!": {
    goal1: "Progress on build White lvl6 Space Adventure",
    goal2: "Completed build White lvl6 Space Adventure",
  },
  "Progress on White Belt: Level 6 | Avoid the Asteroids!": {
    goal1: "Completed build White lvl6 Avoid the Asteroids!",
    goal2: "Progress on build White lvl6 Space Adventure",
  },
  "Completed White Belt: Level 6 | Space Adventure": {
    goal1: "Progress on Adventure White lvl6 Creating with Loops!",
    goal2: "Completed Adventure White lvl6 Creating with Loops!",
  },
  "Progress on White Belt: Level 6 | Space Adventure": {
    goal1: "Completed build White lvl6 Space Adventure",
    goal2: "Progress on Adventure White lvl6 Creating with Loops!",
  },
  "Completed White Belt: Level 6 | Adventure Creating with Loops!": {
    goal1: "Progress on build White lvl7 The Wizard's Mystic Toadstools",
    goal2: "Completed build White lvl7 The Wizard's Mystic Toadstools",
  },
  "Progress on White Belt: Level 6 | Adventure Creating with Loops!": {
    goal1: "Completed Adventure White lvl6 Creating with Loops!",
    goal2: "Progress on build White lvl7 The Wizard's Mystic Toadstools",
  },
  "Completed White Belt: Level 7 | The Wizard's Mystic Toadstools": {
    goal1: "Progress on build White lvl7 Unlock the Hidden Treasure!",
    goal2: "Completed build White lvl7 Unlock the Hidden Treasure!",
  },
  "Progress on White Belt: Level 7 | The Wizard's Mystic Toadstools": {
    goal1: "Completed build White lvl7 The Wizard's Mystic Toadstools",
    goal2: "Progress on build White lvl7 Unlock the Hidden Treasure!",
  },
  "Completed White Belt: Level 7 | Unlock the Hidden Treasure!": {
    goal1: "Progress on Adventure White lvl7 Creating with Conditionals!",
    goal2: "Completed Adventure White lvl7 Creating with Conditionals!",
  },
  "Progress on White Belt: Level 7 | Unlock the Hidden Treasure!": {
    goal1: "Completed build White lvl7 Unlock the Hidden Treasure!",
    goal2: "Progress on Adventure White lvl7 Creating with Conditionals!",
  },
  "Completed White Belt: Level 7 | Adventure Creating with Conditionals!": {
    goal1: "Progress on build White lvl8 Animated Aquarium",
    goal2: "Completed build White lvl8 Animated Aquarium",
  },
  "Progress on White Belt: Level 7 | Adventure Creating with Conditionals!": {
    goal1: "Completed Adventure White lvl7 Creating with Conditionals!",
    goal2: "Progress on build White lvl8 Animated Aquarium",
  },
  "Completed White Belt: Level 8 | Animated Aquarium": {
    goal1: "Progress on build White lvl8 Musical Mayhem",
    goal2: "Completed build White lvl8 Musical Mayhem",
  },
  "Progress on White Belt: Level 8 | Animated Aquarium": {
    goal1: "Completed build White lvl8 Animated Aquarium",
    goal2: "Progress on build White lvl8 Musical Mayhem",
  },
  "Completed White Belt: Level 8 | Musical Mayhem": {
    goal1: "Progress on Adventure White lvl8 White Belt Belt-Up Project!",
    goal2: "Completed Adventure White lvl8 White Belt Belt-Up Project!",
  },
  "Progress on White Belt: Level 8 | Musical Mayhem": {
    goal1: "Completed build White lvl8 Musical Mayhem",
    goal2: "Progress on Adventure White lvl8 White Belt Belt-Up Project!",
  },
  "Completed White Belt: Level 8 | Adventure White Belt Belt-Up Project!": {
    goal1: "Progress on build Yellow lvl1 Avoid the Snakes!",
    goal2: "Completed build Yellow lvl1 Avoid the Snakes!",
  },
  "Progress on White Belt: Level 8 | Adventure White Belt Belt-Up Project!": {
    goal1: "Completed Adventure White lvl8 White Belt Belt-Up Project!",
    goal2: "Progress on build Yellow lvl1 Avoid the Snakes!",
  },
  "Completed Yellow Belt: Level 1 | Avoid the Snakes!": {
    goal1: "Progress on build Yellow lvl1 Carrot Chase",
    goal2: "Completed build Yellow lvl1 Carrot Chase",
  },
  "Progress on Yellow Belt: Level 1 | Avoid the Snakes!": {
    goal1: "Completed build Yellow lvl1 Avoid the Snakes!",
    goal2: "Progress on build Yellow lvl1 Carrot Chase",
  },
  "Completed Yellow Belt: Level 1 | Carrot Chase": {
    goal1: "Progress on Adventure Yellow lvl1 Creating with Tilemaps!",
    goal2: "Completed Adventure Yellow lvl1 Creating with Tilemaps!",
  },
  "Progress on Yellow Belt: Level 1 | Carrot Chase": {
    goal1: "Completed build Yellow lvl1 Carrot Chase",
    goal2: "Progress on Adventure Yellow lvl1 Creating with Tilemaps!",
  },
  "Completed Yellow Belt: Level 1 | Adventure Creating with Tilemaps!": {
    goal1: "Progress on build Yellow lvl2 The Key to the Castle",
    goal2: "Completed build Yellow lvl2 The Key to the Castle",
  },
  "Progress on Yellow Belt: Level 1 | Adventure Creating with Tilemaps!": {
    goal1: "Completed Adventure Yellow lvl1 Creating with Tilemaps!",
    goal2: "Progress on build Yellow lvl2 The Key to the Castle",
  },
  "Completed Yellow Belt: Level 2 | The Key to the Castle": {
    goal1: "Progress on build Yellow lvl2 Coin Grabber!",
    goal2: "Completed build Yellow lvl2 Coin Grabber!",
  },
  "Progress on Yellow Belt: Level 2 | The Key to the Castle": {
    goal1: "Completed build Yellow lvl2 The Key to the Castle",
    goal2: "Progress on build Yellow lvl2 Coin Grabber!",
  },
  "Completed Yellow Belt: Level 2 | Coin Grabber!": {
    goal1: "Progress on Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
    goal2: "Completed Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
  },
  "Progress on Yellow Belt: Level 2 | Coin Grabber!": {
    goal1: "Completed build Yellow lvl2 Coin Grabber!",
    goal2: "Progress on Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
  },
  "Completed Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!": {
    goal1: "Progress on build Yellow lvl3 All About Me",
    goal2: "Completed build Yellow lvl3 All About Me",
  },
  "Progress on Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!": {
    goal1: "Completed Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
    goal2: "Progress on build Yellow lvl3 All About Me",
  },
  "Completed Yellow Belt: Level 3 | All About Me": {
    goal1: "Progress on build Yellow lvl3 Welcome to the Farm",
    goal2: "Completed build Yellow lvl3 Welcome to the Farm",
  },
  "Progress on Yellow Belt: Level 3 | All About Me": {
    goal1: "Completed build Yellow lvl3 All About Me",
    goal2: "Progress on build Yellow lvl3 Welcome to the Farm",
  },
  "Completed Yellow Belt: Level 3 | Welcome to the Farm": {
    goal1: "Progress on build Yellow lvl3 Mad Libs",
    goal2: "Completed build Yellow lvl3 Mad Libs",
  },
  "Progress on Yellow Belt: Level 3 | Welcome to the Farm": {
    goal1: "Completed build Yellow lvl3 Welcome to the Farm",
    goal2: "Progress on build Yellow lvl3 Mad Libs",
  },
  "Completed Yellow Belt: Level 3 | Mad Libs": {
    goal1: "Progress on Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
    goal2: "Completed Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
  },
  "Progress on Yellow Belt: Level 3 | Mad Libs": {
    goal1: "Completed build Yellow lvl3 Mad Libs",
    goal2: "Progress on Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
  },
  "Completed Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!": {
    goal1: "Progress on build Yellow lvl4 Memory Game",
    goal2: "Completed build Yellow lvl4 Memory Game",
  },
  "Progress on Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!": {
    goal1: "Completed Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
    goal2: "Progress on build Yellow lvl4 Memory Game",
  },
  "Completed Yellow Belt: Level 4 | Memory Game": {
    goal1: "Progress on build Yellow lvl4 Archeological Dig",
    goal2: "Completed build Yellow lvl4 Archeological Dig",
  },
  "Progress on Yellow Belt: Level 4 | Memory Game": {
    goal1: "Completed build Yellow lvl4 Memory Game",
    goal2: "Progress on build Yellow lvl4 Archeological Dig",
  },
  "Completed Yellow Belt: Level 4 | Archeological Dig": {
    goal1: "Progress on Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
    goal2: "Completed Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
  },
  "Progress on Yellow Belt: Level 4 | Archeological Dig": {
    goal1: "Completed build Yellow lvl4 Archeological Dig",
    goal2: "Progress on Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
  },
  "Completed Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!": {
    goal1: "Progress on build Yellow lvl5 Cookie Clicker Game!",
    goal2: "Completed build Yellow lvl5 Cookie Clicker Game!",
  },
  "Progress on Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!": {
    goal1: "Completed Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
    goal2: "Progress on build Yellow lvl5 Cookie Clicker Game!",
  },
  "Completed Yellow Belt: Level 5 | Cookie Clicker Game!": {
    goal1: "Progress on build Yellow lvl5 Snowflake Catch",
    goal2: "Completed build Yellow lvl5 Snowflake Catch",
  },
  "Progress on Yellow Belt: Level 5 | Cookie Clicker Game!": {
    goal1: "Completed build Yellow lvl5 Cookie Clicker Game!",
    goal2: "Progress on build Yellow lvl5 Snowflake Catch",
  },
  "Completed Yellow Belt: Level 5 | Snowflake Catch": {
    goal1: "Progress on Adventure Yellow lvl5 Creating with Functions!",
    goal2: "Completed Adventure Yellow lvl5 Creating with Functions!",
  },
  "Progress on Yellow Belt: Level 5 | Snowflake Catch": {
    goal1: "Completed build Yellow lvl5 Snowflake Catch",
    goal2: "Progress on Adventure Yellow lvl5 Creating with Functions!",
  },
  "Completed Yellow Belt: Level 5 | Adventure Creating with Functions!": {
    goal1: "Progress on build Yellow lvl6 Cactus Jump",
    goal2: "Completed build Yellow lvl6 Cactus Jump",
  },
  "Progress on Yellow Belt: Level 5 | Adventure Creating with Functions!": {
    goal1: "Completed Adventure Yellow lvl5 Creating with Functions!",
    goal2: "Progress on build Yellow lvl6 Cactus Jump",
  },
  "Completed Yellow Belt: Level 6 | Cactus Jump": {
    goal1: "Progress on build Yellow lvl6 Avoid the Roadblocks",
    goal2: "Completed build Yellow lvl6 Avoid the Roadblocks",
  },
  "Progress on Yellow Belt: Level 6 | Cactus Jump": {
    goal1: "Completed build Yellow lvl6 Cactus Jump",
    goal2: "Progress on build Yellow lvl6 Avoid the Roadblocks",
  },
  "Completed Yellow Belt: Level 6 | Avoid the Roadblocks": {
    goal1: "Progress on build Yellow lvl6 The Floor is Lava!",
    goal2: "Completed build Yellow lvl6 The Floor is Lava!",
  },
  "Progress on Yellow Belt: Level 6 | Avoid the Roadblocks": {
    goal1: "Completed build Yellow lvl6 Avoid the Roadblocks",
    goal2: "Progress on build Yellow lvl6 The Floor is Lava!",
  },
  "Completed Yellow Belt: Level 6 | The Floor is Lava!": {
    goal1: "Progress on Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
    goal2: "Completed Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
  },
  "Progress on Yellow Belt: Level 6 | The Floor is Lava!": {
    goal1: "Completed build Yellow lvl6 The Floor is Lava!",
    goal2: "Progress on Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
  },
  "Completed Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!": {
    goal1: "Progress on build Yellow lvl7 Magic Coin Scavenger Hunt",
    goal2: "Completed build Yellow lvl7 Magic Coin Scavenger Hunt",
  },
  "Progress on Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!": {
    goal1: "Completed Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
    goal2: "Progress on build Yellow lvl7 Magic Coin Scavenger Hunt",
  },
  "Completed Yellow Belt: Level 7 | Magic Coin Scavenger Hunt": {
    goal1: "Progress on build Yellow lvl7 Raindrop Invincibility",
    goal2: "Completed build Yellow lvl7 Raindrop Invincibility",
  },
  "Progress on Yellow Belt: Level 7 | Magic Coin Scavenger Hunt": {
    goal1: "Completed build Yellow lvl7 Magic Coin Scavenger Hunt",
    goal2: "Progress on build Yellow lvl7 Raindrop Invincibility",
  },
  "Completed Yellow Belt: Level 7 | Raindrop Invincibility": {
    goal1: "Progress on build Yellow lvl7 Snake Pit!",
    goal2: "Completed build Yellow lvl7 Snake Pit!",
  },
  "Progress on Yellow Belt: Level 7 | Raindrop Invincibility": {
    goal1: "Completed build Yellow lvl7 Raindrop Invincibility",
    goal2: "Progress on build Yellow lvl7 Snake Pit!",
  },
  "Completed Yellow Belt: Level 7 | Snake Pit!": {
    goal1: "Progress on Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
    goal2: "Completed Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
  },
  "Progress on Yellow Belt: Level 7 | Snake Pit!": {
    goal1: "Completed build Yellow lvl7 Snake Pit!",
    goal2: "Progress on Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
  },
  "Completed Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!": {
    goal1: "Progress on build Yellow lvl8 Bubble Pop!",
    goal2: "Completed build Yellow lvl8 Bubble Pop!",
  },
  "Progress on Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!": {
    goal1: "Completed Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
    goal2: "Progress on build Yellow lvl8 Bubble Pop!",
  },
  "Completed Yellow Belt: Level 8 | Bubble Pop!": {
    goal1: "Progress on build Yellow lvl8 Bee Catcher",
    goal2: "Completed build Yellow lvl8 Bee Catcher",
  },
  "Progress on Yellow Belt: Level 8 | Bubble Pop!": {
    goal1: "Completed build Yellow lvl8 Bubble Pop!",
    goal2: "Progress on build Yellow lvl8 Bee Catcher",
  },
  "Completed Yellow Belt: Level 8 | Bee Catcher": {
    goal1: "Progress on Adventure Yellow lvl8 Creating with For Index and While Loops!",
    goal2: "Completed Adventure Yellow lvl8 Creating with For Index and While Loops!",
  },
  "Progress on Yellow Belt: Level 8 | Bee Catcher": {
    goal1: "Completed build Yellow lvl8 Bee Catcher",
    goal2: "Progress on Adventure Yellow lvl8 Creating with For Index and While Loops!",
  },
  "Completed Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!": {
    goal1: "Progress on build Yellow lvl9 Block Jumper",
    goal2: "Completed build Yellow lvl9 Block Jumper",
  },
  "Progress on Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!": {
    goal1: "Completed Adventure Yellow lvl8 Creating with For Index and While Loops!",
    goal2: "Progress on build Yellow lvl9 Block Jumper",
  },
  "Completed Yellow Belt: Level 9 | Block Jumper": {
    goal1: "Progress on build Yellow lvl9 Bridge Builder",
    goal2: "Completed build Yellow lvl9 Bridge Builder",
  },
  "Progress on Yellow Belt: Level 9 | Block Jumper": {
    goal1: "Completed build Yellow lvl9 Block Jumper",
    goal2: "Progress on build Yellow lvl9 Bridge Builder",
  },
  "Completed Yellow Belt: Level 9 | Bridge Builder": {
    goal1: "Progress on build Yellow lvl9 Dino Defender",
    goal2: "Completed build Yellow lvl9 Dino Defender",
  },
  "Progress on Yellow Belt: Level 9 | Bridge Builder": {
    goal1: "Completed build Yellow lvl9 Bridge Builder",
    goal2: "Progress on build Yellow lvl9 Dino Defender",
  },
  "Completed Yellow Belt: Level 9 | Dino Defender": {
    goal1: "Progress on Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
    goal2: "Completed Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
  },
  "Progress on Yellow Belt: Level 9 | Dino Defender": {
    goal1: "Completed build Yellow lvl9 Dino Defender",
    goal2: "Progress on Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
  },
  "Completed Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!": {
    goal1: "Progress on build Yellow lvl10 Scenic Drive",
    goal2: "Completed build Yellow lvl10 Scenic Drive",
  },
  "Progress on Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!": {
    goal1: "Completed Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
    goal2: "Progress on build Yellow lvl10 Scenic Drive",
  },
  "Completed Yellow Belt: Level 10 | Scenic Drive": {
    goal1: "Progress on build Yellow lvl10 Burger Dash",
    goal2: "Completed build Yellow lvl10 Burger Dash",
  },
  "Progress on Yellow Belt: Level 10 | Scenic Drive": {
    goal1: "Completed build Yellow lvl10 Scenic Drive",
    goal2: "Progress on build Yellow lvl10 Burger Dash",
  },
  "Completed Yellow Belt: Level 10 | Burger Dash": {
    goal1: "Progress on Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
    goal2: "Completed Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
  },
  "Progress on Yellow Belt: Level 10 | Burger Dash": {
    goal1: "Completed build Yellow lvl10 Burger Dash",
    goal2: "Progress on Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
  },
  "Completed Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!": {
    goal1: "Progress on build Orange lvl1 Hello World!",
    goal2: "Completed build Orange lvl1 Hello World!",
  },
  "Progress on Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!": {
    goal1: "Completed Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
    goal2: "Progress on build Orange lvl1 Hello World!",
  },
  "Completed Orange Belt: Level 1 | Hello World!": {
    goal1: "Progress on build Orange lvl1 Bouncing on the Walls",
    goal2: "Completed build Orange lvl1 Bouncing on the Walls",
  },
  "Progress on Orange Belt: Level 1 | Hello World!": {
    goal1: "Completed build Orange lvl1 Hello World!",
    goal2: "Progress on build Orange lvl1 Bouncing on the Walls",
  },
  "Completed Orange Belt: Level 1 | Bouncing on the Walls": {
    goal1: "Progress on build Orange lvl1 Follow Me!",
    goal2: "Completed build Orange lvl1 Follow Me!",
  },
  "Progress on Orange Belt: Level 1 | Bouncing on the Walls": {
    goal1: "Completed build Orange lvl1 Bouncing on the Walls",
    goal2: "Progress on build Orange lvl1 Follow Me!",
  },
  "Completed Orange Belt: Level 1 | Follow Me!": {
    goal1: "Progress on Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
    goal2: "Completed Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
  },
  "Progress on Orange Belt: Level 1 | Follow Me!": {
    goal1: "Completed build Orange lvl1 Follow Me!",
    goal2: "Progress on Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
  },
  "Completed Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!": {
    goal1: "Progress on build Orange lvl2 Greeting Card",
    goal2: "Completed build Orange lvl2 Greeting Card",
  },
  "Progress on Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!": {
    goal1: "Completed Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
    goal2: "Progress on build Orange lvl2 Greeting Card",
  },
  "Completed Orange Belt: Level 2 | Greeting Card": {
    goal1: "Progress on build Orange lvl2 Show Time!",
    goal2: "Completed build Orange lvl2 Show Time!",
  },
  "Progress on Orange Belt: Level 2 | Greeting Card": {
    goal1: "Completed build Orange lvl2 Greeting Card",
    goal2: "Progress on build Orange lvl2 Show Time!",
  },
  "Completed Orange Belt: Level 2 | Show Time!": {
    goal1: "Progress on build Orange lvl2 Seasons Change",
    goal2: "Completed build Orange lvl2 Seasons Change",
  },
  "Progress on Orange Belt: Level 2 | Show Time!": {
    goal1: "Completed build Orange lvl2 Show Time!",
    goal2: "Progress on build Orange lvl2 Seasons Change",
  },
  "Completed Orange Belt: Level 2 | Seasons Change": {
    goal1: "Progress on Adventure Orange lvl2 Creating with Properties!",
    goal2: "Completed Adventure Orange lvl2 Creating with Properties!",
  },
  "Progress on Orange Belt: Level 2 | Seasons Change": {
    goal1: "Completed build Orange lvl2 Seasons Change",
    goal2: "Progress on Adventure Orange lvl2 Creating with Properties!",
  },
  "Completed Orange Belt: Level 2 | Adventure Creating with Properties!": {
    goal1: "Progress on build Orange lvl3 Screen Saver",
    goal2: "Completed build Orange lvl3 Screen Saver",
  },
  "Progress on Orange Belt: Level 2 | Adventure Creating with Properties!": {
    goal1: "Completed Adventure Orange lvl2 Creating with Properties!",
    goal2: "Progress on build Orange lvl3 Screen Saver",
  },
  "Completed Orange Belt: Level 3 | Screen Saver": {
    goal1: "Progress on build Orange lvl3 Button Clicker!",
    goal2: "Completed build Orange lvl3 Button Clicker!",
  },
  "Progress on Orange Belt: Level 3 | Screen Saver": {
    goal1: "Completed build Orange lvl3 Screen Saver",
    goal2: "Progress on build Orange lvl3 Button Clicker!",
  },
  "Completed Orange Belt: Level 3 | Button Clicker!": {
    goal1: "Progress on build Orange lvl3 Two Sprite Showdown!",
    goal2: "Completed build Orange lvl3 Two Sprite Showdown!",
  },
  "Progress on Orange Belt: Level 3 | Button Clicker!": {
    goal1: "Completed build Orange lvl3 Button Clicker!",
    goal2: "Progress on build Orange lvl3 Two Sprite Showdown!",
  },
  "Completed Orange Belt: Level 3 | Two Sprite Showdown!": {
    goal1: "Progress on Adventure Orange lvl3 Creating with Block Statements!",
    goal2: "Completed Adventure Orange lvl3 Creating with Block Statements!",
  },
  "Progress on Orange Belt: Level 3 | Two Sprite Showdown!": {
    goal1: "Completed build Orange lvl3 Two Sprite Showdown!",
    goal2: "Progress on Adventure Orange lvl3 Creating with Block Statements!",
  },
  "Completed Orange Belt: Level 3 | Adventure Creating with Block Statements!": {
    goal1: "Progress on build Orange lvl4 Save the Crab!",
    goal2: "Completed build Orange lvl4 Save the Crab!",
  },
  "Progress on Orange Belt: Level 3 | Adventure Creating with Block Statements!": {
    goal1: "Completed Adventure Orange lvl3 Creating with Block Statements!",
    goal2: "Progress on build Orange lvl4 Save the Crab!",
  },
  "Completed Orange Belt: Level 4 | Save the Crab!": {
    goal1: "Progress on build Orange lvl4 Going Bananas!",
    goal2: "Completed build Orange lvl4 Going Bananas!",
  },
  "Progress on Orange Belt: Level 4 | Save the Crab!": {
    goal1: "Completed build Orange lvl4 Save the Crab!",
    goal2: "Progress on build Orange lvl4 Going Bananas!",
  },
  "Completed Orange Belt: Level 4 | Going Bananas!": {
    goal1: "Progress on build Orange lvl4 Grab Bag!",
    goal2: "Completed build Orange lvl4 Grab Bag!",
  },
  "Progress on Orange Belt: Level 4 | Going Bananas!": {
    goal1: "Completed build Orange lvl4 Going Bananas!",
    goal2: "Progress on build Orange lvl4 Grab Bag!",
  },
  "Completed Orange Belt: Level 4 | Grab Bag!": {
    goal1: "Progress on Adventure Orange lvl4 Creating with nested block statements!",
    goal2: "Completed Adventure Orange lvl4 Creating with nested block statements!",
  },
  "Progress on Orange Belt: Level 4 | Grab Bag!": {
    goal1: "Completed build Orange lvl4 Grab Bag!",
    goal2: "Progress on Adventure Orange lvl4 Creating with nested block statements!",
  },
  "Completed Orange Belt: Level 4 | Adventure Creating with nested block statements!": {
    goal1: "Progress on build Orange lvl5 Shop 'Til You Drop",
    goal2: "Completed build Orange lvl5 Shop 'Til You Drop",
  },
  "Progress on Orange Belt: Level 4 | Adventure Creating with nested block statements!": {
    goal1: "Completed Adventure Orange lvl4 Creating with nested block statements!",
    goal2: "Progress on build Orange lvl5 Shop 'Til You Drop",
  },
  "Completed Orange Belt: Level 5 | Shop 'Til You Drop": {
    goal1: "Progress on build Orange lvl5 Cookie Stacker",
    goal2: "Completed build Orange lvl5 Cookie Stacker",
  },
  "Progress on Orange Belt: Level 5 | Shop 'Til You Drop": {
    goal1: "Completed build Orange lvl5 Shop 'Til You Drop",
    goal2: "Progress on build Orange lvl5 Cookie Stacker",
  },
  "Completed Orange Belt: Level 5 | Cookie Stacker": {
    goal1: "Progress on Adventure Orange lvl5 Creating with Assignment and Equality operators!",
    goal2: "Completed Adventure Orange lvl5 Creating with Assignment and Equality operators!",
  },
  "Progress on Orange Belt: Level 5 | Cookie Stacker": {
    goal1: "Completed build Orange lvl5 Cookie Stacker",
    goal2: "Progress on Adventure Orange lvl5 Creating with Assignment and Equality operators!",
  },
  "Completed Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!": {
    goal1: "Progress on build Orange lvl6 Shooting Hoops!",
    goal2: "Completed build Orange lvl6 Shooting Hoops!",
  },
  "Progress on Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!": {
    goal1: "Completed Adventure Orange lvl5 Creating with Assignment and Equality operators!",
    goal2: "Progress on build Orange lvl6 Shooting Hoops!",
  },
  "Completed Orange Belt: Level 6 | Shooting Hoops!": {
    goal1: "Progress on build Orange lvl6 Guess the Number!",
    goal2: "Completed build Orange lvl6 Guess the Number!",
  },
  "Progress on Orange Belt: Level 6 | Shooting Hoops!": {
    goal1: "Completed build Orange lvl6 Shooting Hoops!",
    goal2: "Progress on build Orange lvl6 Guess the Number!",
  },
  "Completed Orange Belt: Level 6 | Guess the Number!": {
    goal1: "Progress on Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
    goal2: "Completed Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
  },
  "Progress on Orange Belt: Level 6 | Guess the Number!": {
    goal1: "Completed build Orange lvl6 Guess the Number!",
    goal2: "Progress on Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
  },
  "Completed Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!": {
    goal1: "Progress on build Orange lvl7 Collect the Honey!",
    goal2: "Completed build Orange lvl7 Collect the Honey!",
  },
  "Progress on Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!": {
    goal1: "Completed Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
    goal2: "Progress on build Orange lvl7 Collect the Honey!",
  },
  "Completed Orange Belt: Level 7 | Collect the Honey!": {
    goal1: "Progress on build Orange lvl7 Snowball Fight!",
    goal2: "Completed build Orange lvl7 Snowball Fight!",
  },
  "Progress on Orange Belt: Level 7 | Collect the Honey!": {
    goal1: "Completed build Orange lvl7 Collect the Honey!",
    goal2: "Progress on build Orange lvl7 Snowball Fight!",
  },
  "Completed Orange Belt: Level 7 | Snowball Fight!": {
    goal1: "Progress on build Orange lvl7 Asteroid Attack!",
    goal2: "Completed build Orange lvl7 Asteroid Attack!",
  },
  "Progress on Orange Belt: Level 7 | Snowball Fight!": {
    goal1: "Completed build Orange lvl7 Snowball Fight!",
    goal2: "Progress on build Orange lvl7 Asteroid Attack!",
  },
  "Completed Orange Belt: Level 7 | Asteroid Attack!": {
    goal1: "Progress on Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
    goal2: "Completed Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
  },
  "Progress on Orange Belt: Level 7 | Asteroid Attack!": {
    goal1: "Completed build Orange lvl7 Asteroid Attack!",
    goal2: "Progress on Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
  },
  "Completed Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!": {
    goal1: "Progress on build Orange lvl8 Fireflies Collector",
    goal2: "Completed build Orange lvl8 Fireflies Collector",
  },
  "Progress on Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!": {
    goal1: "Completed Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
    goal2: "Progress on build Orange lvl8 Fireflies Collector",
  },
  "Completed Orange Belt: Level 8 | Fireflies Collector": {
    goal1: "Progress on build Orange lvl8 Counting Sprites",
    goal2: "Completed build Orange lvl8 Counting Sprites",
  },
  "Progress on Orange Belt: Level 8 | Fireflies Collector": {
    goal1: "Completed build Orange lvl8 Fireflies Collector",
    goal2: "Progress on build Orange lvl8 Counting Sprites",
  },
  "Completed Orange Belt: Level 8 | Counting Sprites": {
    goal1: "Progress on build Orange lvl8 Mystery Boxes!",
    goal2: "Completed build Orange lvl8 Mystery Boxes!",
  },
  "Progress on Orange Belt: Level 8 | Counting Sprites": {
    goal1: "Completed build Orange lvl8 Counting Sprites",
    goal2: "Progress on build Orange lvl8 Mystery Boxes!",
  },
  "Completed Orange Belt: Level 8 | Mystery Boxes!": {
    goal1: "Progress on Adventure Orange lvl8 Creating with For Loops!",
    goal2: "Completed Adventure Orange lvl8 Creating with For Loops!",
  },
  "Progress on Orange Belt: Level 8 | Mystery Boxes!": {
    goal1: "Completed build Orange lvl8 Mystery Boxes!",
    goal2: "Progress on Adventure Orange lvl8 Creating with For Loops!",
  },
  "Completed Orange Belt: Level 8 | Adventure Creating with For Loops!": {
    goal1: "Progress on build Orange lvl9 Magic 8 Ball",
    goal2: "Completed build Orange lvl9 Magic 8 Ball",
  },
  "Progress on Orange Belt: Level 8 | Adventure Creating with For Loops!": {
    goal1: "Completed Adventure Orange lvl8 Creating with For Loops!",
    goal2: "Progress on build Orange lvl9 Magic 8 Ball",
  },
  "Completed Orange Belt: Level 9 | Magic 8 Ball": {
    goal1: "Progress on build Orange lvl9 What's in a Name?",
    goal2: "Completed build Orange lvl9 What's in a Name?",
  },
  "Progress on Orange Belt: Level 9 | Magic 8 Ball": {
    goal1: "Completed build Orange lvl9 Magic 8 Ball",
    goal2: "Progress on build Orange lvl9 What's in a Name?",
  },
  "Completed Orange Belt: Level 9 | What's in a Name?": {
    goal1: "Progress on build Orange lvl9 Concentration",
    goal2: "Completed build Orange lvl9 Concentration",
  },
  "Progress on Orange Belt: Level 9 | What's in a Name?": {
    goal1: "Completed build Orange lvl9 What's in a Name?",
    goal2: "Progress on build Orange lvl9 Concentration",
  },
  "Completed Orange Belt: Level 9 | Concentration": {
    goal1: "Progress on Adventure Orange lvl9 Creating with Arrays!",
    goal2: "Completed Adventure Orange lvl9 Creating with Arrays!",
  },
  "Progress on Orange Belt: Level 9 | Concentration": {
    goal1: "Completed build Orange lvl9 Concentration",
    goal2: "Progress on Adventure Orange lvl9 Creating with Arrays!",
  },
  "Completed Orange Belt: Level 9 | Adventure Creating with Arrays!": {
    goal1: "Progress on build Orange lvl10 Match Game",
    goal2: "Completed build Orange lvl10 Match Game",
  },
  "Progress on Orange Belt: Level 9 | Adventure Creating with Arrays!": {
    goal1: "Completed Adventure Orange lvl9 Creating with Arrays!",
    goal2: "Progress on build Orange lvl10 Match Game",
  },
  "Completed Orange Belt: Level 10 | Match Game": {
    goal1: "Progress on build Orange lvl10 Username Generator",
    goal2: "Completed build Orange lvl10 Username Generator",
  },
  "Progress on Orange Belt: Level 10 | Match Game": {
    goal1: "Completed build Orange lvl10 Match Game",
    goal2: "Progress on build Orange lvl10 Username Generator",
  },
  "Completed Orange Belt: Level 10 | Username Generator": {
    goal1: "Progress on build Orange lvl10 Memory Match",
    goal2: "Completed build Orange lvl10 Memory Match",
  },
  "Progress on Orange Belt: Level 10 | Username Generator": {
    goal1: "Completed build Orange lvl10 Username Generator",
    goal2: "Progress on build Orange lvl10 Memory Match",
  },
  "Completed Orange Belt: Level 10 | Memory Match": {
    goal1: "Progress on Adventure Orange lvl10 Creating with Array Functions!",
    goal2: "Completed Adventure Orange lvl10 Creating with Array Functions!",
  },
  "Progress on Orange Belt: Level 10 | Memory Match": {
    goal1: "Completed build Orange lvl10 Memory Match",
    goal2: "Progress on Adventure Orange lvl10 Creating with Array Functions!",
  },
  "Completed Orange Belt: Level 10 | Adventure Creating with Array Functions!": {
    goal1: "Progress on build Orange lvl11 Pizza Party",
    goal2: "Completed build Orange lvl11 Pizza Party",
  },
  "Progress on Orange Belt: Level 10 | Adventure Creating with Array Functions!": {
    goal1: "Completed Adventure Orange lvl10 Creating with Array Functions!",
    goal2: "Progress on build Orange lvl11 Pizza Party",
  },
  "Completed Orange Belt: Level 11 | Pizza Party": {
    goal1: "Progress on build Orange lvl11 Barn Breakout!",
    goal2: "Completed build Orange lvl11 Barn Breakout!",
  },
  "Progress on Orange Belt: Level 11 | Pizza Party": {
    goal1: "Completed build Orange lvl11 Pizza Party",
    goal2: "Progress on build Orange lvl11 Barn Breakout!",
  },
  "Completed Orange Belt: Level 11 | Barn Breakout!": {
    goal1: "Progress on build Orange lvl11 Damage Control",
    goal2: "Completed build Orange lvl11 Damage Control",
  },
  "Progress on Orange Belt: Level 11 | Barn Breakout!": {
    goal1: "Completed build Orange lvl11 Barn Breakout!",
    goal2: "Progress on build Orange lvl11 Damage Control",
  },
  "Completed Orange Belt: Level 11 | Damage Control": {
    goal1: "Progress on Adventure Orange lvl11 Creating with Functions!",
    goal2: "Completed Adventure Orange lvl11 Creating with Functions!",
  },
  "Progress on Orange Belt: Level 11 | Damage Control": {
    goal1: "Completed build Orange lvl11 Damage Control",
    goal2: "Progress on Adventure Orange lvl11 Creating with Functions!",
  },
  "Completed Orange Belt: Level 11 | Adventure Creating with Functions!": {
    goal1: "Progress on build Orange lvl12 Escape the Haunted Castle!",
    goal2: "Completed build Orange lvl12 Escape the Haunted Castle!",
  },
  "Progress on Orange Belt: Level 11 | Adventure Creating with Functions!": {
    goal1: "Completed Adventure Orange lvl11 Creating with Functions!",
    goal2: "Progress on build Orange lvl12 Escape the Haunted Castle!",
  },
  "Completed Orange Belt: Level 12 | Escape the Haunted Castle!": {
    goal1: "Progress on build Orange lvl12 City Scroller",
    goal2: "Completed build Orange lvl12 City Scroller",
  },
  "Progress on Orange Belt: Level 12 | Escape the Haunted Castle!": {
    goal1: "Completed build Orange lvl12 Escape the Haunted Castle!",
    goal2: "Progress on build Orange lvl12 City Scroller",
  },
  "Completed Orange Belt: Level 12 | City Scroller": {
    goal1: "Progress on build Orange lvl12 Find the Ninja!",
    goal2: "Completed build Orange lvl12 Find the Ninja!",
  },
  "Progress on Orange Belt: Level 12 | City Scroller": {
    goal1: "Completed build Orange lvl12 City Scroller",
    goal2: "Progress on build Orange lvl12 Find the Ninja!",
  },
  "Completed Orange Belt: Level 12 | Find the Ninja!": {
    goal1: "Progress on Adventure Orange lvl12 Orange Belt Belt-Up Project",
    goal2: "Completed Adventure Orange lvl12 Orange Belt Belt-Up Project",
  },
  "Progress on Orange Belt: Level 12 | Find the Ninja!": {
    goal1: "Completed build Orange lvl12 Find the Ninja!",
    goal2: "Progress on Adventure Orange lvl12 Orange Belt Belt-Up Project",
  },
  "Completed Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project": {
    goal1: "Progress on build Green lvl1 The Bookcase",
    goal2: "Completed build Green lvl1 The Bookcase",
  },
  "Progress on Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project": {
    goal1: "Completed Adventure Orange lvl12 Orange Belt Belt-Up Project",
    goal2: "Progress on build Green lvl1 The Bookcase",
  },
  "Completed Green Belt: Level 1 | The Bookcase": {
    goal1: "Progress on build Green lvl1 Shark Attack",
    goal2: "Completed build Green lvl1 Shark Attack",
  },
  "Progress on Green Belt: Level 1 | The Bookcase": {
    goal1: "Completed build Green lvl1 The Bookcase",
    goal2: "Progress on build Green lvl1 Shark Attack",
  },
  "Completed Green Belt: Level 1 | Shark Attack": {
    goal1: "Progress on Adventure Green lvl1 Creating with the Assets Menu!",
    goal2: "Completed Adventure Green lvl1 Creating with the Assets Menu!",
  },
  "Progress on Green Belt: Level 1 | Shark Attack": {
    goal1: "Completed build Green lvl1 Shark Attack",
    goal2: "Progress on Adventure Green lvl1 Creating with the Assets Menu!",
  },
  "Completed Green Belt: Level 1 | Adventure Creating with the Assets Menu!": {
    goal1: "Progress on build Green lvl2 Two Worlds",
    goal2: "Completed build Green lvl2 Two Worlds",
  },
  "Progress on Green Belt: Level 1 | Adventure Creating with the Assets Menu!": {
    goal1: "Completed Adventure Green lvl1 Creating with the Assets Menu!",
    goal2: "Progress on build Green lvl2 Two Worlds",
  },
  "Completed Green Belt: Level 2 | Two Worlds": {
    goal1: "Progress on build Green lvl2 Avoid the Haystacks!",
    goal2: "Completed build Green lvl2 Avoid the Haystacks!",
  },
  "Progress on Green Belt: Level 2 | Two Worlds": {
    goal1: "Completed build Green lvl2 Two Worlds",
    goal2: "Progress on build Green lvl2 Avoid the Haystacks!",
  },
  "Completed Green Belt: Level 2 | Avoid the Haystacks!": {
    goal1: "Progress on Adventure Green lvl2 Creating with Tilemap Overlap Events!",
    goal2: "Completed Adventure Green lvl2 Creating with Tilemap Overlap Events!",
  },
  "Progress on Green Belt: Level 2 | Avoid the Haystacks!": {
    goal1: "Completed build Green lvl2 Avoid the Haystacks!",
    goal2: "Progress on Adventure Green lvl2 Creating with Tilemap Overlap Events!",
  },
  "Completed Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!": {
    goal1: "",
    goal2: "",
  },
  "Progress on Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!": {
    goal1: "Completed Adventure Green lvl2 Creating with Tilemap Overlap Events!",
    goal2: "",
  },
} as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: "Completed White Belt: Level 1 | Your First Sprite", label: "Completed White Belt: Level 1 | Your First Sprite" },
  { value: "Progress on White Belt: Level 1 | Your First Sprite", label: "Progress on White Belt: Level 1 | Your First Sprite" },
  { value: "Completed White Belt: Level 1 | Spooky Effects", label: "Completed White Belt: Level 1 | Spooky Effects" },
  { value: "Progress on White Belt: Level 1 | Spooky Effects", label: "Progress on White Belt: Level 1 | Spooky Effects" },
  { value: "Completed White Belt: Level 1 | Adventure My First Coding Project", label: "Completed White Belt: Level 1 | Adventure My First Coding Project" },
  { value: "Progress on White Belt: Level 1 | Adventure My First Coding Project", label: "Progress on White Belt: Level 1 | Adventure My First Coding Project" },
  { value: "Completed White Belt: Level 2 | Meet New Friends!", label: "Completed White Belt: Level 2 | Meet New Friends!" },
  { value: "Progress on White Belt: Level 2 | Meet New Friends!", label: "Progress on White Belt: Level 2 | Meet New Friends!" },
  { value: "Completed White Belt: Level 2 | Where's My Puppy?", label: "Completed White Belt: Level 2 | Where's My Puppy?" },
  { value: "Progress on White Belt: Level 2 | Where's My Puppy?", label: "Progress on White Belt: Level 2 | Where's My Puppy!" },
  { value: "Completed White Belt: Level 2 | Adventure Creating with", label: "Completed White Belt: Level 2 | Adventure Creating with" },
  { value: "Progress on White Belt: Level 2 | Adventure Creating with", label: "Progress on White Belt: Level 2 | Adventure Creating with" },
  { value: "Completed White Belt: Level 3 | Fly Me to the Moon!", label: "Completed White Belt: Level 3 | Fly Me to the Moon!" },
  { value: "Progress on White Belt: Level 3 | Fly Me to the Moon!", label: "Progress on White Belt: Level 3 | Fly Me to the Moon!" },
  { value: "Completed White Belt: Level 3 | Dinner Time!", label: "Completed White Belt: Level 3 | Dinner Time!" },
  { value: "Progress on White Belt: Level 3 | Dinner Time!", label: "Progress on White Belt: Level 3 | Dinner Time!" },
  { value: "Completed White Belt: Level 3 | Adventure Creating with Events!", label: "Completed White Belt: Level 3 | Adventure Creating with Events!" },
  { value: "Progress on White Belt: Level 3 | Adventure Creating with Events!", label: "Progress on White Belt: Level 3 | Adventure Creating with Events!" },
  { value: "Completed White Belt: Level 4 | A Piece of Cake", label: "Completed White Belt: Level 4 | A Piece of Cake" },
  { value: "Progress on White Belt: Level 4 | A Piece of Cake", label: "Progress on White Belt: Level 4 | A Piece of Cake" },
  { value: "Completed White Belt: Level 4 | Underwater Food Chain", label: "Completed White Belt: Level 4 | Underwater Food Chain" },
  { value: "Progress on White Belt: Level 4 | Underwater Food Chain", label: "Progress on White Belt: Level 4 | Underwater Food Chain" },
  { value: "Completed White Belt: Level 4 | Adventure Creating with Functions", label: "Completed White Belt: Level 4 | Adventure Creating with Functions" },
  { value: "Progress on White Belt: Level 4 | Adventure Creating with Functions", label: "Progress on White Belt: Level 4 | Adventure Creating with Functions" },
  { value: "Completed White Belt: Level 5 | Munchy Munchy Monkey", label: "Completed White Belt: Level 5 | Munchy Munchy Monkey" },
  { value: "Progress on White Belt: Level 5 | Munchy Munchy Monkey", label: "Progress on White Belt: Level 5 | Munchy Munchy Monkey" },
  { value: "Completed White Belt: Level 5 | Pearl Collector", label: "Completed White Belt: Level 5 | Pearl Collector" },
  { value: "Progress on White Belt: Level 5 | Pearl Collector", label: "Progress on White Belt: Level 5 | Pearl Collector" },
  { value: "Completed White Belt: Level 5 | Adventure Creating with Variables!", label: "Completed White Belt: Level 5 | Adventure Creating with Variables!" },
  { value: "Progress on White Belt: Level 5 | Adventure Creating with Variables!", label: "Progress on White Belt: Level 5 | Adventure Creating with Variables!" },
  { value: "Completed White Belt: Level 6 | Avoid the Asteroids!", label: "Completed White Belt: Level 6 | Avoid the Asteroids!" },
  { value: "Progress on White Belt: Level 6 | Avoid the Asteroids!", label: "Progress on White Belt: Level 6 | Avoid the Asteroids!" },
  { value: "Completed White Belt: Level 6 | Space Adventure", label: "Completed White Belt: Level 6 | Space Adventure" },
  { value: "Progress on White Belt: Level 6 | Space Adventure", label: "Progress on White Belt: Level 6 | Space Adventure" },
  { value: "Completed White Belt: Level 6 | Adventure Creating with Loops!", label: "Completed White Belt: Level 6 | Adventure Creating with Loops!" },
  { value: "Progress on White Belt: Level 6 | Adventure Creating with Loops!", label: "Progress on White Belt: Level 6 | Adventure Creating with Loops!" },
  { value: "Completed White Belt: Level 7 | The Wizard's Mystic Toadstools", label: "Completed White Belt: Level 7 | The Wizard's Mystic Toadstools" },
  { value: "Progress on White Belt: Level 7 | The Wizard's Mystic Toadstools", label: "Progress on White Belt: Level 7 | The Wizard's Mystic Toadstools" },
  { value: "Completed White Belt: Level 7 | Unlock the Hidden Treasure!", label: "Completed White Belt: Level 7 | Unlock the Hidden Treasure!" },
  { value: "Progress on White Belt: Level 7 | Unlock the Hidden Treasure!", label: "Progress on White Belt: Level 7 | Unlock the Hidden Treasure!" },
  { value: "Completed White Belt: Level 7 | Adventure Creating with Conditionals!", label: "Completed White Belt: Level 7 | Adventure Creating with Conditionals!" },
  { value: "Progress on White Belt: Level 7 | Adventure Creating with Conditionals!", label: "Progress on White Belt: Level 7 | Adventure Creating with Conditionals!" },
  { value: "Completed White Belt: Level 8 | Animated Aquarium", label: "Completed White Belt: Level 8 | Animated Aquarium" },
  { value: "Progress on White Belt: Level 8 | Animated Aquarium", label: "Progress on White Belt: Level 8 | Animated Aquarium" },
  { value: "Completed White Belt: Level 8 | Musical Mayhem", label: "Completed White Belt: Level 8 | Musical Mayhem" },
  { value: "Progress on White Belt: Level 8 | Musical Mayhem", label: "Progress on White Belt: Level 8 | Musical Mayhem" },
  { value: "Completed White Belt: Level 8 | Adventure White Belt Belt-Up Project!", label: "Completed White Belt: Level 8 | Adventure White Belt Belt-Up Project!" },
  { value: "Progress on White Belt: Level 8 | Adventure White Belt Belt-Up Project!", label: "Progress on White Belt: Level 8 | Adventure White Belt Belt-Up Project!" },
  { value: "Completed Yellow Belt: Level 1 | Avoid the Snakes!", label: "Completed Yellow Belt: Level 1 | Avoid the Snakes!" },
  { value: "Progress on Yellow Belt: Level 1 | Avoid the Snakes!", label: "Progress on Yellow Belt: Level 1 | Avoid the Snakes!" },
  { value: "Completed Yellow Belt: Level 1 | Carrot Chase", label: "Completed Yellow Belt: Level 1 | Carrot Chase" },
  { value: "Progress on Yellow Belt: Level 1 | Carrot Chase", label: "Progress on Yellow Belt: Level 1 | Carrot Chase" },
  { value: "Completed Yellow Belt: Level 1 | Adventure Creating with Tilemaps!", label: "Completed Yellow Belt: Level 1 | Adventure Creating with Tilemaps!" },
  { value: "Progress on Yellow Belt: Level 1 | Adventure Creating with Tilemaps!", label: "Progress on Yellow Belt: Level 1 | Adventure Creating with Tilemaps!" },
  { value: "Completed Yellow Belt: Level 2 | The Key to the Castle", label: "Completed Yellow Belt: Level 2 | The Key to the Castle" },
  { value: "Progress on Yellow Belt: Level 2 | The Key to the Castle", label: "Progress on Yellow Belt: Level 2 | The Key to the Castle" },
  { value: "Completed Yellow Belt: Level 2 | Coin Grabber!", label: "Completed Yellow Belt: Level 2 | Coin Grabber!" },
  { value: "Progress on Yellow Belt: Level 2 | Coin Grabber!", label: "Progress on Yellow Belt: Level 2 | Coin Grabber!" },
  { value: "Completed Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!", label: "Completed Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!" },
  { value: "Progress on Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!", label: "Progress on Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!" },
  { value: "Completed Yellow Belt: Level 3 | All About Me", label: "Completed Yellow Belt: Level 3 | All About Me" },
  { value: "Progress on Yellow Belt: Level 3 | All About Me", label: "Progress on Yellow Belt: Level 3 | All About Me" },
  { value: "Completed Yellow Belt: Level 3 | Welcome to the Farm", label: "Completed Yellow Belt: Level 3 | Welcome to the Farm" },
  { value: "Progress on Yellow Belt: Level 3 | Welcome to the Farm", label: "Progress on Yellow Belt: Level 3 | Welcome to the Farm" },
  { value: "Completed Yellow Belt: Level 3 | Mad Libs", label: "Completed Yellow Belt: Level 3 | Mad Libs" },
  { value: "Progress on Yellow Belt: Level 3 | Mad Libs", label: "Progress on Yellow Belt: Level 3 | Mad Libs" },
  { value: "Completed Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!", label: "Completed Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!" },
  { value: "Progress on Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!", label: "Progress on Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!" },
  { value: "Completed Yellow Belt: Level 4 | Memory Game", label: "Completed Yellow Belt: Level 4 | Memory Game" },
  { value: "Progress on Yellow Belt: Level 4 | Memory Game", label: "Progress on Yellow Belt: Level 4 | Memory Game" },
  { value: "Completed Yellow Belt: Level 4 | Archeological Dig", label: "Completed Yellow Belt: Level 4 | Archeological Dig" },
  { value: "Progress on Yellow Belt: Level 4 | Archeological Dig", label: "Progress on Yellow Belt: Level 4 | Archeological Dig" },
  { value: "Completed Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!", label: "Completed Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!" },
  { value: "Progress on Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!", label: "Progress on Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!" },
  { value: "Completed Yellow Belt: Level 5 | Cookie Clicker Game!", label: "Completed Yellow Belt: Level 5 | Cookie Clicker Game!" },
  { value: "Progress on Yellow Belt: Level 5 | Cookie Clicker Game!", label: "Progress on Yellow Belt: Level 5 | Cookie Clicker Game!" },
  { value: "Completed Yellow Belt: Level 5 | Snowflake Catch", label: "Completed Yellow Belt: Level 5 | Snowflake Catch" },
  { value: "Progress on Yellow Belt: Level 5 | Snowflake Catch", label: "Progress on Yellow Belt: Level 5 | Snowflake Catch" },
  { value: "Completed Yellow Belt: Level 5 | Adventure Creating with Functions!", label: "Completed Yellow Belt: Level 5 | Adventure Creating with Functions!" },
  { value: "Progress on Yellow Belt: Level 5 | Adventure Creating with Functions!", label: "Progress on Yellow Belt: Level 5 | Adventure Creating with Functions!" },
  { value: "Completed Yellow Belt: Level 6 | Cactus Jump", label: "Completed Yellow Belt: Level 6 | Cactus Jump" },
  { value: "Progress on Yellow Belt: Level 6 | Cactus Jump", label: "Progress on Yellow Belt: Level 6 | Cactus Jump" },
  { value: "Completed Yellow Belt: Level 6 | Avoid the Roadblocks", label: "Completed Yellow Belt: Level 6 | Avoid the Roadblocks" },
  { value: "Progress on Yellow Belt: Level 6 | Avoid the Roadblocks", label: "Progress on Yellow Belt: Level 6 | Avoid the Roadblocks" },
  { value: "Completed Yellow Belt: Level 6 | The Floor is Lava!", label: "Completed Yellow Belt: Level 6 | The Floor is Lava!" },
  { value: "Progress on Yellow Belt: Level 6 | The Floor is Lava!", label: "Progress on Yellow Belt: Level 6 | The Floor is Lava!" },
  { value: "Completed Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!", label: "Completed Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!" },
  { value: "Progress on Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!", label: "Progress on Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!" },
  { value: "Completed Yellow Belt: Level 7 | Magic Coin Scavenger Hunt", label: "Completed Yellow Belt: Level 7 | Magic Coin Scavenger Hunt" },
  { value: "Progress on Yellow Belt: Level 7 | Magic Coin Scavenger Hunt", label: "Progress on Yellow Belt: Level 7 | Magic Coin Scavenger Hunt" },
  { value: "Completed Yellow Belt: Level 7 | Raindrop Invincibility", label: "Completed Yellow Belt: Level 7 | Raindrop Invincibility" },
  { value: "Progress on Yellow Belt: Level 7 | Raindrop Invincibility", label: "Progress on Yellow Belt: Level 7 | Raindrop Invincibility" },
  { value: "Completed Yellow Belt: Level 7 | Snake Pit!", label: "Completed Yellow Belt: Level 7 | Snake Pit!" },
  { value: "Progress on Yellow Belt: Level 7 | Snake Pit!", label: "Progress on Yellow Belt: Level 7 | Snake Pit!" },
  { value: "Completed Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!", label: "Completed Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!" },
  { value: "Progress on Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!", label: "Progress on Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!" },
  { value: "Completed Yellow Belt: Level 8 | Bubble Pop!", label: "Completed Yellow Belt: Level 8 | Bubble Pop!" },
  { value: "Progress on Yellow Belt: Level 8 | Bubble Pop!", label: "Progress on Yellow Belt: Level 8 | Bubble Pop!" },
  { value: "Completed Yellow Belt: Level 8 | Bee Catcher", label: "Completed Yellow Belt: Level 8 | Bee Catcher" },
  { value: "Progress on Yellow Belt: Level 8 | Bee Catcher", label: "Progress on Yellow Belt: Level 8 | Bee Catcher" },
  { value: "Completed Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!", label: "Completed Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!" },
  { value: "Progress on Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!", label: "Progress on Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!" },
  { value: "Completed Yellow Belt: Level 9 | Block Jumper", label: "Completed Yellow Belt: Level 9 | Block Jumper" },
  { value: "Progress on Yellow Belt: Level 9 | Block Jumper", label: "Progress on Yellow Belt: Level 9 | Block Jumper" },
  { value: "Completed Yellow Belt: Level 9 | Bridge Builder", label: "Completed Yellow Belt: Level 9 | Bridge Builder" },
  { value: "Progress on Yellow Belt: Level 9 | Bridge Builder", label: "Progress on Yellow Belt: Level 9 | Bridge Builder" },
  { value: "Completed Yellow Belt: Level 9 | Dino Defender", label: "Completed Yellow Belt: Level 9 | Dino Defender" },
  { value: "Progress on Yellow Belt: Level 9 | Dino Defender", label: "Progress on Yellow Belt: Level 9 | Dino Defender" },
  { value: "Completed Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!", label: "Completed Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!" },
  { value: "Progress on Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!", label: "Progress on Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!" },
  { value: "Completed Yellow Belt: Level 10 | Scenic Drive", label: "Completed Yellow Belt: Level 10 | Scenic Drive" },
  { value: "Progress on Yellow Belt: Level 10 | Scenic Drive", label: "Progress on Yellow Belt: Level 10 | Scenic Drive" },
  { value: "Completed Yellow Belt: Level 10 | Burger Dash", label: "Completed Yellow Belt: Level 10 | Burger Dash" },
  { value: "Progress on Yellow Belt: Level 10 | Burger Dash", label: "Progress on Yellow Belt: Level 10 | Burger Dash" },
  { value: "Completed Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!", label: "Completed Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!" },
  { value: "Progress on Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!", label: "Progress on Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!" },
  { value: "Completed Orange Belt: Level 1 | Hello World!", label: "Completed Orange Belt: Level 1 | Hello World!" },
  { value: "Progress on Orange Belt: Level 1 | Hello World!", label: "Progress on Orange Belt: Level 1 | Hello World!" },
  { value: "Completed Orange Belt: Level 1 | Bouncing on the Walls", label: "Completed Orange Belt: Level 1 | Bouncing on the Walls" },
  { value: "Progress on Orange Belt: Level 1 | Bouncing on the Walls", label: "Progress on Orange Belt: Level 1 | Bouncing on the Walls" },
  { value: "Completed Orange Belt: Level 1 | Follow Me!", label: "Completed Orange Belt: Level 1 | Follow Me!" },
  { value: "Progress on Orange Belt: Level 1 | Follow Me!", label: "Progress on Orange Belt: Level 1 | Follow Me!" },
  { value: "Completed Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!", label: "Completed Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!" },
  { value: "Progress on Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!", label: "Progress on Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!" },
  { value: "Completed Orange Belt: Level 2 | Greeting Card", label: "Completed Orange Belt: Level 2 | Greeting Card" },
  { value: "Progress on Orange Belt: Level 2 | Greeting Card", label: "Progress on Orange Belt: Level 2 | Greeting Card" },
  { value: "Completed Orange Belt: Level 2 | Show Time!", label: "Completed Orange Belt: Level 2 | Show Time!" },
  { value: "Progress on Orange Belt: Level 2 | Show Time!", label: "Progress on Orange Belt: Level 2 | Show Time!" },
  { value: "Completed Orange Belt: Level 2 | Seasons Change", label: "Completed Orange Belt: Level 2 | Seasons Change" },
  { value: "Progress on Orange Belt: Level 2 | Seasons Change", label: "Progress on Orange Belt: Level 2 | Seasons Change" },
  { value: "Completed Orange Belt: Level 2 | Adventure Creating with Properties!", label: "Completed Orange Belt: Level 2 | Adventure Creating with Properties!" },
  { value: "Progress on Orange Belt: Level 2 | Adventure Creating with Properties!", label: "Progress on Orange Belt: Level 2 | Adventure Creating with Properties!" },
  { value: "Completed Orange Belt: Level 3 | Screen Saver", label: "Completed Orange Belt: Level 3 | Screen Saver" },
  { value: "Progress on Orange Belt: Level 3 | Screen Saver", label: "Progress on Orange Belt: Level 3 | Screen Saver" },
  { value: "Completed Orange Belt: Level 3 | Button Clicker!", label: "Completed Orange Belt: Level 3 | Button Clicker!" },
  { value: "Progress on Orange Belt: Level 3 | Button Clicker!", label: "Progress on Orange Belt: Level 3 | Button Clicker!" },
  { value: "Completed Orange Belt: Level 3 | Two Sprite Showdown!", label: "Completed Orange Belt: Level 3 | Two Sprite Showdown!" },
  { value: "Progress on Orange Belt: Level 3 | Two Sprite Showdown!", label: "Progress on Orange Belt: Level 3 | Two Sprite Showdown!" },
  { value: "Completed Orange Belt: Level 3 | Adventure Creating with Block Statements!", label: "Completed Orange Belt: Level 3 | Adventure Creating with Block Statements!" },
  { value: "Progress on Orange Belt: Level 3 | Adventure Creating with Block Statements!", label: "Progress on Orange Belt: Level 3 | Adventure Creating with Block Statements!" },
  { value: "Completed Orange Belt: Level 4 | Save the Crab!", label: "Completed Orange Belt: Level 4 | Save the Crab!" },
  { value: "Progress on Orange Belt: Level 4 | Save the Crab!", label: "Progress on Orange Belt: Level 4 | Save the Crab!" },
  { value: "Completed Orange Belt: Level 4 | Going Bananas!", label: "Completed Orange Belt: Level 4 | Going Bananas!" },
  { value: "Progress on Orange Belt: Level 4 | Going Bananas!", label: "Progress on Orange Belt: Level 4 | Going Bananas!" },
  { value: "Completed Orange Belt: Level 4 | Grab Bag!", label: "Completed Orange Belt: Level 4 | Grab Bag!" },
  { value: "Progress on Orange Belt: Level 4 | Grab Bag!", label: "Progress on Orange Belt: Level 4 | Grab Bag!" },
  { value: "Completed Orange Belt: Level 4 | Adventure Creating with nested block statements!", label: "Completed Orange Belt: Level 4 | Adventure Creating with nested block statements!" },
  { value: "Progress on Orange Belt: Level 4 | Adventure Creating with nested block statements!", label: "Progress on Orange Belt: Level 4 | Adventure Creating with nested block statements!" },
  { value: "Completed Orange Belt: Level 5 | Shop 'Til You Drop", label: "Completed Orange Belt: Level 5 | Shop 'Til You Drop" },
  { value: "Progress on Orange Belt: Level 5 | Shop 'Til You Drop", label: "Progress on Orange Belt: Level 5 | Shop 'Til You Drop" },
  { value: "Completed Orange Belt: Level 5 | Cookie Stacker", label: "Completed Orange Belt: Level 5 | Cookie Stacker" },
  { value: "Progress on Orange Belt: Level 5 | Cookie Stacker", label: "Progress on Orange Belt: Level 5 | Cookie Stacker" },
  { value: "Completed Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!", label: "Completed Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!" },
  { value: "Progress on Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!", label: "Progress on Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!" },
  { value: "Completed Orange Belt: Level 6 | Shooting Hoops!", label: "Completed Orange Belt: Level 6 | Shooting Hoops!" },
  { value: "Progress on Orange Belt: Level 6 | Shooting Hoops!", label: "Progress on Orange Belt: Level 6 | Shooting Hoops!" },
  { value: "Completed Orange Belt: Level 6 | Guess the Number!", label: "Completed Orange Belt: Level 6 | Guess the Number!" },
  { value: "Progress on Orange Belt: Level 6 | Guess the Number!", label: "Progress on Orange Belt: Level 6 | Guess the Number!" },
  { value: "Completed Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!", label: "Completed Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!" },
  { value: "Progress on Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!", label: "Progress on Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!" },
  { value: "Completed Orange Belt: Level 7 | Collect the Honey!", label: "Completed Orange Belt: Level 7 | Collect the Honey!" },
  { value: "Progress on Orange Belt: Level 7 | Collect the Honey!", label: "Progress on Orange Belt: Level 7 | Collect the Honey!" },
  { value: "Completed Orange Belt: Level 7 | Snowball Fight!", label: "Completed Orange Belt: Level 7 | Snowball Fight!" },
  { value: "Progress on Orange Belt: Level 7 | Snowball Fight!", label: "Progress on Orange Belt: Level 7 | Snowball Fight!" },
  { value: "Completed Orange Belt: Level 7 | Asteroid Attack!", label: "Completed Orange Belt: Level 7 | Asteroid Attack!" },
  { value: "Progress on Orange Belt: Level 7 | Asteroid Attack!", label: "Progress on Orange Belt: Level 7 | Asteroid Attack!" },
  { value: "Completed Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!", label: "Completed Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!" },
  { value: "Progress on Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!", label: "Progress on Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!" },
  { value: "Completed Orange Belt: Level 8 | Fireflies Collector", label: "Completed Orange Belt: Level 8 | Fireflies Collector" },
  { value: "Progress on Orange Belt: Level 8 | Fireflies Collector", label: "Progress on Orange Belt: Level 8 | Fireflies Collector" },
  { value: "Completed Orange Belt: Level 8 | Counting Sprites", label: "Completed Orange Belt: Level 8 | Counting Sprites" },
  { value: "Progress on Orange Belt: Level 8 | Counting Sprites", label: "Progress on Orange Belt: Level 8 | Counting Sprites" },
  { value: "Completed Orange Belt: Level 8 | Mystery Boxes!", label: "Completed Orange Belt: Level 8 | Mystery Boxes!" },
  { value: "Progress on Orange Belt: Level 8 | Mystery Boxes!", label: "Progress on Orange Belt: Level 8 | Mystery Boxes!" },
  { value: "Completed Orange Belt: Level 8 | Adventure Creating with For Loops!", label: "Completed Orange Belt: Level 8 | Adventure Creating with For Loops!" },
  { value: "Progress on Orange Belt: Level 8 | Adventure Creating with For Loops!", label: "Progress on Orange Belt: Level 8 | Adventure Creating with For Loops!" },
  { value: "Completed Orange Belt: Level 9 | Magic 8 Ball", label: "Completed Orange Belt: Level 9 | Magic 8 Ball" },
  { value: "Progress on Orange Belt: Level 9 | Magic 8 Ball", label: "Progress on Orange Belt: Level 9 | Magic 8 Ball" },
  { value: "Completed Orange Belt: Level 9 | What's in a Name?", label: "Completed Orange Belt: Level 9 | What's in a Name?" },
  { value: "Progress on Orange Belt: Level 9 | What's in a Name?", label: "Progress on Orange Belt: Level 9 | What's in a Name?" },
  { value: "Completed Orange Belt: Level 9 | Concentration", label: "Completed Orange Belt: Level 9 | Concentration" },
  { value: "Progress on Orange Belt: Level 9 | Concentration", label: "Progress on Orange Belt: Level 9 | Concentration" },
  { value: "Completed Orange Belt: Level 9 | Adventure Creating with Arrays!", label: "Completed Orange Belt: Level 9 | Adventure Creating with Arrays!" },
  { value: "Progress on Orange Belt: Level 9 | Adventure Creating with Arrays!", label: "Progress on Orange Belt: Level 9 | Adventure Creating with Arrays!" },
  { value: "Completed Orange Belt: Level 10 | Match Game", label: "Completed Orange Belt: Level 10 | Match Game" },
  { value: "Progress on Orange Belt: Level 10 | Match Game", label: "Progress on Orange Belt: Level 10 | Match Game" },
  { value: "Completed Orange Belt: Level 10 | Username Generator", label: "Completed Orange Belt: Level 10 | Username Generator" },
  { value: "Progress on Orange Belt: Level 10 | Username Generator", label: "Progress on Orange Belt: Level 10 | Username Generator" },
  { value: "Completed Orange Belt: Level 10 | Memory Match", label: "Completed Orange Belt: Level 10 | Memory Match" },
  { value: "Progress on Orange Belt: Level 10 | Memory Match", label: "Progress on Orange Belt: Level 10 | Memory Match" },
  { value: "Completed Orange Belt: Level 10 | Adventure Creating with Array Functions!", label: "Completed Orange Belt: Level 10 | Adventure Creating with Array Functions!" },
  { value: "Progress on Orange Belt: Level 10 | Adventure Creating with Array Functions!", label: "Progress on Orange Belt: Level 10 | Adventure Creating with Array Functions!" },
  { value: "Completed Orange Belt: Level 11 | Pizza Party", label: "Completed Orange Belt: Level 11 | Pizza Party" },
  { value: "Progress on Orange Belt: Level 11 | Pizza Party", label: "Progress on Orange Belt: Level 11 | Pizza Party" },
  { value: "Completed Orange Belt: Level 11 | Barn Breakout!", label: "Completed Orange Belt: Level 11 | Barn Breakout!" },
  { value: "Progress on Orange Belt: Level 11 | Barn Breakout!", label: "Progress on Orange Belt: Level 11 | Barn Breakout!" },
  { value: "Completed Orange Belt: Level 11 | Damage Control", label: "Completed Orange Belt: Level 11 | Damage Control" },
  { value: "Progress on Orange Belt: Level 11 | Damage Control", label: "Progress on Orange Belt: Level 11 | Damage Control" },
  { value: "Completed Orange Belt: Level 11 | Adventure Creating with Functions!", label: "Completed Orange Belt: Level 11 | Adventure Creating with Functions!" },
  { value: "Progress on Orange Belt: Level 11 | Adventure Creating with Functions!", label: "Progress on Orange Belt: Level 11 | Adventure Creating with Functions!" },
  { value: "Completed Orange Belt: Level 12 | Escape the Haunted Castle!", label: "Completed Orange Belt: Level 12 | Escape the Haunted Castle!" },
  { value: "Progress on Orange Belt: Level 12 | Escape the Haunted Castle!", label: "Progress on Orange Belt: Level 12 | Escape the Haunted Castle!" },
  { value: "Completed Orange Belt: Level 12 | City Scroller", label: "Completed Orange Belt: Level 12 | City Scroller" },
  { value: "Progress on Orange Belt: Level 12 | City Scroller", label: "Progress on Orange Belt: Level 12 | City Scroller" },
  { value: "Completed Orange Belt: Level 12 | Find the Ninja!", label: "Completed Orange Belt: Level 12 | Find the Ninja!" },
  { value: "Progress on Orange Belt: Level 12 | Find the Ninja!", label: "Progress on Orange Belt: Level 12 | Find the Ninja!" },
  { value: "Completed Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project", label: "Completed Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project" },
  { value: "Progress on Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project", label: "Progress on Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project" },
  { value: "Completed Green Belt: Level 1 | The Bookcase", label: "Completed Green Belt: Level 1 | The Bookcase" },
  { value: "Progress on Green Belt: Level 1 | The Bookcase", label: "Progress on Green Belt: Level 1 | The Bookcase" },
  { value: "Completed Green Belt: Level 1 | Shark Attack", label: "Completed Green Belt: Level 1 | Shark Attack" },
  { value: "Progress on Green Belt: Level 1 | Shark Attack", label: "Progress on Green Belt: Level 1 | Shark Attack" },
  { value: "Completed Green Belt: Level 1 | Adventure Creating with the Assets Menu!", label: "Completed Green Belt: Level 1 | Adventure Creating with the Assets Menu!" },
  { value: "Progress on Green Belt: Level 1 | Adventure Creating with the Assets Menu!", label: "Progress on Green Belt: Level 1 | Adventure Creating with the Assets Menu!" },
  { value: "Completed Green Belt: Level 2 | Two Worlds", label: "Completed Green Belt: Level 2 | Two Worlds" },
  { value: "Progress on Green Belt: Level 2 | Two Worlds", label: "Progress on Green Belt: Level 2 | Two Worlds" },
  { value: "Completed Green Belt: Level 2 | Avoid the Haystacks!", label: "Completed Green Belt: Level 2 | Avoid the Haystacks!" },
  { value: "Progress on Green Belt: Level 2 | Avoid the Haystacks!", label: "Progress on Green Belt: Level 2 | Avoid the Haystacks!" },
  { value: "Completed Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!", label: "Completed Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!" },
  { value: "Progress on Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!", label: "Progress on Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!" },
];