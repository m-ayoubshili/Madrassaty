namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MemberStates",
                c => new
                    {
                        id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
            AddColumn("dbo.Member", "MemberStateId", c => c.Int(nullable: false));
            CreateIndex("dbo.Member", "MemberStateId");
            AddForeignKey("dbo.Member", "MemberStateId", "dbo.MemberStates", "id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Member", "MemberStateId", "dbo.MemberStates");
            DropIndex("dbo.Member", new[] { "MemberStateId" });
            DropColumn("dbo.Member", "MemberStateId");
            DropTable("dbo.MemberStates");
        }
    }
}
