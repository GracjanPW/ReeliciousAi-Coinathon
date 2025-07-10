import { RAIHeader } from "../_components/rai-header";
import { ProjectsDisplay } from "./_components/projects-display";

export default function ProjectIdPage() {
  return (
    <div className="h-full">
      <RAIHeader title="Projects"/>
      <div className="h-full">
        <ProjectsDisplay />
      </div>
    </div>
  );
}
