import { PaginationStatus } from "convex/react";
import { Doc } from "../../../convex/_generated/dataModel";
import {
    Table,
    TableBody,
    TableHeader,
    TableCell,
    TableHead,
    TableRow,
} from "@/components/ui/table";
import { LoaderIcon } from "lucide-react";
import { DocumentRow } from "./document-row";

interface DocumentsTableProps {
    documents: Doc<"documents">[] | undefined;
    loadMore: (numItems: number) => void;
    status: PaginationStatus;
}

export const DocumentsTable = ({documents, loadMore, status}: DocumentsTableProps) => {
    return (
        <div className="max-w-screen-xl mx-auto px-16 py-6 gap-5 flex flex-col">
            {documents === undefined ? (
                <div className="flex justify-center items-center h-24">
                    <LoaderIcon className="size-6 text-muted-foreground animate-spin"/>
                </div>
            ):(
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-none">
                            <TableHead>Name</TableHead>
                            <TableHead>&nbsp;</TableHead>
                            <TableHead className="hidden md:table-cell">Shared</TableHead>
                            <TableHead className="hidden md:table-cell">Create at</TableHead>
                        </TableRow>
                    </TableHeader>
                    {documents.length === 0 ? (
                        <TableBody>
                            <TableRow className="hover:bg-transparent">
                                <TableCell colSpan={4} className="h-24 text-center text-muted-foreground">No documents Found</TableCell>
                            </TableRow>
                        </TableBody>
                    ):(
                        <TableBody>
                            {documents.map((document) => (
                                <DocumentRow key={document._id} document={document} />
                            ))}
                        </TableBody>
                    )}
                </Table>
            )}
        </div>
    )
}