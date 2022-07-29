namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fix1 : DbMigration
    {
        public override void Up()
        {
            DropPrimaryKey("dbo.MemberConnectionId");
            AlterColumn("dbo.MemberConnectionId", "MemberId", c => c.String(nullable: false, maxLength: 128));
            AddPrimaryKey("dbo.MemberConnectionId", "MemberId");
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.MemberConnectionId");
            AlterColumn("dbo.MemberConnectionId", "MemberId", c => c.Guid(nullable: false));
            AddPrimaryKey("dbo.MemberConnectionId", "MemberId");
        }
    }
}
