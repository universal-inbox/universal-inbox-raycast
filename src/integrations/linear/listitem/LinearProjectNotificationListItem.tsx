import { NotificationActions } from "../../../action/NotificationActions";
import { LinearProjectPreview } from "../preview/LinearProjectPreview";
import { getLinearUserAccessory } from "../accessories";
import { Notification } from "../../../notification";
import { LinearProjectNotification } from "../types";
import { MutatePromise } from "@raycast/utils";
import { Page } from "../../../types";
import { List } from "@raycast/api";

interface LinearProjectNotificationListItemProps {
  icon: string;
  notification: Notification;
  linearProjectNotification: LinearProjectNotification;
  mutate: MutatePromise<Page<Notification> | undefined>;
}

export function LinearProjectNotificationListItem({
  icon,
  notification,
  linearProjectNotification,
  mutate,
}: LinearProjectNotificationListItemProps) {
  const subtitle = linearProjectNotification.project.name;

  const lead = getLinearUserAccessory(linearProjectNotification.project.lead);

  const accessories: List.Item.Accessory[] = [
    lead,
    {
      date: new Date(linearProjectNotification.updated_at),
      tooltip: `Updated at ${linearProjectNotification.updated_at}`,
    },
  ];

  return (
    <List.Item
      key={notification.id}
      title={notification.title}
      icon={icon}
      accessories={accessories}
      subtitle={subtitle}
      actions={
        <NotificationActions
          notification={notification}
          detailsTarget={
            <LinearProjectPreview notification={notification} linearProject={linearProjectNotification.project} />
          }
          mutate={mutate}
        />
      }
    />
  );
}
