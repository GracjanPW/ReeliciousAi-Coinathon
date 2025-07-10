import { RAIHeader } from "../../_components/rai-header";
import { PromptSteps } from "../_components/prompt-steps";

export default function Page(){
    return (
        <div>
            <RAIHeader title="Script and Video"/>
            <div className="max-w-[600px] m-auto mt-10">
                <PromptSteps/>
            </div>
        </div>
    )
}