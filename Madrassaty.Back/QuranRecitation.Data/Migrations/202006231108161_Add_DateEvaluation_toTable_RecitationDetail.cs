namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_DateEvaluation_toTable_RecitationDetail : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.RecitationDetail", "DateEvaluation", c => c.DateTime(nullable: false));
        }
        
        public override void Down()
        {
            DropColumn("dbo.RecitationDetail", "DateEvaluation");
        }
    }
}
