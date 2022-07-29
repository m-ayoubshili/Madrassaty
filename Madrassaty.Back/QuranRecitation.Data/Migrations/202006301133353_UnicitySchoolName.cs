namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UnicitySchoolName : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.School", "Name", c => c.String(nullable: false, maxLength: 200));
            CreateIndex("dbo.School", "Name", unique: true, name: "SchoolName_Index");
        }
        
        public override void Down()
        {
            DropIndex("dbo.School", "SchoolName_Index");
            AlterColumn("dbo.School", "Name", c => c.String());
        }
    }
}
