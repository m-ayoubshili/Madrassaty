using Microsoft.AspNet.Identity.EntityFramework;
using QuranRecitation.Data.Model;
using System;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions;

namespace QuranRecitation.Data
{
    public class QuranRecitationDbContext : IdentityDbContext<Member, CustomRole, Guid, CustomUserLogin, CustomUserRole, CustomUserClaim>
    {
        public static QuranRecitationDbContext Create()
        {
            return new QuranRecitationDbContext();
        }
        static QuranRecitationDbContext()
        {
            //Database.SetInitializer(new MigrateDatabaseToLatestVersion<QuranRecitationDbContext, Migrations.Configuration>());

        }

        public QuranRecitationDbContext()
            : base("name=DbPreQuranInstituteString")
        {
            Database.SetInitializer<QuranRecitationDbContext>(new CreateDatabaseIfNotExists<QuranRecitationDbContext>());
        }

        public DbSet<School> Schools { get; set; }
        public DbSet<MemberStatus> MemberStatuses { get; set; }
        public DbSet<Classroom> Classrooms { get; set; }
        public DbSet<Discipline> Disciplines { get; set; }
        public DbSet<Recurrence> Recurrences { get; set; }
        public DbSet<DisciplineLevel> DisciplineLevels { get; set; }
        public DbSet<Course> Courses { get; set; }
        public DbSet<RecitationSession> RecitationSessions { get; set; }
        public DbSet<RecitationDisciplineLevel> RecitationDisciplineLevels { get; set; }
        public DbSet<StudentRecitation> StudentRecitations { get; set; }
        public DbSet<StudentDisciplineLevel> StudentDisciplineLevels { get; set; }
        public DbSet<VacanceScolaire> VacanceScolaire { get; set; }
        public DbSet<AnneeScolaire> AnneeScolaire { get; set; }
        public DbSet<Presences> Presences { get; set; }
        public DbSet<Examen> Examen { get; set; }
        public DbSet<ExamenNotes> ExamenNotes { get; set; }
        public DbSet<Moutoun> Moutoun { get; set; }
        public DbSet<MoutounSession> MoutounSession { get; set; }
        public DbSet<MoutounSessionDetail> MoutounSessionDetail { get; set; }
        public DbSet<Letter> Letter { get; set; }
        public DbSet<LearningRule> LearningRule { get; set; }
        public DbSet<LearningSubRule> LearningSubRule { get; set; }
        public DbSet<LetterRule> LetterRule { get; set; }
        public DbSet<LearningError> LearningError { get; set; }
        public DbSet<RecitationDetail> RecitationDetail { get; set; }
        public DbSet<TajweedError> TajweedError { get; set; }
        public DbSet<LetterError> LetterError { get; set; }
        public DbSet<SchoolYearPeriodicity> SchoolYearPeriodicities { get; set; }
        public DbSet<TajwidError> TajwidError { get; set; }
        public DbSet<RecitationTajwidError> RecitationTajwidError { get; set; }
        public DbSet<CourseSession> CourseSession { get; set; }
        public DbSet<Assiduite> Assiduite { get; set; }
        public DbSet<Message> Message { get; set; }
        public DbSet<MessageGroup> MessageGroup { get; set; }
        public DbSet<MemberMessageGroup> MemberMessageGroup { get; set; }
        public DbSet<MemberConnectionId> MemberConnectionId { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.Conventions.Remove<OneToManyCascadeDeleteConvention>();
            modelBuilder.Entity<CustomUserLogin>().HasKey<Guid>(l => l.UserId);
            modelBuilder.Entity<CustomRole>().HasKey<Guid>(r => r.Id);
            modelBuilder.Entity<CustomUserRole>().HasKey(r => new { r.RoleId, r.UserId });

            modelBuilder.Entity<StudentDisciplineLevel>().HasKey(sl => new { sl.StudentId, sl.DisciplineId }); // replaces the [Key] annotations

            modelBuilder.Entity<StudentDisciplineLevel>()
                .HasRequired(sl => sl.Student)
                .WithMany(s => s.StudentDisciplineLevels)
                .HasForeignKey(sl => sl.StudentId);

            modelBuilder.Entity<StudentDisciplineLevel>()
                .HasRequired(sl => sl.DisciplineLevel)
                .WithMany(l => l.StudentDisciplineLevels)
                .HasForeignKey(sl => sl.DisciplineLevelId);
            modelBuilder.Entity<MemberMessageGroup>()
                 .HasKey(mmg => new { mmg.MemberId, mmg.MessageGroupId });
            modelBuilder.Entity<MemberMessageGroup>()
                .HasRequired(mmg => mmg.Member)
                .WithMany(mmg => mmg.MemberMessageGroup)
                .HasForeignKey(mmg => mmg.MemberId);
            modelBuilder.Entity<MemberMessageGroup>()
                .HasRequired(mmg => mmg.MessageGroup)
                .WithMany(mmg => mmg.MemberMessageGroup)
                .HasForeignKey(mmg => mmg.MessageGroupId);
        }
    }
}