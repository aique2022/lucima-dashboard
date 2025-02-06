"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import axios from "axios";
import { MoreHorizontal, Pencil, TicketIcon, Trash } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { ConfirmModal } from "@/components/modals/confirm-modal";
import useSocket from "@/hooks/useSocket";

interface ActionsProps {
  id: string;
}

const Actions = ({ id }: ActionsProps) => {
  const socket = useSocket();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const onEdit = () => {
    router.push(`/tickets/${id}`);
  };

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`http://localhost:8000/api/v1/tickets/${id}`);

      if (socket) {
        socket.emit("deleteTicket", id);
      }

      toast.success("Ticket deleted successfully!");
      router.refresh();
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Something went wrong");
    } finally {
      setIsLoading(false);
      setIsModalOpen(false);
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
    setIsLoading(false);
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" className="h-8 w-8 p-0">
          <span className="sr-only">Open menu</span>
          <MoreHorizontal className="h-4 w-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <Button
          onClick={onEdit}
          className="w-full flex justify-start"
          variant="ghost"
          size="sm"
          disabled={isLoading}
        >
          <DropdownMenuItem>
            <TicketIcon className="h-4 w-4 mr-2" />
            View Ticket
          </DropdownMenuItem>
        </Button>

        <Button
          className="w-full flex justify-start"
          variant="ghost"
          size="sm"
          disabled={isLoading}
        >
          <DropdownMenuItem onClick={() => setIsModalOpen(true)}>
            <Trash className="h-4 w-4 mr-2" />
            Delete
          </DropdownMenuItem>
        </Button>
      </DropdownMenuContent>

      <ConfirmModal
        isOpen={isModalOpen}
        onClose={onClose}
        onConfirm={onDelete}
      />
    </DropdownMenu>
  );
};

export default Actions;
