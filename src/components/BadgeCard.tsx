"use client";

interface Badge {
  id: string;
  icon: string;
  name: string;
}

interface BadgeCardProps {
  badge: Badge;
  earned: boolean;
}

export default function BadgeCard({ badge, earned }: BadgeCardProps) {
  return (
    <div
      className={`flex flex-col items-center gap-1 p-3 rounded-2xl border-2 transition-all ${
        earned
          ? "border-yellow-400 bg-yellow-50 dark:bg-yellow-950/40"
          : "border-zinc-200 dark:border-zinc-800 opacity-35"
      }`}
    >
      <span className="text-3xl">{badge.icon}</span>
      <span className="text-xs font-bold text-center leading-tight">{badge.name}</span>
    </div>
  );
}
