namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addparant : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Member", "ParentEmail", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Member", "ParentEmail");
        }
    }
}
