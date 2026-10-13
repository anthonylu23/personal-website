import type { PathIcon, StackIcon as StackIconType } from "../data/stack";

const isPathIcon = (icon: StackIconType): icon is PathIcon => "path" in icon;

type StackIconProps = {
  icon: StackIconType;
  className?: string;
};

/** Monochrome (currentColor) icon for a stack item: a brand logo path or a Lucide fallback. */
const StackIcon = ({ icon, className }: StackIconProps) => {
  if (isPathIcon(icon)) {
    return (
      <svg
        viewBox="0 0 24 24"
        fill="currentColor"
        aria-hidden="true"
        focusable="false"
        className={className}
      >
        <path d={icon.path} />
      </svg>
    );
  }

  const Icon = icon;
  return <Icon aria-hidden="true" strokeWidth={1.75} className={className} />;
};

export default StackIcon;
