using DuseAppReact.Application.Interfaces.Configure;
using DuseAppReact.Core.Contracts;
using DuseAppReact.Core.Models.Comment;
using DuseAppReact.Dependencies.Repositoty;
using Microsoft.AspNetCore.Mvc;

namespace DuseAppReact.Server.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository<CommentModel> _commentRepository;

        public CommentController(ICommentRepository<CommentModel> commentRepository)
        {
            _commentRepository = commentRepository;
        }

        [HttpGet("getcommentbycollegeid/{id:int}")]
        public async Task<ActionResult<List<CommentModel>>> GetCommentByCollegeId(int id)
        {
            var commentResultOfList = await _commentRepository.GetByCollegeId(id);

            if (!commentResultOfList.IsSuccess)
                return BadRequest(commentResultOfList.ErrorMessage);

            return Ok(commentResultOfList.Value);
        }

        [HttpPost("addcomment/{id:int}")]
        public async Task<ActionResult<int>> AddComment(int id, [FromBody] CommentRequest commentRequest)
        {
            var commentModel = CommentModel.Create(
                new Random().Next(10000000, 99999999),
                commentRequest.UserId, 
                commentRequest.Message, 
                commentRequest.DateOfCreation);

            if (!commentModel.IsSuccess)
                return BadRequest(commentModel.ErrorMessage);

            var newCommentId = await _commentRepository.Create(commentModel.Value, id);

            return Ok(newCommentId);
        }

        [HttpPut("editcomment")]
        public async Task<ActionResult<int>> EditComment([FromBody] CommentRequest commentRequest)
        {
            var commentModel = CommentModel.Create(
                commentRequest.Id,
                commentRequest.UserId,
                commentRequest.Message,
                commentRequest.DateOfCreation);

            if (!commentModel.IsSuccess)
                return BadRequest(commentModel.ErrorMessage);

            var updatedCommentId = await _commentRepository.Update(commentModel.Value);

            return Ok(updatedCommentId);
        }

        [HttpPut("deletecomment/{id:int}")]
        public async Task<ActionResult<int>> DeleteComment(int id)
            => Ok(await _commentRepository.Delete(id));

    }
}
