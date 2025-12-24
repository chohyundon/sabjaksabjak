import ShowEyeIcon from "@/app/assets/images/showPassWord.svg";
import HideEyeIcon from "@/app/assets/images/HidePassWord.svg";

export default function EyeIcon({
  visible,
  className,
  onClick,
}: {
  visible: boolean;
  className: string;
  onClick: () => void;
}) {
  return visible ? (
    <ShowEyeIcon className={className} onClick={onClick} />
  ) : (
    <HideEyeIcon className={className} onClick={onClick} />
  );
}
