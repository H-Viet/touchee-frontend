interface AvatarProps {
  src?: string | null;
  fallback: string;
  size?: "sm" | "md" | "lg";
  pulse?: boolean;
}

const sizeMap = {
  sm: { box: "32px", font: "12px" },
  md: { box: "40px", font: "14px" },
  lg: { box: "48px", font: "16px" },
};

export const Avatar = ({
  src,
  fallback,
  size = "md",
  pulse = false,
}: AvatarProps) => {
  const initials = fallback
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

  const { box, font } = sizeMap[size];

  return (
    <div
      className={pulse ? "mood-pulse" : undefined}
      style={{
        height: box,
        width: box,
        borderRadius: "9999px",
        flexShrink: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: font,
        fontWeight: 700,
        color: "white",
        background: "linear-gradient(135deg, #ff6b6b, #ff3d8b, #8b5cf6)",
        overflow: "hidden",
      }}
    >
      {src ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src}
          alt={fallback}
          style={{ height: "100%", width: "100%", objectFit: "cover" }}
        />
      ) : (
        <span>{initials}</span>
      )}
    </div>
  );
};
