import { NotificationActions } from "../../action/NotificationActions";
import { NotificationListItemProps } from "../../notification";
import { Detail, List, environment } from "@raycast/api";
import { useMemo } from "react";

export function LinearNotificationListItem({ notification, mutate }: NotificationListItemProps) {
  const icon = useMemo(() => {
    if (environment.appearance === "dark") {
      return "linear-logo-light.svg";
    }
    return "linear-logo-dark.svg";
  }, [environment]);

  return (
    <List.Item
      key={notification.id}
      title={notification.title}
      icon={icon}
      subtitle={`#${notification.source_id}`}
      actions={
        <NotificationActions
          notification={notification}
          detailsTarget={<Detail markdown="# To be implemented 👋" />}
          mutate={mutate}
        />
      }
    />
  );
}
