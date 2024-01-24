import { GithubDiscussion, GithubPullRequest } from "./integrations/github/types";

export interface UniversalInboxPreferences {
  apiKey: string;
  universalInboxBaseUrl: string;
}

export interface Page<T> {
  page: number;
  per_page: number;
  total: number;
  content: Array<T>;
}

export interface Notification {
  id: string;
  title: string;
  source_id: string;
  status: NotificationStatus;
  metadata: NotificationMetadata;
  updated_at: Date;
  last_read_at?: Date;
  snoozed_until?: Date;
  user_id: string;
  task_id?: string;
  details?: NotificationDetails;
}

export type NotificationMetadata = {
  type: "Github" | "Linear" | "GoogleMail" | "Todoist";
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  content: any;
};

export type NotificationDetails =
  | { type: "GithubPullRequest"; content: GithubPullRequest }
  | { type: "GithubDiscussion"; content: GithubDiscussion };

export enum NotificationStatus {
  Unread = "Unread",
  Read = "Read",
  Deleted = "Deleted",
  Unsubscribed = "Unsubscribed",
}

export type NotificationListItemProps = {
  notification: Notification;
};
