import { Action, ActionPanel, Detail, List, getPreferenceValues, openExtensionPreferences } from "@raycast/api";
import { useFetch } from "@raycast/utils";
import { NotificationActions } from "./NotificationActions";
import { GithubNotificationListItem } from "./integrations/github/GithubNotificationListItem";
import { GoogleMailNotificationListItem } from "./integrations/google-mail/GoogleMailNotificationListItem";
import { LinearNotificationListItem } from "./integrations/linear/LinearNotificationListItem";
import { TodoistNotificationListItem } from "./integrations/todoist/TodoistNotificationListItem";
import { Notification, NotificationListItemProps, Page, UniversalInboxPreferences } from "./types";

export default function Command() {
  const preferences = getPreferenceValues<UniversalInboxPreferences>();

  if (
    preferences.apiKey === undefined ||
    preferences.apiKey === ""
    /* preferences.universalInboxBaseUrl === undefined ||
     * preferences.universalInboxBaseUrl === "" */
  ) {
    return (
      <Detail
        markdown={"API key incorrect. Please update it in extension preferences and try again."}
        actions={
          <ActionPanel>
            <Action title="Open Extension Preferences" onAction={openExtensionPreferences} />
          </ActionPanel>
        }
      />
    );
  }

  const { isLoading, data } = useFetch<Page<Notification>>(
    `${preferences.universalInboxBaseUrl}/api/notifications?status=Unread,Read&with_tasks=true`,
    {
      headers: {
        Authorization: `Bearer ${preferences.apiKey}`,
      },
    },
  );

  return (
    <List isLoading={isLoading}>
      {data?.content.map((notification: Notification) => {
        return <NotificationListItem key={notification.id} notification={notification} />;
      })}
    </List>
  );
}

function NotificationListItem({ notification }: NotificationListItemProps) {
  switch (notification.metadata.type) {
    case "Github":
      return <GithubNotificationListItem notification={notification} />;
    case "Linear":
      return <LinearNotificationListItem notification={notification} />;
    case "GoogleMail":
      return <GoogleMailNotificationListItem notification={notification} />;
    case "Todoist":
      return <TodoistNotificationListItem notification={notification} />;
    default:
      return <DefaultNotificationListItem notification={notification} />;
  }
}

function DefaultNotificationListItem({ notification }: NotificationListItemProps) {
  return (
    <List.Item
      key={notification.id}
      title={notification.title}
      subtitle={`#${notification.source_id}`}
      actions={
        <NotificationActions notification={notification} detailsTarget={<Detail markdown="# To be implemented 👋" />} />
      }
    />
  );
}
