import { ProfileImage } from "./ProfileImage";
import { ProfileInfoProps } from "./ProfileInfo.types";

export function ProfileInfo(props: ProfileInfoProps) {
  const { onReload } = props;

  return (
    <div className="mt-10 max-w-2xl mx-auto">
      <div className="flex flex-row pb-lg space-x-sm items-center justify-between">
        <ProfileImage />
      </div>
    </div>
  );
}
