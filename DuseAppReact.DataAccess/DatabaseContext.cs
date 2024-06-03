using DuseAppReact.DataAccess.Entities.College;
using DuseAppReact.DataAccess.Entities.Comment;
using DuseAppReact.DataAccess.Entities.User;
using Microsoft.EntityFrameworkCore;

namespace DuseAppReact.DataAccess
{
    public class DatabaseContext : DbContext
    {

        public DbSet<CollegeHeaderEntity> Colleges { get; set; } = null!;

        public DbSet<CollegeDescriptionEntity> CollegeDescriptions { get; set; } = null!;

        public DbSet<CollegeLocationEntity> CollegeLocations { get; set; } = null!;

        public DbSet<College_SpecialtyEntity> College_Specialties { get; set; } = null!;

        public DbSet<SpecialtyEntity> Specialties { get; set; } = null!;

        public DbSet<UserEntity> Users { get; set; } = null!;

        public DbSet<CommentEntity> Comments { get; set; } = null!;

        public DbSet<College_CommentEntity> College_Comment { get; set; } = null!;



        public DatabaseContext(DbContextOptions<DatabaseContext> options) : base(options) => Database.EnsureCreated();
    }
}
