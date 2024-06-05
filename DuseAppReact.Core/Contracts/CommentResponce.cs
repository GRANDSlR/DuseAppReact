namespace DuseAppReact.Core.Contracts
{
    public record CommentRequest
    (
        int Id,
        int UserId,
        string Message,
        int Grade,
        DateTime DateOfCreation
    );
}
