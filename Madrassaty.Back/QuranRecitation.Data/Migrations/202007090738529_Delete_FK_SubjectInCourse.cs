namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Delete_FK_SubjectInCourse : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Course", "SubjectId", "dbo.Subject");
            DropIndex("dbo.Course", new[] { "SubjectId" });
            DropColumn("dbo.Course", "SubjectId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Course", "SubjectId", c => c.Int(nullable: false));
            CreateIndex("dbo.Course", "SubjectId");
            AddForeignKey("dbo.Course", "SubjectId", "dbo.Subject", "Id");
        }
    }
}
