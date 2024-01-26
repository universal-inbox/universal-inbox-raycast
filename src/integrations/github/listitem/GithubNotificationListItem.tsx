import { GithubPullRequestNotificationListItem } from "./GithubPullRequestNotificationListItem";
import { GithubDiscussionNotificationListItem } from "./GithubDiscussionNotificationListItem";
import { NotificationListItemProps } from "../../../notification";
import { environment } from "@raycast/api";
import { useMemo } from "react";

export function GithubNotificationListItem({ notification, mutate }: NotificationListItemProps) {
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
          mutate={mutate}
        />
      );
    case "GithubDiscussion":
      return (
        <GithubDiscussionNotificationListItem
          icon={icon}
          notification={notification}
          githubDiscussion={notification.details.content}
          mutate={mutate}
        />
      );
    default:
      return null;
  }
}
