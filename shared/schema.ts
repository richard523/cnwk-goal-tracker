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

// Project status mapping
export const PROJECT_STATUS_MAPPING = {
  "White Belt: Level 1 | Your First Sprite": {
    goal1: "Half of White Belt: Level 1 | build Spooky Effects",
    goal2: "Complete White Belt: Level 1 | build Spooky Effects",
  },
  "White Belt: Level 1 | Spooky Effects": {
    goal1: "Half of White Belt: Level 2 | build Where’s My Puppy?",
    goal2: "Complete White Belt: Level 2 | build Where’s My Puppy?",
  },
  "White Belt: Level 2 | Where’s My Puppy?": {
    goal1: "Half of White Belt: Level 2 | build Tell a Joke",
    goal2: "Complete White Belt: Level 2 | build Tell a Joke",
  },
  "White Belt: Level 2 | Tell a Joke": {
    goal1: "Half of White Belt: Level 3 | build Fly Me to the Moon!",
    goal2: "Complete White Belt: Level 3 | build Fly Me to the Moon!",
  },
  "White Belt: Level 3 | Fly Me to the Moon!": {
    goal1: "Half of White Belt: Level 3 | build Dinner Time!",
    goal2: "Complete White Belt: Level 3 | build Dinner Time!",
  },
  "White Belt: Level 3 | Dinner Time!": {
    goal1: "Half of White Belt: Level 3 | build Hide and Seek!",
    goal2: "Complete White Belt: Level 3 | build Hide and Seek!",
  },
  "White Belt: Level 3 | Hide and Seek!": {
    goal1: "Half of White Belt: Level 4 | build A Piece of Cake",
    goal2: "Complete White Belt: Level 4 | build A Piece of Cake",
  },
  "White Belt: Level 4 | A Piece of Cake": {
    goal1: "Half of White Belt: Level 4 | build Underwater Food Chain",
    goal2: "Complete White Belt: Level 4 | build Underwater Food Chain",
  },
  "White Belt: Level 4 | Underwater Food Chain": {
    goal1: "Half of White Belt: Level 4 | build Find the Treasure",
    goal2: "Complete White Belt: Level 4 | build Find the Treasure",
  },
  "White Belt: Level 4 | Find the Treasure": {
    goal1: "Half of White Belt: Level 5 | build Munchy Munchy Monkey",
    goal2: "Complete White Belt: Level 5 | build Munchy Munchy Monkey",
  },
  "White Belt: Level 5 | Munchy Munchy Monkey": {
    goal1: "Half of White Belt: Level 5 | build Pearl Collector",
    goal2: "Complete White Belt: Level 5 | build Pearl Collector",
  },
  "White Belt: Level 5 | Pearl Collector": {
    goal1: "Half of White Belt: Level 5 | build Apple Rally!",
    goal2: "Complete White Belt: Level 5 | build Apple Rally!",
  },
  "White Belt: Level 5 | Apple Rally!": {
    goal1: "Half of White Belt: Level 6 | build Avoid the Asteroids!",
    goal2: "Complete White Belt: Level 6 | build Avoid the Asteroids!",
  },
  "White Belt: Level 6 | Avoid the Asteroids!": {
    goal1: "Half of White Belt: Level 6 | build Space Adventure",
    goal2: "Complete White Belt: Level 6 | build Space Adventure",
  },
  "White Belt: Level 6 | Space Adventure": {
    goal1: "Half of White Belt: Level 6 | build Scoring Points",
    goal2: "Complete White Belt: Level 6 | build Scoring Points",
  },
  "White Belt: Level 6 | Scoring Points": {
    goal1: "Half of White Belt: Level 7 | build The Wizard's Mystic Toadstools",
    goal2: "Complete White Belt: Level 7 | build The Wizard's Mystic Toadstools",
  },
  "White Belt: Level 7 | The Wizard's Mystic Toadstools": {
    goal1: "Half of White Belt: Level 7 | build Unlock the Hidden Treasure!",
    goal2: "Complete White Belt: Level 7 | build Unlock the Hidden Treasure!",
  },
  "White Belt: Level 7 | Unlock the Hidden Treasure!": {
    goal1: "Half of White Belt: Level 7 | build Snake Crossing",
    goal2: "Complete White Belt: Level 7 | build Snake Crossing",
  },
  "White Belt: Level 7 | Snake Crossing": {
    goal1: "Half of White Belt: Level 8 | build Animated Aquarium",
    goal2: "Complete White Belt: Level 8 | build Animated Aquarium",
  },
  "White Belt: Level 8 | Animated Aquarium": {
    goal1: "Half of White Belt: Level 8 | build Musical Mayhem",
    goal2: "Complete White Belt: Level 8 | build Musical Mayhem",
  },
  "White Belt: Level 8 | Musical Mayhem": {
    goal1: "Half of White Belt: Level 8 | build Pizza Grabber!",
    goal2: "Complete White Belt: Level 8 | build Pizza Grabber!",
  },
  "White Belt: Level 8 | Pizza Grabber!": {
    goal1: "Half of Yellow Belt: Level 1 | build Avoid the Snakes!",
    goal2: "Complete Yellow Belt: Level 1 | build Avoid the Snakes!",
  },
  "Yellow Belt: Level 1 | Avoid the Snakes!": {
    goal1: "Finish Yellow Belt: Level 1 | build Avoid the Snakes!",
    goal2: "Half of Yellow Belt: Level 1 | build Carrot Chase",
  },
  "Yellow Belt: Level 1 | Carrot Chase": {
    goal1: "Finish Yellow Belt: Level 1 | build Carrot Chase!",
    goal2: "Half of Yellow Belt: Level 2 | build The Key to the Castle",
  },
  "Yellow Belt: Level 2 | The Key to the Castle": {
    goal1: "Finish Yellow Belt: Level 2 | build The Key to the Castle",
    goal2: "Half of Yellow Belt: Level 2 | build Coin Grabber!",
  },
  "Yellow Belt: Level 2 | Coin Grabber!": {
    goal1: "Finish Yellow Belt: Level 2 | build Coin Grabber!",
    goal2: "Half of Yellow Belt: Level 2 | build The Floor is Lava",
  },
  "Yellow Belt: Level 2 | The Floor is Lava": {
    goal1: "Finish Yellow Belt: Level 2 | build The Floor is Lava",
    goal2: "Half of Yellow Belt: Level 3 | build All About Me",
  },
  "Yellow Belt: Level 3 | All About Me": {
    goal1: "Finish Yellow Belt: Level 3 | build All About Me",
    goal2: "Half of Yellow Belt: Level 3 | build Welcome to the Farm",
  },
  "Yellow Belt: Level 3 | Welcome to the Farm": {
    goal1: "Finish Yellow Belt: Level 3 | build Welcome to the Farm",
    goal2: "Half of Yellow Belt: Level 3 | build Mad Libs",
  },
  "Yellow Belt: Level 3 | Mad Libs": {
    goal1: "Finish Yellow Belt: Level 3 | build Mad Libs",
    goal2: "Half of Yellow Belt: Level 3 | build Solve the Riddle",
  },
  "Yellow Belt: Level 3 | Solve the Riddle": {
    goal1: "Finish Yellow Belt: Level 3 | build Solve the Riddle",
    goal2: "Half of Yellow Belt: Level 4 | build Memory Game",
  },
  "Yellow Belt: Level 4 | Memory Game": {
    goal1: "Finish Yellow Belt: Level 4 | build Memory Game",
    goal2: "Half of Yellow Belt: Level 4 | build Archeological Dig",
  },
  "Yellow Belt: Level 4 | Archeological Dig": {
    goal1: "Finish Yellow Belt: Level 4 | build Archeological Dig",
    goal2: "Half of Yellow Belt: Level 4 | build Race to the Finish Line",
  },
  "Yellow Belt: Level 4 | Race to the Finish Line": {
    goal1: "Finish Yellow Belt: Level 4 | build Race to the Finish Line",
    goal2: "Half of Yellow Belt: Level 5 | build Cookie Clicker Game!",
  },
  "Yellow Belt: Level 5 | Cookie Clicker Game!": {
    goal1: "Finish Yellow Belt: Level 5 | build Cookie Clicker Game!",
    goal2: "Half of Yellow Belt: Level 5 | build Snowflake Catch",
  },
  "Yellow Belt: Level 5 | Snowflake Catch": {
    goal1: "Finish Yellow Belt: Level 5 | build Snowflake Catch",
    goal2: "Half of Yellow Belt: Level 5 | build Hungry Hungry Crocodiles",
  },
  "Yellow Belt: Level 5 | Hungry Hungry Crocodiles": {
    goal1: "Finish Yellow Belt: Level 5 | build Hungry Hungry Crocodiles",
    goal2: "Half of Yellow Belt: Level 6 | build Cactus Jump",
  },
  "Yellow Belt: Level 6 | Cactus Jump": {
    goal1: "Finish Yellow Belt: Level 6 | build Cactus Jump",
    goal2: "Half of Yellow Belt: Level 6 | build Avoid the Roadblocks",
  },
  "Yellow Belt: Level 6 | Avoid the Roadblocks": {
    goal1: "Finish Yellow Belt: Level 6 | build Avoid the Roadblocks",
    goal2: "Half of Yellow Belt: Level 6 | build The Floor is Lava!",
  },
  "Yellow Belt: Level 6 | The Floor is Lava!": {
    goal1: "Finish Yellow Belt: Level 6 | build The Floor is Lava!",
    goal2: "Half of Yellow Belt: Level 6 | build Snowflake Dash",
  },
  "Yellow Belt: Level 6 | Snowflake Dash": {
    goal1: "Finish Yellow Belt: Level 6 | build Snowflake Dash",
    goal2: "Half of Yellow Belt: Level 7 | build Magic Coin Scavenger Hunt",
  },
  "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt": {
    goal1: "Finish Yellow Belt: Level 7 | build Magic Coin Scavenger Hunt",
    goal2: "Half of Yellow Belt: Level 7 | build Raindrop Invincibility",
  },
  "Yellow Belt: Level 7 | Raindrop Invincibility": {
    goal1: "Finish Yellow Belt: Level 7 | build Raindrop Invincibility",
    goal2: "Half of Yellow Belt: Level 7 | build Snake Pit!",
  },
  "Yellow Belt: Level 7 | Snake Pit!": {
    goal1: "Finish Yellow Belt: Level 7 | build Snake Pit!",
    goal2: "Half of Yellow Belt: Level 7 | build Hearts or Keys?",
  },
  "Yellow Belt: Level 7 | Hearts or Keys?": {
    goal1: "Finish Yellow Belt: Level 7 | build Hearts or Keys?",
    goal2: "Half of Yellow Belt: Level 8 | build Bubble Pop!",
  },
  "Yellow Belt: Level 8 | Bubble Pop!": {
    goal1: "Finish Yellow Belt: Level 8 | build Bubble Pop!",
    goal2: "Half of Yellow Belt: Level 8 | build Bee Catcher",
  },
  "Yellow Belt: Level 8 | Bee Catcher": {
    goal1: "Finish Yellow Belt: Level 8 | build Bee Catcher",
    goal2: "Half of Yellow Belt: Level 8 | build Starfall",
  },
  "Yellow Belt: Level 8 | Starfall": {
    goal1: "Finish Yellow Belt: Level 8 | build Starfall",
    goal2: "Half of Yellow Belt: Level 9 | build Block Jumper",
  },
  "Yellow Belt: Level 9 | Block Jumper": {
    goal1: "Finish Yellow Belt: Level 9 | build Block Jumper",
    goal2: "Half of Yellow Belt: Level 9 | build Bridge Builder",
  },
  "Yellow Belt: Level 9 | Bridge Builder": {
    goal1: "Finish Yellow Belt: Level 9 | build Bridge Builder",
    goal2: "Half of Yellow Belt: Level 9 | build Dino Defender",
  },
  "Yellow Belt: Level 9 | Dino Defender": {
    goal1: "Finish Yellow Belt: Level 9 | build Dino Defender",
    goal2: "Half of Yellow Belt: Level 9 | build Honey Collector",
  },
  "Yellow Belt: Level 9 | Honey Collector": {
    goal1: "Finish Yellow Belt: Level 9 | build Honey Collector",
    goal2: "Half of Yellow Belt: Level 10 | build Scenic Drive",
  },
  "Yellow Belt: Level 10 | Scenic Drive": {
    goal1: "Finish Yellow Belt: Level 10 | build Scenic Drive",
    goal2: "Half of Yellow Belt: Level 10 | build Burger Dash",
  },
  "Yellow Belt: Level 10 | Burger Dash": {
    goal1: "Finish Yellow Belt: Level 10 | build Burger Dash",
    goal2: "Half of Yellow Belt: Level 10 | build Boss Battle",
  },
  "Yellow Belt: Level 10 | Boss Battle": {
    goal1: "Finish Yellow Belt: Level 10 | build Boss Battle",
    goal2: "Half of Orange Belt: Level 1 | build Hello World!",
  },
  "Orange Belt: Level 1 | Hello World!": {
    goal1: "Finish half of Orange Belt: Level 1 | build Bouncing on the Walls",
    goal2: "Finish Orange Belt: Level 1 | build Bouncing on the Walls",
  },
  "Orange Belt: Level 1 | Bouncing on the Walls": {
    goal1: "Finish half of Orange Belt: Level 1 | build Follow Me!",
    goal2: "Finish Orange Belt: Level 1 | build Follow Me!",
  },
  "Orange Belt: Level 1 | Follow Me!": {
    goal1: "Finish half of Orange Belt: Level 1 | build A Story of 2 Sprites",
    goal2: "Finish Orange Belt: Level 1 | build A Story of 2 Sprites",
  },
  "Orange Belt: Level 1 | A Story of 2 Sprites": {
    goal1: "Finish half of Orange Belt: Level 2 | build Greeting Card",
    goal2: "Finish Orange Belt: Level 2 | build Greeting Card",
  },
  "Orange Belt: Level 2 | Greeting Card": {
    goal1: "Finish half of Orange Belt: Level 2 | build Show Time!",
    goal2: "Finish Orange Belt: Level 2 | build Show Time!",
  },
  "Orange Belt: Level 2 | Show Time!": {
    goal1: "Finish half of Orange Belt: Level 2 | build Seasons Change",
    goal2: "Finish Orange Belt: Level 2 | build Seasons Change",
  },
  "Orange Belt: Level 2 | Seasons Change": {
    goal1: "Finish half of Orange Belt: Level 2 | build 3 Scene Story",
    goal2: "Finish Orange Belt: Level 2 | build 3 Scene Story",
  },
  "Orange Belt: Level 2 | 3 Scene Story": {
    goal1: "Finish half of Orange Belt: Level 3 | build Screen Saver",
    goal2: "Finish Orange Belt: Level 3 | build Screen Saver",
  },
  "Orange Belt: Level 3 | Screen Saver": {
    goal1: "Finish half of Orange Belt: Level 3 | build Button Clicker!",
    goal2: "Finish Orange Belt: Level 3 | build Button Clicker!",
  },
  "Orange Belt: Level 3 | Button Clicker!": {
    goal1: "Finish half of Orange Belt: Level 3 | build Two Sprite Showdown!",
    goal2: "Finish Orange Belt: Level 3 | build Two Sprite Showdown!",
  },
  "Orange Belt: Level 3 | Two Sprite Showdown!": {
    goal1: "Finish half of Orange Belt: Level 3 | build Magic Lever Adventure",
    goal2: "Finish Orange Belt: Level 3 | build Magic Lever Adventure",
  },
  "Orange Belt: Level 3 | Magic Lever Adventure": {
    goal1: "Finish half of Orange Belt: Level 4 | build Save the Crab!",
    goal2: "Finish Orange Belt: Level 4 | build Save the Crab!",
  },
  "Orange Belt: Level 4 | Save the Crab!": {
    goal1: "Finish half of Orange Belt: Level 4 | build Going Bananas!",
    goal2: "Finish Orange Belt: Level 4 | build Going Bananas!",
  },
  "Orange Belt: Level 4 | Going Bananas!": {
    goal1: "Finish half of Orange Belt: Level 4 | build Grab Bag!",
    goal2: "Finish Orange Belt: Level 4 | build Grab Bag!",
  },
  "Orange Belt: Level 4 | Grab Bag!": {
    goal1: "Finish half of Orange Belt: Level 4 | build Paddle Pong",
    goal2: "Finish Orange Belt: Level 4 | build Paddle Pong",
  },
  "Orange Belt: Level 4 | Paddle Pong": {
    goal1: "Finish half of Orange Belt: Level 5 | build Shop ‘Til You Drop",
    goal2: "Finish Orange Belt: Level 5 | build Shop ‘Til You Drop",
  },
  "Orange Belt: Level 5 | Shop ‘Til You Drop": {
    goal1: "Finish half of Orange Belt: Level 5 | build Cookie Stacker",
    goal2: "Finish Orange Belt: Level 5 | build Cookie Stacker",
  },
  "Orange Belt: Level 5 | Cookie Stacker": {
    goal1: "Finish half of Orange Belt: Level 5 | build Car Chase",
    goal2: "Finish Orange Belt: Level 5 | build Car Chase",
  },
  "Orange Belt: Level 5 | Car Chase": {
    goal1: "Finish half of Orange Belt: Level 6 | build Shooting Hoops!",
    goal2: "Finish Orange Belt: Level 6 | build Shooting Hoops!",
  },
  "Orange Belt: Level 6 | Shooting Hoops!": {
    goal1: "Finish half of Orange Belt: Level 6 | build Guess the Number!",
    goal2: "Finish Orange Belt: Level 6 | build Guess the Number!",
  },
  "Orange Belt: Level 6 | Guess the Number!": {
    goal1: "Finish half of Orange Belt: Level 6 | build Picky Eater",
    goal2: "Finish Orange Belt: Level 6 | build Picky Eater",
  },
  "Orange Belt: Level 6 | Picky Eater": {
    goal1: "Finish half of Orange Belt: Level 7 | build Collect the Honey!",
    goal2: "Finish Orange Belt: Level 7 | build Collect the Honey!",
  },
  "Orange Belt: Level 7 | Collect the Honey!": {
    goal1: "Finish half of Orange Belt: Level 7 | build Snowball Fight!",
    goal2: "Finish Orange Belt: Level 7 | build Snowball Fight!",
  },
  "Orange Belt: Level 7 | Snowball Fight!": {
    goal1: "Finish half of Orange Belt: Level 7 | build Asteroid Attack!",
    goal2: "Finish Orange Belt: Level 7 | build Asteroid Attack!",
  },
  "Orange Belt: Level 7 | Asteroid Attack!": {
    goal1: "Finish half of Orange Belt: Level 7 | build Hit or Miss",
    goal2: "Finish Orange Belt: Level 7 | build Hit or Miss",
  },
  "Orange Belt: Level 7 | Hit or Miss": {
    goal1: "Finish half of Orange Belt: Level 8 | build Fireflies Collector",
    goal2: "Finish Orange Belt: Level 8 | build Fireflies Collector",
  },
  "Orange Belt: Level 8 | Fireflies Collector": {
    goal1: "Finish half of Orange Belt: Level 8 | build Counting Sprites",
    goal2: "Finish Orange Belt: Level 8 | build Counting Sprites",
  },
  "Orange Belt: Level 8 | Counting Sprites": {
    goal1: "Finish half of Orange Belt: Level 8 | build Mystery Boxes!",
    goal2: "Finish Orange Belt: Level 8 | build Mystery Boxes!",
  },
  "Orange Belt: Level 8 | Mystery Boxes!": {
    goal1: "Finish half of Orange Belt: Level 8 | build Moles in the Holes",
    goal2: "Finish Orange Belt: Level 8 | build Moles in the Holes",
  },
  "Orange Belt: Level 8 | Moles in the Holes": {
    goal1: "Finish half of Orange Belt: Level 9 | build Magic 8 Ball",
    goal2: "Finish Orange Belt: Level 9 | build Magic 8 Ball",
  },
  "Orange Belt: Level 9 | Magic 8 Ball": {
    goal1: "Finish half of Orange Belt: Level 9 | build What’s in a Name?",
    goal2: "Finish Orange Belt: Level 9 | build What’s in a Name?",
  },
  "Orange Belt: Level 9 | What’s in a Name?": {
    goal1: "Finish half of Orange Belt: Level 9 | build Concentration",
    goal2: "Finish Orange Belt: Level 9 | build Concentration",
  },
  "Orange Belt: Level 9 | Concentration": {
    goal1: "Finish half of Orange Belt: Level 9 | build What’s on the Menu?",
    goal2: "Finish Orange Belt: Level 9 | build What’s on the Menu?",
  },
  "Orange Belt: Level 9 | What’s on the Menu?": {
    goal1: "Finish half of Orange Belt: Level 10 | build Two Worlds",
    goal2: "Finish Orange Belt: Level 10 | build Two Worlds",
  },
  "Orange Belt: Level 10 | Two Worlds": {
    goal1: "Finish half of Orange Belt: Level 10 | build Save the Village",
    goal2: "Finish Orange Belt: Level 10 | build Save the Village",
  },
  "Orange Belt: Level 10 | Save the Village": {
    goal1: "Finish half of Orange Belt: Level 10 | build Maze Runner",
    goal2: "Finish Orange Belt: Level 10 | build Maze Runner",
  },
  "Orange Belt: Level 10 | Maze Runner": {
    goal1: "Finish half of Orange Belt: Level 11 | build Bug Squasher",
    goal2: "Finish Orange Belt: Level 11 | build Bug Squasher",
  },
  "Orange Belt: Level 11 | Bug Squasher": {
    goal1: "Finish half of Orange Belt: Level 11 | build Catch the Thief!",
    goal2: "Finish Orange Belt: Level 11 | build Catch the Thief!",
  },
  "Orange Belt: Level 11 | Catch the Thief!": {
    goal1: "Finish half of Orange Belt: Level 11 | build Catching Stars",
    goal2: "Finish Orange Belt: Level 11 | build Catching Stars",
  },
  "Orange Belt: Level 11 | Catching Stars": {
    goal1: "Finish half of Orange Belt: Level 12 | build Save the Trees!",
    goal2: "Finish Orange Belt: Level 12 | build Save the Trees!",
  },
  "Orange Belt: Level 12 | Save the Trees!": {
    goal1: "Finish half of Orange Belt: Level 12 | build Spooky Mansion",
    goal2: "Finish Orange Belt: Level 12 | build Spooky Mansion",
  },
  "Orange Belt: Level 12 | Spooky Mansion": {
    goal1: "Finish half of Orange Belt: Level 12 | build Zombie Survival!",
    goal2: "Finish Orange Belt: Level 12 | build Zombie Survival!",
  },
  "Orange Belt: Level 12 | Zombie Survival!": {
    goal1: "Finish half of Orange Belt: Level 12 | build Space Shooter",
    goal2: "Finish Orange Belt: Level 12 | build Space Shooter",
  },
  "Orange Belt: Level 12 | Space Shooter": {
    goal1: "Finish half of Green Belt: Level 1 | build The Treehouse",
    goal2: "Finish Green Belt: Level 1 | build The Treehouse",
  },
  "Green Belt: Level 1 | The Treehouse": {
    goal1: "Finish half of Green Belt: Level 1 | build Magic Maze",
    goal2: "Finish Green Belt: Level 1 | build Magic Maze",
  },
  "Green Belt: Level 1 | Magic Maze": {
    goal1: "Finish half of Green Belt: Level 1 | build Castle Defender",
    goal2: "Finish Green Belt: Level 1 | build Castle Defender",
  },
  "Green Belt: Level 1 | Castle Defender": {
    goal1: "Finish half of Green Belt: Level 1 | build Pet Sitter!",
    goal2: "Finish Green Belt: Level 1 | build Pet Sitter!",
  },
  "Green Belt: Level 1 | Pet Sitter!": {
    goal1: "Finish half of Green Belt: Level 2 | build Alien Invasion",
    goal2: "Finish Green Belt: Level 2 | build Alien Invasion",
  },
  "Green Belt: Level 2 | Alien Invasion": {
    goal1: "Finish half of Green Belt: Level 2 | build Frog Hopper!",
    goal2: "Finish Green Belt: Level 2 | build Frog Hopper!",
  },
  "Green Belt: Level 2 | Frog Hopper!": {
    goal1: "Finish half of Green Belt: Level 2 | build The Floor Is Lava 2!",
    goal2: "Finish Green Belt: Level 2 | build The Floor Is Lava 2!",
  },
  "Green Belt: Level 2 | The Floor Is Lava 2!": {
    goal1: "",
    goal2: "",
  },
} as const;

