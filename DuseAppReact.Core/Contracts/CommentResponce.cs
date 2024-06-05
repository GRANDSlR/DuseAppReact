namespace DuseAppReact.Core.Contracts
{
    public record CommentRequest
    (
        int UserId,
        string Message,
        int Grade,
        DateTime DateOfCreation
    );

    public record CommentUpdateRequest
    (
        int Id,
        string Message,
        int Grade,
        DateTime DateOfCreation
    );
}
