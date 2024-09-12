import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  timestamp,
  uuid,
  unique,
  json,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  bio: text("bio"),
  avatar: text("avatar"),
  role_id: uuid("role_id").references(() => roles.id),
  status: text("status").notNull().default("active"),
  last_login: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
  reputationsReceived: many(reputations, {
    relationName: "reputation_profile",
  }),
  reputationsGiven: many(reputations, {
    relationName: "reputation_user",
  }),
  subscription: one(subscriptions),
  posts: many(posts),
  threads: many(threads),
  replies: many(replies),
  logs: many(logs),
  messagesSent: many(messages, {
    relationName: "messages_sender",
  }),
  messagesReceived: many(messages, {
    relationName: "messages_receiver",
  }),
  reportByUser: many(reportUser, {
    relationName: "report_by_user",
  }),
  reportedUser: many(reportUser, {
    relationName: "reported_user",
  }),
  reportPost: many(reportPost),
  transactions: many(transactions),
}));

export const reputations = pgTable(
  "reputations",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    profile_id: uuid("profile_id").references(() => users.id),
    user_id: uuid("user_id").references(() => users.id),
    create_at: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => ({
    unqiue: unique().on(table.profile_id, table.user_id),
  })
);

export const reputationsRelations = relations(reputations, ({ one }) => ({
  profile: one(users, {
    fields: [reputations.profile_id],
    references: [users.id],
    relationName: "reputation_profile",
  }),
  user: one(users, {
    fields: [reputations.user_id],
    references: [users.id],
    relationName: "reputation_user",
  }),
}));

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
  subscriptions: many(subscriptions),
  transactions: many(transactions),
}));

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  role_id: uuid("role_id").references(() => roles.id),
  price: integer("price").notNull(),
  transactions_id: uuid("transactions_id").references(() => transactions.id),
  start_date: timestamp("start_date").defaultNow().notNull(),
  end_date: timestamp("end_date").notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.user_id],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [subscriptions.role_id],
    references: [roles.id],
  }),
  transaction: one(transactions, {
    fields: [subscriptions.transactions_id],
    references: [transactions.id],
  }),
}));

export const transactions = pgTable("transactions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  role_id: uuid("role_id").references(() => roles.id),
  price: integer("price").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const transactionsRelations = relations(transactions, ({ one }) => ({
  user: one(users, {
    fields: [transactions.user_id],
    references: [users.id],
  }),
  role: one(roles, {
    fields: [transactions.role_id],
    references: [roles.id],
  }),
  subscription: one(subscriptions),
}));

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
  createBy: uuid("create_by").references(() => users.id),
  createAt: timestamp("created_at").defaultNow().notNull(),
});

export const threadsRelations = relations(threads, ({ many, one }) => ({
  posts: many(posts),
  user: one(users, {
    fields: [threads.createBy],
    references: [users.id],
  }),
}));

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  thread_id: uuid("thread_id").references(() => threads.id),
  user_id: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  description: text("description").notNull(),
  detail: json("detail"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const postsRelations = relations(posts, ({ one, many }) => ({
  thread: one(threads, {
    fields: [posts.thread_id],
    references: [threads.id],
  }),
  user: one(users, {
    fields: [posts.user_id],
    references: [users.id],
  }),
  replies: many(replies),
  reports: many(reportPost),
}));

export const replies = pgTable("replies", {
  id: uuid("id").primaryKey().defaultRandom(),
  post_id: uuid("post_id").references(() => posts.id),
  user_id: uuid("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const repliesRelations = relations(replies, ({ one }) => ({
  post: one(posts, {
    fields: [replies.post_id],
    references: [posts.id],
  }),
  user: one(users, {
    fields: [replies.user_id],
    references: [users.id],
  }),
}));

export const messages = pgTable("messages", {
  id: uuid("id").primaryKey().defaultRandom(),
  sender_id: uuid("sender_id").references(() => users.id),
  receiver_id: uuid("receiver_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const messagesRelations = relations(messages, ({ one }) => ({
  sender: one(users, {
    fields: [messages.sender_id],
    references: [users.id],
    relationName: "messages_sender",
  }),
  receiver: one(users, {
    fields: [messages.receiver_id],
    references: [users.id],
    relationName: "messages_receiver",
  }),
}));

export const reportUser = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  reported_user_id: uuid("reported_user_id").references(() => users.id),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const reportUserRelations = relations(reportUser, ({ one }) => ({
  user: one(users, {
    fields: [reportUser.user_id],
    references: [users.id],
    relationName: "report_by_user",
  }),
  reported_user: one(users, {
    fields: [reportUser.reported_user_id],
    references: [users.id],
    relationName: "reported_user",
  }),
}));

export const reportPost = pgTable("report_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  post_id: uuid("post_id").references(() => posts.id),
  reason: text("reason").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .notNull()
    .$onUpdate(() => new Date()),
});

export const reportPostRelations = relations(reportPost, ({ one }) => ({
  user: one(users, {
    fields: [reportPost.user_id],
    references: [users.id],
  }),
  reported_post: one(posts, {
    fields: [reportPost.post_id],
    references: [posts.id],
  }),
}));

export const logs = pgTable("logs", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  action: text("action").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const logsRelations = relations(logs, ({ one }) => ({
  user: one(users, {
    fields: [logs.user_id],
    references: [users.id],
  }),
}));
