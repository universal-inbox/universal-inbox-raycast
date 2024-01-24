import { Notification } from "./types";

export function getNotificationHtmlUrl(notification: Notification) {
  switch (notification.details?.type) {
    case "GithubPullRequest":
      return notification.details.content.url;
    case "GithubDiscussion":
      return notification.details.content.url;
    default: {
      // TODO
      return "https://github.com";
    }
  }
}
