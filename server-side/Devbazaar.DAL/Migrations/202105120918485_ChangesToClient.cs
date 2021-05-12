namespace Devbazaar.DAL.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class ChangesToClient : DbMigration
    {
        public override void Up()
        {
            AddColumn("dbo.Clients", "About", c => c.String(maxLength: 300));
            AddColumn("dbo.Clients", "Website", c => c.String(maxLength: 2083));
            AddColumn("dbo.Clients", "Country", c => c.String(maxLength: 50));
            AddColumn("dbo.Clients", "City", c => c.String(maxLength: 50));
            AddColumn("dbo.Clients", "PostalCode", c => c.Int());
        }
        
        public override void Down()
        {
            DropColumn("dbo.Clients", "PostalCode");
            DropColumn("dbo.Clients", "City");
            DropColumn("dbo.Clients", "Country");
            DropColumn("dbo.Clients", "Website");
            DropColumn("dbo.Clients", "About");
        }
    }
}
