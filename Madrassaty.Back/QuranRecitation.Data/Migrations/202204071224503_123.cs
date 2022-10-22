namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class _123 : DbMigration
    {
        public override void Up()
        {
            DropIndex("dbo.Member", new[] { "MemberStateId" });
            AlterColumn("dbo.Member", "MemberStateId", c => c.Int(nullable: false));
            CreateIndex("dbo.Member", "MemberStateId");
        }
        
        public override void Down()
        {
            DropIndex("dbo.Member", new[] { "MemberStateId" });
            AlterColumn("dbo.Member", "MemberStateId", c => c.Int());
            CreateIndex("dbo.Member", "MemberStateId");
        }
    }
}
