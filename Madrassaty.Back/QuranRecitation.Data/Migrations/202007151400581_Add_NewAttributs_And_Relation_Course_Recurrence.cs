namespace QuranRecitation.Data.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class Add_NewAttributs_And_Relation_Course_Recurrence : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Course", "Jour", c => c.String());
            AddColumn("dbo.Course", "T1", c => c.DateTime());
            AddColumn("dbo.Course", "T2", c => c.DateTime());
            AddColumn("dbo.Course", "T3", c => c.DateTime());
            AddColumn("dbo.Course", "RecurrenceId", c => c.Int());
            CreateIndex("dbo.Course", "RecurrenceId");
            AddForeignKey("dbo.Course", "RecurrenceId", "dbo.Recurrence", "Id");
        }
        
        public override void Down()
        {
            DropForeignKey("dbo.Course", "RecurrenceId", "dbo.Recurrence");
            DropIndex("dbo.Course", new[] { "RecurrenceId" });
            DropColumn("dbo.Course", "RecurrenceId");
            DropColumn("dbo.Course", "T3");
            DropColumn("dbo.Course", "T2");
            DropColumn("dbo.Course", "T1");
            DropColumn("dbo.Course", "Jour");
        }
    }
}
