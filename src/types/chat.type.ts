export interface ChatRoomLastMessage {
  id: number;
  message: string;
  sender_id: string;
  created_at: string;
}

export interface ChatRoomItem {
  id: number;
  booking_id: number;
  booking_code: string;
  booking_status: string;
  customer_name: string;
  customer_image: string | null;
  provider_name: string;
  provider_image: string | null;
  last_message: ChatRoomLastMessage | null;
  unread_count: number;
  updated_at: string;
}

export interface ChatRoomsResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  data: ChatRoomItem[];
}

export interface ChatRoomResponse {
  success: boolean;
  message: string;
  data: ChatRoomItem;
}

export interface ChatMessageItem {
  id: number;
  room: number;
  sender: string;
  sender_name: string;
  sender_image: string | null;
  message: string;
  attachment: string | null;
  is_read: boolean;
  read_at: string | null;
  created_at: string;
}

export interface ChatMessagesResponse {
  success: boolean;
  message: string;
  meta?: {
    page: number;
    limit: number;
    total: number;
    total_pages: number;
  };
  data: ChatMessageItem[];
}

export interface SendChatMessageRequest {
  room_id: number;
  message: string;
}

export interface SendChatMessageResponse {
  success: boolean;
  message: string;
  data: ChatMessageItem;
}

export interface MarkReadResponse {
  success: boolean;
  message: string;
  data: {
    room_id: number;
    updated: number;
  };
}

export interface SocketConnectedEvent {
  type: "connected";
  room_id: number;
}

export interface SocketChatMessageEvent {
  type: "chat.message";
  room_id: number;
  message_id: number;
  message: string;
  created_at: string;
  sender: {
    id: string;
    name: string;
  };
}

export interface UIConversation {
  id: string;
  roomId: number;
  bookingId: number;
  bookingCode: string;
  bookingStatus: string;
  name: string;
  avatar: string;
  avatarUrl?: string | null;
  lastMessage: string;
  timestamp: string;
  unreadCount?: number;
  isOnline?: boolean;
  lastSeen?: string;
}

export interface UIMessage {
  id: string;
  senderId: string;
  content: string;
  timestamp: string;
  isRead: boolean;
  attachment?: string | null;
  createdAt?: string;
}