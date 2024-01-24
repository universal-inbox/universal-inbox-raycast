import { Detail, List, environment } from "@raycast/api";
import { useMemo } from "react";
import { NotificationTaskActions } from "../../NotificationTaskActions";
import { NotificationListItemProps } from "../../types";

export function TodoistNotificationListItem({ notification }: NotificationListItemProps) {
  const icon = useMemo(() => {
    if (environment.appearance === "dark") {
      return "todoist-icon-light.svg";
    }
    return "todoist-icon-dark.svg";
  }, [environment]);

  return (
    <List.Item
      key={notification.id}
      title={notification.title}
      icon={icon}
      subtitle={`#${notification.source_id}`}
      actions={
        <NotificationTaskActions
          notification={notification}
          detailsTarget={<Detail markdown="# To be implemented 👋" />}
        />
      }
    />
  );
}
