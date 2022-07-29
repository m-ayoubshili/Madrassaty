namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.AnneeScolaires",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDay = c.DateTime(nullable: false),
                        EndDay = c.DateTime(nullable: false),
                        description = c.String(),
                        Actif = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Classroom",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                        NumberProjector = c.Int(),
                        NumberDesk = c.Int(),
                        NumberChair = c.Int(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Course",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        ClassroomId = c.Int(nullable: false),
                        DisciplineLevelId = c.Int(nullable: false),
                        SubjectId = c.Int(nullable: false),
                        TeacherId = c.Guid(nullable: false),
                        Name = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                        CreatedOn = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Classroom", t => t.ClassroomId)
                .ForeignKey("dbo.DisciplineLevel", t => t.DisciplineLevelId)
                .ForeignKey("dbo.Subject", t => t.SubjectId)
                .ForeignKey("dbo.Member", t => t.TeacherId)
                .Index(t => t.ClassroomId)
                .Index(t => t.DisciplineLevelId)
                .Index(t => t.SubjectId)
                .Index(t => t.TeacherId);
            
            CreateTable(
                "dbo.DisciplineLevel",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        DisciplineId = c.Int(nullable: false),
                        Wording = c.String(),
                        Description = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Discipline", t => t.DisciplineId)
                .Index(t => t.DisciplineId);
            
            CreateTable(
                "dbo.Discipline",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                        Description = c.String(),
                        CreatedOn = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StudentDisciplineLevel",
                c => new
                    {
                        StudentId = c.Guid(nullable: false),
                        DisciplineId = c.Int(nullable: false),
                        DisciplineLevelId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.StudentId, t.DisciplineId })
                .ForeignKey("dbo.Discipline", t => t.DisciplineId)
                .ForeignKey("dbo.DisciplineLevel", t => t.DisciplineLevelId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .Index(t => t.StudentId)
                .Index(t => t.DisciplineId)
                .Index(t => t.DisciplineLevelId);
            
            CreateTable(
                "dbo.Member",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        SchoolId = c.Int(nullable: false),
                        MemberStatusId = c.Int(nullable: false),
                        Login = c.String(),
                        FirstName = c.String(),
                        LastName = c.String(),
                        Gender = c.String(maxLength: 1),
                        SkypeId = c.String(),
                        BeginningDate = c.DateTime(),
                        Profession = c.String(),
                        BirthDate = c.DateTime(),
                        PhotoPath = c.String(),
                        Street = c.String(),
                        ZipCode = c.String(),
                        City = c.String(),
                        PushToken = c.String(),
                        Country = c.String(),
                        CreatedOn = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        Email = c.String(),
                        EmailConfirmed = c.Boolean(nullable: false),
                        PasswordHash = c.String(),
                        SecurityStamp = c.String(),
                        PhoneNumber = c.String(),
                        PhoneNumberConfirmed = c.Boolean(nullable: false),
                        TwoFactorEnabled = c.Boolean(nullable: false),
                        LockoutEndDateUtc = c.DateTime(),
                        LockoutEnabled = c.Boolean(nullable: false),
                        AccessFailedCount = c.Int(nullable: false),
                        UserName = c.String(),
                        RecitationSession_Id = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.MemberStatus", t => t.MemberStatusId)
                .ForeignKey("dbo.School", t => t.SchoolId)
                .ForeignKey("dbo.RecitationSession", t => t.RecitationSession_Id)
                .Index(t => t.SchoolId)
                .Index(t => t.MemberStatusId)
                .Index(t => t.RecitationSession_Id);
            
            CreateTable(
                "dbo.CustomUserClaims",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        UserId = c.Guid(nullable: false),
                        ClaimType = c.String(),
                        ClaimValue = c.String(),
                        Member_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Member", t => t.Member_Id)
                .Index(t => t.Member_Id);
            
            CreateTable(
                "dbo.CustomUserLogins",
                c => new
                    {
                        UserId = c.Guid(nullable: false),
                        LoginProvider = c.String(),
                        ProviderKey = c.String(),
                        Member_Id = c.Guid(),
                    })
                .PrimaryKey(t => t.UserId)
                .ForeignKey("dbo.Member", t => t.Member_Id)
                .Index(t => t.Member_Id);
            
            CreateTable(
                "dbo.MemberStatus",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.CustomUserRoles",
                c => new
                    {
                        RoleId = c.Guid(nullable: false),
                        UserId = c.Guid(nullable: false),
                        Member_Id = c.Guid(),
                        CustomRole_Id = c.Guid(),
                    })
                .PrimaryKey(t => new { t.RoleId, t.UserId })
                .ForeignKey("dbo.Member", t => t.Member_Id)
                .ForeignKey("dbo.CustomRoles", t => t.CustomRole_Id)
                .Index(t => t.Member_Id)
                .Index(t => t.CustomRole_Id);
            
            CreateTable(
                "dbo.School",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Street = c.String(),
                        ZipCode = c.String(),
                        City = c.String(),
                        Country = c.String(),
                        Photo = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Subject",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                        Code = c.String(),
                        Description = c.String(),
                        Coefficient = c.Double(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.Examen",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                        TeacherId = c.Guid(nullable: false),
                        DisciplineId = c.Int(nullable: false),
                        DisciplineLevelId = c.Int(nullable: false),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                        isDeleted = c.Boolean(nullable: false),
                        SchoolYearPeriodicityId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Discipline", t => t.DisciplineId)
                .ForeignKey("dbo.DisciplineLevel", t => t.DisciplineLevelId)
                .ForeignKey("dbo.SchoolYearPeriodicities", t => t.SchoolYearPeriodicityId)
                .ForeignKey("dbo.Member", t => t.TeacherId)
                .Index(t => t.TeacherId)
                .Index(t => t.DisciplineId)
                .Index(t => t.DisciplineLevelId)
                .Index(t => t.SchoolYearPeriodicityId);
            
            CreateTable(
                "dbo.SchoolYearPeriodicities",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        SchoolYearId = c.Int(nullable: false),
                        Wording = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndDate = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.AnneeScolaires", t => t.SchoolYearId)
                .Index(t => t.SchoolYearId);
            
            CreateTable(
                "dbo.ExamenNotes",
                c => new
                    {
                        ExamenId = c.Int(nullable: false),
                        StudentId = c.Guid(nullable: false),
                        Note = c.Double(nullable: false),
                        Observation = c.String(),
                    })
                .PrimaryKey(t => new { t.ExamenId, t.StudentId })
                .ForeignKey("dbo.Examen", t => t.ExamenId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .Index(t => t.ExamenId)
                .Index(t => t.StudentId);
            
            CreateTable(
                "dbo.LearningError",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RecitationDetailId = c.Int(nullable: false),
                        Wording = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RecitationDetail", t => t.RecitationDetailId)
                .Index(t => t.RecitationDetailId);
            
            CreateTable(
                "dbo.RecitationDetail",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RecitationId = c.Int(nullable: false),
                        StudentId = c.Guid(nullable: false),
                        Surah = c.Int(nullable: false),
                        VerseDebut = c.Int(nullable: false),
                        VerseFin = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RecitationSession", t => t.RecitationId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .Index(t => t.RecitationId)
                .Index(t => t.StudentId);
            
            CreateTable(
                "dbo.RecitationSession",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Title = c.String(),
                        IsSaved = c.Boolean(nullable: false),
                        Description = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                        DivisionParam = c.Int(nullable: false),
                        CreatedOn = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        ModifiedOn = c.DateTime(nullable: false),
                        RecurrenceId = c.Int(),
                        TeacherId = c.Guid(nullable: false),
                        ClassroomId = c.Int(nullable: false),
                        DisciplineId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Classroom", t => t.ClassroomId)
                .ForeignKey("dbo.Discipline", t => t.DisciplineId)
                .ForeignKey("dbo.Recurrence", t => t.RecurrenceId)
                .ForeignKey("dbo.Member", t => t.TeacherId)
                .Index(t => t.RecurrenceId)
                .Index(t => t.TeacherId)
                .Index(t => t.ClassroomId)
                .Index(t => t.DisciplineId);
            
            CreateTable(
                "dbo.Recurrence",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                        Description = c.String(),
                        CreatedOn = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LearningRule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LearningSubRule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LearningRuleId = c.Int(nullable: false),
                        Wording = c.String(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.LearningRule", t => t.LearningRuleId)
                .Index(t => t.LearningRuleId);
            
            CreateTable(
                "dbo.Letter",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.LetterError",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LetterId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Letter", t => t.LetterId)
                .Index(t => t.LetterId);
            
            CreateTable(
                "dbo.LetterRule",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        LearningRuleId = c.Int(),
                        LearningSubRuleId = c.Int(),
                        LetterId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.LearningRule", t => t.LearningRuleId)
                .ForeignKey("dbo.LearningSubRule", t => t.LearningSubRuleId)
                .ForeignKey("dbo.Letter", t => t.LetterId)
                .Index(t => t.LearningRuleId)
                .Index(t => t.LearningSubRuleId)
                .Index(t => t.LetterId);
            
            CreateTable(
                "dbo.Moutoun",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                        NumberVerdict = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.MoutounSession",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StudentId = c.Guid(nullable: false),
                        TeacherId = c.Guid(nullable: false),
                        MoutounId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Moutoun", t => t.MoutounId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .ForeignKey("dbo.Member", t => t.TeacherId)
                .Index(t => t.StudentId)
                .Index(t => t.TeacherId)
                .Index(t => t.MoutounId);
            
            CreateTable(
                "dbo.MoutounSessionDetail",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartVerdict = c.Int(nullable: false),
                        EndVerdict = c.Int(nullable: false),
                        MoutounSessionId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.MoutounSession", t => t.MoutounSessionId)
                .Index(t => t.MoutounSessionId);
            
            CreateTable(
                "dbo.Presences",
                c => new
                    {
                        CourseId = c.Int(nullable: false),
                        StudentId = c.Guid(nullable: false),
                        Present = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.CourseId, t.StudentId })
                .ForeignKey("dbo.Course", t => t.CourseId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .Index(t => t.CourseId)
                .Index(t => t.StudentId);
            
            CreateTable(
                "dbo.RecitationDisciplineLevel",
                c => new
                    {
                        RecitationId = c.Int(nullable: false),
                        DisciplineLevelId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.RecitationId, t.DisciplineLevelId })
                .ForeignKey("dbo.DisciplineLevel", t => t.DisciplineLevelId)
                .ForeignKey("dbo.RecitationSession", t => t.RecitationId)
                .Index(t => t.RecitationId)
                .Index(t => t.DisciplineLevelId);
            
            CreateTable(
                "dbo.CustomRoles",
                c => new
                    {
                        Id = c.Guid(nullable: false),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
            CreateTable(
                "dbo.StudentRecitation",
                c => new
                    {
                        StudentId = c.Guid(nullable: false),
                        RecitationId = c.Int(nullable: false),
                        StartTime = c.DateTime(),
                        CreatedOn = c.Binary(nullable: false, fixedLength: true, timestamp: true, storeType: "rowversion"),
                        ModifiedOn = c.DateTime(),
                    })
                .PrimaryKey(t => new { t.StudentId, t.RecitationId })
                .ForeignKey("dbo.RecitationSession", t => t.RecitationId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .Index(t => t.StudentId)
                .Index(t => t.RecitationId);
            
            CreateTable(
                "dbo.TajweedError",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RecitationDetailId = c.Int(nullable: false),
                        LearningRuleId = c.Int(),
                        LearningSubRuleId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.LearningRule", t => t.LearningRuleId)
                .ForeignKey("dbo.LearningSubRule", t => t.LearningSubRuleId)
                .ForeignKey("dbo.RecitationDetail", t => t.RecitationDetailId)
                .Index(t => t.RecitationDetailId)
                .Index(t => t.LearningRuleId)
                .Index(t => t.LearningSubRuleId);
            
            CreateTable(
                "dbo.VacanceScolaire",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        StartDay = c.DateTime(nullable: false),
                        EndDay = c.DateTime(nullable: false),
                        description = c.String(),
                    })
                .PrimaryKey(t => t.Id);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TajweedError", "RecitationDetailId", "dbo.RecitationDetail");
            DropForeignKey("dbo.TajweedError", "LearningSubRuleId", "dbo.LearningSubRule");
            DropForeignKey("dbo.TajweedError", "LearningRuleId", "dbo.LearningRule");
            DropForeignKey("dbo.StudentRecitation", "StudentId", "dbo.Member");
            DropForeignKey("dbo.StudentRecitation", "RecitationId", "dbo.RecitationSession");
            DropForeignKey("dbo.CustomUserRoles", "CustomRole_Id", "dbo.CustomRoles");
            DropForeignKey("dbo.RecitationDisciplineLevel", "RecitationId", "dbo.RecitationSession");
            DropForeignKey("dbo.RecitationDisciplineLevel", "DisciplineLevelId", "dbo.DisciplineLevel");
            DropForeignKey("dbo.Presences", "StudentId", "dbo.Member");
            DropForeignKey("dbo.Presences", "CourseId", "dbo.Course");
            DropForeignKey("dbo.MoutounSessionDetail", "MoutounSessionId", "dbo.MoutounSession");
            DropForeignKey("dbo.MoutounSession", "TeacherId", "dbo.Member");
            DropForeignKey("dbo.MoutounSession", "StudentId", "dbo.Member");
            DropForeignKey("dbo.MoutounSession", "MoutounId", "dbo.Moutoun");
            DropForeignKey("dbo.LetterRule", "LetterId", "dbo.Letter");
            DropForeignKey("dbo.LetterRule", "LearningSubRuleId", "dbo.LearningSubRule");
            DropForeignKey("dbo.LetterRule", "LearningRuleId", "dbo.LearningRule");
            DropForeignKey("dbo.LetterError", "LetterId", "dbo.Letter");
            DropForeignKey("dbo.LearningSubRule", "LearningRuleId", "dbo.LearningRule");
            DropForeignKey("dbo.LearningError", "RecitationDetailId", "dbo.RecitationDetail");
            DropForeignKey("dbo.RecitationDetail", "StudentId", "dbo.Member");
            DropForeignKey("dbo.RecitationDetail", "RecitationId", "dbo.RecitationSession");
            DropForeignKey("dbo.RecitationSession", "TeacherId", "dbo.Member");
            DropForeignKey("dbo.Member", "RecitationSession_Id", "dbo.RecitationSession");
            DropForeignKey("dbo.RecitationSession", "RecurrenceId", "dbo.Recurrence");
            DropForeignKey("dbo.RecitationSession", "DisciplineId", "dbo.Discipline");
            DropForeignKey("dbo.RecitationSession", "ClassroomId", "dbo.Classroom");
            DropForeignKey("dbo.ExamenNotes", "StudentId", "dbo.Member");
            DropForeignKey("dbo.ExamenNotes", "ExamenId", "dbo.Examen");
            DropForeignKey("dbo.Examen", "TeacherId", "dbo.Member");
            DropForeignKey("dbo.Examen", "SchoolYearPeriodicityId", "dbo.SchoolYearPeriodicities");
            DropForeignKey("dbo.SchoolYearPeriodicities", "SchoolYearId", "dbo.AnneeScolaires");
            DropForeignKey("dbo.Examen", "DisciplineLevelId", "dbo.DisciplineLevel");
            DropForeignKey("dbo.Examen", "DisciplineId", "dbo.Discipline");
            DropForeignKey("dbo.Course", "TeacherId", "dbo.Member");
            DropForeignKey("dbo.Course", "SubjectId", "dbo.Subject");
            DropForeignKey("dbo.Course", "DisciplineLevelId", "dbo.DisciplineLevel");
            DropForeignKey("dbo.StudentDisciplineLevel", "StudentId", "dbo.Member");
            DropForeignKey("dbo.Member", "SchoolId", "dbo.School");
            DropForeignKey("dbo.CustomUserRoles", "Member_Id", "dbo.Member");
            DropForeignKey("dbo.Member", "MemberStatusId", "dbo.MemberStatus");
            DropForeignKey("dbo.CustomUserLogins", "Member_Id", "dbo.Member");
            DropForeignKey("dbo.CustomUserClaims", "Member_Id", "dbo.Member");
            DropForeignKey("dbo.StudentDisciplineLevel", "DisciplineLevelId", "dbo.DisciplineLevel");
            DropForeignKey("dbo.StudentDisciplineLevel", "DisciplineId", "dbo.Discipline");
            DropForeignKey("dbo.DisciplineLevel", "DisciplineId", "dbo.Discipline");
            DropForeignKey("dbo.Course", "ClassroomId", "dbo.Classroom");
            DropIndex("dbo.TajweedError", new[] { "LearningSubRuleId" });
            DropIndex("dbo.TajweedError", new[] { "LearningRuleId" });
            DropIndex("dbo.TajweedError", new[] { "RecitationDetailId" });
            DropIndex("dbo.StudentRecitation", new[] { "RecitationId" });
            DropIndex("dbo.StudentRecitation", new[] { "StudentId" });
            DropIndex("dbo.RecitationDisciplineLevel", new[] { "DisciplineLevelId" });
            DropIndex("dbo.RecitationDisciplineLevel", new[] { "RecitationId" });
            DropIndex("dbo.Presences", new[] { "StudentId" });
            DropIndex("dbo.Presences", new[] { "CourseId" });
            DropIndex("dbo.MoutounSessionDetail", new[] { "MoutounSessionId" });
            DropIndex("dbo.MoutounSession", new[] { "MoutounId" });
            DropIndex("dbo.MoutounSession", new[] { "TeacherId" });
            DropIndex("dbo.MoutounSession", new[] { "StudentId" });
            DropIndex("dbo.LetterRule", new[] { "LetterId" });
            DropIndex("dbo.LetterRule", new[] { "LearningSubRuleId" });
            DropIndex("dbo.LetterRule", new[] { "LearningRuleId" });
            DropIndex("dbo.LetterError", new[] { "LetterId" });
            DropIndex("dbo.LearningSubRule", new[] { "LearningRuleId" });
            DropIndex("dbo.RecitationSession", new[] { "DisciplineId" });
            DropIndex("dbo.RecitationSession", new[] { "ClassroomId" });
            DropIndex("dbo.RecitationSession", new[] { "TeacherId" });
            DropIndex("dbo.RecitationSession", new[] { "RecurrenceId" });
            DropIndex("dbo.RecitationDetail", new[] { "StudentId" });
            DropIndex("dbo.RecitationDetail", new[] { "RecitationId" });
            DropIndex("dbo.LearningError", new[] { "RecitationDetailId" });
            DropIndex("dbo.ExamenNotes", new[] { "StudentId" });
            DropIndex("dbo.ExamenNotes", new[] { "ExamenId" });
            DropIndex("dbo.SchoolYearPeriodicities", new[] { "SchoolYearId" });
            DropIndex("dbo.Examen", new[] { "SchoolYearPeriodicityId" });
            DropIndex("dbo.Examen", new[] { "DisciplineLevelId" });
            DropIndex("dbo.Examen", new[] { "DisciplineId" });
            DropIndex("dbo.Examen", new[] { "TeacherId" });
            DropIndex("dbo.CustomUserRoles", new[] { "CustomRole_Id" });
            DropIndex("dbo.CustomUserRoles", new[] { "Member_Id" });
            DropIndex("dbo.CustomUserLogins", new[] { "Member_Id" });
            DropIndex("dbo.CustomUserClaims", new[] { "Member_Id" });
            DropIndex("dbo.Member", new[] { "RecitationSession_Id" });
            DropIndex("dbo.Member", new[] { "MemberStatusId" });
            DropIndex("dbo.Member", new[] { "SchoolId" });
            DropIndex("dbo.StudentDisciplineLevel", new[] { "DisciplineLevelId" });
            DropIndex("dbo.StudentDisciplineLevel", new[] { "DisciplineId" });
            DropIndex("dbo.StudentDisciplineLevel", new[] { "StudentId" });
            DropIndex("dbo.DisciplineLevel", new[] { "DisciplineId" });
            DropIndex("dbo.Course", new[] { "TeacherId" });
            DropIndex("dbo.Course", new[] { "SubjectId" });
            DropIndex("dbo.Course", new[] { "DisciplineLevelId" });
            DropIndex("dbo.Course", new[] { "ClassroomId" });
            DropTable("dbo.VacanceScolaire");
            DropTable("dbo.TajweedError");
            DropTable("dbo.StudentRecitation");
            DropTable("dbo.CustomRoles");
            DropTable("dbo.RecitationDisciplineLevel");
            DropTable("dbo.Presences");
            DropTable("dbo.MoutounSessionDetail");
            DropTable("dbo.MoutounSession");
            DropTable("dbo.Moutoun");
            DropTable("dbo.LetterRule");
            DropTable("dbo.LetterError");
            DropTable("dbo.Letter");
            DropTable("dbo.LearningSubRule");
            DropTable("dbo.LearningRule");
            DropTable("dbo.Recurrence");
            DropTable("dbo.RecitationSession");
            DropTable("dbo.RecitationDetail");
            DropTable("dbo.LearningError");
            DropTable("dbo.ExamenNotes");
            DropTable("dbo.SchoolYearPeriodicities");
            DropTable("dbo.Examen");
            DropTable("dbo.Subject");
            DropTable("dbo.School");
            DropTable("dbo.CustomUserRoles");
            DropTable("dbo.MemberStatus");
            DropTable("dbo.CustomUserLogins");
            DropTable("dbo.CustomUserClaims");
            DropTable("dbo.Member");
            DropTable("dbo.StudentDisciplineLevel");
            DropTable("dbo.Discipline");
            DropTable("dbo.DisciplineLevel");
            DropTable("dbo.Course");
            DropTable("dbo.Classroom");
            DropTable("dbo.AnneeScolaires");
        }
    }
}
