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
  comment: text("comment").notNull(),
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

// Project status mapping - Build and Adventures only
export const PROJECT_STATUS_MAPPING = {
  "White Belt: Level 1 | Your First Sprite": {
    goal1: "Half of build White lvl1 Spooky Effects",
    goal2: "Complete build White lvl1 Spooky Effects",
  },
  "Half of White Belt: Level 1 | Your First Sprite": {
    goal1: "Complete build White lvl1 Your First Sprite",
    goal2: "Half of build White lvl1 Spooky Effects",
  },
  "White Belt: Level 1 | Spooky Effects": {
    goal1: "Half of Adventure White lvl1 My First Coding Project",
    goal2: "Complete Adventure White lvl1 My First Coding Project",
  },
  "Half of White Belt: Level 1 | Spooky Effects": {
    goal1: "Complete build White lvl1 Spooky Effects",
    goal2: "Half of Adventure White lvl1 My First Coding Project",
  },
  "White Belt: Level 1 | Adventure My First Coding Project": {
    goal1: "Half of build White lvl2 Meet New Friends!",
    goal2: "Complete build White lvl2 Meet New Friends!",
  },
  "Half of White Belt: Level 1 | Adventure My First Coding Project": {
    goal1: "Complete Adventure White lvl1 My First Coding Project",
    goal2: "Half of build White lvl2 Meet New Friends!",
  },
  "White Belt: Level 2 | Meet New Friends!": {
    goal1: "Half of build White lvl2 Where's My Puppy?",
    goal2: "Complete build White lvl2 Where's My Puppy?",
  },
  "Half of White Belt: Level 2 | Meet New Friends!": {
    goal1: "Complete build White lvl2 Meet New Friends!",
    goal2: "Half of build White lvl2 Where's My Puppy?",
  },
  "White Belt: Level 2 | Where's My Puppy?": {
    goal1: "Half of Adventure White lvl2 Creating with",
    goal2: "Complete Adventure White lvl2 Creating with",
  },
  "Half of White Belt: Level 2 | Where's My Puppy?": {
    goal1: "Complete build White lvl2 Where's My Puppy?",
    goal2: "Half of Adventure White lvl2 Creating with",
  },
  "White Belt: Level 2 | Adventure Creating with": {
    goal1: "Half of build White lvl3 Fly Me to the Moon!",
    goal2: "Complete build White lvl3 Fly Me to the Moon!",
  },
  "Half of White Belt: Level 2 | Adventure Creating with": {
    goal1: "Complete Adventure White lvl2 Creating with",
    goal2: "Half of build White lvl3 Fly Me to the Moon!",
  },
  "White Belt: Level 3 | Fly Me to the Moon!": {
    goal1: "Half of build White lvl3 Dinner Time!",
    goal2: "Complete build White lvl3 Dinner Time!",
  },
  "Half of White Belt: Level 3 | Fly Me to the Moon!": {
    goal1: "Complete build White lvl3 Fly Me to the Moon!",
    goal2: "Half of build White lvl3 Dinner Time!",
  },
  "White Belt: Level 3 | Dinner Time!": {
    goal1: "Half of Adventure White lvl3 Creating with Events!",
    goal2: "Complete Adventure White lvl3 Creating with Events!",
  },
  "Half of White Belt: Level 3 | Dinner Time!": {
    goal1: "Complete build White lvl3 Dinner Time!",
    goal2: "Half of Adventure White lvl3 Creating with Events!",
  },
  "White Belt: Level 3 | Adventure Creating with Events!": {
    goal1: "Half of build White lvl4 A Piece of Cake",
    goal2: "Complete build White lvl4 A Piece of Cake",
  },
  "Half of White Belt: Level 3 | Adventure Creating with Events!": {
    goal1: "Complete Adventure White lvl3 Creating with Events!",
    goal2: "Half of build White lvl4 A Piece of Cake",
  },
  "White Belt: Level 4 | A Piece of Cake": {
    goal1: "Half of build White lvl4 Underwater Food Chain",
    goal2: "Complete build White lvl4 Underwater Food Chain",
  },
  "Half of White Belt: Level 4 | A Piece of Cake": {
    goal1: "Complete build White lvl4 A Piece of Cake",
    goal2: "Half of build White lvl4 Underwater Food Chain",
  },
  "White Belt: Level 4 | Underwater Food Chain": {
    goal1: "Half of Adventure White lvl4 Creating with Functions",
    goal2: "Complete Adventure White lvl4 Creating with Functions",
  },
  "Half of White Belt: Level 4 | Underwater Food Chain": {
    goal1: "Complete build White lvl4 Underwater Food Chain",
    goal2: "Half of Adventure White lvl4 Creating with Functions",
  },
  "White Belt: Level 4 | Adventure Creating with Functions": {
    goal1: "Half of build White lvl5 Munchy Munchy Monkey",
    goal2: "Complete build White lvl5 Munchy Munchy Monkey",
  },
  "Half of White Belt: Level 4 | Adventure Creating with Functions": {
    goal1: "Complete Adventure White lvl4 Creating with Functions",
    goal2: "Half of build White lvl5 Munchy Munchy Monkey",
  },
  "White Belt: Level 5 | Munchy Munchy Monkey": {
    goal1: "Half of build White lvl5 Pearl Collector",
    goal2: "Complete build White lvl5 Pearl Collector",
  },
  "Half of White Belt: Level 5 | Munchy Munchy Monkey": {
    goal1: "Complete build White lvl5 Munchy Munchy Monkey",
    goal2: "Half of build White lvl5 Pearl Collector",
  },
  "White Belt: Level 5 | Pearl Collector": {
    goal1: "Half of Adventure White lvl5 Creating with Variables!",
    goal2: "Complete Adventure White lvl5 Creating with Variables!",
  },
  "Half of White Belt: Level 5 | Pearl Collector": {
    goal1: "Complete build White lvl5 Pearl Collector",
    goal2: "Half of Adventure White lvl5 Creating with Variables!",
  },
  "White Belt: Level 5 | Adventure Creating with Variables!": {
    goal1: "Half of build White lvl6 Avoid the Asteroids!",
    goal2: "Complete build White lvl6 Avoid the Asteroids!",
  },
  "Half of White Belt: Level 5 | Adventure Creating with Variables!": {
    goal1: "Complete Adventure White lvl5 Creating with Variables!",
    goal2: "Half of build White lvl6 Avoid the Asteroids!",
  },
  "White Belt: Level 6 | Avoid the Asteroids!": {
    goal1: "Half of build White lvl6 Space Adventure",
    goal2: "Complete build White lvl6 Space Adventure",
  },
  "Half of White Belt: Level 6 | Avoid the Asteroids!": {
    goal1: "Complete build White lvl6 Avoid the Asteroids!",
    goal2: "Half of build White lvl6 Space Adventure",
  },
  "White Belt: Level 6 | Space Adventure": {
    goal1: "Half of Adventure White lvl6 Creating with Loops!",
    goal2: "Complete Adventure White lvl6 Creating with Loops!",
  },
  "Half of White Belt: Level 6 | Space Adventure": {
    goal1: "Complete build White lvl6 Space Adventure",
    goal2: "Half of Adventure White lvl6 Creating with Loops!",
  },
  "White Belt: Level 6 | Adventure Creating with Loops!": {
    goal1: "Half of build White lvl7 The Wizard's Mystic Toadstools",
    goal2: "Complete build White lvl7 The Wizard's Mystic Toadstools",
  },
  "Half of White Belt: Level 6 | Adventure Creating with Loops!": {
    goal1: "Complete Adventure White lvl6 Creating with Loops!",
    goal2: "Half of build White lvl7 The Wizard's Mystic Toadstools",
  },
  "White Belt: Level 7 | The Wizard's Mystic Toadstools": {
    goal1: "Half of build White lvl7 Unlock the Hidden Treasure!",
    goal2: "Complete build White lvl7 Unlock the Hidden Treasure!",
  },
  "Half of White Belt: Level 7 | The Wizard's Mystic Toadstools": {
    goal1: "Complete build White lvl7 The Wizard's Mystic Toadstools",
    goal2: "Half of build White lvl7 Unlock the Hidden Treasure!",
  },
  "White Belt: Level 7 | Unlock the Hidden Treasure!": {
    goal1: "Half of Adventure White lvl7 Creating with Conditionals!",
    goal2: "Complete Adventure White lvl7 Creating with Conditionals!",
  },
  "Half of White Belt: Level 7 | Unlock the Hidden Treasure!": {
    goal1: "Complete build White lvl7 Unlock the Hidden Treasure!",
    goal2: "Half of Adventure White lvl7 Creating with Conditionals!",
  },
  "White Belt: Level 7 | Adventure Creating with Conditionals!": {
    goal1: "Half of build White lvl8 Animated Aquarium",
    goal2: "Complete build White lvl8 Animated Aquarium",
  },
  "Half of White Belt: Level 7 | Adventure Creating with Conditionals!": {
    goal1: "Complete Adventure White lvl7 Creating with Conditionals!",
    goal2: "Half of build White lvl8 Animated Aquarium",
  },
  "White Belt: Level 8 | Animated Aquarium": {
    goal1: "Half of build White lvl8 Musical Mayhem",
    goal2: "Complete build White lvl8 Musical Mayhem",
  },
  "Half of White Belt: Level 8 | Animated Aquarium": {
    goal1: "Complete build White lvl8 Animated Aquarium",
    goal2: "Half of build White lvl8 Musical Mayhem",
  },
  "White Belt: Level 8 | Musical Mayhem": {
    goal1: "Half of Adventure White lvl8 White Belt Belt-Up Project!",
    goal2: "Complete Adventure White lvl8 White Belt Belt-Up Project!",
  },
  "Half of White Belt: Level 8 | Musical Mayhem": {
    goal1: "Complete build White lvl8 Musical Mayhem",
    goal2: "Half of Adventure White lvl8 White Belt Belt-Up Project!",
  },
  "White Belt: Level 8 | Adventure White Belt Belt-Up Project!": {
    goal1: "Half of build Yellow lvl1 Avoid the Snakes!",
    goal2: "Complete build Yellow lvl1 Avoid the Snakes!",
  },
  "Half of White Belt: Level 8 | Adventure White Belt Belt-Up Project!": {
    goal1: "Complete Adventure White lvl8 White Belt Belt-Up Project!",
    goal2: "Half of build Yellow lvl1 Avoid the Snakes!",
  },
  "Yellow Belt: Level 1 | Avoid the Snakes!": {
    goal1: "Half of build Yellow lvl1 Carrot Chase",
    goal2: "Complete build Yellow lvl1 Carrot Chase",
  },
  "Half of Yellow Belt: Level 1 | Avoid the Snakes!": {
    goal1: "Complete build Yellow lvl1 Avoid the Snakes!",
    goal2: "Half of build Yellow lvl1 Carrot Chase",
  },
  "Yellow Belt: Level 1 | Carrot Chase": {
    goal1: "Half of Adventure Yellow lvl1 Creating with Tilemaps!",
    goal2: "Complete Adventure Yellow lvl1 Creating with Tilemaps!",
  },
  "Half of Yellow Belt: Level 1 | Carrot Chase": {
    goal1: "Complete build Yellow lvl1 Carrot Chase",
    goal2: "Half of Adventure Yellow lvl1 Creating with Tilemaps!",
  },
  "Yellow Belt: Level 1 | Adventure Creating with Tilemaps!": {
    goal1: "Half of build Yellow lvl2 The Key to the Castle",
    goal2: "Complete build Yellow lvl2 The Key to the Castle",
  },
  "Half of Yellow Belt: Level 1 | Adventure Creating with Tilemaps!": {
    goal1: "Complete Adventure Yellow lvl1 Creating with Tilemaps!",
    goal2: "Half of build Yellow lvl2 The Key to the Castle",
  },
  "Yellow Belt: Level 2 | The Key to the Castle": {
    goal1: "Half of build Yellow lvl2 Coin Grabber!",
    goal2: "Complete build Yellow lvl2 Coin Grabber!",
  },
  "Half of Yellow Belt: Level 2 | The Key to the Castle": {
    goal1: "Complete build Yellow lvl2 The Key to the Castle",
    goal2: "Half of build Yellow lvl2 Coin Grabber!",
  },
  "Yellow Belt: Level 2 | Coin Grabber!": {
    goal1: "Half of Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
    goal2: "Complete Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
  },
  "Half of Yellow Belt: Level 2 | Coin Grabber!": {
    goal1: "Complete build Yellow lvl2 Coin Grabber!",
    goal2: "Half of Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
  },
  "Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!": {
    goal1: "Half of build Yellow lvl3 All About Me",
    goal2: "Complete build Yellow lvl3 All About Me",
  },
  "Half of Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!": {
    goal1: "Complete Adventure Yellow lvl2 Creating with Tilemap and Lifecycle Events!",
    goal2: "Half of build Yellow lvl3 All About Me",
  },
  "Yellow Belt: Level 3 | All About Me": {
    goal1: "Half of build Yellow lvl3 Welcome to the Farm",
    goal2: "Complete build Yellow lvl3 Welcome to the Farm",
  },
  "Half of Yellow Belt: Level 3 | All About Me": {
    goal1: "Complete build Yellow lvl3 All About Me",
    goal2: "Half of build Yellow lvl3 Welcome to the Farm",
  },
  "Yellow Belt: Level 3 | Welcome to the Farm": {
    goal1: "Half of build Yellow lvl3 Mad Libs",
    goal2: "Complete build Yellow lvl3 Mad Libs",
  },
  "Half of Yellow Belt: Level 3 | Welcome to the Farm": {
    goal1: "Complete build Yellow lvl3 Welcome to the Farm",
    goal2: "Half of build Yellow lvl3 Mad Libs",
  },
  "Yellow Belt: Level 3 | Mad Libs": {
    goal1: "Half of Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
    goal2: "Complete Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
  },
  "Half of Yellow Belt: Level 3 | Mad Libs": {
    goal1: "Complete build Yellow lvl3 Mad Libs",
    goal2: "Half of Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
  },
  "Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!": {
    goal1: "Half of build Yellow lvl4 Memory Game",
    goal2: "Complete build Yellow lvl4 Memory Game",
  },
  "Half of Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!": {
    goal1: "Complete Adventure Yellow lvl3 Creating with User Input, Variables, and Arrays!",
    goal2: "Half of build Yellow lvl4 Memory Game",
  },
  "Yellow Belt: Level 4 | Memory Game": {
    goal1: "Half of build Yellow lvl4 Archeological Dig",
    goal2: "Complete build Yellow lvl4 Archeological Dig",
  },
  "Half of Yellow Belt: Level 4 | Memory Game": {
    goal1: "Complete build Yellow lvl4 Memory Game",
    goal2: "Half of build Yellow lvl4 Archeological Dig",
  },
  "Yellow Belt: Level 4 | Archeological Dig": {
    goal1: "Half of Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
    goal2: "Complete Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
  },
  "Half of Yellow Belt: Level 4 | Archeological Dig": {
    goal1: "Complete build Yellow lvl4 Archeological Dig",
    goal2: "Half of Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
  },
  "Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!": {
    goal1: "Half of build Yellow lvl5 Cookie Clicker Game!",
    goal2: "Complete build Yellow lvl5 Cookie Clicker Game!",
  },
  "Half of Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!": {
    goal1: "Complete Adventure Yellow lvl4 Creating with Repeat and For Element loops!",
    goal2: "Half of build Yellow lvl5 Cookie Clicker Game!",
  },
  "Yellow Belt: Level 5 | Cookie Clicker Game!": {
    goal1: "Half of build Yellow lvl5 Snowflake Catch",
    goal2: "Complete build Yellow lvl5 Snowflake Catch",
  },
  "Half of Yellow Belt: Level 5 | Cookie Clicker Game!": {
    goal1: "Complete build Yellow lvl5 Cookie Clicker Game!",
    goal2: "Half of build Yellow lvl5 Snowflake Catch",
  },
  "Yellow Belt: Level 5 | Snowflake Catch": {
    goal1: "Half of Adventure Yellow lvl5 Creating with Functions!",
    goal2: "Complete Adventure Yellow lvl5 Creating with Functions!",
  },
  "Half of Yellow Belt: Level 5 | Snowflake Catch": {
    goal1: "Complete build Yellow lvl5 Snowflake Catch",
    goal2: "Half of Adventure Yellow lvl5 Creating with Functions!",
  },
  "Yellow Belt: Level 5 | Adventure Creating with Functions!": {
    goal1: "Half of build Yellow lvl6 Cactus Jump",
    goal2: "Complete build Yellow lvl6 Cactus Jump",
  },
  "Half of Yellow Belt: Level 5 | Adventure Creating with Functions!": {
    goal1: "Complete Adventure Yellow lvl5 Creating with Functions!",
    goal2: "Half of build Yellow lvl6 Cactus Jump",
  },
  "Yellow Belt: Level 6 | Cactus Jump": {
    goal1: "Half of build Yellow lvl6 Avoid the Roadblocks",
    goal2: "Complete build Yellow lvl6 Avoid the Roadblocks",
  },
  "Half of Yellow Belt: Level 6 | Cactus Jump": {
    goal1: "Complete build Yellow lvl6 Cactus Jump",
    goal2: "Half of build Yellow lvl6 Avoid the Roadblocks",
  },
  "Yellow Belt: Level 6 | Avoid the Roadblocks": {
    goal1: "Half of build Yellow lvl6 The Floor is Lava!",
    goal2: "Complete build Yellow lvl6 The Floor is Lava!",
  },
  "Half of Yellow Belt: Level 6 | Avoid the Roadblocks": {
    goal1: "Complete build Yellow lvl6 Avoid the Roadblocks",
    goal2: "Half of build Yellow lvl6 The Floor is Lava!",
  },
  "Yellow Belt: Level 6 | The Floor is Lava!": {
    goal1: "Half of Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
    goal2: "Complete Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
  },
  "Half of Yellow Belt: Level 6 | The Floor is Lava!": {
    goal1: "Complete build Yellow lvl6 The Floor is Lava!",
    goal2: "Half of Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
  },
  "Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!": {
    goal1: "Half of build Yellow lvl7 Magic Coin Scavenger Hunt",
    goal2: "Complete build Yellow lvl7 Magic Coin Scavenger Hunt",
  },
  "Half of Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!": {
    goal1: "Complete Adventure Yellow lvl6 Creating with 2D Platformer Tilemaps and Physics!",
    goal2: "Half of build Yellow lvl7 Magic Coin Scavenger Hunt",
  },
  "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt": {
    goal1: "Half of build Yellow lvl7 Raindrop Invincibility",
    goal2: "Complete build Yellow lvl7 Raindrop Invincibility",
  },
  "Half of Yellow Belt: Level 7 | Magic Coin Scavenger Hunt": {
    goal1: "Complete build Yellow lvl7 Magic Coin Scavenger Hunt",
    goal2: "Half of build Yellow lvl7 Raindrop Invincibility",
  },
  "Yellow Belt: Level 7 | Raindrop Invincibility": {
    goal1: "Half of build Yellow lvl7 Snake Pit!",
    goal2: "Complete build Yellow lvl7 Snake Pit!",
  },
  "Half of Yellow Belt: Level 7 | Raindrop Invincibility": {
    goal1: "Complete build Yellow lvl7 Raindrop Invincibility",
    goal2: "Half of build Yellow lvl7 Snake Pit!",
  },
  "Yellow Belt: Level 7 | Snake Pit!": {
    goal1: "Half of Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
    goal2: "Complete Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
  },
  "Half of Yellow Belt: Level 7 | Snake Pit!": {
    goal1: "Complete build Yellow lvl7 Snake Pit!",
    goal2: "Half of Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
  },
  "Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!": {
    goal1: "Half of build Yellow lvl8 Bubble Pop!",
    goal2: "Complete build Yellow lvl8 Bubble Pop!",
  },
  "Half of Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!": {
    goal1: "Complete Adventure Yellow lvl7 Creating with Booleans and Logic Operators!",
    goal2: "Half of build Yellow lvl8 Bubble Pop!",
  },
  "Yellow Belt: Level 8 | Bubble Pop!": {
    goal1: "Half of build Yellow lvl8 Bee Catcher",
    goal2: "Complete build Yellow lvl8 Bee Catcher",
  },
  "Half of Yellow Belt: Level 8 | Bubble Pop!": {
    goal1: "Complete build Yellow lvl8 Bubble Pop!",
    goal2: "Half of build Yellow lvl8 Bee Catcher",
  },
  "Yellow Belt: Level 8 | Bee Catcher": {
    goal1: "Half of Adventure Yellow lvl8 Creating with For Index and While Loops!",
    goal2: "Complete Adventure Yellow lvl8 Creating with For Index and While Loops!",
  },
  "Half of Yellow Belt: Level 8 | Bee Catcher": {
    goal1: "Complete build Yellow lvl8 Bee Catcher",
    goal2: "Half of Adventure Yellow lvl8 Creating with For Index and While Loops!",
  },
  "Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!": {
    goal1: "Half of build Yellow lvl9 Block Jumper",
    goal2: "Complete build Yellow lvl9 Block Jumper",
  },
  "Half of Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!": {
    goal1: "Complete Adventure Yellow lvl8 Creating with For Index and While Loops!",
    goal2: "Half of build Yellow lvl9 Block Jumper",
  },
  "Yellow Belt: Level 9 | Block Jumper": {
    goal1: "Half of build Yellow lvl9 Bridge Builder",
    goal2: "Complete build Yellow lvl9 Bridge Builder",
  },
  "Half of Yellow Belt: Level 9 | Block Jumper": {
    goal1: "Complete build Yellow lvl9 Block Jumper",
    goal2: "Half of build Yellow lvl9 Bridge Builder",
  },
  "Yellow Belt: Level 9 | Bridge Builder": {
    goal1: "Half of build Yellow lvl9 Dino Defender",
    goal2: "Complete build Yellow lvl9 Dino Defender",
  },
  "Half of Yellow Belt: Level 9 | Bridge Builder": {
    goal1: "Complete build Yellow lvl9 Bridge Builder",
    goal2: "Half of build Yellow lvl9 Dino Defender",
  },
  "Yellow Belt: Level 9 | Dino Defender": {
    goal1: "Half of Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
    goal2: "Complete Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
  },
  "Half of Yellow Belt: Level 9 | Dino Defender": {
    goal1: "Complete build Yellow lvl9 Dino Defender",
    goal2: "Half of Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
  },
  "Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!": {
    goal1: "Half of build Yellow lvl10 Scenic Drive",
    goal2: "Complete build Yellow lvl10 Scenic Drive",
  },
  "Half of Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!": {
    goal1: "Complete Adventure Yellow lvl9 Creating with Tilemap Location and Extension Blocks!",
    goal2: "Half of build Yellow lvl10 Scenic Drive",
  },
  "Yellow Belt: Level 10 | Scenic Drive": {
    goal1: "Half of build Yellow lvl10 Burger Dash",
    goal2: "Complete build Yellow lvl10 Burger Dash",
  },
  "Half of Yellow Belt: Level 10 | Scenic Drive": {
    goal1: "Complete build Yellow lvl10 Scenic Drive",
    goal2: "Half of build Yellow lvl10 Burger Dash",
  },
  "Yellow Belt: Level 10 | Burger Dash": {
    goal1: "Half of Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
    goal2: "Complete Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
  },
  "Half of Yellow Belt: Level 10 | Burger Dash": {
    goal1: "Complete build Yellow lvl10 Burger Dash",
    goal2: "Half of Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
  },
  "Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!": {
    goal1: "Half of build Orange lvl1 Hello World!",
    goal2: "Complete build Orange lvl1 Hello World!",
  },
  "Half of Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!": {
    goal1: "Complete Adventure Yellow lvl10 Yellow Belt Belt-Up Project!",
    goal2: "Half of build Orange lvl1 Hello World!",
  },
  "Orange Belt: Level 1 | Hello World!": {
    goal1: "Half of build Orange lvl1 Bouncing on the Walls",
    goal2: "Complete build Orange lvl1 Bouncing on the Walls",
  },
  "Half of Orange Belt: Level 1 | Hello World!": {
    goal1: "Complete build Orange lvl1 Hello World!",
    goal2: "Half of build Orange lvl1 Bouncing on the Walls",
  },
  "Orange Belt: Level 1 | Bouncing on the Walls": {
    goal1: "Half of build Orange lvl1 Follow Me!",
    goal2: "Complete build Orange lvl1 Follow Me!",
  },
  "Half of Orange Belt: Level 1 | Bouncing on the Walls": {
    goal1: "Complete build Orange lvl1 Bouncing on the Walls",
    goal2: "Half of build Orange lvl1 Follow Me!",
  },
  "Orange Belt: Level 1 | Follow Me!": {
    goal1: "Half of Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
    goal2: "Complete Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
  },
  "Half of Orange Belt: Level 1 | Follow Me!": {
    goal1: "Complete build Orange lvl1 Follow Me!",
    goal2: "Half of Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
  },
  "Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!": {
    goal1: "Half of build Orange lvl2 Greeting Card",
    goal2: "Complete build Orange lvl2 Greeting Card",
  },
  "Half of Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!": {
    goal1: "Complete Adventure Orange lvl1 Creating with JavaScript code and Syntax!",
    goal2: "Half of build Orange lvl2 Greeting Card",
  },
  "Orange Belt: Level 2 | Greeting Card": {
    goal1: "Half of build Orange lvl2 Show Time!",
    goal2: "Complete build Orange lvl2 Show Time!",
  },
  "Half of Orange Belt: Level 2 | Greeting Card": {
    goal1: "Complete build Orange lvl2 Greeting Card",
    goal2: "Half of build Orange lvl2 Show Time!",
  },
  "Orange Belt: Level 2 | Show Time!": {
    goal1: "Half of build Orange lvl2 Seasons Change",
    goal2: "Complete build Orange lvl2 Seasons Change",
  },
  "Half of Orange Belt: Level 2 | Show Time!": {
    goal1: "Complete build Orange lvl2 Show Time!",
    goal2: "Half of build Orange lvl2 Seasons Change",
  },
  "Orange Belt: Level 2 | Seasons Change": {
    goal1: "Half of Adventure Orange lvl2 Creating with Properties!",
    goal2: "Complete Adventure Orange lvl2 Creating with Properties!",
  },
  "Half of Orange Belt: Level 2 | Seasons Change": {
    goal1: "Complete build Orange lvl2 Seasons Change",
    goal2: "Half of Adventure Orange lvl2 Creating with Properties!",
  },
  "Orange Belt: Level 2 | Adventure Creating with Properties!": {
    goal1: "Half of build Orange lvl3 Screen Saver",
    goal2: "Complete build Orange lvl3 Screen Saver",
  },
  "Half of Orange Belt: Level 2 | Adventure Creating with Properties!": {
    goal1: "Complete Adventure Orange lvl2 Creating with Properties!",
    goal2: "Half of build Orange lvl3 Screen Saver",
  },
  "Orange Belt: Level 3 | Screen Saver": {
    goal1: "Half of build Orange lvl3 Button Clicker!",
    goal2: "Complete build Orange lvl3 Button Clicker!",
  },
  "Half of Orange Belt: Level 3 | Screen Saver": {
    goal1: "Complete build Orange lvl3 Screen Saver",
    goal2: "Half of build Orange lvl3 Button Clicker!",
  },
  "Orange Belt: Level 3 | Button Clicker!": {
    goal1: "Half of build Orange lvl3 Two Sprite Showdown!",
    goal2: "Complete build Orange lvl3 Two Sprite Showdown!",
  },
  "Half of Orange Belt: Level 3 | Button Clicker!": {
    goal1: "Complete build Orange lvl3 Button Clicker!",
    goal2: "Half of build Orange lvl3 Two Sprite Showdown!",
  },
  "Orange Belt: Level 3 | Two Sprite Showdown!": {
    goal1: "Half of Adventure Orange lvl3 Creating with Block Statements!",
    goal2: "Complete Adventure Orange lvl3 Creating with Block Statements!",
  },
  "Half of Orange Belt: Level 3 | Two Sprite Showdown!": {
    goal1: "Complete build Orange lvl3 Two Sprite Showdown!",
    goal2: "Half of Adventure Orange lvl3 Creating with Block Statements!",
  },
  "Orange Belt: Level 3 | Adventure Creating with Block Statements!": {
    goal1: "Half of build Orange lvl4 Save the Crab!",
    goal2: "Complete build Orange lvl4 Save the Crab!",
  },
  "Half of Orange Belt: Level 3 | Adventure Creating with Block Statements!": {
    goal1: "Complete Adventure Orange lvl3 Creating with Block Statements!",
    goal2: "Half of build Orange lvl4 Save the Crab!",
  },
  "Orange Belt: Level 4 | Save the Crab!": {
    goal1: "Half of build Orange lvl4 Going Bananas!",
    goal2: "Complete build Orange lvl4 Going Bananas!",
  },
  "Half of Orange Belt: Level 4 | Save the Crab!": {
    goal1: "Complete build Orange lvl4 Save the Crab!",
    goal2: "Half of build Orange lvl4 Going Bananas!",
  },
  "Orange Belt: Level 4 | Going Bananas!": {
    goal1: "Half of build Orange lvl4 Grab Bag!",
    goal2: "Complete build Orange lvl4 Grab Bag!",
  },
  "Half of Orange Belt: Level 4 | Going Bananas!": {
    goal1: "Complete build Orange lvl4 Going Bananas!",
    goal2: "Half of build Orange lvl4 Grab Bag!",
  },
  "Orange Belt: Level 4 | Grab Bag!": {
    goal1: "Half of Adventure Orange lvl4 Creating with nested block statements!",
    goal2: "Complete Adventure Orange lvl4 Creating with nested block statements!",
  },
  "Half of Orange Belt: Level 4 | Grab Bag!": {
    goal1: "Complete build Orange lvl4 Grab Bag!",
    goal2: "Half of Adventure Orange lvl4 Creating with nested block statements!",
  },
  "Orange Belt: Level 4 | Adventure Creating with nested block statements!": {
    goal1: "Half of build Orange lvl5 Shop 'Til You Drop",
    goal2: "Complete build Orange lvl5 Shop 'Til You Drop",
  },
  "Half of Orange Belt: Level 4 | Adventure Creating with nested block statements!": {
    goal1: "Complete Adventure Orange lvl4 Creating with nested block statements!",
    goal2: "Half of build Orange lvl5 Shop 'Til You Drop",
  },
  "Orange Belt: Level 5 | Shop 'Til You Drop": {
    goal1: "Half of build Orange lvl5 Cookie Stacker",
    goal2: "Complete build Orange lvl5 Cookie Stacker",
  },
  "Half of Orange Belt: Level 5 | Shop 'Til You Drop": {
    goal1: "Complete build Orange lvl5 Shop 'Til You Drop",
    goal2: "Half of build Orange lvl5 Cookie Stacker",
  },
  "Orange Belt: Level 5 | Cookie Stacker": {
    goal1: "Half of Adventure Orange lvl5 Creating with Assignment and Equality operators!",
    goal2: "Complete Adventure Orange lvl5 Creating with Assignment and Equality operators!",
  },
  "Half of Orange Belt: Level 5 | Cookie Stacker": {
    goal1: "Complete build Orange lvl5 Cookie Stacker",
    goal2: "Half of Adventure Orange lvl5 Creating with Assignment and Equality operators!",
  },
  "Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!": {
    goal1: "Half of build Orange lvl6 Shooting Hoops!",
    goal2: "Complete build Orange lvl6 Shooting Hoops!",
  },
  "Half of Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!": {
    goal1: "Complete Adventure Orange lvl5 Creating with Assignment and Equality operators!",
    goal2: "Half of build Orange lvl6 Shooting Hoops!",
  },
  "Orange Belt: Level 6 | Shooting Hoops!": {
    goal1: "Half of build Orange lvl6 Guess the Number!",
    goal2: "Complete build Orange lvl6 Guess the Number!",
  },
  "Half of Orange Belt: Level 6 | Shooting Hoops!": {
    goal1: "Complete build Orange lvl6 Shooting Hoops!",
    goal2: "Half of build Orange lvl6 Guess the Number!",
  },
  "Orange Belt: Level 6 | Guess the Number!": {
    goal1: "Half of Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
    goal2: "Complete Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
  },
  "Half of Orange Belt: Level 6 | Guess the Number!": {
    goal1: "Complete build Orange lvl6 Guess the Number!",
    goal2: "Half of Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
  },
  "Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!": {
    goal1: "Half of build Orange lvl7 Collect the Honey!",
    goal2: "Complete build Orange lvl7 Collect the Honey!",
  },
  "Half of Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!": {
    goal1: "Complete Adventure Orange lvl6 Creating with Boolean and Relational Operators!",
    goal2: "Half of build Orange lvl7 Collect the Honey!",
  },
  "Orange Belt: Level 7 | Collect the Honey!": {
    goal1: "Half of build Orange lvl7 Snowball Fight!",
    goal2: "Complete build Orange lvl7 Snowball Fight!",
  },
  "Half of Orange Belt: Level 7 | Collect the Honey!": {
    goal1: "Complete build Orange lvl7 Collect the Honey!",
    goal2: "Half of build Orange lvl7 Snowball Fight!",
  },
  "Orange Belt: Level 7 | Snowball Fight!": {
    goal1: "Half of build Orange lvl7 Asteroid Attack!",
    goal2: "Complete build Orange lvl7 Asteroid Attack!",
  },
  "Half of Orange Belt: Level 7 | Snowball Fight!": {
    goal1: "Complete build Orange lvl7 Snowball Fight!",
    goal2: "Half of build Orange lvl7 Asteroid Attack!",
  },
  "Orange Belt: Level 7 | Asteroid Attack!": {
    goal1: "Half of Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
    goal2: "Complete Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
  },
  "Half of Orange Belt: Level 7 | Asteroid Attack!": {
    goal1: "Complete build Orange lvl7 Asteroid Attack!",
    goal2: "Half of Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
  },
  "Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!": {
    goal1: "Half of build Orange lvl8 Fireflies Collector",
    goal2: "Complete build Orange lvl8 Fireflies Collector",
  },
  "Half of Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!": {
    goal1: "Complete Adventure Orange lvl7 Creating with Sprite Kinds and Sprite Overlap Events!",
    goal2: "Half of build Orange lvl8 Fireflies Collector",
  },
  "Orange Belt: Level 8 | Fireflies Collector": {
    goal1: "Half of build Orange lvl8 Counting Sprites",
    goal2: "Complete build Orange lvl8 Counting Sprites",
  },
  "Half of Orange Belt: Level 8 | Fireflies Collector": {
    goal1: "Complete build Orange lvl8 Fireflies Collector",
    goal2: "Half of build Orange lvl8 Counting Sprites",
  },
  "Orange Belt: Level 8 | Counting Sprites": {
    goal1: "Half of build Orange lvl8 Mystery Boxes!",
    goal2: "Complete build Orange lvl8 Mystery Boxes!",
  },
  "Half of Orange Belt: Level 8 | Counting Sprites": {
    goal1: "Complete build Orange lvl8 Counting Sprites",
    goal2: "Half of build Orange lvl8 Mystery Boxes!",
  },
  "Orange Belt: Level 8 | Mystery Boxes!": {
    goal1: "Half of Adventure Orange lvl8 Creating with For Loops!",
    goal2: "Complete Adventure Orange lvl8 Creating with For Loops!",
  },
  "Half of Orange Belt: Level 8 | Mystery Boxes!": {
    goal1: "Complete build Orange lvl8 Mystery Boxes!",
    goal2: "Half of Adventure Orange lvl8 Creating with For Loops!",
  },
  "Orange Belt: Level 8 | Adventure Creating with For Loops!": {
    goal1: "Half of build Orange lvl9 Magic 8 Ball",
    goal2: "Complete build Orange lvl9 Magic 8 Ball",
  },
  "Half of Orange Belt: Level 8 | Adventure Creating with For Loops!": {
    goal1: "Complete Adventure Orange lvl8 Creating with For Loops!",
    goal2: "Half of build Orange lvl9 Magic 8 Ball",
  },
  "Orange Belt: Level 9 | Magic 8 Ball": {
    goal1: "Half of build Orange lvl9 What's in a Name?",
    goal2: "Complete build Orange lvl9 What's in a Name?",
  },
  "Half of Orange Belt: Level 9 | Magic 8 Ball": {
    goal1: "Complete build Orange lvl9 Magic 8 Ball",
    goal2: "Half of build Orange lvl9 What's in a Name?",
  },
  "Orange Belt: Level 9 | What's in a Name?": {
    goal1: "Half of build Orange lvl9 Concentration",
    goal2: "Complete build Orange lvl9 Concentration",
  },
  "Half of Orange Belt: Level 9 | What's in a Name?": {
    goal1: "Complete build Orange lvl9 What's in a Name?",
    goal2: "Half of build Orange lvl9 Concentration",
  },
  "Orange Belt: Level 9 | Concentration": {
    goal1: "Half of Adventure Orange lvl9 Creating with Arrays!",
    goal2: "Complete Adventure Orange lvl9 Creating with Arrays!",
  },
  "Half of Orange Belt: Level 9 | Concentration": {
    goal1: "Complete build Orange lvl9 Concentration",
    goal2: "Half of Adventure Orange lvl9 Creating with Arrays!",
  },
  "Orange Belt: Level 9 | Adventure Creating with Arrays!": {
    goal1: "Half of build Orange lvl10 Match Game",
    goal2: "Complete build Orange lvl10 Match Game",
  },
  "Half of Orange Belt: Level 9 | Adventure Creating with Arrays!": {
    goal1: "Complete Adventure Orange lvl9 Creating with Arrays!",
    goal2: "Half of build Orange lvl10 Match Game",
  },
  "Orange Belt: Level 10 | Match Game": {
    goal1: "Half of build Orange lvl10 Username Generator",
    goal2: "Complete build Orange lvl10 Username Generator",
  },
  "Half of Orange Belt: Level 10 | Match Game": {
    goal1: "Complete build Orange lvl10 Match Game",
    goal2: "Half of build Orange lvl10 Username Generator",
  },
  "Orange Belt: Level 10 | Username Generator": {
    goal1: "Half of build Orange lvl10 Memory Match",
    goal2: "Complete build Orange lvl10 Memory Match",
  },
  "Half of Orange Belt: Level 10 | Username Generator": {
    goal1: "Complete build Orange lvl10 Username Generator",
    goal2: "Half of build Orange lvl10 Memory Match",
  },
  "Orange Belt: Level 10 | Memory Match": {
    goal1: "Half of Adventure Orange lvl10 Creating with Array Functions!",
    goal2: "Complete Adventure Orange lvl10 Creating with Array Functions!",
  },
  "Half of Orange Belt: Level 10 | Memory Match": {
    goal1: "Complete build Orange lvl10 Memory Match",
    goal2: "Half of Adventure Orange lvl10 Creating with Array Functions!",
  },
  "Orange Belt: Level 10 | Adventure Creating with Array Functions!": {
    goal1: "Half of build Orange lvl11 Pizza Party",
    goal2: "Complete build Orange lvl11 Pizza Party",
  },
  "Half of Orange Belt: Level 10 | Adventure Creating with Array Functions!": {
    goal1: "Complete Adventure Orange lvl10 Creating with Array Functions!",
    goal2: "Half of build Orange lvl11 Pizza Party",
  },
  "Orange Belt: Level 11 | Pizza Party": {
    goal1: "Half of build Orange lvl11 Barn Breakout!",
    goal2: "Complete build Orange lvl11 Barn Breakout!",
  },
  "Half of Orange Belt: Level 11 | Pizza Party": {
    goal1: "Complete build Orange lvl11 Pizza Party",
    goal2: "Half of build Orange lvl11 Barn Breakout!",
  },
  "Orange Belt: Level 11 | Barn Breakout!": {
    goal1: "Half of build Orange lvl11 Damage Control",
    goal2: "Complete build Orange lvl11 Damage Control",
  },
  "Half of Orange Belt: Level 11 | Barn Breakout!": {
    goal1: "Complete build Orange lvl11 Barn Breakout!",
    goal2: "Half of build Orange lvl11 Damage Control",
  },
  "Orange Belt: Level 11 | Damage Control": {
    goal1: "Half of Adventure Orange lvl11 Creating with Functions!",
    goal2: "Complete Adventure Orange lvl11 Creating with Functions!",
  },
  "Half of Orange Belt: Level 11 | Damage Control": {
    goal1: "Complete build Orange lvl11 Damage Control",
    goal2: "Half of Adventure Orange lvl11 Creating with Functions!",
  },
  "Orange Belt: Level 11 | Adventure Creating with Functions!": {
    goal1: "Half of build Orange lvl12 Escape the Haunted Castle!",
    goal2: "Complete build Orange lvl12 Escape the Haunted Castle!",
  },
  "Half of Orange Belt: Level 11 | Adventure Creating with Functions!": {
    goal1: "Complete Adventure Orange lvl11 Creating with Functions!",
    goal2: "Half of build Orange lvl12 Escape the Haunted Castle!",
  },
  "Orange Belt: Level 12 | Escape the Haunted Castle!": {
    goal1: "Half of build Orange lvl12 City Scroller",
    goal2: "Complete build Orange lvl12 City Scroller",
  },
  "Half of Orange Belt: Level 12 | Escape the Haunted Castle!": {
    goal1: "Complete build Orange lvl12 Escape the Haunted Castle!",
    goal2: "Half of build Orange lvl12 City Scroller",
  },
  "Orange Belt: Level 12 | City Scroller": {
    goal1: "Half of build Orange lvl12 Find the Ninja!",
    goal2: "Complete build Orange lvl12 Find the Ninja!",
  },
  "Half of Orange Belt: Level 12 | City Scroller": {
    goal1: "Complete build Orange lvl12 City Scroller",
    goal2: "Half of build Orange lvl12 Find the Ninja!",
  },
  "Orange Belt: Level 12 | Find the Ninja!": {
    goal1: "Half of Adventure Orange lvl12 Orange Belt Belt-Up Project",
    goal2: "Complete Adventure Orange lvl12 Orange Belt Belt-Up Project",
  },
  "Half of Orange Belt: Level 12 | Find the Ninja!": {
    goal1: "Complete build Orange lvl12 Find the Ninja!",
    goal2: "Half of Adventure Orange lvl12 Orange Belt Belt-Up Project",
  },
  "Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project": {
    goal1: "Half of build Green lvl1 The Bookcase",
    goal2: "Complete build Green lvl1 The Bookcase",
  },
  "Half of Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project": {
    goal1: "Complete Adventure Orange lvl12 Orange Belt Belt-Up Project",
    goal2: "Half of build Green lvl1 The Bookcase",
  },
  "Green Belt: Level 1 | The Bookcase": {
    goal1: "Half of build Green lvl1 Shark Attack",
    goal2: "Complete build Green lvl1 Shark Attack",
  },
  "Half of Green Belt: Level 1 | The Bookcase": {
    goal1: "Complete build Green lvl1 The Bookcase",
    goal2: "Half of build Green lvl1 Shark Attack",
  },
  "Green Belt: Level 1 | Shark Attack": {
    goal1: "Half of Adventure Green lvl1 Creating with the Assets Menu!",
    goal2: "Complete Adventure Green lvl1 Creating with the Assets Menu!",
  },
  "Half of Green Belt: Level 1 | Shark Attack": {
    goal1: "Complete build Green lvl1 Shark Attack",
    goal2: "Half of Adventure Green lvl1 Creating with the Assets Menu!",
  },
  "Green Belt: Level 1 | Adventure Creating with the Assets Menu!": {
    goal1: "Half of build Green lvl2 Two Worlds",
    goal2: "Complete build Green lvl2 Two Worlds",
  },
  "Half of Green Belt: Level 1 | Adventure Creating with the Assets Menu!": {
    goal1: "Complete Adventure Green lvl1 Creating with the Assets Menu!",
    goal2: "Half of build Green lvl2 Two Worlds",
  },
  "Green Belt: Level 2 | Two Worlds": {
    goal1: "Half of build Green lvl2 Avoid the Haystacks!",
    goal2: "Complete build Green lvl2 Avoid the Haystacks!",
  },
  "Half of Green Belt: Level 2 | Two Worlds": {
    goal1: "Complete build Green lvl2 Two Worlds",
    goal2: "Half of build Green lvl2 Avoid the Haystacks!",
  },
  "Green Belt: Level 2 | Avoid the Haystacks!": {
    goal1: "Half of Adventure Green lvl2 Creating with Tilemap Overlap Events!",
    goal2: "Complete Adventure Green lvl2 Creating with Tilemap Overlap Events!",
  },
  "Half of Green Belt: Level 2 | Avoid the Haystacks!": {
    goal1: "Complete build Green lvl2 Avoid the Haystacks!",
    goal2: "Half of Adventure Green lvl2 Creating with Tilemap Overlap Events!",
  },
  "Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!": {
    goal1: "",
    goal2: "",
  },
  "Half of Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!": {
    goal1: "Complete Adventure Green lvl2 Creating with Tilemap Overlap Events!",
    goal2: "",
  },
} as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: "White Belt: Level 1 | Your First Sprite", label: "White Belt: Level 1 | Your First Sprite" },
  { value: "Half of White Belt: Level 1 | Your First Sprite", label: "Half of White Belt: Level 1 | Your First Sprite" },
  { value: "White Belt: Level 1 | Spooky Effects", label: "White Belt: Level 1 | Spooky Effects" },
  { value: "Half of White Belt: Level 1 | Spooky Effects", label: "Half of White Belt: Level 1 | Spooky Effects" },
  { value: "White Belt: Level 1 | Adventure My First Coding Project", label: "White Belt: Level 1 | Adventure My First Coding Project" },
  { value: "Half of White Belt: Level 1 | Adventure My First Coding Project", label: "Half of White Belt: Level 1 | Adventure My First Coding Project" },
  { value: "White Belt: Level 2 | Meet New Friends!", label: "White Belt: Level 2 | Meet New Friends!" },
  { value: "Half of White Belt: Level 2 | Meet New Friends!", label: "Half of White Belt: Level 2 | Meet New Friends!" },
  { value: "White Belt: Level 2 | Where's My Puppy?", label: "White Belt: Level 2 | Where's My Puppy?" },
  { value: "Half of White Belt: Level 2 | Where's My Puppy?", label: "Half of White Belt: Level 2 | Where's My Puppy!" },
  { value: "White Belt: Level 2 | Adventure Creating with", label: "White Belt: Level 2 | Adventure Creating with" },
  { value: "Half of White Belt: Level 2 | Adventure Creating with", label: "Half of White Belt: Level 2 | Adventure Creating with" },
  { value: "White Belt: Level 3 | Fly Me to the Moon!", label: "White Belt: Level 3 | Fly Me to the Moon!" },
  { value: "Half of White Belt: Level 3 | Fly Me to the Moon!", label: "Half of White Belt: Level 3 | Fly Me to the Moon!" },
  { value: "White Belt: Level 3 | Dinner Time!", label: "White Belt: Level 3 | Dinner Time!" },
  { value: "Half of White Belt: Level 3 | Dinner Time!", label: "Half of White Belt: Level 3 | Dinner Time!" },
  { value: "White Belt: Level 3 | Adventure Creating with Events!", label: "White Belt: Level 3 | Adventure Creating with Events!" },
  { value: "Half of White Belt: Level 3 | Adventure Creating with Events!", label: "Half of White Belt: Level 3 | Adventure Creating with Events!" },
  { value: "White Belt: Level 4 | A Piece of Cake", label: "White Belt: Level 4 | A Piece of Cake" },
  { value: "Half of White Belt: Level 4 | A Piece of Cake", label: "Half of White Belt: Level 4 | A Piece of Cake" },
  { value: "White Belt: Level 4 | Underwater Food Chain", label: "White Belt: Level 4 | Underwater Food Chain" },
  { value: "Half of White Belt: Level 4 | Underwater Food Chain", label: "Half of White Belt: Level 4 | Underwater Food Chain" },
  { value: "White Belt: Level 4 | Adventure Creating with Functions", label: "White Belt: Level 4 | Adventure Creating with Functions" },
  { value: "Half of White Belt: Level 4 | Adventure Creating with Functions", label: "Half of White Belt: Level 4 | Adventure Creating with Functions" },
  { value: "White Belt: Level 5 | Munchy Munchy Monkey", label: "White Belt: Level 5 | Munchy Munchy Monkey" },
  { value: "Half of White Belt: Level 5 | Munchy Munchy Monkey", label: "Half of White Belt: Level 5 | Munchy Munchy Monkey" },
  { value: "White Belt: Level 5 | Pearl Collector", label: "White Belt: Level 5 | Pearl Collector" },
  { value: "Half of White Belt: Level 5 | Pearl Collector", label: "Half of White Belt: Level 5 | Pearl Collector" },
  { value: "White Belt: Level 5 | Adventure Creating with Variables!", label: "White Belt: Level 5 | Adventure Creating with Variables!" },
  { value: "Half of White Belt: Level 5 | Adventure Creating with Variables!", label: "Half of White Belt: Level 5 | Adventure Creating with Variables!" },
  { value: "White Belt: Level 6 | Avoid the Asteroids!", label: "White Belt: Level 6 | Avoid the Asteroids!" },
  { value: "Half of White Belt: Level 6 | Avoid the Asteroids!", label: "Half of White Belt: Level 6 | Avoid the Asteroids!" },
  { value: "White Belt: Level 6 | Space Adventure", label: "White Belt: Level 6 | Space Adventure" },
  { value: "Half of White Belt: Level 6 | Space Adventure", label: "Half of White Belt: Level 6 | Space Adventure" },
  { value: "White Belt: Level 6 | Adventure Creating with Loops!", label: "White Belt: Level 6 | Adventure Creating with Loops!" },
  { value: "Half of White Belt: Level 6 | Adventure Creating with Loops!", label: "Half of White Belt: Level 6 | Adventure Creating with Loops!" },
  { value: "White Belt: Level 7 | The Wizard's Mystic Toadstools", label: "White Belt: Level 7 | The Wizard's Mystic Toadstools" },
  { value: "Half of White Belt: Level 7 | The Wizard's Mystic Toadstools", label: "Half of White Belt: Level 7 | The Wizard's Mystic Toadstools" },
  { value: "White Belt: Level 7 | Unlock the Hidden Treasure!", label: "White Belt: Level 7 | Unlock the Hidden Treasure!" },
  { value: "Half of White Belt: Level 7 | Unlock the Hidden Treasure!", label: "Half of White Belt: Level 7 | Unlock the Hidden Treasure!" },
  { value: "White Belt: Level 7 | Adventure Creating with Conditionals!", label: "White Belt: Level 7 | Adventure Creating with Conditionals!" },
  { value: "Half of White Belt: Level 7 | Adventure Creating with Conditionals!", label: "Half of White Belt: Level 7 | Adventure Creating with Conditionals!" },
  { value: "White Belt: Level 8 | Animated Aquarium", label: "White Belt: Level 8 | Animated Aquarium" },
  { value: "Half of White Belt: Level 8 | Animated Aquarium", label: "Half of White Belt: Level 8 | Animated Aquarium" },
  { value: "White Belt: Level 8 | Musical Mayhem", label: "White Belt: Level 8 | Musical Mayhem" },
  { value: "Half of White Belt: Level 8 | Musical Mayhem", label: "Half of White Belt: Level 8 | Musical Mayhem" },
  { value: "White Belt: Level 8 | Adventure White Belt Belt-Up Project!", label: "White Belt: Level 8 | Adventure White Belt Belt-Up Project!" },
  { value: "Half of White Belt: Level 8 | Adventure White Belt Belt-Up Project!", label: "Half of White Belt: Level 8 | Adventure White Belt Belt-Up Project!" },
  { value: "Yellow Belt: Level 1 | Avoid the Snakes!", label: "Yellow Belt: Level 1 | Avoid the Snakes!" },
  { value: "Half of Yellow Belt: Level 1 | Avoid the Snakes!", label: "Half of Yellow Belt: Level 1 | Avoid the Snakes!" },
  { value: "Yellow Belt: Level 1 | Carrot Chase", label: "Yellow Belt: Level 1 | Carrot Chase" },
  { value: "Half of Yellow Belt: Level 1 | Carrot Chase", label: "Half of Yellow Belt: Level 1 | Carrot Chase" },
  { value: "Yellow Belt: Level 1 | Adventure Creating with Tilemaps!", label: "Yellow Belt: Level 1 | Adventure Creating with Tilemaps!" },
  { value: "Half of Yellow Belt: Level 1 | Adventure Creating with Tilemaps!", label: "Half of Yellow Belt: Level 1 | Adventure Creating with Tilemaps!" },
  { value: "Yellow Belt: Level 2 | The Key to the Castle", label: "Yellow Belt: Level 2 | The Key to the Castle" },
  { value: "Half of Yellow Belt: Level 2 | The Key to the Castle", label: "Half of Yellow Belt: Level 2 | The Key to the Castle" },
  { value: "Yellow Belt: Level 2 | Coin Grabber!", label: "Yellow Belt: Level 2 | Coin Grabber!" },
  { value: "Half of Yellow Belt: Level 2 | Coin Grabber!", label: "Half of Yellow Belt: Level 2 | Coin Grabber!" },
  { value: "Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!", label: "Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!" },
  { value: "Half of Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!", label: "Half of Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!" },
  { value: "Yellow Belt: Level 3 | All About Me", label: "Yellow Belt: Level 3 | All About Me" },
  { value: "Half of Yellow Belt: Level 3 | All About Me", label: "Half of Yellow Belt: Level 3 | All About Me" },
  { value: "Yellow Belt: Level 3 | Welcome to the Farm", label: "Yellow Belt: Level 3 | Welcome to the Farm" },
  { value: "Half of Yellow Belt: Level 3 | Welcome to the Farm", label: "Half of Yellow Belt: Level 3 | Welcome to the Farm" },
  { value: "Yellow Belt: Level 3 | Mad Libs", label: "Yellow Belt: Level 3 | Mad Libs" },
  { value: "Half of Yellow Belt: Level 3 | Mad Libs", label: "Half of Yellow Belt: Level 3 | Mad Libs" },
  { value: "Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!", label: "Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!" },
  { value: "Half of Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!", label: "Half of Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!" },
  { value: "Yellow Belt: Level 4 | Memory Game", label: "Yellow Belt: Level 4 | Memory Game" },
  { value: "Half of Yellow Belt: Level 4 | Memory Game", label: "Half of Yellow Belt: Level 4 | Memory Game" },
  { value: "Yellow Belt: Level 4 | Archeological Dig", label: "Yellow Belt: Level 4 | Archeological Dig" },
  { value: "Half of Yellow Belt: Level 4 | Archeological Dig", label: "Half of Yellow Belt: Level 4 | Archeological Dig" },
  { value: "Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!", label: "Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!" },
  { value: "Half of Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!", label: "Half of Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!" },
  { value: "Yellow Belt: Level 5 | Cookie Clicker Game!", label: "Yellow Belt: Level 5 | Cookie Clicker Game!" },
  { value: "Half of Yellow Belt: Level 5 | Cookie Clicker Game!", label: "Half of Yellow Belt: Level 5 | Cookie Clicker Game!" },
  { value: "Yellow Belt: Level 5 | Snowflake Catch", label: "Yellow Belt: Level 5 | Snowflake Catch" },
  { value: "Half of Yellow Belt: Level 5 | Snowflake Catch", label: "Half of Yellow Belt: Level 5 | Snowflake Catch" },
  { value: "Yellow Belt: Level 5 | Adventure Creating with Functions!", label: "Yellow Belt: Level 5 | Adventure Creating with Functions!" },
  { value: "Half of Yellow Belt: Level 5 | Adventure Creating with Functions!", label: "Half of Yellow Belt: Level 5 | Adventure Creating with Functions!" },
  { value: "Yellow Belt: Level 6 | Cactus Jump", label: "Yellow Belt: Level 6 | Cactus Jump" },
  { value: "Half of Yellow Belt: Level 6 | Cactus Jump", label: "Half of Yellow Belt: Level 6 | Cactus Jump" },
  { value: "Yellow Belt: Level 6 | Avoid the Roadblocks", label: "Yellow Belt: Level 6 | Avoid the Roadblocks" },
  { value: "Half of Yellow Belt: Level 6 | Avoid the Roadblocks", label: "Half of Yellow Belt: Level 6 | Avoid the Roadblocks" },
  { value: "Yellow Belt: Level 6 | The Floor is Lava!", label: "Yellow Belt: Level 6 | The Floor is Lava!" },
  { value: "Half of Yellow Belt: Level 6 | The Floor is Lava!", label: "Half of Yellow Belt: Level 6 | The Floor is Lava!" },
  { value: "Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!", label: "Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!" },
  { value: "Half of Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!", label: "Half of Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!" },
  { value: "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt", label: "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt" },
  { value: "Half of Yellow Belt: Level 7 | Magic Coin Scavenger Hunt", label: "Half of Yellow Belt: Level 7 | Magic Coin Scavenger Hunt" },
  { value: "Yellow Belt: Level 7 | Raindrop Invincibility", label: "Yellow Belt: Level 7 | Raindrop Invincibility" },
  { value: "Half of Yellow Belt: Level 7 | Raindrop Invincibility", label: "Half of Yellow Belt: Level 7 | Raindrop Invincibility" },
  { value: "Yellow Belt: Level 7 | Snake Pit!", label: "Yellow Belt: Level 7 | Snake Pit!" },
  { value: "Half of Yellow Belt: Level 7 | Snake Pit!", label: "Half of Yellow Belt: Level 7 | Snake Pit!" },
  { value: "Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!", label: "Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!" },
  { value: "Half of Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!", label: "Half of Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!" },
  { value: "Yellow Belt: Level 8 | Bubble Pop!", label: "Yellow Belt: Level 8 | Bubble Pop!" },
  { value: "Half of Yellow Belt: Level 8 | Bubble Pop!", label: "Half of Yellow Belt: Level 8 | Bubble Pop!" },
  { value: "Yellow Belt: Level 8 | Bee Catcher", label: "Yellow Belt: Level 8 | Bee Catcher" },
  { value: "Half of Yellow Belt: Level 8 | Bee Catcher", label: "Half of Yellow Belt: Level 8 | Bee Catcher" },
  { value: "Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!", label: "Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!" },
  { value: "Half of Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!", label: "Half of Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!" },
  { value: "Yellow Belt: Level 9 | Block Jumper", label: "Yellow Belt: Level 9 | Block Jumper" },
  { value: "Half of Yellow Belt: Level 9 | Block Jumper", label: "Half of Yellow Belt: Level 9 | Block Jumper" },
  { value: "Yellow Belt: Level 9 | Bridge Builder", label: "Yellow Belt: Level 9 | Bridge Builder" },
  { value: "Half of Yellow Belt: Level 9 | Bridge Builder", label: "Half of Yellow Belt: Level 9 | Bridge Builder" },
  { value: "Yellow Belt: Level 9 | Dino Defender", label: "Yellow Belt: Level 9 | Dino Defender" },
  { value: "Half of Yellow Belt: Level 9 | Dino Defender", label: "Half of Yellow Belt: Level 9 | Dino Defender" },
  { value: "Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!", label: "Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!" },
  { value: "Half of Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!", label: "Half of Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!" },
  { value: "Yellow Belt: Level 10 | Scenic Drive", label: "Yellow Belt: Level 10 | Scenic Drive" },
  { value: "Half of Yellow Belt: Level 10 | Scenic Drive", label: "Half of Yellow Belt: Level 10 | Scenic Drive" },
  { value: "Yellow Belt: Level 10 | Burger Dash", label: "Yellow Belt: Level 10 | Burger Dash" },
  { value: "Half of Yellow Belt: Level 10 | Burger Dash", label: "Half of Yellow Belt: Level 10 | Burger Dash" },
  { value: "Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!", label: "Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!" },
  { value: "Half of Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!", label: "Half of Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!" },
  { value: "Orange Belt: Level 1 | Hello World!", label: "Orange Belt: Level 1 | Hello World!" },
  { value: "Half of Orange Belt: Level 1 | Hello World!", label: "Half of Orange Belt: Level 1 | Hello World!" },
  { value: "Orange Belt: Level 1 | Bouncing on the Walls", label: "Orange Belt: Level 1 | Bouncing on the Walls" },
  { value: "Half of Orange Belt: Level 1 | Bouncing on the Walls", label: "Half of Orange Belt: Level 1 | Bouncing on the Walls" },
  { value: "Orange Belt: Level 1 | Follow Me!", label: "Orange Belt: Level 1 | Follow Me!" },
  { value: "Half of Orange Belt: Level 1 | Follow Me!", label: "Half of Orange Belt: Level 1 | Follow Me!" },
  { value: "Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!", label: "Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!" },
  { value: "Half of Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!", label: "Half of Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!" },
  { value: "Orange Belt: Level 2 | Greeting Card", label: "Orange Belt: Level 2 | Greeting Card" },
  { value: "Half of Orange Belt: Level 2 | Greeting Card", label: "Half of Orange Belt: Level 2 | Greeting Card" },
  { value: "Orange Belt: Level 2 | Show Time!", label: "Orange Belt: Level 2 | Show Time!" },
  { value: "Half of Orange Belt: Level 2 | Show Time!", label: "Half of Orange Belt: Level 2 | Show Time!" },
  { value: "Orange Belt: Level 2 | Seasons Change", label: "Orange Belt: Level 2 | Seasons Change" },
  { value: "Half of Orange Belt: Level 2 | Seasons Change", label: "Half of Orange Belt: Level 2 | Seasons Change" },
  { value: "Orange Belt: Level 2 | Adventure Creating with Properties!", label: "Orange Belt: Level 2 | Adventure Creating with Properties!" },
  { value: "Half of Orange Belt: Level 2 | Adventure Creating with Properties!", label: "Half of Orange Belt: Level 2 | Adventure Creating with Properties!" },
  { value: "Orange Belt: Level 3 | Screen Saver", label: "Orange Belt: Level 3 | Screen Saver" },
  { value: "Half of Orange Belt: Level 3 | Screen Saver", label: "Half of Orange Belt: Level 3 | Screen Saver" },
  { value: "Orange Belt: Level 3 | Button Clicker!", label: "Orange Belt: Level 3 | Button Clicker!" },
  { value: "Half of Orange Belt: Level 3 | Button Clicker!", label: "Half of Orange Belt: Level 3 | Button Clicker!" },
  { value: "Orange Belt: Level 3 | Two Sprite Showdown!", label: "Orange Belt: Level 3 | Two Sprite Showdown!" },
  { value: "Half of Orange Belt: Level 3 | Two Sprite Showdown!", label: "Half of Orange Belt: Level 3 | Two Sprite Showdown!" },
  { value: "Orange Belt: Level 3 | Adventure Creating with Block Statements!", label: "Orange Belt: Level 3 | Adventure Creating with Block Statements!" },
  { value: "Half of Orange Belt: Level 3 | Adventure Creating with Block Statements!", label: "Half of Orange Belt: Level 3 | Adventure Creating with Block Statements!" },
  { value: "Orange Belt: Level 4 | Save the Crab!", label: "Orange Belt: Level 4 | Save the Crab!" },
  { value: "Half of Orange Belt: Level 4 | Save the Crab!", label: "Half of Orange Belt: Level 4 | Save the Crab!" },
  { value: "Orange Belt: Level 4 | Going Bananas!", label: "Orange Belt: Level 4 | Going Bananas!" },
  { value: "Half of Orange Belt: Level 4 | Going Bananas!", label: "Half of Orange Belt: Level 4 | Going Bananas!" },
  { value: "Orange Belt: Level 4 | Grab Bag!", label: "Orange Belt: Level 4 | Grab Bag!" },
  { value: "Half of Orange Belt: Level 4 | Grab Bag!", label: "Half of Orange Belt: Level 4 | Grab Bag!" },
  { value: "Orange Belt: Level 4 | Adventure Creating with nested block statements!", label: "Orange Belt: Level 4 | Adventure Creating with nested block statements!" },
  { value: "Half of Orange Belt: Level 4 | Adventure Creating with nested block statements!", label: "Half of Orange Belt: Level 4 | Adventure Creating with nested block statements!" },
  { value: "Orange Belt: Level 5 | Shop 'Til You Drop", label: "Orange Belt: Level 5 | Shop 'Til You Drop" },
  { value: "Half of Orange Belt: Level 5 | Shop 'Til You Drop", label: "Half of Orange Belt: Level 5 | Shop 'Til You Drop" },
  { value: "Orange Belt: Level 5 | Cookie Stacker", label: "Orange Belt: Level 5 | Cookie Stacker" },
  { value: "Half of Orange Belt: Level 5 | Cookie Stacker", label: "Half of Orange Belt: Level 5 | Cookie Stacker" },
  { value: "Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!", label: "Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!" },
  { value: "Half of Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!", label: "Half of Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!" },
  { value: "Orange Belt: Level 6 | Shooting Hoops!", label: "Orange Belt: Level 6 | Shooting Hoops!" },
  { value: "Half of Orange Belt: Level 6 | Shooting Hoops!", label: "Half of Orange Belt: Level 6 | Shooting Hoops!" },
  { value: "Orange Belt: Level 6 | Guess the Number!", label: "Orange Belt: Level 6 | Guess the Number!" },
  { value: "Half of Orange Belt: Level 6 | Guess the Number!", label: "Half of Orange Belt: Level 6 | Guess the Number!" },
  { value: "Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!", label: "Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!" },
  { value: "Half of Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!", label: "Half of Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!" },
  { value: "Orange Belt: Level 7 | Collect the Honey!", label: "Orange Belt: Level 7 | Collect the Honey!" },
  { value: "Half of Orange Belt: Level 7 | Collect the Honey!", label: "Half of Orange Belt: Level 7 | Collect the Honey!" },
  { value: "Orange Belt: Level 7 | Snowball Fight!", label: "Orange Belt: Level 7 | Snowball Fight!" },
  { value: "Half of Orange Belt: Level 7 | Snowball Fight!", label: "Half of Orange Belt: Level 7 | Snowball Fight!" },
  { value: "Orange Belt: Level 7 | Asteroid Attack!", label: "Orange Belt: Level 7 | Asteroid Attack!" },
  { value: "Half of Orange Belt: Level 7 | Asteroid Attack!", label: "Half of Orange Belt: Level 7 | Asteroid Attack!" },
  { value: "Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!", label: "Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!" },
  { value: "Half of Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!", label: "Half of Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!" },
  { value: "Orange Belt: Level 8 | Fireflies Collector", label: "Orange Belt: Level 8 | Fireflies Collector" },
  { value: "Half of Orange Belt: Level 8 | Fireflies Collector", label: "Half of Orange Belt: Level 8 | Fireflies Collector" },
  { value: "Orange Belt: Level 8 | Counting Sprites", label: "Orange Belt: Level 8 | Counting Sprites" },
  { value: "Half of Orange Belt: Level 8 | Counting Sprites", label: "Half of Orange Belt: Level 8 | Counting Sprites" },
  { value: "Orange Belt: Level 8 | Mystery Boxes!", label: "Orange Belt: Level 8 | Mystery Boxes!" },
  { value: "Half of Orange Belt: Level 8 | Mystery Boxes!", label: "Half of Orange Belt: Level 8 | Mystery Boxes!" },
  { value: "Orange Belt: Level 8 | Adventure Creating with For Loops!", label: "Orange Belt: Level 8 | Adventure Creating with For Loops!" },
  { value: "Half of Orange Belt: Level 8 | Adventure Creating with For Loops!", label: "Half of Orange Belt: Level 8 | Adventure Creating with For Loops!" },
  { value: "Orange Belt: Level 9 | Magic 8 Ball", label: "Orange Belt: Level 9 | Magic 8 Ball" },
  { value: "Half of Orange Belt: Level 9 | Magic 8 Ball", label: "Half of Orange Belt: Level 9 | Magic 8 Ball" },
  { value: "Orange Belt: Level 9 | What's in a Name?", label: "Orange Belt: Level 9 | What's in a Name?" },
  { value: "Half of Orange Belt: Level 9 | What's in a Name?", label: "Half of Orange Belt: Level 9 | What's in a Name?" },
  { value: "Orange Belt: Level 9 | Concentration", label: "Orange Belt: Level 9 | Concentration" },
  { value: "Half of Orange Belt: Level 9 | Concentration", label: "Half of Orange Belt: Level 9 | Concentration" },
  { value: "Orange Belt: Level 9 | Adventure Creating with Arrays!", label: "Orange Belt: Level 9 | Adventure Creating with Arrays!" },
  { value: "Half of Orange Belt: Level 9 | Adventure Creating with Arrays!", label: "Half of Orange Belt: Level 9 | Adventure Creating with Arrays!" },
  { value: "Orange Belt: Level 10 | Match Game", label: "Orange Belt: Level 10 | Match Game" },
  { value: "Half of Orange Belt: Level 10 | Match Game", label: "Half of Orange Belt: Level 10 | Match Game" },
  { value: "Orange Belt: Level 10 | Username Generator", label: "Orange Belt: Level 10 | Username Generator" },
  { value: "Half of Orange Belt: Level 10 | Username Generator", label: "Half of Orange Belt: Level 10 | Username Generator" },
  { value: "Orange Belt: Level 10 | Memory Match", label: "Orange Belt: Level 10 | Memory Match" },
  { value: "Half of Orange Belt: Level 10 | Memory Match", label: "Half of Orange Belt: Level 10 | Memory Match" },
  { value: "Orange Belt: Level 10 | Adventure Creating with Array Functions!", label: "Orange Belt: Level 10 | Adventure Creating with Array Functions!" },
  { value: "Half of Orange Belt: Level 10 | Adventure Creating with Array Functions!", label: "Half of Orange Belt: Level 10 | Adventure Creating with Array Functions!" },
  { value: "Orange Belt: Level 11 | Pizza Party", label: "Orange Belt: Level 11 | Pizza Party" },
  { value: "Half of Orange Belt: Level 11 | Pizza Party", label: "Half of Orange Belt: Level 11 | Pizza Party" },
  { value: "Orange Belt: Level 11 | Barn Breakout!", label: "Orange Belt: Level 11 | Barn Breakout!" },
  { value: "Half of Orange Belt: Level 11 | Barn Breakout!", label: "Half of Orange Belt: Level 11 | Barn Breakout!" },
  { value: "Orange Belt: Level 11 | Damage Control", label: "Orange Belt: Level 11 | Damage Control" },
  { value: "Half of Orange Belt: Level 11 | Damage Control", label: "Half of Orange Belt: Level 11 | Damage Control" },
  { value: "Orange Belt: Level 11 | Adventure Creating with Functions!", label: "Orange Belt: Level 11 | Adventure Creating with Functions!" },
  { value: "Half of Orange Belt: Level 11 | Adventure Creating with Functions!", label: "Half of Orange Belt: Level 11 | Adventure Creating with Functions!" },
  { value: "Orange Belt: Level 12 | Escape the Haunted Castle!", label: "Orange Belt: Level 12 | Escape the Haunted Castle!" },
  { value: "Half of Orange Belt: Level 12 | Escape the Haunted Castle!", label: "Half of Orange Belt: Level 12 | Escape the Haunted Castle!" },
  { value: "Orange Belt: Level 12 | City Scroller", label: "Orange Belt: Level 12 | City Scroller" },
  { value: "Half of Orange Belt: Level 12 | City Scroller", label: "Half of Orange Belt: Level 12 | City Scroller" },
  { value: "Orange Belt: Level 12 | Find the Ninja!", label: "Orange Belt: Level 12 | Find the Ninja!" },
  { value: "Half of Orange Belt: Level 12 | Find the Ninja!", label: "Half of Orange Belt: Level 12 | Find the Ninja!" },
  { value: "Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project", label: "Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project" },
  { value: "Half of Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project", label: "Half of Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project" },
  { value: "Green Belt: Level 1 | The Bookcase", label: "Green Belt: Level 1 | The Bookcase" },
  { value: "Half of Green Belt: Level 1 | The Bookcase", label: "Half of Green Belt: Level 1 | The Bookcase" },
  { value: "Green Belt: Level 1 | Shark Attack", label: "Green Belt: Level 1 | Shark Attack" },
  { value: "Half of Green Belt: Level 1 | Shark Attack", label: "Half of Green Belt: Level 1 | Shark Attack" },
  { value: "Green Belt: Level 1 | Adventure Creating with the Assets Menu!", label: "Green Belt: Level 1 | Adventure Creating with the Assets Menu!" },
  { value: "Half of Green Belt: Level 1 | Adventure Creating with the Assets Menu!", label: "Half of Green Belt: Level 1 | Adventure Creating with the Assets Menu!" },
  { value: "Green Belt: Level 2 | Two Worlds", label: "Green Belt: Level 2 | Two Worlds" },
  { value: "Half of Green Belt: Level 2 | Two Worlds", label: "Half of Green Belt: Level 2 | Two Worlds" },
  { value: "Green Belt: Level 2 | Avoid the Haystacks!", label: "Green Belt: Level 2 | Avoid the Haystacks!" },
  { value: "Half of Green Belt: Level 2 | Avoid the Haystacks!", label: "Half of Green Belt: Level 2 | Avoid the Haystacks!" },
  { value: "Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!", label: "Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!" },
  { value: "Half of Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!", label: "Half of Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!" },
];