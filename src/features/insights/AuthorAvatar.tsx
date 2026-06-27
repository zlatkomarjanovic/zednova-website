import { CmsImage } from "@/ui/CmsImage";
import { cn } from "@/lib/utils";

const SIZE = {
  sm: { box: "size-10", text: "text-base", sizes: "40px" },
  md: { box: "size-12", text: "text-xl", sizes: "48px" },
} as const;

export function AuthorAvatar({
  name,
  avatar,
  size = "md",
  className,
}: {
  name: string;
  avatar?: string;
  size?: keyof typeof SIZE;
  className?: string;
}) {
  const dim = SIZE[size];

  if (avatar) {
    return (
      <div
        className={cn(
          "relative shrink-0 overflow-hidden rounded-full border border-zn-border bg-zn-bg-2",
          dim.box,
          className,
        )}
      >
        <CmsImage
          src={avatar}
          alt={name}
          fill
          preset="thumb"
          sizes={dim.sizes}
          className="object-cover"
        />
      </div>
    );
  }

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center rounded-full bg-zn-text font-sans text-zn-inv",
        dim.box,
        dim.text,
        className,
      )}
      aria-hidden={!avatar}
    >
      {name.charAt(0)}
    </div>
  );
}
