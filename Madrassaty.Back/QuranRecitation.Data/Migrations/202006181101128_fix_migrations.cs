namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class fix_migrations : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RecitationDetail", "Rating", c => c.Int(nullable: false));
            AddColumn("dbo.RecitationDetail", "Remarques", c => c.Int(nullable: false));
            AddColumn("dbo.RecitationSession", "TypeEvaluation", c => c.String());
            AddColumn("dbo.RecitationSession", "Jour", c => c.String());
            AddColumn("dbo.RecitationSession", "T1", c => c.DateTime(nullable: false));
            AddColumn("dbo.RecitationSession", "T2", c => c.DateTime(nullable: false));
            AddColumn("dbo.RecitationSession", "T3", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RecitationSession", "T3");
            DropColumn("dbo.RecitationSession", "T2");
            DropColumn("dbo.RecitationSession", "T1");
            DropColumn("dbo.RecitationSession", "Jour");
            DropColumn("dbo.RecitationSession", "TypeEvaluation");
            DropColumn("dbo.RecitationDetail", "Remarques");
            DropColumn("dbo.RecitationDetail", "Rating");
        }
    }
}
