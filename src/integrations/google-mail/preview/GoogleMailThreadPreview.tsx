import { Notification, getNotificationHtmlUrl } from "../../../notification";
import { Detail, ActionPanel, Action } from "@raycast/api";
import { GoogleMailThread } from "../types";
import { useMemo } from "react";

interface GoogleMailThreadPreviewProps {
  notification: Notification;
  googleMailThread: GoogleMailThread;
}

export function GoogleMailThreadPreview({ notification }: GoogleMailThreadPreviewProps) {
  const notification_html_url = useMemo(() => {
    return getNotificationHtmlUrl(notification);
  }, [notification]);

  return (
    <Detail
      markdown={`# ${notification.title}`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={notification_html_url} />
        </ActionPanel>
      }
    />
  );
}
