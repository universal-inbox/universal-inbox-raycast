import { Icon, Image, List } from "@raycast/api";
import { LinearUser } from "./types";

export function getLinearUserAccessory(user?: LinearUser): List.Item.Accessory {
  if (user) {
    return {
      icon: user.avatar_url ? { source: user.avatar_url, mask: Image.Mask.Circle } : Icon.Person,
      tooltip: user.name,
    };
  }
  return { icon: Icon.Person, tooltip: "Unknown" };
}
