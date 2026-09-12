import type { LucideIcon } from "lucide-react";
import {
  Moon,
  Coffee,
  Brain,
  CloudFog,
  Feather,
  HeartCrack,
  BatteryLow,
  Users,
  Heart,
  Sparkles,
  Sunrise,
  Sun,
  Wind,
  Sprout,
  Palette,
  Music2,
  BookOpen,
  HeartHandshake,
  Rainbow,
  HandHeart,
  ShieldAlert,
} from "lucide-react";

export interface CommunityTopicOption {
  id: string;
  label: string;
  icon: LucideIcon;
}

// Touchee-specific mood/emotional-support categories — framed around how
// someone feels, not diagnostic labels, since these are community topic
// tags rather than clinical categories.
export const COMMUNITY_TOPICS: CommunityTopicOption[] = [
  { id: "night-owls", label: "Night Owls", icon: Moon },
  { id: "cozy-comfort", label: "Cozy & Comfort", icon: Coffee },
  { id: "anxious-overthinking", label: "Anxiety & Overthinking", icon: Brain },
  { id: "heavy-days", label: "Heavy Days", icon: CloudFog },
  { id: "grief-loss", label: "Grief & Loss", icon: Feather },
  { id: "heartbreak-healing", label: "Heartbreak & Healing", icon: HeartCrack },
  { id: "stress-burnout", label: "Stress & Burnout", icon: BatteryLow },
  {
    id: "loneliness-connection",
    label: "Loneliness & Connection",
    icon: Users,
  },
  { id: "self-love-confidence", label: "Self-Love & Confidence", icon: Heart },
  { id: "mindfulness-calm", label: "Mindfulness & Calm", icon: Sparkles },
  { id: "hope-motivation", label: "Hope & Motivation", icon: Sunrise },
  { id: "gratitude-good-days", label: "Gratitude & Good Days", icon: Sun },
  { id: "venting-letting-go", label: "Venting & Letting Go", icon: Wind },
  {
    id: "growth-self-improvement",
    label: "Growth & Self-Improvement",
    icon: Sprout,
  },
  { id: "creative-expression", label: "Creative Expression", icon: Palette },
  { id: "music-mood", label: "Music & Mood", icon: Music2 },
  {
    id: "reflection-journaling",
    label: "Reflection & Journaling",
    icon: BookOpen,
  },
  {
    id: "love-relationships",
    label: "Love & Relationships",
    icon: HeartHandshake,
  },
  { id: "identity-belonging", label: "Identity & Belonging", icon: Rainbow },
  {
    id: "support-encouragement",
    label: "Support & Encouragement",
    icon: HandHeart,
  },
  { id: "mature-topics", label: "Mature Topics", icon: ShieldAlert },
];
