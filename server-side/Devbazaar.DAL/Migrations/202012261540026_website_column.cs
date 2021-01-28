namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class website_column : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Businesses", "Website", c => c.String(maxLength: 2083));
        }
        
        public override void Down()
        {
            DropColumn("dbo.Businesses", "Website");
        }
    }
}
