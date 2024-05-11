using DuseAppReact.DataAccess.Entities.College;
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

        public DatabaseContext() => Database.EnsureCreated();

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        { 
            optionsBuilder.UseSqlServer(@"Server=(localdb)\MSSQLLocalDB;Database=DuseAppDb;Trusted_Connection=True;");
        }

    }
}
