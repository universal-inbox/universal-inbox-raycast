import { NotificationActions } from "../../../action/NotificationActions";
import { LinearIssuePreview } from "../preview/LinearIssuePreview";
import { getLinearUserAccessory } from "../accessories";
import { Notification } from "../../../notification";
import { LinearIssueNotification } from "../types";
import { MutatePromise } from "@raycast/utils";
import { Page } from "../../../types";
import { List } from "@raycast/api";

interface LinearIssueNotificationListItemProps {
  icon: string;
  notification: Notification;
  linearIssueNotification: LinearIssueNotification;
  mutate: MutatePromise<Page<Notification> | undefined>;
}

export function LinearIssueNotificationListItem({
  icon,
  notification,
  linearIssueNotification,
  mutate,
}: LinearIssueNotificationListItemProps) {
  const subtitle = `${linearIssueNotification.issue.team.name} #${linearIssueNotification.issue.identifier}`;

  const state = getLinearIssueStateAccessory(linearIssueNotification.issue.state);
  const assignee = getLinearUserAccessory(linearIssueNotification.issue.assignee);

  const accessories: List.Item.Accessory[] = [
    state,
    assignee,
    {
      date: new Date(linearIssueNotification.updated_at),
      tooltip: `Updated at ${linearIssueNotification.updated_at}`,
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
          detailsTarget={<LinearIssuePreview notification={notification} linearIssue={linearIssueNotification.issue} />}
          mutate={mutate}
        />
      }
    />
  );
}

export function getLinearIssueStateAccessory(state: LinearWorkflowState): List.Item.Accessory {
  switch (state.type) {
    case "Triage":
      return {
        icon: { source: "linear-issue-triage.svg", tintColor: state.color },
        tooltip: state.name,
      };
    case "Backlog":
      return {
        icon: { source: "linear-issue-backlog.svg", tintColor: state.color },
        tooltip: state.name,
      };
    case "Unstarted":
      return {
        icon: { source: "linear-issue-unstarted.svg", tintColor: state.color },
        tooltip: state.name,
      };
    case "Started":
      return {
        icon: { source: "linear-issue-started.svg", tintColor: state.color },
        tooltip: state.name,
      };
    case "Completed":
      return {
        icon: { source: "linear-issue-completed.svg", tintColor: state.color },
        tooltip: state.name,
      };
    case "Canceled":
      return {
        icon: { source: "linear-issue-canceled.svg", tintColor: state.color },
        tooltip: state.name,
      };
  }
}
