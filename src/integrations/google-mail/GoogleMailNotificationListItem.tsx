import { Detail, List, environment } from "@raycast/api";
import { useMemo } from "react";
import { NotificationActions } from "../../NotificationActions";
import { NotificationListItemProps } from "../../types";

export function GoogleMailNotificationListItem({ notification }: NotificationListItemProps) {
  const icon = useMemo(() => {
    if (environment.appearance === "dark") {
      return "google-mail-logo-light.svg";
    }
    return "google-mail-logo-dark.svg";
  }, [environment]);

  return (
    <List.Item
      key={notification.id}
      title={notification.title}
      icon={icon}
      subtitle={`#${notification.source_id}`}
      actions={
        <NotificationActions notification={notification} detailsTarget={<Detail markdown="# To be implemented 👋" />} />
      }
    />
  );
}
