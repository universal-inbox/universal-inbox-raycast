import { Action, ActionPanel, Icon } from "@raycast/api";
import { useMemo, ReactElement } from "react";
import { getNotificationHtmlUrl } from "./notification";
import { Notification } from "./types";

function deleteNotification(notification: Notification) {
  console.log(`Deleting notification ${notification.id}`);
}

function unsubscribeFromNotification(notification: Notification) {
  console.log(`Unsubcribing from notification ${notification.id}`);
}

function snoozeNotification(notification: Notification) {
  console.log(`Snoozing notification ${notification.id}`);
}

function createTaskFromNotification(notification: Notification) {
  console.log(`Creating task notification ${notification.id}`);
}

function linkNotificationToTask(notification: Notification) {
  console.log(`Linking notification ${notification.id}`);
}

export function NotificationActions({
  notification,
  detailsTarget,
}: {
  notification: Notification;
  detailsTarget: ReactElement;
}) {
  const notification_html_url = useMemo(() => {
    return getNotificationHtmlUrl(notification);
  }, [notification]);

  return (
    <ActionPanel>
      <Action.Push title="Show Details" target={detailsTarget} />
      <Action.OpenInBrowser url={notification_html_url} />
      <Action
        title="Delete Notification"
        icon={Icon.Trash}
        shortcut={{ modifiers: ["ctrl"], key: "d" }}
        onAction={() => deleteNotification(notification)}
      />
      <Action
        title="Unsubscribe From Notification"
        icon={Icon.BellDisabled}
        shortcut={{ modifiers: ["ctrl"], key: "u" }}
        onAction={() => unsubscribeFromNotification(notification)}
      />
      <Action
        title="Snooze"
        icon={Icon.Clock}
        shortcut={{ modifiers: ["ctrl"], key: "s" }}
        onAction={() => snoozeNotification(notification)}
      />
      <Action
        title="Create Task"
        icon={Icon.Calendar}
        shortcut={{ modifiers: ["ctrl"], key: "d" }}
        onAction={() => createTaskFromNotification(notification)}
      />
      <Action
        title="Link to Task"
        icon={Icon.Link}
        shortcut={{ modifiers: ["ctrl"], key: "d" }}
        onAction={() => linkNotificationToTask(notification)}
      />
    </ActionPanel>
  );
}
