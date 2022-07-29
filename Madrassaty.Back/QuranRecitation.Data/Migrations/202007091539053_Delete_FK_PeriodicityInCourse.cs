namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Delete_FK_PeriodicityInCourse : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Course", "SchoolYearPeriodicityId", "dbo.SchoolYearPeriodicities");
            DropIndex("dbo.Course", new[] { "SchoolYearPeriodicityId" });
            DropColumn("dbo.Course", "SchoolYearPeriodicityId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Course", "SchoolYearPeriodicityId", c => c.Int(nullable: false));
            CreateIndex("dbo.Course", "SchoolYearPeriodicityId");
            AddForeignKey("dbo.Course", "SchoolYearPeriodicityId", "dbo.SchoolYearPeriodicities", "Id");
        }
    }
}
