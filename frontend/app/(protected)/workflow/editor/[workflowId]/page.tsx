
import React from "react";
import Editor from "../../_components/Editor";

async function WorkflowEditorPage({
  params,
}: {
  params: { workflowId: string };
}) {
  const { workflowId } = params;
    
  return (
    <div className="flex flex-col w-full h-screen">
        <Editor workflowId={workflowId} />
    </div>
  );
}

export default WorkflowEditorPage;