namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewAttributsToSchool : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.School", "SocietyName", c => c.String());
            AddColumn("dbo.School", "SiretCode", c => c.String(maxLength: 14));
            AddColumn("dbo.School", "NumTVA", c => c.String(maxLength: 11));
        }
        
        public override void Down()
        {
            DropColumn("dbo.School", "NumTVA");
            DropColumn("dbo.School", "SiretCode");
            DropColumn("dbo.School", "SocietyName");
        }
    }
}
