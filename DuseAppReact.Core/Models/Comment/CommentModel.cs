using DuseAppReact.Services.Services;
using System.ComponentModel.DataAnnotations;

namespace DuseAppReact.Core.Models.Comment
{
    public class CommentModel
    {
        private const int MESSAGE_MAX_LENGTH = 400;
        private CommentModel(int id, int userId, int grade, string message, DateTime dateOfCreation)
        {
            Id = id;
            UserId = userId;
            Message = message;
            DateOfCreation = dateOfCreation;
            Grade = grade;
        }

        [Key]
        public int Id { get; set; }
        public int UserId { get; private set; }
        public string Message { get; private set; }
        public int Grade { get; private set; }
        public DateTime DateOfCreation { get; private set; }

        public static Result<CommentModel> Create(int id, int userId, int grade, string message, DateTime dateOfCreation)
        {
            if (message.Length > MESSAGE_MAX_LENGTH)
                Result<CommentModel>.Failure("Превышена доступная длинна сообщения");

            return Result<CommentModel>.Success(new CommentModel(id, userId, grade, message, dateOfCreation));
        }
    }
}
