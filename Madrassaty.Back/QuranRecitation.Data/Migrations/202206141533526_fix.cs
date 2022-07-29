namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fix : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Message", "ReceiverId", c => c.String());
            DropColumn("dbo.Message", "RecieverId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Message", "RecieverId", c => c.String());
            DropColumn("dbo.Message", "ReceiverId");
        }
    }
}
