"use client"

import React, { useState } from "react"
import { Id } from "../../convex/_generated/dataModel"
import { AlertDialog, AlertDialogContent, AlertDialogTrigger, AlertDialogTitle, AlertDialogDescription, AlertDialogHeader, AlertDialogFooter, AlertDialogCancel, AlertDialogAction } from "./ui/alert-dialog";
import { useMutation } from "convex/react";
import { api } from "../../convex/_generated/api";

interface RemoveDialogProps {
    documentId: Id<"documents">
    children: React.ReactNode;

}

export const RemoveDialog = ({documentId, children}: RemoveDialogProps) => {
    const remove = useMutation(api.documents.removeById);
    const [isRemoving, setIsRemoving] = useState(false);

    return(
        <AlertDialog>
            <AlertDialogTrigger asChild>
                {children}
            </AlertDialogTrigger>
            <AlertDialogContent onClick={(e) => e.stopPropagation()}>
                <AlertDialogHeader>
                <AlertDialogTitle>Are you sure you want to remove this document?</AlertDialogTitle>
                <AlertDialogDescription>This action cannot be undone. This will permanently delete your 
                document.
                </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                    <AlertDialogCancel onClick={(e) => e.stopPropagation()}>Cancel</AlertDialogCancel>
                    <AlertDialogAction
                    disabled={isRemoving}
                    onClick={(e) => {
                        e.stopPropagation()
                        setIsRemoving(true)
                        remove({id: documentId})
                            .finally(() => setIsRemoving(false));
                    }}
                    >
                        Delete
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}