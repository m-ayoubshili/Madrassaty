namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_TajwidErro_Table : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.TajwidError",
                c => new
                    {
                        Id = c.Int(nullable: false, identity: true),
                        Wording = c.String(),
                        ParentId = c.Int(),
                    })
                .PrimaryKey(t => t.Id)
                .ForeignKey("dbo.TajwidError", t => t.ParentId)
                .Index(t => t.ParentId);
            
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.TajwidError", "ParentId", "dbo.TajwidError");
            DropIndex("dbo.TajwidError", new[] { "ParentId" });
            DropTable("dbo.TajwidError");
        }
    }
}
