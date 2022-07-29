namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class DateNullable : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.RecitationSession", "T1", c => c.DateTime());
            AlterColumn("dbo.RecitationSession", "T2", c => c.DateTime());
            AlterColumn("dbo.RecitationSession", "T3", c => c.DateTime());
        }
        
        public override void Down()
        {
            AlterColumn("dbo.RecitationSession", "T3", c => c.DateTime(nullable: false));
            AlterColumn("dbo.RecitationSession", "T2", c => c.DateTime(nullable: false));
            AlterColumn("dbo.RecitationSession", "T1", c => c.DateTime(nullable: false));
        }
    }
}
