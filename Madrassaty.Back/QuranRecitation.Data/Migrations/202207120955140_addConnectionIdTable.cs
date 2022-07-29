namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class addConnectionIdTable : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.MemberConnectionId",
                c => new
                    {
                        MemberId = c.Guid(nullable: false),
                        ConnectionId = c.String(),
                    })
                .PrimaryKey(t => t.MemberId);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.MemberConnectionId");
        }
    }
}
