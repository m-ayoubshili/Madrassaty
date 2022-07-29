namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class update_RecitationDetail_Table : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.RecitationDetail", "Remarques", c => c.String());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RecitationDetail", "Remarques", c => c.Int(nullable: false));
        }
    }
}
