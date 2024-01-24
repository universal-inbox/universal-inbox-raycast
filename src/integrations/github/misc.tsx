import { Icon, Image, List } from "@raycast/api";
import { GithubActor, getGithubActorName } from "./types";

export function getGithubActorAccessory(actor?: GithubActor): List.Item.Accessory {
  if (actor) {
    return {
      icon: actor.content.avatar_url ? { source: actor.content.avatar_url, mask: Image.Mask.Circle } : Icon.Person,
      tooltip: getGithubActorName(actor),
    };
  }
  return { icon: Icon.Person, tooltip: "Unknown" };
}
