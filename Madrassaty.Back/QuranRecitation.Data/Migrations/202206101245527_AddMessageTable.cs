namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddMessageTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MessageGroup",
                c => new
                    {
                        MessageGroupId = c.Int(nullable: false, identity: true),
                        Name = c.String(),
                    })
                .PrimaryKey(t => t.MessageGroupId);
            
            CreateTable(
                "dbo.Message",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        MessageBody = c.String(),
                        SendingDate = c.DateTime(nullable: false),
                        SenderId = c.Guid(nullable: false),
                        RecieverId = c.String(),
                        ToGroup = c.Boolean(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.Member", t => t.SenderId)
                .Index(t => t.SenderId);
            
            AddColumn("dbo.Member", "MessageGroupId", c => c.Int());
            CreateIndex("dbo.Member", "MessageGroupId");
            AddForeignKey("dbo.Member", "MessageGroupId", "dbo.MessageGroup", "MessageGroupId");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Message", "SenderId", "dbo.Member");
            DropForeignKey("dbo.Member", "MessageGroupId", "dbo.MessageGroup");
            DropIndex("dbo.Message", new[] { "SenderId" });
            DropIndex("dbo.Member", new[] { "MessageGroupId" });
            DropColumn("dbo.Member", "MessageGroupId");
            DropTable("dbo.Message");
            DropTable("dbo.MessageGroup");
        }
    }
}
