namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addPhotoPathToMessage : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Message", "PhotoPath", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Message", "PhotoPath");
        }
    }
}
