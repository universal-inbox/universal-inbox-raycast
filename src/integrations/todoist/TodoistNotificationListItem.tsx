import { NotificationTaskActions } from "../../action/NotificationTaskActions";
import { NotificationListItemProps } from "../../notification";
import { Detail, List, environment } from "@raycast/api";
import { useMemo } from "react";

export function TodoistNotificationListItem({ notification, mutate }: NotificationListItemProps) {
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
          mutate={mutate}
        />
      }
    />
  );
}
