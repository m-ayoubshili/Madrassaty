namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddPhotoPathInSchool : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.School", "PhotoPath", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.School", "PhotoPath");
        }
    }
}
