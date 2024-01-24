import { Color, Icon, List } from "@raycast/api";
import { NotificationActions } from "../../../NotificationActions";
import { Notification } from "../../../types";
import { getGithubActorAccessory } from "../misc";
import { GithubDiscussion, GithubDiscussionStateReason } from "../types";
import { GithubDiscussionPreview } from "../preview/GithubDiscussionPreview";

interface GithubDiscussionNotificationListItemProps {
  icon: string;
  notification: Notification;
  githubDiscussion: GithubDiscussion;
}

export function GithubDiscussionNotificationListItem({
  icon,
  notification,
  githubDiscussion,
}: GithubDiscussionNotificationListItemProps) {
  const subtitle = `${githubDiscussion.repository.name_with_owner}`;

  const author = getGithubActorAccessory(githubDiscussion.author);
  const discussionStatus = getGithubDiscussionStatusAccessory(githubDiscussion.state_reason);

  const accessories: List.Item.Accessory[] = [
    author,
    { date: new Date(githubDiscussion.updated_at), tooltip: `Updated at ${githubDiscussion.updated_at}` },
  ];

  if (discussionStatus) {
    accessories.unshift(discussionStatus);
  }
  if (githubDiscussion.comments_count > 0) {
    accessories.unshift({
      text: githubDiscussion.comments_count.toString(),
      icon: Icon.Bubble,
      tooltip: `${githubDiscussion.comments_count} comments`,
    });
  }

  return (
    <List.Item
      key={notification.id}
      title={notification.title}
      icon={icon}
      subtitle={subtitle}
      accessories={accessories}
      actions={
        <NotificationActions
          notification={notification}
          detailsTarget={<GithubDiscussionPreview notification={notification} githubDiscussion={githubDiscussion} />}
        />
      }
    />
  );
}

function getGithubDiscussionStatusAccessory(stateReason?: GithubDiscussionStateReason): List.Item.Accessory {
  switch (stateReason) {
    case GithubDiscussionStateReason.Duplicate:
      return {
        icon: { source: "github-discussion-duplicate.svg", tintColor: Color.SecondaryText },
        tooltip: "Answered",
      };
    case GithubDiscussionStateReason.Outdated:
      return {
        icon: { source: "github-discussion-outdated.svg", tintColor: Color.SecondaryText },
        tooltip: "Answered",
      };
    case GithubDiscussionStateReason.Reopened:
      return { icon: { source: "github-discussion-opened.svg", tintColor: Color.Green }, tooltip: "Answered" };
    case GithubDiscussionStateReason.Resolved:
      return { icon: { source: "github-discussion-closed.svg", tintColor: Color.Magenta }, tooltip: "Answered" };
    default:
      return { icon: { source: "github-discussion-opened.svg", tintColor: Color.Green }, tooltip: "Answered" };
  }
}
