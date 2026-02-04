import { Composition } from "remotion";
import { BarComparison, sections } from "./BarComparison";


const SECTION_DURATION = 120;

export const RemotionRoot: React.FC = () => {
  return (
    <Composition
      id="BarComparison"
      component={BarComparison}
      width={1920}
      height={1080}
      fps={30}
      durationInFrames={SECTION_DURATION * sections.length}
    />
  );
};
