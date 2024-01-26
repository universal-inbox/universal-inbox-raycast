import { Action, ActionPanel, Detail, List, getPreferenceValues, openExtensionPreferences } from "@raycast/api";
import { GoogleMailNotificationListItem } from "./integrations/google-mail/GoogleMailNotificationListItem";
import { GithubNotificationListItem } from "./integrations/github/listitem/GithubNotificationListItem";
import { TodoistNotificationListItem } from "./integrations/todoist/TodoistNotificationListItem";
import { LinearNotificationListItem } from "./integrations/linear/LinearNotificationListItem";
import { Notification, NotificationListItemProps } from "./notification";
import { NotificationActions } from "./action/NotificationActions";
import { Page, UniversalInboxPreferences } from "./types";
import { useFetch } from "@raycast/utils";

export default function Command() {
  const preferences = getPreferenceValues<UniversalInboxPreferences>();

  if (
    preferences.apiKey === undefined ||
    preferences.apiKey === "" ||
    preferences.universalInboxBaseUrl === undefined ||
    preferences.universalInboxBaseUrl === ""
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

  const { isLoading, data, mutate } = useFetch<Page<Notification>>(
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
        return <NotificationListItem key={notification.id} notification={notification} mutate={mutate} />;
      })}
    </List>
  );
}

function NotificationListItem({ notification, mutate }: NotificationListItemProps) {
  switch (notification.metadata.type) {
    case "Github":
      return <GithubNotificationListItem notification={notification} mutate={mutate} />;
    case "Linear":
      return <LinearNotificationListItem notification={notification} mutate={mutate} />;
    case "GoogleMail":
      return <GoogleMailNotificationListItem notification={notification} mutate={mutate} />;
    case "Todoist":
      return <TodoistNotificationListItem notification={notification} mutate={mutate} />;
    default:
      return <DefaultNotificationListItem notification={notification} mutate={mutate} />;
  }
}

function DefaultNotificationListItem({ notification, mutate }: NotificationListItemProps) {
  return (
    <List.Item
      key={notification.id}
      title={notification.title}
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
