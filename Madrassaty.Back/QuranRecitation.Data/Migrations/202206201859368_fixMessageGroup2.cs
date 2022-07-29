namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fixMessageGroup2 : DbMigration
    {
        public override void Up()
        {
            RenameTable(name: "dbo.MessageGroupMembers", newName: "MemberMessageGroups");
            DropPrimaryKey("dbo.MemberMessageGroups");
            AddPrimaryKey("dbo.MemberMessageGroups", new[] { "Member_Id", "MessageGroup_MessageGroupId" });
        }
        
        public override void Down()
        {
            DropPrimaryKey("dbo.MemberMessageGroups");
            AddPrimaryKey("dbo.MemberMessageGroups", new[] { "MessageGroup_MessageGroupId", "Member_Id" });
            RenameTable(name: "dbo.MemberMessageGroups", newName: "MessageGroupMembers");
        }
    }
}
