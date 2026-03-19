namespace ProfileBook.API.DTOs
{
    public class SendMessageDTO
    {
        public int ReceiverId { get; set; }
        public string MessageContent { get; set; } = string.Empty;
    }

    public class MessageResponseDTO
    {
        public int MessageId { get; set; }
        public int SenderId { get; set; }
        public string SenderUsername { get; set; } = string.Empty;
        public int ReceiverId { get; set; }
        public string ReceiverUsername { get; set; } = string.Empty;
        public string MessageContent { get; set; } = string.Empty;
        public DateTime TimeStamp { get; set; }
    }
}