"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { BACKEND_PROJECTS_URL } from "@/config";
import { useConfirmDelete } from "@/hooks/use-confirm-delete";
import { ProjectDeleteResponse, ProjectReponse } from "@/types/responses";
import { useMutation, useQuery } from "@tanstack/react-query";
import { useParams } from "next/navigation";
import { toast } from "sonner";

export function ProjectDetails() {
  const params = useParams();
  const projectId = params.id;

  const {
    data: project,
    isLoading: projectLoading,
    refetch,
  } = useQuery({
    queryKey: ["project", parseInt(projectId ? projectId?.toString() : "0")],
    queryFn: async () => {
      const res = await fetch(
        `${BACKEND_PROJECTS_URL}/get-project?projectId=${projectId}`,
        {
          credentials: "include",
        }
      );
      if (!res.ok) {
        toast.error(res.statusText);
        return null;
      }
      const data: ProjectReponse = await res.json();
      if (!data.isSuccessful) {
        toast.error("Failed to fetch project");
        return null;
      }
      return data.projectData;
    },
  });

  const postToZora = async () => {
    console.log("click")
    try {
      const response = await fetch("/api/zora", {
        method:"POST",
        body: JSON.stringify({
          compiledUrl: project?.compiledUrl
        })
      })

      const body = await response.json()
      console.log({body})

    } catch {

    }
  }

  const [ConfirmDeleteDialog, confirmDelete] = useConfirmDelete(
    "Are you sure you want to do this?",
    "This action is permanent and all data will be lost",
    project?.title
  );

  const handleDelete = async () => {
    const confirm = await confirmDelete();
    if (!confirm) return;
    const deleteResponse = await fetch(
      BACKEND_PROJECTS_URL + "/delete-project",
      {
        method: "DELETE",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ id: parseInt(projectId!.toString()) }),
      }
    );

    if (!deleteResponse.ok) {
      toast.error("Something went wrong, couldn't delete project");
      return;
    }

    const deleteResponseBody: ProjectDeleteResponse =
      await deleteResponse.json();

    if (!deleteResponseBody.isSuccessful) {
      toast.error(`Something went wrong: ${deleteResponseBody.errorMessage}`);
      return;
    }

    toast.success(`Project '${project?.title}' has been deleted.`);
    await refetch();
  };

  return (
    <div className="h-full flex flex-col">
      <div className="grow justify-center items-center p-4">
        {projectLoading ? (
          <Card className="w-full max-w-md p-6 space-y-4">
            <CardHeader>
              <Skeleton className="h-6 w-1/2 mb-2" />
              <Skeleton className="h-4 w-1/3" />
            </CardHeader>
            <CardContent className="flex flex-col space-y-2">
              <Skeleton className="h-10 w-full" />
            </CardContent>
          </Card>
        ) : project ? (
          <Card className="w-full max-w-md p-6 space-y-4">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">
                {project.title}
              </CardTitle>
              <p className="text-muted-foreground capitalize">
                {project.status}
              </p>
            </CardHeader>
            <CardContent>
              {project?.compiledUrl && (
                <>
                <div>
                  <video className="w-full h-full object-cover" preload="none" controls={true}>
                    <source src={project.compiledUrl} type="video/mp4" />
                  </video>
                </div>
                <Button onClick={()=>postToZora()}>
                  Post to zora
                </Button>
                </>
              )}
              {project.status === "complete" && (
                <div className="flex flex-row space-x-4 w-full">
                  <Button
                    variant={"destructive"}
                    onClick={handleDelete}
                    className=""
                  >
                    Delete
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>
        ) : (
          <p className="text-center text-muted-foreground">
            Project not found.
          </p>
        )}
      </div>
      <ConfirmDeleteDialog />
    </div>
  );
}
