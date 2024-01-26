import { Notification, getNotificationHtmlUrl } from "../../../notification";
import { Detail, ActionPanel, Action } from "@raycast/api";
import { LinearProject } from "../types";
import { useMemo } from "react";

interface LinearProjectPreviewProps {
  notification: Notification;
  linearProject: LinearProject;
}

export function LinearProjectPreview({ notification, linearProject }: LinearProjectPreviewProps) {
  const notification_html_url = useMemo(() => {
    return getNotificationHtmlUrl(notification);
  }, [notification]);

  return (
    <Detail
      markdown={`# ${linearProject.name}`}
      actions={
        <ActionPanel>
          <Action.OpenInBrowser url={notification_html_url} />
        </ActionPanel>
      }
    />
  );
}