export const PROJECT_STATUS_OPTIONS = [
  { value: "White Belt: Level 1 | Your First Sprite", label: "White Belt: Level 1 | Your First Sprite" },
  { value: "White Belt: Level 1 | Spooky Effects", label: "White Belt: Level 1 | Spooky Effects" },
  { value: "White Belt: Level 2 | Where’s My Puppy?", label: "White Belt: Level 2 | Where’s My Puppy?" },
  { value: "White Belt: Level 2 | Tell a Joke", label: "White Belt: Level 2 | Tell a Joke" },
  { value: "White Belt: Level 3 | Fly Me to the Moon!", label: "White Belt: Level 3 | Fly Me to the Moon!" },
  { value: "White Belt: Level 3 | Dinner Time!", label: "White Belt: Level 3 | Dinner Time!" },
  { value: "White Belt: Level 3 | Hide and Seek!", label: "White Belt: Level 3 | Hide and Seek!" },
  { value: "White Belt: Level 4 | A Piece of Cake", label: "White Belt: Level 4 | A Piece of Cake" },
  { value: "White Belt: Level 4 | Underwater Food Chain", label: "White Belt: Level 4 | Underwater Food Chain" },
  { value: "White Belt: Level 4 | Find the Treasure", label: "White Belt: Level 4 | Find the Treasure" },
  { value: "White Belt: Level 5 | Munchy Munchy Monkey", label: "White Belt: Level 5 | Munchy Munchy Monkey" },
  { value: "White Belt: Level 5 | Pearl Collector", label: "White Belt: Level 5 | Pearl Collector" },
  { value: "White Belt: Level 5 | Apple Rally!", label: "White Belt: Level 5 | Apple Rally!" },
  { value: "White Belt: Level 6 | Avoid the Asteroids!", label: "White Belt: Level 6 | Avoid the Asteroids!" },
  { value: "White Belt: Level 6 | Space Adventure", label: "White Belt: Level 6 | Space Adventure" },
  { value: "White Belt: Level 6 | Scoring Points", label: "White Belt: Level 6 | Scoring Points" },
  { value: "White Belt: Level 7 | The Wizard's Mystic Toadstools", label: "White Belt: Level 7 | The Wizard's Mystic Toadstools" },
  { value: "White Belt: Level 7 | Unlock the Hidden Treasure!", label: "White Belt: Level 7 | Unlock the Hidden Treasure!" },
  { value: "White Belt: Level 7 | Snake Crossing", label: "White Belt: Level 7 | Snake Crossing" },
  { value: "White Belt: Level 8 | Animated Aquarium", label: "White Belt: Level 8 | Animated Aquarium" },
  { value: "White Belt: Level 8 | Musical Mayhem", label: "White Belt: Level 8 | Musical Mayhem" },
  { value: "White Belt: Level 8 | Pizza Grabber!", label: "White Belt: Level 8 | Pizza Grabber!" },
  { value: "Yellow Belt: Level 1 | Avoid the Snakes!", label: "Yellow Belt: Level 1 | Avoid the Snakes!" },
  { value: "Yellow Belt: Level 1 | Carrot Chase", label: "Yellow Belt: Level 1 | Carrot Chase" },
  { value: "Yellow Belt: Level 2 | The Key to the Castle", label: "Yellow Belt: Level 2 | The Key to the Castle" },
  { value: "Yellow Belt: Level 2 | Coin Grabber!", label: "Yellow Belt: Level 2 | Coin Grabber!" },
  { value: "Yellow Belt: Level 2 | The Floor is Lava", label: "Yellow Belt: Level 2 | The Floor is Lava" },
  { value: "Yellow Belt: Level 3 | All About Me", label: "Yellow Belt: Level 3 | All About Me" },
  { value: "Yellow Belt: Level 3 | Welcome to the Farm", label: "Yellow Belt: Level 3 | Welcome to the Farm" },
  { value: "Yellow Belt: Level 3 | Mad Libs", label: "Yellow Belt: Level 3 | Mad Libs" },
  { value: "Yellow Belt: Level 3 | Solve the Riddle", label: "Yellow Belt: Level 3 | Solve the Riddle" },
  { value: "Yellow Belt: Level 4 | Memory Game", label: "Yellow Belt: Level 4 | Memory Game" },
  { value: "Yellow Belt: Level 4 | Archeological Dig", label: "Yellow Belt: Level 4 | Archeological Dig" },
  { value: "Yellow Belt: Level 4 | Race to the Finish Line", label: "Yellow Belt: Level 4 | Race to the Finish Line" },
  { value: "Yellow Belt: Level 5 | Cookie Clicker Game!", label: "Yellow Belt: Level 5 | Cookie Clicker Game!" },
  { value: "Yellow Belt: Level 5 | Snowflake Catch", label: "Yellow Belt: Level 5 | Snowflake Catch" },
  { value: "Yellow Belt: Level 5 | Hungry Hungry Crocodiles", label: "Yellow Belt: Level 5 | Hungry Hungry Crocodiles" },
  { value: "Yellow Belt: Level 6 | Cactus Jump", label: "Yellow Belt: Level 6 | Cactus Jump" },
  { value: "Yellow Belt: Level 6 | Avoid the Roadblocks", label: "Yellow Belt: Level 6 | Avoid the Roadblocks" },
  { value: "Yellow Belt: Level 6 | The Floor is Lava!", label: "Yellow Belt: Level 6 | The Floor is Lava!" },
  { value: "Yellow Belt: Level 6 | Snowflake Dash", label: "Yellow Belt: Level 6 | Snowflake Dash" },
  { value: "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt", label: "Yellow Belt: Level 7 | Magic Coin Scavenger Hunt" },
  { value: "Yellow Belt: Level 7 | Raindrop Invincibility", label: "Yellow Belt: Level 7 | Raindrop Invincibility" },
  { value: "Yellow Belt: Level 7 | Snake Pit!", label: "Yellow Belt: Level 7 | Snake Pit!" },
  { value: "Yellow Belt: Level 7 | Hearts or Keys?", label: "Yellow Belt: Level 7 | Hearts or Keys?" },
  { value: "Yellow Belt: Level 8 | Bubble Pop!", label: "Yellow Belt: Level 8 | Bubble Pop!" },
  { value: "Yellow Belt: Level 8 | Bee Catcher", label: "Yellow Belt: Level 8 | Bee Catcher" },
  { value: "Yellow Belt: Level 8 | Starfall", label: "Yellow Belt: Level 8 | Starfall" },
  { value: "Yellow Belt: Level 9 | Block Jumper", label: "Yellow Belt: Level 9 | Block Jumper" },
  { value: "Yellow Belt: Level 9 | Bridge Builder", label: "Yellow Belt: Level 9 | Bridge Builder" },
  { value: "Yellow Belt: Level 9 | Dino Defender", label: "Yellow Belt: Level 9 | Dino Defender" },
  { value: "Yellow Belt: Level 9 | Honey Collector", label: "Yellow Belt: Level 9 | Honey Collector" },
  { value: "Yellow Belt: Level 10 | Scenic Drive", label: "Yellow Belt: Level 10 | Scenic Drive" },
  { value: "Yellow Belt: Level 10 | Burger Dash", label: "Yellow Belt: Level 10 | Burger Dash" },
  { value: "Yellow Belt: Level 10 | Boss Battle", label: "Yellow Belt: Level 10 | Boss Battle" },
  { value: "Orange Belt: Level 1 | Hello World!", label: "Orange Belt: Level 1 | Hello World!" },
  { value: "Orange Belt: Level 1 | Bouncing on the Walls", label: "Orange Belt: Level 1 | Bouncing on the Walls" },
  { value: "Orange Belt: Level 1 | Follow Me!", label: "Orange Belt: Level 1 | Follow Me!" },
  { value: "Orange Belt: Level 1 | A Story of 2 Sprites", label: "Orange Belt: Level 1 | A Story of 2 Sprites" },
  { value: "Orange Belt: Level 2 | Greeting Card", label: "Orange Belt: Level 2 | Greeting Card" },
  { value: "Orange Belt: Level 2 | Show Time!", label: "Orange Belt: Level 2 | Show Time!" },
  { value: "Orange Belt: Level 2 | Seasons Change", label: "Orange Belt: Level 2 | Seasons Change" },
  { value: "Orange Belt: Level 2 | 3 Scene Story", label: "Orange Belt: Level 2 | 3 Scene Story" },
  { value: "Orange Belt: Level 3 | Screen Saver", label: "Orange Belt: Level 3 | Screen Saver" },
  { value: "Orange Belt: Level 3 | Button Clicker!", label: "Orange Belt: Level 3 | Button Clicker!" },
  { value: "Orange Belt: Level 3 | Two Sprite Showdown!", label: "Orange Belt: Level 3 | Two Sprite Showdown!" },
  { value: "Orange Belt: Level 3 | Magic Lever Adventure", label: "Orange Belt: Level 3 | Magic Lever Adventure" },
  { value: "Orange Belt: Level 4 | Save the Crab!", label: "Orange Belt: Level 4 | Save the Crab!" },
  { value: "Orange Belt: Level 4 | Going Bananas!", label: "Orange Belt: Level 4 | Going Bananas!" },
  { value: "Orange Belt: Level 4 | Grab Bag!", label: "Orange Belt: Level 4 | Grab Bag!" },
  { value: "Orange Belt: Level 4 | Paddle Pong", label: "Orange Belt: Level 4 | Paddle Pong" },
  { value: "Orange Belt: Level 5 | Shop ‘Til You Drop", label: "Orange Belt: Level 5 | Shop ‘Til You Drop" },
  { value: "Orange Belt: Level 5 | Cookie Stacker", label: "Orange Belt: Level 5 | Cookie Stacker" },
  { value: "Orange Belt: Level 5 | Car Chase", label: "Orange Belt: Level 5 | Car Chase" },
  { value: "Orange Belt: Level 6 | Shooting Hoops!", label: "Orange Belt: Level 6 | Shooting Hoops!" },
  { value: "Orange Belt: Level 6 | Guess the Number!", label: "Orange Belt: Level 6 | Guess the Number!" },
  { value: "Orange Belt: Level 6 | Picky Eater", label: "Orange Belt: Level 6 | Picky Eater" },
  { value: "Orange Belt: Level 7 | Collect the Honey!", label: "Orange Belt: Level 7 | Collect the Honey!" },
  { value: "Orange Belt: Level 7 | Snowball Fight!", label: "Orange Belt: Level 7 | Snowball Fight!" },
  { value: "Orange Belt: Level 7 | Asteroid Attack!", label: "Orange Belt: Level 7 | Asteroid Attack!" },
  { value: "Orange Belt: Level 7 | Hit or Miss", label: "Orange Belt: Level 7 | Hit or Miss" },
  { value: "Orange Belt: Level 8 | Fireflies Collector", label: "Orange Belt: Level 8 | Fireflies Collector" },
  { value: "Orange Belt: Level 8 | Counting Sprites", label: "Orange Belt: Level 8 | Counting Sprites" },
  { value: "Orange Belt: Level 8 | Mystery Boxes!", label: "Orange Belt: Level 8 | Mystery Boxes!" },
  { value: "Orange Belt: Level 8 | Moles in the Holes", label: "Orange Belt: Level 8 | Moles in the Holes" },
  { value: "Orange Belt: Level 9 | Magic 8 Ball", label: "Orange Belt: Level 9 | Magic 8 Ball" },
  { value: "Orange Belt: Level 9 | What’s in a Name?", label: "Orange Belt: Level 9 | What’s in a Name?" },
  { value: "Orange Belt: Level 9 | Concentration", label: "Orange Belt: Level 9 | Concentration" },
  { value: "Orange Belt: Level 9 | What’s on the Menu?", label: "Orange Belt: Level 9 | What’s on the Menu?" },
  { value: "Orange Belt: Level 10 | Two Worlds", label: "Orange Belt: Level 10 | Two Worlds" },
  { value: "Orange Belt: Level 10 | Save the Village", label: "Orange Belt: Level 10 | Save the Village" },
  { value: "Orange Belt: Level 10 | Maze Runner", label: "Orange Belt: Level 10 | Maze Runner" },
  { value: "Orange Belt: Level 11 | Bug Squasher", label: "Orange Belt: Level 11 | Bug Squasher" },
  { value: "Orange Belt: Level 11 | Catch the Thief!", label: "Orange Belt: Level 11 | Catch the Thief!" },
  { value: "Orange Belt: Level 11 | Catching Stars", label: "Orange Belt: Level 11 | Catching Stars" },
  { value: "Orange Belt: Level 12 | Save the Trees!", label: "Orange Belt: Level 12 | Save the Trees!" },
  { value: "Orange Belt: Level 12 | Spooky Mansion", label: "Orange Belt: Level 12 | Spooky Mansion" },
  { value: "Orange Belt: Level 12 | Zombie Survival!", label: "Orange Belt: Level 12 | Zombie Survival!" },
  { value: "Orange Belt: Level 12 | Space Shooter", label: "Orange Belt: Level 12 | Space Shooter" },
  { value: "Green Belt: Level 1 | The Treehouse", label: "Green Belt: Level 1 | The Treehouse" },
  { value: "Green Belt: Level 1 | Magic Maze", label: "Green Belt: Level 1 | Magic Maze" },
  { value: "Green Belt: Level 1 | Castle Defender", label: "Green Belt: Level 1 | Castle Defender" },
  { value: "Green Belt: Level 1 | Pet Sitter!", label: "Green Belt: Level 1 | Pet Sitter!" },
  { value: "Green Belt: Level 2 | Alien Invasion", label: "Green Belt: Level 2 | Alien Invasion" },
  { value: "Green Belt: Level 2 | Frog Hopper!", label: "Green Belt: Level 2 | Frog Hopper!" },
  { value: "Green Belt: Level 2 | The Floor Is Lava 2!", label: "Green Belt: Level 2 | The Floor Is Lava 2!" },
  { value: "manual", label: "Describe Manually" },
] as const;
