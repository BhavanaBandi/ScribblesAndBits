const DOODLES = {
  star: (color) => (
    <path
      d="M12 2 L14.5 9 L22 9.5 L16 14 L18 21.5 L12 17 L6 21.5 L8 14 L2 9.5 L9.5 9 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  heart: (color) => (
    <path
      d="M12 20 C4 14 1 9.5 3.3 6.2 C5.2 3.4 9.4 3.6 12 7.2 C14.6 3.6 18.8 3.4 20.7 6.2 C23 9.5 20 14 12 20 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinejoin="round"
    />
  ),
  swirl: (color) => (
    <path
      d="M3 12 C3 6 9 4 12 8 C15 12 10 16 7 13 C5 11 7 8 10 9"
      fill="none"
      stroke={color}
      strokeWidth="1.4"
      strokeLinecap="round"
    />
  ),
  cloud: (color) => (
    <path
      d="M6.5 16.5 C3.5 16 3.5 11.5 6.8 11.2 C6.6 7.8 11.4 6.6 12.7 9.6 C15.6 8.6 18.2 11 16.9 13.5 C19.6 13.7 19.4 17 16.8 17 L7.5 17 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.3"
      strokeLinejoin="round"
    />
  ),
  flower: (color) => (
    <g fill="none" stroke={color} strokeWidth="1.3">
      <circle cx="12" cy="12" r="2" />
      <circle cx="12" cy="6.5" r="2.6" />
      <circle cx="17" cy="9.5" r="2.6" />
      <circle cx="17" cy="15" r="2.6" />
      <circle cx="12" cy="18" r="2.6" />
      <circle cx="7" cy="15" r="2.6" />
      <circle cx="7" cy="9.5" r="2.6" />
    </g>
  ),
  scribble: (color) => (
    <path
      d="M2 12 C5 8 6 16 9 12 C12 8 13 16 16 12 C19 8 20 16 22 13"
      fill="none"
      stroke={color}
      strokeWidth="1.6"
      strokeLinecap="round"
    />
  ),
  arrow: (color) => (
    <path
      d="M3 15 C9 4 15 4 20 9 M14 6.5 L20.5 9 L18 15.5"
      fill="none"
      stroke={color}
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  ),
  stain: (color) => (
    <path
      d="M12 3 C17 3 20.5 7 20 11.5 C19.5 17 15 20.5 10.5 19.5 C5 18.3 3 13 5.2 8.5 C6.6 5.6 9 3 12 3 Z"
      fill="none"
      stroke={color}
      strokeWidth="1.2"
      opacity="0.55"
    />
  ),
};

export default function Doodle({
  type = "star",
  size = 32,
  color = "currentColor",
  rotate = 0,
  className,
  style,
}) {
  const draw = DOODLES[type] ?? DOODLES.star;

  return (
    <svg
      viewBox="0 0 24 24"
      width={size}
      height={size}
      className={className}
      style={{ transform: `rotate(${rotate}deg)`, ...style }}
      aria-hidden="true"
      focusable="false"
    >
      {draw(color)}
    </svg>
  );
}
