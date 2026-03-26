"use client";

import { startTransition, useEffect, useMemo, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import ChatSidebar from "@/components/Chat/ChatSidebar";
import ChatHeader from "@/components/Chat/ChatHeader";
import ChatMessages from "@/components/Chat/ChatMessages";
import ChatInput from "@/components/Chat/ChatInput";
import { useAppSelector } from "@/redux/hooks";
import {
  selectCurrentToken,
  selectCurrentUser,
} from "@/redux/features/auth/authSlice";
import {
  useGetChatRoomsQuery,
  useLazyGetRoomMessagesQuery,
  useMarkRoomReadMutation,
} from "@/redux/features/chat/chatApi";
import {
  mapMessageToUI,
  mapRoomToConversation,
  mapSocketMessageToUI,
} from "@/lib/chat-mappers";
import { createChatSocket } from "@/lib/chat-socket";
import type { UIMessage } from "@/types/chat.type";

function UserChatPage() {
  const searchParams = useSearchParams();
  const roomIdFromQuery = searchParams.get("roomId");

  const user = useAppSelector(selectCurrentUser);
  const token = useAppSelector(selectCurrentToken);

  const [selectedConversation, setSelectedConversation] = useState<
    string | null
  >(null);
  const [messageInput, setMessageInput] = useState("");
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileSidebar, setShowMobileSidebar] = useState(true);
  const [messages, setMessages] = useState<Record<string, UIMessage[]>>({});

  const socketRef = useRef<WebSocket | null>(null);
  const hasInitializedFromQuery = useRef(false);

  const {
    data: roomsResponse,
    isLoading: roomsLoading,
    refetch,
  } = useGetChatRoomsQuery();
  const [getRoomMessages] = useLazyGetRoomMessagesQuery();
  const [markRoomRead] = useMarkRoomReadMutation();

  const conversations = useMemo(() => {
    return (roomsResponse?.data || []).map((room) =>
      mapRoomToConversation(room, "user"),
    );
  }, [roomsResponse]);

  const selectedConv =
    conversations.find((c) => c.id === selectedConversation) || null;
  const currentUserId = user?.id || "";

  useEffect(() => {
    if (
      roomIdFromQuery &&
      conversations.length > 0 &&
      !hasInitializedFromQuery.current
    ) {
      const match = conversations.find(
        (c) => String(c.roomId) === String(roomIdFromQuery),
      );
      if (match) {
        startTransition(() => {
          setSelectedConversation(match.id);
          setShowMobileSidebar(false);
          hasInitializedFromQuery.current = true;
          return;
        });
      }
    }

    if (!selectedConversation && conversations.length > 0) {
      startTransition(() => {
        setSelectedConversation(conversations[0].id);
      });
    }
  }, [conversations, selectedConversation, roomIdFromQuery]);

  useEffect(() => {
    const loadMessages = async () => {
      if (!selectedConv) return;

      try {
        const res = await getRoomMessages(selectedConv.roomId).unwrap();
        const mapped = (res.data || []).map((msg) =>
          mapMessageToUI(msg, currentUserId),
        );

        setMessages((prev) => ({
          ...prev,
          [selectedConv.id]: mapped,
        }));

        await markRoomRead(selectedConv.roomId).unwrap();
        refetch();
      } catch (error) {
        console.error("Failed to load messages", error);
      }
    };

    loadMessages();
  }, [selectedConv, getRoomMessages, markRoomRead, currentUserId, refetch]);

  useEffect(() => {
    if (!selectedConv || !token || !currentUserId) return;

    if (socketRef.current) {
      socketRef.current.close();
    }

    const socket = createChatSocket(selectedConv.roomId, token);
    socketRef.current = socket;

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);

      if (data.type === "chat.message") {
        const uiMessage = mapSocketMessageToUI(data, currentUserId);

        setMessages((prev) => ({
          ...prev,
          [selectedConv.id]: [...(prev[selectedConv.id] || []), uiMessage],
        }));

        markRoomRead(selectedConv.roomId);
        refetch();
      }
    };

    socket.onclose = () => {
      console.log("chat socket closed");
    };

    socket.onerror = (error) => {
      console.error("chat socket error", error);
    };

    return () => {
      socket.close();
    };
  }, [selectedConv, token, currentUserId, markRoomRead, refetch]);

  const handleSendMessage = () => {
    if (!messageInput.trim()) return;
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN)
      return;

    socketRef.current.send(
      JSON.stringify({
        message: messageInput,
      }),
    );
    setMessageInput("");
  };

  const handleSelectConversation = (id: string) => {
    setSelectedConversation(id);
    setShowMobileSidebar(false);
  };

  const handleBackToList = () => {
    setShowMobileSidebar(true);
  };

  const conversationMessages = selectedConversation
    ? messages[selectedConversation] || []
    : [];

  return (
    <div className="p-2 sm:p-4 lg:p-8 pb-24 lg:pb-8">
      <div className="bg-white rounded-lg shadow-sm border overflow-hidden h-[calc(100vh-9rem)] md:h-[calc(100vh-10rem)] lg:h-[calc(100vh-8rem)]">
        <div className="flex h-full">
          <ChatSidebar
            conversations={conversations}
            selectedConversation={selectedConversation}
            searchQuery={searchQuery}
            showMobileSidebar={showMobileSidebar}
            onSelectConversation={handleSelectConversation}
            onSearchChange={setSearchQuery}
          />

          <div
            className={`${showMobileSidebar ? "hidden" : "flex"} lg:flex flex-1 flex-col`}
          >
            {selectedConv ? (
              <>
                <ChatHeader
                  selectedConv={selectedConv}
                  onBackToList={handleBackToList}
                />

                <div className="flex-1 overflow-y-auto p-3 sm:p-6 bg-gray-50">
                  <ChatMessages messages={conversationMessages} />
                </div>

                <ChatInput
                  messageInput={messageInput}
                  onMessageChange={setMessageInput}
                  onSendMessage={handleSendMessage}
                />
              </>
            ) : (
              <div className="flex-1 flex items-center justify-center">
                <p className="text-gray-500">
                  {roomsLoading
                    ? "Loading conversations..."
                    : "Select a conversation to start chatting"}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserChatPage;
