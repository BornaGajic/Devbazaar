namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class logoColumn : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Businesses", "Logo", c => c.Binary());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Businesses", "Logo");
        }
    }
}
