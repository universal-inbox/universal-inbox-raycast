import { Notification, getNotificationHtmlUrl } from "../../../notification";
import { Detail, ActionPanel, Action } from "@raycast/api";
import { GithubPullRequest } from "../types";
import { useMemo } from "react";

interface GithubPullRequestPreviewProps {
  notification: Notification;
  githubPullRequest: GithubPullRequest;
}

export function GithubPullRequestPreview({ notification, githubPullRequest }: GithubPullRequestPreviewProps) {
  const notification_html_url = useMemo(() => {
    return getNotificationHtmlUrl(notification);
  }, [notification]);

  return (
    <Detail
      markdown={`# ${githubPullRequest.title}`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={notification_html_url} />
        </ActionPanel>
      }
    />
  );
}
