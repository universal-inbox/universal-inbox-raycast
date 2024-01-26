import { LinearProjectNotificationListItem } from "./LinearProjectNotificationListItem";
import { LinearIssueNotificationListItem } from "./LinearIssueNotificationListItem";
import { NotificationListItemProps } from "../../../notification";
import { environment } from "@raycast/api";
import { useMemo } from "react";

export function LinearNotificationListItem({ notification, mutate }: NotificationListItemProps) {
  const icon = useMemo(() => {
    if (environment.appearance === "dark") {
      return "linear-logo-light.svg";
    }
    return "linear-logo-dark.svg";
  }, [environment]);

  if (notification.metadata.type !== "Linear") return null;

  switch (notification.metadata.content.type) {
    case "IssueNotification":
      return (
        <LinearIssueNotificationListItem
          icon={icon}
          notification={notification}
          linearIssueNotification={notification.metadata.content.content}
          mutate={mutate}
        />
      );
    case "ProjectNotification":
      return (
        <LinearProjectNotificationListItem
          icon={icon}
          notification={notification}
          linearProjectNotification={notification.metadata.content.content}
          mutate={mutate}
        />
      );
    default:
      return null;
  }
}
