namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class UpdateSchoolAttributesLength : DbMigration
    {
        public override void Up()
        {
            AlterColumn("dbo.School", "NumTVA", c => c.String(maxLength: 13));
        }
        
        public override void Down()
        {
            AlterColumn("dbo.School", "NumTVA", c => c.String(maxLength: 11));
        }
    }
}
