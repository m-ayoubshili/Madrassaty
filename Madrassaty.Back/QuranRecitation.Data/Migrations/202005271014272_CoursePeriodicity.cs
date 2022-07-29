namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class CoursePeriodicity : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "SchoolYearPeriodicityId", c => c.Int(nullable: false));
            CreateIndex("dbo.Course", "SchoolYearPeriodicityId");
            AddForeignKey("dbo.Course", "SchoolYearPeriodicityId", "dbo.SchoolYearPeriodicities", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Course", "SchoolYearPeriodicityId", "dbo.SchoolYearPeriodicities");
            DropIndex("dbo.Course", new[] { "SchoolYearPeriodicityId" });
            DropColumn("dbo.Course", "SchoolYearPeriodicityId");
        }
    }
}
