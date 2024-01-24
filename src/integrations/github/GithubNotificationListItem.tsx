import { environment } from "@raycast/api";
import { useMemo } from "react";
import { NotificationListItemProps } from "../../types";
import { GithubDiscussionNotificationListItem } from "./listitem/GithubDiscussionNotificationListItem";
import { GithubPullRequestNotificationListItem } from "./listitem/GithubPullRequestNotificationListItem";

export function GithubNotificationListItem({ notification }: NotificationListItemProps) {
  const icon = useMemo(() => {
    if (environment.appearance === "dark") {
      return "github-logo-light.svg";
    }
    return "github-logo-dark.svg";
  }, [environment]);

  switch (notification.details?.type) {
    case "GithubPullRequest":
      return (
        <GithubPullRequestNotificationListItem
          icon={icon}
          notification={notification}
          githubPullRequest={notification.details.content}
        />
      );
    case "GithubDiscussion":
      return (
        <GithubDiscussionNotificationListItem
          icon={icon}
          notification={notification}
          githubDiscussion={notification.details.content}
        />
      );
    default:
      return null;
  }
}
