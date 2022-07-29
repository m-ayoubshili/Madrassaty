namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addMemberMesageGroubTable : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.MemberMessageGroups", "Member_Id", "dbo.Member");
            DropForeignKey("dbo.MemberMessageGroups", "MessageGroup_MessageGroupId", "dbo.MessageGroup");
            DropIndex("dbo.MemberMessageGroups", new[] { "Member_Id" });
            DropIndex("dbo.MemberMessageGroups", new[] { "MessageGroup_MessageGroupId" });
            CreateTable(
                "dbo.MemberMessageGroup",
                c => new
                    {
                        MemberId = c.Guid(nullable: false),
                        MessageGroupId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.MemberId, t.MessageGroupId })
                .ForeignKey("dbo.Member", t => t.MemberId)
                .ForeignKey("dbo.MessageGroup", t => t.MessageGroupId)
                .Index(t => t.MemberId)
                .Index(t => t.MessageGroupId);
            
            DropTable("dbo.MemberMessageGroups");
        }
        
        public override void Down()
        {
            CreateTable(
                "dbo.MemberMessageGroups",
                c => new
                    {
                        Member_Id = c.Guid(nullable: false),
                        MessageGroup_MessageGroupId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => new { t.Member_Id, t.MessageGroup_MessageGroupId });
            
            DropForeignKey("dbo.MemberMessageGroup", "MessageGroupId", "dbo.MessageGroup");
            DropForeignKey("dbo.MemberMessageGroup", "MemberId", "dbo.Member");
            DropIndex("dbo.MemberMessageGroup", new[] { "MessageGroupId" });
            DropIndex("dbo.MemberMessageGroup", new[] { "MemberId" });
            DropTable("dbo.MemberMessageGroup");
            CreateIndex("dbo.MemberMessageGroups", "MessageGroup_MessageGroupId");
            CreateIndex("dbo.MemberMessageGroups", "Member_Id");
            AddForeignKey("dbo.MemberMessageGroups", "MessageGroup_MessageGroupId", "dbo.MessageGroup", "MessageGroupId", cascadeDelete: true);
            AddForeignKey("dbo.MemberMessageGroups", "Member_Id", "dbo.Member", "Id", cascadeDelete: true);
        }
    }
}
