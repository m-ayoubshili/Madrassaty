namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Adding_Assiduite_CourseSession : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.Assiduites",
                c => new
                    {
                        CourseSessionId = c.Int(nullable: false),
                        StudentId = c.Guid(nullable: false),
                        Present = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => new { t.CourseSessionId, t.StudentId })
                .ForeignKey("dbo.Course", t => t.CourseSessionId)
                .ForeignKey("dbo.Member", t => t.StudentId)
                .Index(t => t.CourseSessionId)
                .Index(t => t.StudentId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Assiduites", "StudentId", "dbo.Member");
            DropForeignKey("dbo.Assiduites", "CourseSessionId", "dbo.Course");
            DropIndex("dbo.Assiduites", new[] { "StudentId" });
            DropIndex("dbo.Assiduites", new[] { "CourseSessionId" });
            DropTable("dbo.Assiduites");
        }
    }
}
