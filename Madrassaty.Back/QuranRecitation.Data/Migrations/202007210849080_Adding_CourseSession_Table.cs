namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Adding_CourseSession_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.CourseSessions",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        CourseId = c.Int(nullable: false),
                        Wording = c.String(),
                        StartDate = c.DateTime(nullable: false),
                        EndTime = c.DateTime(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Course", t => t.CourseId)
                .Index(t => t.CourseId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.CourseSessions", "CourseId", "dbo.Course");
            DropIndex("dbo.CourseSessions", new[] { "CourseId" });
            DropTable("dbo.CourseSessions");
        }
    }
}
