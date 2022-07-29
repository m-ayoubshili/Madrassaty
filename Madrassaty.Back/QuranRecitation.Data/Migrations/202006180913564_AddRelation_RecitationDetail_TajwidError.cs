namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddRelation_RecitationDetail_TajwidError : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.RecitationTajwidError",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        RecitationDetailId = c.Int(nullable: false),
                        TajwidErrorId = c.Int(nullable: false),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.RecitationDetail", t => t.RecitationDetailId)
                .ForeignKey("dbo.TajwidError", t => t.TajwidErrorId)
                .Index(t => t.RecitationDetailId)
                .Index(t => t.TajwidErrorId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.RecitationTajwidError", "TajwidErrorId", "dbo.TajwidError");
            DropForeignKey("dbo.RecitationTajwidError", "RecitationDetailId", "dbo.RecitationDetail");
            DropIndex("dbo.RecitationTajwidError", new[] { "TajwidErrorId" });
            DropIndex("dbo.RecitationTajwidError", new[] { "RecitationDetailId" });
            DropTable("dbo.RecitationTajwidError");
        }
    }
}
