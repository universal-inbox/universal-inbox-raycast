import { Detail, ActionPanel, Action } from "@raycast/api";
import { Notification } from "../../../types";
import { GithubDiscussion } from "../types";
import { useMemo } from "react";
import { getNotificationHtmlUrl } from "../../../notification";

interface GithubDiscussionPreviewProps {
  notification: Notification;
  githubDiscussion: GithubDiscussion;
}

export function GithubDiscussionPreview({ notification, githubDiscussion }: GithubDiscussionPreviewProps) {
  const notification_html_url = useMemo(() => {
    return getNotificationHtmlUrl(notification);
  }, [notification]);

  return (
    <Detail
      markdown={`# ${githubDiscussion.title}`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={notification_html_url} />
        </ActionPanel>
      }
    />
  );
}
