namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class TitleToTask : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Tasks", "Title", c => c.String(nullable: false, maxLength: 100));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Tasks", "Title");
        }
    }
}
