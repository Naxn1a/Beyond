import { relations } from "drizzle-orm";
import {
  pgTable,
  integer,
  text,
  timestamp,
  uuid,
  unique,
  serial,
} from "drizzle-orm/pg-core";

export const users = pgTable("users", {
  id: uuid("id").primaryKey().defaultRandom(),
  username: text("username").unique().notNull(),
  email: text("email").notNull(),
  password: text("password").notNull(),
  role_id: uuid("role_id").references(() => roles.id),
  status: text("status").notNull().default("active"),
  last_login: timestamp("last_login"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const usersRelations = relations(users, ({ one, many }) => ({
  role: one(roles, {
    fields: [users.role_id],
    references: [roles.id],
  }),
  profiles: one(profiles),
  reputations: many(reputations),
  subscriptions: one(subscriptions),
  posts: many(posts),
  comments: many(comments),
  logs: many(logs),
}));

export const roles = pgTable("roles", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").unique(),
});

export const rolesRelations = relations(roles, ({ many }) => ({
  users: many(users),
}));

export const profiles = pgTable("profiles", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  bio: text("bio"),
  avatar: text("avatar"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const profilesRelations = relations(profiles, ({ one, many }) => ({
  user: one(users, {
    fields: [profiles.user_id],
    references: [users.id],
  }),
  reputations: many(reputations),
}));

export const reputations = pgTable("reputations", {
  id: uuid("id").primaryKey().defaultRandom(),
  profile_id: uuid("profile_id").references(() => profiles.id),
  user_id: uuid("user_id").references(() => users.id),
  create_at: timestamp("created_at").defaultNow().notNull(),
}, (table) => ({
  unqiue: unique().on(table.profile_id, table.user_id)
}));

export const reputationsRelations = relations(reputations, ({ one }) => ({
  profile: one(profiles, {
    fields: [reputations.profile_id],
    references: [profiles.id],
  }),
  user: one(users, {
    fields: [reputations.user_id],
    references: [users.id],
  }),
}));

export const subscriptions = pgTable("subscriptions", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  type: text("type").notNull(),
  price: integer("price").notNull(),
  start_date: timestamp("start_date").defaultNow().notNull(),
  end_date: timestamp("end_date").notNull(),
});

export const subscriptionsRelations = relations(subscriptions, ({ one }) => ({
  user: one(users, {
    fields: [subscriptions.user_id],
    references: [users.id],
  }),
}));

export const threads = pgTable("threads", {
  id: uuid("id").primaryKey().defaultRandom(),
  title: text("title").notNull(),
});

export const threadsRelations = relations(threads, ({ many }) => ({
  posts: many(posts),
}));

export const posts = pgTable("posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  thread_id: uuid("thread_id").references(() => threads.id),
  user_id: uuid("user_id").references(() => users.id),
  title: text("title").notNull(),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
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
  comments: many(comments),
  reports: many(reportPost),
}));

export const comments = pgTable("comments", {
  id: uuid("id").primaryKey().defaultRandom(),
  post_id: uuid("post_id").references(() => posts.id),
  user_id: uuid("user_id").references(() => users.id),
  content: text("content").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull().$onUpdate(() => new Date()),
});

export const commentsRelations = relations(comments, ({ one }) => ({
  posts: one(posts, {
    fields: [comments.post_id],
    references: [posts.id],
  }),
  users: one(users, {
    fields: [comments.user_id],
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
  }),
  receiver: one(users, {
    fields: [messages.receiver_id],
    references: [users.id],
  }),
}));

export const reportUser = pgTable("reports", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  reported_user_id: uuid("reported_user_id").references(() => users.id),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reportUserRelations = relations(reportUser, ({ one }) => ({
  user: one(users, {
    fields: [reportUser.user_id],
    references: [users.id],
  }),
  reported_user: one(users, {
    fields: [reportUser.reported_user_id],
    references: [users.id],
  }),
}));

export const reportPost = pgTable("report_posts", {
  id: uuid("id").primaryKey().defaultRandom(),
  user_id: uuid("user_id").references(() => users.id),
  post_id: uuid("post_id").references(() => posts.id),
  reason: text("reason").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const reportPostRelations = relations(reportPost, ({ one }) => ({
  user: one(users, {
    fields: [reportPost.user_id],
    references: [users.id],
  }),
  post: one(posts, {
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
