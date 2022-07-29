namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class changeGroupMemberRelation2 : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MemberMessageGroups",
                c => new
                    {
                        Member_Id = c.Guid(nullable: false),
                        MessageGroup_MessageGroupId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Member_Id, t.MessageGroup_MessageGroupId })
                .ForeignKey("dbo.Member", t => t.Member_Id, cascadeDelete: true)
                .ForeignKey("dbo.MessageGroup", t => t.MessageGroup_MessageGroupId, cascadeDelete: true)
                .Index(t => t.Member_Id)
                .Index(t => t.MessageGroup_MessageGroupId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.MemberMessageGroups", "MessageGroup_MessageGroupId", "dbo.MessageGroup");
            DropForeignKey("dbo.MemberMessageGroups", "Member_Id", "dbo.Member");
            DropIndex("dbo.MemberMessageGroups", new[] { "MessageGroup_MessageGroupId" });
            DropIndex("dbo.MemberMessageGroups", new[] { "Member_Id" });
            DropTable("dbo.MemberMessageGroups");
        }
    }
}
