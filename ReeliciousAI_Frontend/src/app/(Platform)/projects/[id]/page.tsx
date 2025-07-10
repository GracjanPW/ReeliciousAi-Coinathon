import { RAIHeader } from "../../_components/rai-header";
import { ProjectDetails } from "../_components/project-details";

export default function ProjectIdPage() {
  return (
    <div className="h-full">
      <RAIHeader title="Project"/>
      <div className="h-full">
        <ProjectDetails />
      </div>
    </div>
  );
}
