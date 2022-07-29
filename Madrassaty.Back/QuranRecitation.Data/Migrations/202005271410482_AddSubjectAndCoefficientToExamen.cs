namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddSubjectAndCoefficientToExamen : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Examen", "SubjectId", c => c.Int(nullable: false));
            AddColumn("dbo.Examen", "Coefficient", c => c.Int(nullable: false));
            CreateIndex("dbo.Examen", "SubjectId");
            AddForeignKey("dbo.Examen", "SubjectId", "dbo.Subject", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Examen", "SubjectId", "dbo.Subject");
            DropIndex("dbo.Examen", new[] { "SubjectId" });
            DropColumn("dbo.Examen", "Coefficient");
            DropColumn("dbo.Examen", "SubjectId");
        }
    }
}
