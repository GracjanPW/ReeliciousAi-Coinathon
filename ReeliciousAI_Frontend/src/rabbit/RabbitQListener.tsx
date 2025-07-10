"use client";

import { useQueryClient } from "@tanstack/react-query";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { RBBTQueue } from "rbbt-client";
import { useRBBT } from "rbbt-client/next";
import { useEffect } from "react";
import { toast } from "sonner";

export function RabbitQListener() {
  const { createDisposableQueue } = useRBBT();
  const queryClient = useQueryClient()
  const { data: session } = useSession()
  const router = useRouter();

  useEffect(() => {
    const refetch = async (id: number) => {
      await queryClient.invalidateQueries({ queryKey: ['project', id] })
      await queryClient.refetchQueries({ queryKey: ['project', id], type:'all' });
    }
    let q: RBBTQueue | undefined = undefined;
    if (session?.user) {
      q = createDisposableQueue("user", session.user.id!);
      if (q) {
        q.subscribe({ noAck: true }, (msg) => {
          console.log(msg)
          if (!msg.body) return
          if (typeof msg.body != 'object') return
          
          const obj =  'error' in msg.body 
          ? msg.body as unknown as {
            error: string,
            message:string
          } 
          : msg.body as unknown as {
            id: number
          };

          if ('error' in obj ) {
            toast.error(obj.error, {
              description: obj.message
            })
            return;
          }
          refetch(obj.id)
          toast("Video has finished generating", {
            description:
              "Your video has now completed generating click to go to video",
            action: {
              label: "View",
              onClick: () => {
                router.push(`/projects/${obj.id}`);
              },
            },
          });
        });
      }
    }

    return () => {
      if (q instanceof RBBTQueue) {
        q.unsubscribe();
      }
    };
  }, [session]);

  return null;
}
