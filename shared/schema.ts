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
  description: text("description").notNull(),
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
    goal1: "Half of White Belt: Level 1 | build Spooky Effects",
    goal2: "Complete White Belt: Level 1 | build Spooky Effects",
  },
  "White Belt: Level 1 | Spooky Effects": {
    goal1: "Half of White Belt: Level 1 | Adventure My First Coding Project",
    goal2: "Complete White Belt: Level 1 | Adventure My First Coding Project",
  },
  "White Belt: Level 1 | Adventure My First Coding Project": {
    goal1: "Half of White Belt: Level 2 | build Meet New Friends!",
    goal2: "Complete White Belt: Level 2 | build Meet New Friends!",
  },
  "White Belt: Level 2 | Meet New Friends!": {
    goal1: "Half of White Belt: Level 2 | build Where's My Puppy?",
    goal2: "Complete White Belt: Level 2 | build Where's My Puppy?",
  },
  "White Belt: Level 2 | Where's My Puppy?": {
    goal1: "Half of White Belt: Level 2 | Adventure Creating with",
    goal2: "Complete White Belt: Level 2 | Adventure Creating with",
  },
  "White Belt: Level 2 | Adventure Creating with": {
    goal1: "Half of White Belt: Level 3 | build Fly Me to the Moon!",
    goal2: "Complete White Belt: Level 3 | build Fly Me to the Moon!",
  },
  "White Belt: Level 3 | Fly Me to the Moon!": {
    goal1: "Half of White Belt: Level 3 | build Dinner Time!",
    goal2: "Complete White Belt: Level 3 | build Dinner Time!",
  },
  "White Belt: Level 3 | Dinner Time!": {
    goal1: "Half of White Belt: Level 3 | Adventure Creating with Events!",
    goal2: "Complete White Belt: Level 3 | Adventure Creating with Events!",
  },
  "White Belt: Level 3 | Adventure Creating with Events!": {
    goal1: "Half of White Belt: Level 4 | build A Piece of Cake",
    goal2: "Complete White Belt: Level 4 | build A Piece of Cake",
  },
  "White Belt: Level 4 | A Piece of Cake": {
    goal1: "Half of White Belt: Level 4 | build Underwater Food Chain",
    goal2: "Complete White Belt: Level 4 | build Underwater Food Chain",
  },
  "White Belt: Level 4 | Underwater Food Chain": {
    goal1: "Half of White Belt: Level 4 | Adventure Creating with Functions",
    goal2: "Complete White Belt: Level 4 | Adventure Creating with Functions",
  },
  "White Belt: Level 4 | Adventure Creating with Functions": {
    goal1: "Half of White Belt: Level 5 | build Munchy Munchy Monkey",
    goal2: "Complete White Belt: Level 5 | build Munchy Munchy Monkey",
  },
  "White Belt: Level 5 | Munchy Munchy Monkey": {
    goal1: "Half of White Belt: Level 5 | build Pearl Collector",
    goal2: "Complete White Belt: Level 5 | build Pearl Collector",
  },
  "White Belt: Level 5 | Pearl Collector": {
    goal1: "Half of White Belt: Level 5 | Adventure Creating with Variables!",
    goal2: "Complete White Belt: Level 5 | Adventure Creating with Variables!",
  },
  "White Belt: Level 5 | Adventure Creating with Variables!": {
    goal1: "Half of White Belt: Level 6 | build Avoid the Asteroids!",
    goal2: "Complete White Belt: Level 6 | build Avoid the Asteroids!",
  },
  "White Belt: Level 6 | Avoid the Asteroids!": {
    goal1: "Half of White Belt: Level 6 | build Space Adventure",
    goal2: "Complete White Belt: Level 6 | build Space Adventure",
  },
  "White Belt: Level 6 | Space Adventure": {
    goal1: "Half of White Belt: Level 6 | Adventure Creating with Loops!",
    goal2: "Complete White Belt: Level 6 | Adventure Creating with Loops!",
  },
  "White Belt: Level 6 | Adventure Creating with Loops!": {
    goal1: "Half of White Belt: Level 7 | build The Wizard's Mystic Toadstools",
    goal2: "Complete White Belt: Level 7 | build The Wizard's Mystic Toadstools",
  },
  "White Belt: Level 7 | The Wizard's Mystic Toadstools": {
    goal1: "Half of White Belt: Level 7 | build Unlock the Hidden Treasure!",
    goal2: "Complete White Belt: Level 7 | build Unlock the Hidden Treasure!",
  },
  "White Belt: Level 7 | Unlock the Hidden Treasure!": {
    goal1: "Half of White Belt: Level 7 | Adventure Creating with Conditionals!",
    goal2: "Complete White Belt: Level 7 | Adventure Creating with Conditionals!",
  },
  "White Belt: Level 7 | Adventure Creating with Conditionals!": {
    goal1: "Half of White Belt: Level 8 | build Animated Aquarium",
    goal2: "Complete White Belt: Level 8 | build Animated Aquarium",
  },
  "White Belt: Level 8 | Animated Aquarium": {
    goal1: "Half of White Belt: Level 8 | build Musical Mayhem",
    goal2: "Complete White Belt: Level 8 | build Musical Mayhem",
  },
  "White Belt: Level 8 | Musical Mayhem": {
    goal1: "Half of White Belt: Level 8 | Adventure White Belt Belt-Up Project!",
    goal2: "Complete White Belt: Level 8 | Adventure White Belt Belt-Up Project!",
  },
  "White Belt: Level 8 | Adventure White Belt Belt-Up Project!": {
    goal1: "Half of Yellow Belt: Level 1 | build Avoid the Snakes!",
    goal2: "Complete Yellow Belt: Level 1 | build Avoid the Snakes!",
  },
  "Yellow Belt: Level 1 | Avoid the Snakes!": {
    goal1: "Half of Yellow Belt: Level 1 | build Carrot Chase",
    goal2: "Complete Yellow Belt: Level 1 | build Carrot Chase",
  },
  "Yellow Belt: Level 1 | Carrot Chase": {
    goal1: "Half of Yellow Belt: Level 1 | Adventure Creating with Tilemaps!",
    goal2: "Complete Yellow Belt: Level 1 | Adventure Creating with Tilemaps!",
  },
  "Yellow Belt: Level 1 | Adventure Creating with Tilemaps!": {
    goal1: "Half of Yellow Belt: Level 2 | build The Key to the Castle",
    goal2: "Complete Yellow Belt: Level 2 | build The Key to the Castle",
  },
  "Yellow Belt: Level 2 | The Key to the Castle": {
    goal1: "Half of Yellow Belt: Level 2 | build Coin Grabber!",
    goal2: "Complete Yellow Belt: Level 2 | build Coin Grabber!",
  },
  "Yellow Belt: Level 2 | Coin Grabber!": {
    goal1: "Half of Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!",
    goal2: "Complete Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!",
  },
  "Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!": {
    goal1: "Half of Yellow Belt: Level 3 | build All About Me",
    goal2: "Complete Yellow Belt: Level 3 | build All About Me",
  },
  "Yellow Belt: Level 3 | All About Me": {
    goal1: "Half of Yellow Belt: Level 3 | build Welcome to the Farm",
    goal2: "Complete Yellow Belt: Level 3 | build Welcome to the Farm",
  },
  "Yellow Belt: Level 3 | Welcome to the Farm": {
    goal1: "Half of Yellow Belt: Level 3 | build Mad Libs",
    goal2: "Complete Yellow Belt: Level 3 | build Mad Libs",
  },
  "Yellow Belt: Level 3 | Mad Libs": {
    goal1: "Half of Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!",
    goal2: "Complete Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!",
  },
  "Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!": {
    goal1: "Half of Yellow Belt: Level 4 | build Memory Game",
    goal2: "Complete Yellow Belt: Level 4 | build Memory Game",
  },
  "Yellow Belt: Level 4 | Memory Game": {
    goal1: "Half of Yellow Belt: Level 4 | build Archeological Dig",
    goal2: "Complete Yellow Belt: Level 4 | build Archeological Dig",
  },
  "Yellow Belt: Level 4 | Archeological Dig": {
    goal1: "Half of Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!",
    goal2: "Complete Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!",
  },
  "Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!": {
    goal1: "Half of Yellow Belt: Level 5 | build Cookie Clicker Game!",
    goal2: "Complete Yellow Belt: Level 5 | build Cookie Clicker Game!",
  },
  "Yellow Belt: Level 5 | Cookie Clicker Game!": {
    goal1: "Half of Yellow Belt: Level 5 | build Snowflake Catch",
    goal2: "Complete Yellow Belt: Level 5 | build Snowflake Catch",
  },
  "Yellow Belt: Level 5 | Snowflake Catch": {
    goal1: "Half of Yellow Belt: Level 5 | Adventure Creating with Functions!",
    goal2: "Complete Yellow Belt: Level 5 | Adventure Creating with Functions!",
  },
  "Yellow Belt: Level 5 | Adventure Creating with Functions!": {
    goal1: "Half of Yellow Belt: Level 6 | build Cactus Jump",
    goal2: "Complete Yellow Belt: Level 6 | build Cactus Jump",
  },
  "Yellow Belt: Level 6 | Cactus Jump": {
    goal1: "Half of Yellow Belt: Level 6 | build Avoid the Roadblocks",
    goal2: "Complete Yellow Belt: Level 6 | build Avoid the Roadblocks",
  },
  "Yellow Belt: Level 6 | Avoid the Roadblocks": {
    goal1: "Half of Yellow Belt: Level 6 | build The Floor is Lava!",
    goal2: "Complete Yellow Belt: Level 6 | build The Floor is Lava!",
  },
  "Yellow Belt: Level 6 | The Floor is Lava!": {
    goal1: "Half of Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!",
    goal2: "Complete Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!",
  },
  "Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!": {
    goal1: "Half of Yellow Belt: Level 7 | build Magic Coin Scavenger Hunt",
    goal2: "Complete Yellow Belt: Level 7 | build Magic Coin Scavenger Hunt",
  },
  "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt": {
    goal1: "Half of Yellow Belt: Level 7 | build Raindrop Invincibility",
    goal2: "Complete Yellow Belt: Level 7 | build Raindrop Invincibility",
  },
  "Yellow Belt: Level 7 | Raindrop Invincibility": {
    goal1: "Half of Yellow Belt: Level 7 | build Snake Pit!",
    goal2: "Complete Yellow Belt: Level 7 | build Snake Pit!",
  },
  "Yellow Belt: Level 7 | Snake Pit!": {
    goal1: "Half of Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!",
    goal2: "Complete Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!",
  },
  "Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!": {
    goal1: "Half of Yellow Belt: Level 8 | build Bubble Pop!",
    goal2: "Complete Yellow Belt: Level 8 | build Bubble Pop!",
  },
  "Yellow Belt: Level 8 | Bubble Pop!": {
    goal1: "Half of Yellow Belt: Level 8 | build Bee Catcher",
    goal2: "Complete Yellow Belt: Level 8 | build Bee Catcher",
  },
  "Yellow Belt: Level 8 | Bee Catcher": {
    goal1: "Half of Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!",
    goal2: "Complete Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!",
  },
  "Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!": {
    goal1: "Half of Yellow Belt: Level 9 | build Block Jumper",
    goal2: "Complete Yellow Belt: Level 9 | build Block Jumper",
  },
  "Yellow Belt: Level 9 | Block Jumper": {
    goal1: "Half of Yellow Belt: Level 9 | build Bridge Builder",
    goal2: "Complete Yellow Belt: Level 9 | build Bridge Builder",
  },
  "Yellow Belt: Level 9 | Bridge Builder": {
    goal1: "Half of Yellow Belt: Level 9 | build Dino Defender",
    goal2: "Complete Yellow Belt: Level 9 | build Dino Defender",
  },
  "Yellow Belt: Level 9 | Dino Defender": {
    goal1: "Half of Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!",
    goal2: "Complete Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!",
  },
  "Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!": {
    goal1: "Half of Yellow Belt: Level 10 | build Scenic Drive",
    goal2: "Complete Yellow Belt: Level 10 | build Scenic Drive",
  },
  "Yellow Belt: Level 10 | Scenic Drive": {
    goal1: "Half of Yellow Belt: Level 10 | build Burger Dash",
    goal2: "Complete Yellow Belt: Level 10 | build Burger Dash",
  },
  "Yellow Belt: Level 10 | Burger Dash": {
    goal1: "Half of Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!",
    goal2: "Complete Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!",
  },
  "Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!": {
    goal1: "Half of Orange Belt: Level 1 | build Hello World!",
    goal2: "Complete Orange Belt: Level 1 | build Hello World!",
  },
  "Orange Belt: Level 1 | Hello World!": {
    goal1: "Half of Orange Belt: Level 1 | build Bouncing on the Walls",
    goal2: "Complete Orange Belt: Level 1 | build Bouncing on the Walls",
  },
  "Orange Belt: Level 1 | Bouncing on the Walls": {
    goal1: "Half of Orange Belt: Level 1 | build Follow Me!",
    goal2: "Complete Orange Belt: Level 1 | build Follow Me!",
  },
  "Orange Belt: Level 1 | Follow Me!": {
    goal1: "Half of Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!",
    goal2: "Complete Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!",
  },
  "Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!": {
    goal1: "Half of Orange Belt: Level 2 | build Greeting Card",
    goal2: "Complete Orange Belt: Level 2 | build Greeting Card",
  },
  "Orange Belt: Level 2 | Greeting Card": {
    goal1: "Half of Orange Belt: Level 2 | build Show Time!",
    goal2: "Complete Orange Belt: Level 2 | build Show Time!",
  },
  "Orange Belt: Level 2 | Show Time!": {
    goal1: "Half of Orange Belt: Level 2 | build Seasons Change",
    goal2: "Complete Orange Belt: Level 2 | build Seasons Change",
  },
  "Orange Belt: Level 2 | Seasons Change": {
    goal1: "Half of Orange Belt: Level 2 | Adventure Creating with Properties!",
    goal2: "Complete Orange Belt: Level 2 | Adventure Creating with Properties!",
  },
  "Orange Belt: Level 2 | Adventure Creating with Properties!": {
    goal1: "Half of Orange Belt: Level 3 | build Screen Saver",
    goal2: "Complete Orange Belt: Level 3 | build Screen Saver",
  },
  "Orange Belt: Level 3 | Screen Saver": {
    goal1: "Half of Orange Belt: Level 3 | build Button Clicker!",
    goal2: "Complete Orange Belt: Level 3 | build Button Clicker!",
  },
  "Orange Belt: Level 3 | Button Clicker!": {
    goal1: "Half of Orange Belt: Level 3 | build Two Sprite Showdown!",
    goal2: "Complete Orange Belt: Level 3 | build Two Sprite Showdown!",
  },
  "Orange Belt: Level 3 | Two Sprite Showdown!": {
    goal1: "Half of Orange Belt: Level 3 | Adventure Creating with Block Statements!",
    goal2: "Complete Orange Belt: Level 3 | Adventure Creating with Block Statements!",
  },
  "Orange Belt: Level 3 | Adventure Creating with Block Statements!": {
    goal1: "Half of Orange Belt: Level 4 | build Save the Crab!",
    goal2: "Complete Orange Belt: Level 4 | build Save the Crab!",
  },
  "Orange Belt: Level 4 | Save the Crab!": {
    goal1: "Half of Orange Belt: Level 4 | build Going Bananas!",
    goal2: "Complete Orange Belt: Level 4 | build Going Bananas!",
  },
  "Orange Belt: Level 4 | Going Bananas!": {
    goal1: "Half of Orange Belt: Level 4 | build Grab Bag!",
    goal2: "Complete Orange Belt: Level 4 | build Grab Bag!",
  },
  "Orange Belt: Level 4 | Grab Bag!": {
    goal1: "Half of Orange Belt: Level 4 | Adventure Creating with nested block statements!",
    goal2: "Complete Orange Belt: Level 4 | Adventure Creating with nested block statements!",
  },
  "Orange Belt: Level 4 | Adventure Creating with nested block statements!": {
    goal1: "Half of Orange Belt: Level 5 | build Shop 'Til You Drop",
    goal2: "Complete Orange Belt: Level 5 | build Shop 'Til You Drop",
  },
  "Orange Belt: Level 5 | Shop 'Til You Drop": {
    goal1: "Half of Orange Belt: Level 5 | build Cookie Stacker",
    goal2: "Complete Orange Belt: Level 5 | build Cookie Stacker",
  },
  "Orange Belt: Level 5 | Cookie Stacker": {
    goal1: "Half of Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!",
    goal2: "Complete Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!",
  },
  "Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!": {
    goal1: "Half of Orange Belt: Level 6 | build Shooting Hoops!",
    goal2: "Complete Orange Belt: Level 6 | build Shooting Hoops!",
  },
  "Orange Belt: Level 6 | Shooting Hoops!": {
    goal1: "Half of Orange Belt: Level 6 | build Guess the Number!",
    goal2: "Complete Orange Belt: Level 6 | build Guess the Number!",
  },
  "Orange Belt: Level 6 | Guess the Number!": {
    goal1: "Half of Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!",
    goal2: "Complete Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!",
  },
  "Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!": {
    goal1: "Half of Orange Belt: Level 7 | build Collect the Honey!",
    goal2: "Complete Orange Belt: Level 7 | build Collect the Honey!",
  },
  "Orange Belt: Level 7 | Collect the Honey!": {
    goal1: "Half of Orange Belt: Level 7 | build Snowball Fight!",
    goal2: "Complete Orange Belt: Level 7 | build Snowball Fight!",
  },
  "Orange Belt: Level 7 | Snowball Fight!": {
    goal1: "Half of Orange Belt: Level 7 | build Asteroid Attack!",
    goal2: "Complete Orange Belt: Level 7 | build Asteroid Attack!",
  },
  "Orange Belt: Level 7 | Asteroid Attack!": {
    goal1: "Half of Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!",
    goal2: "Complete Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!",
  },
  "Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!": {
    goal1: "Half of Orange Belt: Level 8 | build Fireflies Collector",
    goal2: "Complete Orange Belt: Level 8 | build Fireflies Collector",
  },
  "Orange Belt: Level 8 | Fireflies Collector": {
    goal1: "Half of Orange Belt: Level 8 | build Counting Sprites",
    goal2: "Complete Orange Belt: Level 8 | build Counting Sprites",
  },
  "Orange Belt: Level 8 | Counting Sprites": {
    goal1: "Half of Orange Belt: Level 8 | build Mystery Boxes!",
    goal2: "Complete Orange Belt: Level 8 | build Mystery Boxes!",
  },
  "Orange Belt: Level 8 | Mystery Boxes!": {
    goal1: "Half of Orange Belt: Level 8 | Adventure Creating with For Loops!",
    goal2: "Complete Orange Belt: Level 8 | Adventure Creating with For Loops!",
  },
  "Orange Belt: Level 8 | Adventure Creating with For Loops!": {
    goal1: "Half of Orange Belt: Level 9 | build Magic 8 Ball",
    goal2: "Complete Orange Belt: Level 9 | build Magic 8 Ball",
  },
  "Orange Belt: Level 9 | Magic 8 Ball": {
    goal1: "Half of Orange Belt: Level 9 | build What's in a Name?",
    goal2: "Complete Orange Belt: Level 9 | build What's in a Name?",
  },
  "Orange Belt: Level 9 | What's in a Name?": {
    goal1: "Half of Orange Belt: Level 9 | build Concentration",
    goal2: "Complete Orange Belt: Level 9 | build Concentration",
  },
  "Orange Belt: Level 9 | Concentration": {
    goal1: "Half of Orange Belt: Level 9 | Adventure Creating with Arrays!",
    goal2: "Complete Orange Belt: Level 9 | Adventure Creating with Arrays!",
  },
  "Orange Belt: Level 9 | Adventure Creating with Arrays!": {
    goal1: "Half of Orange Belt: Level 10 | build Match Game",
    goal2: "Complete Orange Belt: Level 10 | build Match Game",
  },
  "Orange Belt: Level 10 | Match Game": {
    goal1: "Half of Orange Belt: Level 10 | build Username Generator",
    goal2: "Complete Orange Belt: Level 10 | build Username Generator",
  },
  "Orange Belt: Level 10 | Username Generator": {
    goal1: "Half of Orange Belt: Level 10 | build Memory Match",
    goal2: "Complete Orange Belt: Level 10 | build Memory Match",
  },
  "Orange Belt: Level 10 | Memory Match": {
    goal1: "Half of Orange Belt: Level 10 | Adventure Creating with Array Functions!",
    goal2: "Complete Orange Belt: Level 10 | Adventure Creating with Array Functions!",
  },
  "Orange Belt: Level 10 | Adventure Creating with Array Functions!": {
    goal1: "Half of Orange Belt: Level 11 | build Pizza Party",
    goal2: "Complete Orange Belt: Level 11 | build Pizza Party",
  },
  "Orange Belt: Level 11 | Pizza Party": {
    goal1: "Half of Orange Belt: Level 11 | build Barn Breakout!",
    goal2: "Complete Orange Belt: Level 11 | build Barn Breakout!",
  },
  "Orange Belt: Level 11 | Barn Breakout!": {
    goal1: "Half of Orange Belt: Level 11 | build Damage Control",
    goal2: "Complete Orange Belt: Level 11 | build Damage Control",
  },
  "Orange Belt: Level 11 | Damage Control": {
    goal1: "Half of Orange Belt: Level 11 | Adventure Creating with Functions!",
    goal2: "Complete Orange Belt: Level 11 | Adventure Creating with Functions!",
  },
  "Orange Belt: Level 11 | Adventure Creating with Functions!": {
    goal1: "Half of Orange Belt: Level 12 | build Escape the Haunted Castle!",
    goal2: "Complete Orange Belt: Level 12 | build Escape the Haunted Castle!",
  },
  "Orange Belt: Level 12 | Escape the Haunted Castle!": {
    goal1: "Half of Orange Belt: Level 12 | build City Scroller",
    goal2: "Complete Orange Belt: Level 12 | build City Scroller",
  },
  "Orange Belt: Level 12 | City Scroller": {
    goal1: "Half of Orange Belt: Level 12 | build Find the Ninja!",
    goal2: "Complete Orange Belt: Level 12 | build Find the Ninja!",
  },
  "Orange Belt: Level 12 | Find the Ninja!": {
    goal1: "Half of Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project",
    goal2: "Complete Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project",
  },
  "Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project": {
    goal1: "Half of Green Belt: Level 1 | build The Bookcase",
    goal2: "Complete Green Belt: Level 1 | build The Bookcase",
  },
  "Green Belt: Level 1 | The Bookcase": {
    goal1: "Half of Green Belt: Level 1 | build Shark Attack",
    goal2: "Complete Green Belt: Level 1 | build Shark Attack",
  },
  "Green Belt: Level 1 | Shark Attack": {
    goal1: "Half of Green Belt: Level 1 | Adventure Creating with the Assets Menu!",
    goal2: "Complete Green Belt: Level 1 | Adventure Creating with the Assets Menu!",
  },
  "Green Belt: Level 1 | Adventure Creating with the Assets Menu!": {
    goal1: "Half of Green Belt: Level 2 | build Two Worlds",
    goal2: "Complete Green Belt: Level 2 | build Two Worlds",
  },
  "Green Belt: Level 2 | Two Worlds": {
    goal1: "Half of Green Belt: Level 2 | build Avoid the Haystacks!",
    goal2: "Complete Green Belt: Level 2 | build Avoid the Haystacks!",
  },
  "Green Belt: Level 2 | Avoid the Haystacks!": {
    goal1: "Half of Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!",
    goal2: "Complete Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!",
  },
  "Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!": {
    goal1: "",
    goal2: "",
  },
} as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: "White Belt: Level 1 | Your First Sprite", label: "White Belt: Level 1 | Your First Sprite" },
  { value: "White Belt: Level 1 | Spooky Effects", label: "White Belt: Level 1 | Spooky Effects" },
  { value: "White Belt: Level 1 | Adventure My First Coding Project", label: "White Belt: Level 1 | Adventure My First Coding Project" },
  { value: "White Belt: Level 2 | Meet New Friends!", label: "White Belt: Level 2 | Meet New Friends!" },
  { value: "White Belt: Level 2 | Where's My Puppy?", label: "White Belt: Level 2 | Where's My Puppy?" },
  { value: "White Belt: Level 2 | Adventure Creating with", label: "White Belt: Level 2 | Adventure Creating with" },
  { value: "White Belt: Level 3 | Fly Me to the Moon!", label: "White Belt: Level 3 | Fly Me to the Moon!" },
  { value: "White Belt: Level 3 | Dinner Time!", label: "White Belt: Level 3 | Dinner Time!" },
  { value: "White Belt: Level 3 | Adventure Creating with Events!", label: "White Belt: Level 3 | Adventure Creating with Events!" },
  { value: "White Belt: Level 4 | A Piece of Cake", label: "White Belt: Level 4 | A Piece of Cake" },
  { value: "White Belt: Level 4 | Underwater Food Chain", label: "White Belt: Level 4 | Underwater Food Chain" },
  { value: "White Belt: Level 4 | Adventure Creating with Functions", label: "White Belt: Level 4 | Adventure Creating with Functions" },
  { value: "White Belt: Level 5 | Munchy Munchy Monkey", label: "White Belt: Level 5 | Munchy Munchy Monkey" },
  { value: "White Belt: Level 5 | Pearl Collector", label: "White Belt: Level 5 | Pearl Collector" },
  { value: "White Belt: Level 5 | Adventure Creating with Variables!", label: "White Belt: Level 5 | Adventure Creating with Variables!" },
  { value: "White Belt: Level 6 | Avoid the Asteroids!", label: "White Belt: Level 6 | Avoid the Asteroids!" },
  { value: "White Belt: Level 6 | Space Adventure", label: "White Belt: Level 6 | Space Adventure" },
  { value: "White Belt: Level 6 | Adventure Creating with Loops!", label: "White Belt: Level 6 | Adventure Creating with Loops!" },
  { value: "White Belt: Level 7 | The Wizard's Mystic Toadstools", label: "White Belt: Level 7 | The Wizard's Mystic Toadstools" },
  { value: "White Belt: Level 7 | Unlock the Hidden Treasure!", label: "White Belt: Level 7 | Unlock the Hidden Treasure!" },
  { value: "White Belt: Level 7 | Adventure Creating with Conditionals!", label: "White Belt: Level 7 | Adventure Creating with Conditionals!" },
  { value: "White Belt: Level 8 | Animated Aquarium", label: "White Belt: Level 8 | Animated Aquarium" },
  { value: "White Belt: Level 8 | Musical Mayhem", label: "White Belt: Level 8 | Musical Mayhem" },
  { value: "White Belt: Level 8 | Adventure White Belt Belt-Up Project!", label: "White Belt: Level 8 | Adventure White Belt Belt-Up Project!" },
  { value: "Yellow Belt: Level 1 | Avoid the Snakes!", label: "Yellow Belt: Level 1 | Avoid the Snakes!" },
  { value: "Yellow Belt: Level 1 | Carrot Chase", label: "Yellow Belt: Level 1 | Carrot Chase" },
  { value: "Yellow Belt: Level 1 | Adventure Creating with Tilemaps!", label: "Yellow Belt: Level 1 | Adventure Creating with Tilemaps!" },
  { value: "Yellow Belt: Level 2 | The Key to the Castle", label: "Yellow Belt: Level 2 | The Key to the Castle" },
  { value: "Yellow Belt: Level 2 | Coin Grabber!", label: "Yellow Belt: Level 2 | Coin Grabber!" },
  { value: "Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!", label: "Yellow Belt: Level 2 | Adventure Creating with Tilemap and Lifecycle Events!" },
  { value: "Yellow Belt: Level 3 | All About Me", label: "Yellow Belt: Level 3 | All About Me" },
  { value: "Yellow Belt: Level 3 | Welcome to the Farm", label: "Yellow Belt: Level 3 | Welcome to the Farm" },
  { value: "Yellow Belt: Level 3 | Mad Libs", label: "Yellow Belt: Level 3 | Mad Libs" },
  { value: "Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!", label: "Yellow Belt: Level 3 | Adventure Creating with User Input, Variables, and Arrays!" },
  { value: "Yellow Belt: Level 4 | Memory Game", label: "Yellow Belt: Level 4 | Memory Game" },
  { value: "Yellow Belt: Level 4 | Archeological Dig", label: "Yellow Belt: Level 4 | Archeological Dig" },
  { value: "Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!", label: "Yellow Belt: Level 4 | Adventure Creating with Repeat and For Element loops!" },
  { value: "Yellow Belt: Level 5 | Cookie Clicker Game!", label: "Yellow Belt: Level 5 | Cookie Clicker Game!" },
  { value: "Yellow Belt: Level 5 | Snowflake Catch", label: "Yellow Belt: Level 5 | Snowflake Catch" },
  { value: "Yellow Belt: Level 5 | Adventure Creating with Functions!", label: "Yellow Belt: Level 5 | Adventure Creating with Functions!" },
  { value: "Yellow Belt: Level 6 | Cactus Jump", label: "Yellow Belt: Level 6 | Cactus Jump" },
  { value: "Yellow Belt: Level 6 | Avoid the Roadblocks", label: "Yellow Belt: Level 6 | Avoid the Roadblocks" },
  { value: "Yellow Belt: Level 6 | The Floor is Lava!", label: "Yellow Belt: Level 6 | The Floor is Lava!" },
  { value: "Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!", label: "Yellow Belt: Level 6 | Adventure Creating with 2D Platformer Tilemaps and Physics!" },
  { value: "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt", label: "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt" },
  { value: "Yellow Belt: Level 7 | Raindrop Invincibility", label: "Yellow Belt: Level 7 | Raindrop Invincibility" },
  { value: "Yellow Belt: Level 7 | Snake Pit!", label: "Yellow Belt: Level 7 | Snake Pit!" },
  { value: "Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!", label: "Yellow Belt: Level 7 | Adventure Creating with Booleans and Logic Operators!" },
  { value: "Yellow Belt: Level 8 | Bubble Pop!", label: "Yellow Belt: Level 8 | Bubble Pop!" },
  { value: "Yellow Belt: Level 8 | Bee Catcher", label: "Yellow Belt: Level 8 | Bee Catcher" },
  { value: "Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!", label: "Yellow Belt: Level 8 | Adventure Creating with For Index and While Loops!" },
  { value: "Yellow Belt: Level 9 | Block Jumper", label: "Yellow Belt: Level 9 | Block Jumper" },
  { value: "Yellow Belt: Level 9 | Bridge Builder", label: "Yellow Belt: Level 9 | Bridge Builder" },
  { value: "Yellow Belt: Level 9 | Dino Defender", label: "Yellow Belt: Level 9 | Dino Defender" },
  { value: "Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!", label: "Yellow Belt: Level 9 | Adventure Creating with Tilemap Location and Extension Blocks!" },
  { value: "Yellow Belt: Level 10 | Scenic Drive", label: "Yellow Belt: Level 10 | Scenic Drive" },
  { value: "Yellow Belt: Level 10 | Burger Dash", label: "Yellow Belt: Level 10 | Burger Dash" },
  { value: "Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!", label: "Yellow Belt: Level 10 | Adventure Yellow Belt Belt-Up Project!" },
  { value: "Orange Belt: Level 1 | Hello World!", label: "Orange Belt: Level 1 | Hello World!" },
  { value: "Orange Belt: Level 1 | Bouncing on the Walls", label: "Orange Belt: Level 1 | Bouncing on the Walls" },
  { value: "Orange Belt: Level 1 | Follow Me!", label: "Orange Belt: Level 1 | Follow Me!" },
  { value: "Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!", label: "Orange Belt: Level 1 | Adventure Creating with JavaScript code and Syntax!" },
  { value: "Orange Belt: Level 2 | Greeting Card", label: "Orange Belt: Level 2 | Greeting Card" },
  { value: "Orange Belt: Level 2 | Show Time!", label: "Orange Belt: Level 2 | Show Time!" },
  { value: "Orange Belt: Level 2 | Seasons Change", label: "Orange Belt: Level 2 | Seasons Change" },
  { value: "Orange Belt: Level 2 | Adventure Creating with Properties!", label: "Orange Belt: Level 2 | Adventure Creating with Properties!" },
  { value: "Orange Belt: Level 3 | Screen Saver", label: "Orange Belt: Level 3 | Screen Saver" },
  { value: "Orange Belt: Level 3 | Button Clicker!", label: "Orange Belt: Level 3 | Button Clicker!" },
  { value: "Orange Belt: Level 3 | Two Sprite Showdown!", label: "Orange Belt: Level 3 | Two Sprite Showdown!" },
  { value: "Orange Belt: Level 3 | Adventure Creating with Block Statements!", label: "Orange Belt: Level 3 | Adventure Creating with Block Statements!" },
  { value: "Orange Belt: Level 4 | Save the Crab!", label: "Orange Belt: Level 4 | Save the Crab!" },
  { value: "Orange Belt: Level 4 | Going Bananas!", label: "Orange Belt: Level 4 | Going Bananas!" },
  { value: "Orange Belt: Level 4 | Grab Bag!", label: "Orange Belt: Level 4 | Grab Bag!" },
  { value: "Orange Belt: Level 4 | Adventure Creating with nested block statements!", label: "Orange Belt: Level 4 | Adventure Creating with nested block statements!" },
  { value: "Orange Belt: Level 5 | Shop 'Til You Drop", label: "Orange Belt: Level 5 | Shop 'Til You Drop" },
  { value: "Orange Belt: Level 5 | Cookie Stacker", label: "Orange Belt: Level 5 | Cookie Stacker" },
  { value: "Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!", label: "Orange Belt: Level 5 | Adventure Creating with Assignment and Equality operators!" },
  { value: "Orange Belt: Level 6 | Shooting Hoops!", label: "Orange Belt: Level 6 | Shooting Hoops!" },
  { value: "Orange Belt: Level 6 | Guess the Number!", label: "Orange Belt: Level 6 | Guess the Number!" },
  { value: "Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!", label: "Orange Belt: Level 6 | Adventure Creating with Boolean and Relational Operators!" },
  { value: "Orange Belt: Level 7 | Collect the Honey!", label: "Orange Belt: Level 7 | Collect the Honey!" },
  { value: "Orange Belt: Level 7 | Snowball Fight!", label: "Orange Belt: Level 7 | Snowball Fight!" },
  { value: "Orange Belt: Level 7 | Asteroid Attack!", label: "Orange Belt: Level 7 | Asteroid Attack!" },
  { value: "Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!", label: "Orange Belt: Level 7 | Adventure Creating with Sprite Kinds and Sprite Overlap Events!" },
  { value: "Orange Belt: Level 8 | Fireflies Collector", label: "Orange Belt: Level 8 | Fireflies Collector" },
  { value: "Orange Belt: Level 8 | Counting Sprites", label: "Orange Belt: Level 8 | Counting Sprites" },
  { value: "Orange Belt: Level 8 | Mystery Boxes!", label: "Orange Belt: Level 8 | Mystery Boxes!" },
  { value: "Orange Belt: Level 8 | Adventure Creating with For Loops!", label: "Orange Belt: Level 8 | Adventure Creating with For Loops!" },
  { value: "Orange Belt: Level 9 | Magic 8 Ball", label: "Orange Belt: Level 9 | Magic 8 Ball" },
  { value: "Orange Belt: Level 9 | What's in a Name?", label: "Orange Belt: Level 9 | What's in a Name?" },
  { value: "Orange Belt: Level 9 | Concentration", label: "Orange Belt: Level 9 | Concentration" },
  { value: "Orange Belt: Level 9 | Adventure Creating with Arrays!", label: "Orange Belt: Level 9 | Adventure Creating with Arrays!" },
  { value: "Orange Belt: Level 10 | Match Game", label: "Orange Belt: Level 10 | Match Game" },
  { value: "Orange Belt: Level 10 | Username Generator", label: "Orange Belt: Level 10 | Username Generator" },
  { value: "Orange Belt: Level 10 | Memory Match", label: "Orange Belt: Level 10 | Memory Match" },
  { value: "Orange Belt: Level 10 | Adventure Creating with Array Functions!", label: "Orange Belt: Level 10 | Adventure Creating with Array Functions!" },
  { value: "Orange Belt: Level 11 | Pizza Party", label: "Orange Belt: Level 11 | Pizza Party" },
  { value: "Orange Belt: Level 11 | Barn Breakout!", label: "Orange Belt: Level 11 | Barn Breakout!" },
  { value: "Orange Belt: Level 11 | Damage Control", label: "Orange Belt: Level 11 | Damage Control" },
  { value: "Orange Belt: Level 11 | Adventure Creating with Functions!", label: "Orange Belt: Level 11 | Adventure Creating with Functions!" },
  { value: "Orange Belt: Level 12 | Escape the Haunted Castle!", label: "Orange Belt: Level 12 | Escape the Haunted Castle!" },
  { value: "Orange Belt: Level 12 | City Scroller", label: "Orange Belt: Level 12 | City Scroller" },
  { value: "Orange Belt: Level 12 | Find the Ninja!", label: "Orange Belt: Level 12 | Find the Ninja!" },
  { value: "Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project", label: "Orange Belt: Level 12 | Adventure Orange Belt Belt-Up Project" },
  { value: "Green Belt: Level 1 | The Bookcase", label: "Green Belt: Level 1 | The Bookcase" },
  { value: "Green Belt: Level 1 | Shark Attack", label: "Green Belt: Level 1 | Shark Attack" },
  { value: "Green Belt: Level 1 | Adventure Creating with the Assets Menu!", label: "Green Belt: Level 1 | Adventure Creating with the Assets Menu!" },
  { value: "Green Belt: Level 2 | Two Worlds", label: "Green Belt: Level 2 | Two Worlds" },
  { value: "Green Belt: Level 2 | Avoid the Haystacks!", label: "Green Belt: Level 2 | Avoid the Haystacks!" },
  { value: "Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!", label: "Green Belt: Level 2 | Adventure Creating with Tilemap Overlap Events!" },
  { value: "manual", label: "Describe Manually" },
] as const;