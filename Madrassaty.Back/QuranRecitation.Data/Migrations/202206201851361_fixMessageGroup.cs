namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fixMessageGroup : DbMigration
    {
        public override void Up()
        {
            DropForeignKey("dbo.Member", "MessageGroupId", "dbo.MessageGroup");
            DropIndex("dbo.Member", new[] { "MessageGroupId" });
            CreateTable(
                "dbo.MessageGroupMembers",
                c => new
                    {
                        MessageGroup_MessageGroupId = c.Int(nullable: false),
                        Member_Id = c.Guid(nullable: false),
                    })
                .PrimaryKey(t => new { t.MessageGroup_MessageGroupId, t.Member_Id })
                .ForeignKey("dbo.MessageGroup", t => t.MessageGroup_MessageGroupId, cascadeDelete: true)
                .ForeignKey("dbo.Member", t => t.Member_Id, cascadeDelete: true)
                .Index(t => t.MessageGroup_MessageGroupId)
                .Index(t => t.Member_Id);
            
            DropColumn("dbo.Member", "MessageGroupId");
        }
        
        public override void Down()
        {
            AddColumn("dbo.Member", "MessageGroupId", c => c.Int());
            DropForeignKey("dbo.MessageGroupMembers", "Member_Id", "dbo.Member");
            DropForeignKey("dbo.MessageGroupMembers", "MessageGroup_MessageGroupId", "dbo.MessageGroup");
            DropIndex("dbo.MessageGroupMembers", new[] { "Member_Id" });
            DropIndex("dbo.MessageGroupMembers", new[] { "MessageGroup_MessageGroupId" });
            DropTable("dbo.MessageGroupMembers");
            CreateIndex("dbo.Member", "MessageGroupId");
            AddForeignKey("dbo.Member", "MessageGroupId", "dbo.MessageGroup", "MessageGroupId");
        }
    }
}
