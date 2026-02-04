import {
  AbsoluteFill,
  interpolate,
  spring,
  useCurrentFrame,
  useVideoConfig,
  staticFile,
} from "remotion";
import { loadFont } from "@remotion/google-fonts/Poppins";

const { fontFamily } = loadFont("normal", {
  fontWeight: "600",
});

type Bar = {
  label: string;
  value: number;
  color: string;
  icon: string;
};

type Section = {
  title: string;
  bars: Bar[];
};

export const sections: Section[] = [
  {
    title: "Agents — Humanity's Last Exam (Full)",
    bars: [
      { label: "Kimi", value: 50.2, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 45.5, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 43.2, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 45.8, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Agents — BrowseComp",
    bars: [
      { label: "Kimi", value: 74.9, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 65.8, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 57.8, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 59.2, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Agents — DeepSearchQA",
    bars: [
      { label: "Kimi", value: 77.1, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 71.3, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 76.1, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 63.2, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Coding — SWE-bench Verified",
    bars: [
      { label: "Kimi", value: 76.8, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 80.0, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Gemini", value: 80.9, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
      { label: "Claude", value: 76.2, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
    ],
  },
  {
    title: "Coding — SWE-bench Multilingual",
    bars: [
      { label: "Kimi", value: 73.0, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 72.0, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 77.5, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 65.0, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Image — MMMU Pro",
    bars: [
      { label: "Kimi", value: 78.5, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 79.5, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 74.0, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 81.0, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Image — MathVision",
    bars: [
      { label: "Kimi", value: 84.2, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 83.0, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 77.1, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 86.1, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Image — OmniDocBench 1.5*",
    bars: [
      { label: "Kimi", value: 88.8, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 85.7, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 87.7, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 88.5, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Video — VideoMMMU",
    bars: [
      { label: "Kimi", value: 86.6, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 85.9, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 84.4, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 87.6, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
  {
    title: "Video — LongVideoBench",
    bars: [
      { label: "Kimi", value: 79.8, color: "#3B82F6", icon: staticFile("/assets/kimi.png") },
      { label: "GPT", value: 76.5, color: "#E5E7EB", icon: staticFile("/assets/chatgpt.png") },
      { label: "Claude", value: 67.2, color: "#E5E7EB", icon: staticFile("/assets/claude.png") },
      { label: "Gemini", value: 77.7, color: "#E5E7EB", icon: staticFile("/assets/gemini.png") },
    ],
  },
];

const SECTION_DURATION = 120;

export const BarComparison: React.FC = () => {
  const frame = useCurrentFrame();
  const { height, fps } = useVideoConfig();

  const sectionIndex = Math.floor(frame / SECTION_DURATION);
  const section = sections[sectionIndex];

  if (!section) return null;

  const localFrame = frame % SECTION_DURATION;
  const maxBarHeight = height * 0.42;

  return (
    <AbsoluteFill
      style={{
        fontFamily,
        backgroundColor: "#05070A",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div style={{ display: "flex", gap: 40, alignItems: "flex-end" }}>
        {section.bars.map((bar, i) => {
          const progress = spring({
            frame: localFrame - i * 6,
            fps,
            config: { damping: 12 },
          });

          const barHeight = interpolate(
            progress,
            [0, 1],
            [0, (bar.value / 100) * maxBarHeight]
          );

          const number = interpolate(progress, [0, 1], [0, bar.value]).toFixed(1);

          return (
            <div
              key={`${sectionIndex}-${bar.label}`}
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 12,
              }}
            >
              <div style={{ color: "#9CA3AF", fontSize: 28, fontWeight: 600 }}>
                {number}
              </div>

              <img src={bar.icon} style={{ width: 42, height: 42 }} />

              <div
                style={{
                  width: 64,
                  height: barHeight,
                  backgroundColor: bar.color,
                  borderRadius: 16,
                }}
              />

              <div style={{ color: "#9CA3AF", fontSize: 20 }}>
                {bar.label}
              </div>
            </div>
          );
        })}
      </div>

      <div
        style={{
          position: "absolute",
          bottom: 140,
          color: "#E5E7EB",
          fontSize: 36,
          fontWeight: 600,
          letterSpacing: 0.5,
          textAlign: "center",
          padding: "0 40px",
        }}
      >
        {section.title}
      </div>
    </AbsoluteFill>
  );
};