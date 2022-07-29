namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class AddNewColumn_Remarque_In_CourseSession : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.CourseSessions", "Remarque", c => c.String());
        }
        
        public override void Down()
        {
            DropColumn("dbo.CourseSessions", "Remarque");
        }
    }
}
