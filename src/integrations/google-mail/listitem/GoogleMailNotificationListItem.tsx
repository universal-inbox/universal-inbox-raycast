import { GoogleMailThreadListItem } from "./GoogleMailThreadListItem";
import { NotificationListItemProps } from "../../../notification";
import { environment } from "@raycast/api";
import { useMemo } from "react";

export function GoogleMailNotificationListItem({ notification, mutate }: NotificationListItemProps) {
  const icon = useMemo(() => {
    if (environment.appearance === "dark") {
      return "google-mail-logo-light.svg";
    }
    return "google-mail-logo-dark.svg";
  }, [environment]);

  if (notification.metadata.type !== "GoogleMail") return null;

  return (
    <GoogleMailThreadListItem
      icon={icon}
      notification={notification}
      googleMailThread={notification.metadata.content}
      mutate={mutate}
    />
  );
}
